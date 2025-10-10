<?php

namespace App\Http\Controllers;

use App\Mail\RegisterMail;
use App\Models\Application;
use App\Models\File;
use App\Models\Hamlet;
use App\Models\Menu;
use App\Support\MyUploadFile;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

use function App\Support\kirimEmail;

class DesaApplicationController extends Controller
{
    private $upload;

    public function __construct()
    {
        $this->upload = new MyUploadFile();
    }

    public function buat()
    {
        return Inertia::render('admin/desaApplication/buat');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $user = Auth::user();

        $desaApps = Application::with('filess')
            ->where('ward', $user->ddesa->name)
            ->filterByRole($request, $user->role)
            ->orderBy('created_at', 'desc')->paginate($perPage);
        return Inertia::render('admin/desaApplication/index', [
            'desaApps' => $desaApps,
            'ward' => $user->ddesa,
            'hamlets' => $user->ddesa->hamlets
        ]);
    }

    public function get_years()
    {
        $user = Auth::user();
        $years = Application::selectRaw('DISTINCT YEAR(created_at) as year')->where('ward', $user->ddesa->name)->groupBy('year')->orderBy('year')->pluck('year');
        return response()->json($years);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create($category)
    {
        $user = Auth::user();
        $hamlets = $user->ddesa->hamlets;
        $menu = Menu::firstWhere('name', $category);
        $requirements = $menu->requirements;
        return Inertia::render('admin/desaApplication/create', compact('menu', 'hamlets', 'category', 'requirements'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $request->validate([
            'images' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
            'filessss.*.filenya' => ['image', 'mimes:jpeg,png,jpg,gif,svg'],
        ]);

        // try {
        $user = Auth::user();
        $applicant = Application::make($request->all());
        $applicant->hamlet = $request->hamlet;
        $applicant->ward = $user->ddesa->name;
        $applicant->district = $user->ddesa->district->name;
        $this->upload->uploadImages($request, 'images', $applicant);
        $applicant->save();

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
                $desaFile = new File();
                $desaFile->name = $file['name'];
                $desaFile->place = $request->category . '/' . $nameExt;
                $desaFile->status = '0';
                $desaFile->comment = '-';
                $applicant->filess()->save($desaFile);
            }
        }

        // if ($request->pendukung != null) {
        //     foreach ($request->pendukung as $key => $file) {
        //         $nameExt =  $key . '-' . time() . '.' . $file['filenya']->extension();
        //         $file['filenya']->storeAs('pendukung', $nameExt, 'public');
        //         $desaFile = new SupportFile();
        //         $desaFile->name = $file['name'];
        //         $desaFile->place = 'pendukung' . '/' . $nameExt;
        //         $applicant->supports()->save($desaFile);
        //     }
        // }


        // email ke pemohon
        // kirimEmail(
        //     $request->email,
        //     'Permohonan telah diproses dan dikirim ke Dukcapil',
        //     'Permohonan ' . $request->cateogry . ' telah diproses dan dikirim ke Dukcapil. Mohon cek email dan website secara berkala untuk mengetahui status permohonan'
        // );
        Mail::to($request->email)->send(new RegisterMail($applicant, false));



        // email ke dukcapil
        // kirimEmail(
        //     'disdukcapilkabmorut@gmail.com',
        //     'Permohonan baru',
        //     'Ada permohonan ' . $request->cateogry . ' dengan NIK : ' . $request->id_card_number . '. Mohon untuk segera ditindaklanjuti.'
        // );
        Mail::to(config('custom.email_dukcapil'))->send(new RegisterMail($applicant, true));

        // input data ke website DIA SAJA
        $currentTimestamp = strtotime("now");
        $key = config('services.external_api.symmetric');
        $payload = [
            "iss" => "lumen-jwt",
            "iat" => $currentTimestamp
        ];

        $token = JWT::encode($payload, $key, 'HS256');
        $data = [
            "nama_aplikasi" => "sidia",
            "nama_layanan" => $applicant->cat->name_citigov,
            "id_layanan" => $applicant->cat->id_citigov,
            "nomor_tiket" => $applicant->ticket,
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

        Log::info($data);

        $result = Http::withHeaders([
            'token' => $token,
            'symmetric' => $key,
        ])->post($ext_url . "application/ticket/insert", $data);

        Log::info($result);


        session()->flash('message', 'Data berhasil dibuat');
        return redirect()->route('desa.index');
        // } catch (\Throwable $th) {
        //     session()->flash('message', 'Data gagal dibuat. Error : ' . $th);
        //     return back()->withErrors([
        //         'server' => 'Terjadi kesalahan: ' . $th->getMessage()
        //     ]);
        // }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DesaApplication  $desaApplication
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $application = Application::with(['filess'])->find($request->id);
        return Inertia::render('admin/desaApplication/show', compact('application'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\DesaApplication  $desaApplication
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $application = Application::find($id);
        $filess = $application->filess;
        $user = Auth::user();
        $hamlets = $user->ddesa->hamlets;
        $category = $application->category;
        $menu = Menu::firstWhere('name', $category);
        $requirements = $menu->requirements;
        return Inertia::render('admin/desaApplication/edit', compact('filess', 'hamlets', 'menu', 'requirements', 'application', 'category'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DesaApplication  $desaApplication
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $application = Application::find($request->id);
        $files = $application->filess;
        $menu = Menu::firstWhere('name', $application->category);
        $requirements = $menu->requirements;

        if ($request->hasFile('images')) {
            $this->upload->deleteImages('images', $application);
            $this->upload->uploadImages($request, 'images', $application);
        }

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
                $desaFile = new File();
                $desaFile->name = $file['name'];
                $desaFile->place = $request->category . '/' . $nameExt;
                $desaFile->status = '0';
                $desaFile->comment = 'sudah direvisi';
                LOG::info('desafile name = ' . $desaFile->name);
                LOG::info('desafile place = ' . $desaFile->place);
                $application->filess()->save($desaFile);
            }
        }
        $application->status = 'REVISED';
        $application->status_description = 'Permohonan sudah direvisi';
        $application->save();

        $hamlet = Hamlet::find($application->hamlet_id);

        return Inertia::render('admin/desaApplication/show', compact('application', 'files', 'requirements', 'menu', 'hamlet'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DesaApplication  $desaApplication
     * @return \Illuminate\Http\Response
     */
    // public function destroy(DesaApplication $desaApplication)
    // {
    //     $this->upload->deleteKK($desaApplication->category, $desaApplication);
    //     $this->upload->deleteKTP($desaApplication->category, $desaApplication);
    //     $this->upload->deleteSurat($desaApplication->category, $desaApplication);
    //     $this->upload->deleteImages('applicant', $desaApplication);
    //     $desaApplication->delete();
    //     return redirect()->route('desa.index');
    // }

    // public function ready(Request $request)
    // {
    //     // get data desa application
    //     $desaApplication = DesaApplication::find($request->id);
    //     $applicant = Application::make($request->all());

    //     $this->upload->uploadImages($request, 'images', $applicant);
    //     $applicant->status_description = "Mohon cek secara berkala, sementara permohonan Anda sedang diverifikasi";
    //     $applicant->save();
    //     $desaApplication->update([
    //         'status' => 'SENDED',
    //     ]);
    //     return redirect()->route('desaApplications.show', $desaApplication);
    // }

    // public function update_status(Request $request)
    // {
    //     $desaApplication = DesaApplication::find($request->id);
    //     $desaApplication->update([
    //         'status' => $request->status,
    //         'status_description' => $request->status_description,
    //     ]);
    //     return redirect()->route('desaApplications.show', $desaApplication);
    // }
}
