<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreApplicationRequest;
use App\Models\Application;
use App\Models\District;
use App\Models\File as ModelsFile;
use App\Models\Menu;
use App\Models\SupportFile;
use App\Models\User;
use App\Notifications\RequestCreatedNotification;
use App\Support\MyUploadFile;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

use function App\Support\kirimEmail;

class GuestController extends Controller
{
    private $upload;

    public function __construct()
    {
        $this->upload = new MyUploadFile();
    }

    public function check_show()
    {
        return Inertia::render('guest/check');
    }

    public function pencarian(Request $request)
    {
        $applications = Application::query()->where('id_card_number', $request->q)->orWhere('name', 'LIKE', '%' . $request->q . '%')->orderBy('created_at', 'DESC')->get();
        return response()->json([
            'applications' => $applications
        ]);
    }

    public function detail($id)
    {
        $application = Application::with(['filess', 'supports'])->find($id);
        return Inertia::render('guest/detail', [
            'application' => $application
        ]);
    }

    public function buat($category, Request $request)
    {
        $districts = District::with('wards')->get();
        $menu = Menu::with('requirements')->firstWhere('name', $category);
        $application = Application::with('filess')->find($request->id);
        return Inertia::render('guest/create', [
            'category' => $category,
            'menu' => $menu,
            'application' => $application,
            'districts' => $districts,
        ]);
    }

    public function formAction(StoreApplicationRequest $request)
    {
        // dd($request->email);
        $applicant = Application::make($request->all());
        $this->upload->uploadImages($request, 'images', $applicant);
        $applicant->status_description = "Mohon cek secara berkala, sementara permohonan Anda sedang diverifikasi";
        $applicant->save();
        // email ke pemohon
        kirimEmail(
            $request->email,
            'Permohonan telah diregister',
            'Permohonan ' . $applicant->category . ' telah diregister. Mohon cek email dan website secara berkala untuk mengetahui status permohonan.'
        );

        // email ke dukcapil
        kirimEmail(
            config('custom.email_dukcapil'),
            'Permohonan Baru',
            'Ada permohonan ' . $request->cateogry . ' dengan NIK : ' . $request->id_card_number . '. Mohon untuk segera ditindaklanjuti.'
        );

        if ($request->filessss != null) {
            foreach ($request->filessss as $key => $file) {
                // hapus terlebih dahulu gambarnya
                Log::info('perulangan ke = ' . $key);

                if ($file['place'] != null && $file['place'] !== "") {
                    $this->upload->deleteBerkas($file['place']);
                    File::where('place', $file['place'])->delete();
                }
                LOG::info('file place = ' . $file['place']);
                LOG::info('file filenya = ' . $file['filenya']);


                $nameExt = $key . '-' . time() . '.' . $file['filenya']->extension();
                $file['filenya']->storeAs($request->category, $nameExt, 'public');
                $files = new ModelsFile();
                $files->name = $file['name'];
                $files->place = $request->category . '/' . $nameExt;
                $files->status = '0';
                $files->comment = '-';
                $applicant->filess()->save($files);
            }
        }

        if ($request->pendukung != null) {
            foreach ($request->pendukung as $key => $file) {
                $nameExt =  $key . '-' . time() . '.' . $file['filenya']->extension();
                $file['filenya']->storeAs('pendukung', $nameExt, 'public');
                $desaFile = new SupportFile();
                $desaFile->name = $file['name'];
                $desaFile->place = 'pendukung' . '/' . $nameExt;
                $applicant->supports()->save($desaFile);
            }
        }

        // kirim notifikasi
        $admins = User::where('role', 'superadmin')->get();
        // Notification::send($admins, new RequestCreatedNotification([
        //     'id' => $applicant->id,
        //     'user' => $applicant->name,
        // ]));
        foreach ($admins as $key => $admin) {
            $admin->notify(new RequestCreatedNotification(
                [
                    'id' => $applicant->id,
                    'user_id' => $admin->id,
                    'message' => 'Permohonan baru diajukan.',
                    'created_at' => $applicant->created_at,
                ]
            ));
        }


        // input data ke website DIA SAJA
        $currentTimestamp = strtotime("now");
        $key = config('services.external_api.symmetric');
        $payload = [
            "iss" => "lumen-jwt",
            "iat" => $currentTimestamp
        ];

        $token = JWT::encode($payload, $key, 'HS256');
        // nomor tiket dari aplikasi sidia
        // SD untuk awalan sidia
        // id dari primary key / id category dari citigov - tanggal sekarang / bulan / tahun / 
        $nomor_tiket = "SD" . $applicant->id . "/" . $applicant->cat->id_citigov . "-" .  $applicant->created_at->format('d') . "/" . $applicant->created_at->format('m') . "/" . $applicant->created_at->format('Y') . "/" . $applicant->cat->id . "-SIDIA-" . $applicant->id;
        $data = [
            "nama_aplikasi" => "sidia",
            "nama_layanan" => $applicant->cat->name_citigov,
            "id_layanan" => $applicant->cat->id_citigov,
            "nomor_tiket" => $nomor_tiket,
            "status" => 1,
            "nama_pemohon" => $applicant->name,
            "nik_pemohon" => $applicant->id_card_number,
            "email_pemohon" => $applicant->email,
            "telepon_pemohon" => $applicant->phone,
            "nip_petugas" => "198709032020122002",
            "nama_petugas" => "FATMAWATI",
            "bidang_petugas" => "PENDAFTARAN PENDUDUK",
            "jabatan_petugas" => "PENGAWAS KEPENDUDUKAN",
        ];
        $ext_url = config('services.external_api.url');

        $result = Http::withHeaders([
            'token' => $token,
            'symmetric' => $key,
        ])->post($ext_url . "application/ticket/insert", $data);

        $applicant->update([
            'ticket' => $nomor_tiket
        ]);

        // dd(gettype($syarat));
        session()->flash('message', 'Berhasil mengajukan permohonan untuk NIK : ' . $applicant->id_card_number . '\nCek data pengajuan secara berkala');
        // return redirect()->route($name.'.upload', [$applicant]);
        // return Inertia::render('Guest/UploadFile', ['applicant' => $applicant, 'requirements' => $syarat]);
        // return redirect()->route('upload', [$applicant->id, $category]);
        return redirect()->route('check');
    }

    public function form_update(Request $request)
    {
        $applicant = Application::find($request->id);
        $menu = Menu::firstWhere('name', $applicant->category);
        // dd($applicant->category);
        // dd($request->category);

        if ($request->hasFile('images')) {
            $this->upload->deleteImages('images', $applicant);
            $this->upload->uploadImages($request, 'images', $applicant);
        }

        if ($request->filessss != null) {
            foreach ($request->filessss as $key => $file) {
                // hapus terlebih dahulu gambarnya
                LOG::info('perulangan ke = ' . $key);

                if ($file['place'] != null && $file['place'] !== "") {
                    $this->upload->deleteBerkas($file['place']);
                    File::where('place', $file['place'])->delete();
                }
                LOG::info('file place = ' . $file['place']);
                LOG::info('file filenya = ' . $file['filenya']);


                $nameExt = $key . '-' . time() . '.' . $file['filenya']->extension();
                $file['filenya']->storeAs($request->category, $nameExt, 'public');
                $desaFile = new ModelsFile();
                $desaFile->name = $file['name'];
                $desaFile->place = $request->category . '/' . $nameExt;
                $desaFile->status = '0';
                $desaFile->comment = 'sudah direvisi';
                LOG::info('desafile name = ' . $desaFile->name);
                LOG::info('desafile place = ' . $desaFile->place);
                $applicant->filess()->save($desaFile);
            }
        }

        if ($request->pendukung != null) {
            foreach ($request->pendukung as $key => $file) {
                $nameExt =  $key . '-' . time() . '.' . $file['filenya']->extension();
                $file['filenya']->storeAs('pendukung', $nameExt, 'public');
                $desaFile = new SupportFile();
                $desaFile->name = $file['name'];
                $desaFile->place = 'pendukung' . '/' . $nameExt;
                $applicant->supports()->save($desaFile);
            }
        }

        $applicant->fill($request->all());
        if ($request->filessss == null && $request->hasFile('images') == false && $applicant->isClean()) {
            session()->flash('message', 'Anda belum merevisi berkas : ' . $applicant->id_card_number);
            return redirect()->route('check.detail', $applicant->id);
        }

        $applicant->status = 'REVISED';
        $applicant->status_description = 'Berkas sudah direvisi';
        $applicant->save();
        session()->flash('message', 'Berhasil merevisi berkas : ' . $applicant->id_card_number . '\nCek data pengajuan secara berkala');
        return redirect()->route('check.detail', $applicant->id);
    }

    public function downloadFile(Request $request)
    {
        $filename = $request->place;

        // dd($filename);
        if (!Storage::disk('public')->exists($filename)) {
            abort(404);
        }
        // return response()->download(storage_path('app/public/' . $filename));
        return response()->download(Storage::disk('public')->path($filename));
    }
}
