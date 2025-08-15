<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\District;
use App\Models\Application;
use App\Models\Menu;
use App\Models\File;
use App\Http\Requests\StoreApplicationRequest;
use App\Support\MyUploadFile;
use App\Http\Requests\KKFileRequest;
use App\Http\Requests\KKKtpFileRequest;
use App\Http\Requests\AllFileRequest;
use Illuminate\Support\Facades\Route;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class GuestController extends Controller
{
    private $upload;

    public function __construct()
    {
        $this->upload = new MyUploadFile();
    }

    public function downloadFile(Request $request)
    {
        $filename = $request->place;

        // dd($filename);
        if (!Storage::exists('public/' . $filename)) {
            abort(404);
        }
        // return response()->download(storage_path('app/public/' . $filename));
        return Storage::download('public/' . $filename);
    }

    public function check()
    {
        return Inertia::render('Guest/CheckApplicant');
    }

    public function check_detail($id)
    {
        $application = Application::with('filess')->find($id);
        $menu = Menu::firstWhere('name', $application->category);
        $requirements = $menu->requirements;
        return Inertia::render('Guest/Show', [
            'application' => $application,
            'requirements' => $requirements,
        ]);
    }

    public function applicant($id)
    {
        $applicant = Application::with('filess')->where('id_card_number', $id)->orderBy('created_at', 'desc')->get();
        return response()->json(
            $applicant
        );
    }

    public function form($category, Request $request)
    {
        $districts = District::with('wards')->get();
        $menu = Menu::firstWhere('name', $category);
        $requirements = $menu->requirements;
        $application = Application::with('filess')->find($request->id);
        return Inertia::render('Guest/Form', ['category' => $category, 'menu' => $menu, 'requirements' => $requirements, 'districts' => $districts, 'application' => $application]);
    }

    public function formAction(StoreApplicationRequest $request)
    {
        $applicant = Application::make($request->all());
        $applicant->ward_id = $request->ward_id;
        $applicant->district_id = $request->district_id;
        $applicant->hamlet_id = 0;
        $this->upload->uploadImages($request, 'images', $applicant);
        $applicant->status_description = "Mohon cek secara berkala, sementara permohonan Anda sedang diverifikasi";
        $applicant->save();
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
                $files = new File();
                $files->name = $file['name'];
                $files->place = $request->category . '/' . $nameExt;
                $files->status = '0';
                $files->comment = '-';
                $applicant->filess()->save($files);
            }
        }


        // $currentTimestamp = strtotime("now");
        // $key = config('services.external_api.symmetric');
        // $payload = [
        //     "iss" => "lumen-jwt",
        //     "iat" => $currentTimestamp
        // ];

        // $token = JWT::encode($payload, $key, 'HS256');
        // $data = [
        //     "nama_aplikasi" => "sidia",
        //     "nama_layanan" => $applicant->cat->name_citigov,
        //     "id_layanan" => $applicant->cat->id_citigov,
        //     "nomor_tiket" => $applicant->id . "/" . $applicant->id_card_number . "/" . $applicant->created_at->format('d') . "/" . $applicant->created_at->format('m') . "/" . $applicant->created_at->format('Y'),
        //     "status" => 1,
        //     "nama_pemohon" => $applicant->name,
        //     "nik_pemohon" => $applicant->id_card_number,
        //     "email_pemohon" => $applicant->email,
        //     "telepon_pemohon" => $applicant->phone,
        //     "nip_petugas" => "198709032020122002",
        //     "nama_petugas" => "FATMAWATI",
        //     "bidang_petugas" => "PENDAFTARAN PENDUDUK",
        //     "jabatan_petugas" => "PENGAWAS KEPENDUDUKAN",
        // ];
        // $ext_url = config('services.external_api.url');

        // $result = Http::withHeaders([
        //     'token' => $token,
        //     'symmetric' => $key,
        // ])->post($ext_url . "application/ticket/insert", $data);
        $category = $request->category;

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
                $desaFile = new File();
                $desaFile->name = $file['name'];
                $desaFile->place = $request->category . '/' . $nameExt;
                $desaFile->status = '0';
                $desaFile->comment = 'sudah direvisi';
                LOG::info('desafile name = ' . $desaFile->name);
                LOG::info('desafile place = ' . $desaFile->place);
                $applicant->filess()->save($desaFile);
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

    public function uploadFile($id, $category)
    {
        $menu = Menu::firstWhere('name', $category);
        $syarat = $menu->requirements;
        return Inertia::render('Guest/UploadFile', ['id' => $id, 'requirements' => $syarat, 'category' => $category]);
    }

    public function uploadAction(Request $request)
    {
        $menu = Menu::firstWhere('name', $request->category);
        $syarat = $menu->requirements;
        for ($i = 0; $i < count($syarat); $i++) {
            $applicant = Application::find($request->id);
            $n = explode(' ', $syarat[$i]->name);
            $name = $n[0] . '_' . $n[1];
            $nameExt = $i . time() . '.' . $request->$name->extension();
            $request->$name->storeAs($request->category, $nameExt, 'public');
            $files = new File;
            $files->name = $syarat[$i]->name;
            $files->place = $request->category . '/' . $nameExt;
            $applicant->filess()->save($files);
        }
        session()->flash('message', 'Silakan mengecek permohonan');
        return redirect('/');
    }

    //go to upload
    // public function toUpload($id)
    // {
    //   $applicant = Application::where('id', $id)->first();
    //   $exp = explode("-",$applicant->category);
    //   $last = end($exp);
    //   $name = strtolower($last);
    //   return redirect()->route($name.'.upload', [$applicant]);
    // }

    // //pemula
    // public function pemula()
    // {
    //     return Inertia::render('Guest/KTP/Pemula/Pemula');
    // }
    //
    //  public function pemulaUpload(Application $application)
    //  {
    //     return Inertia::render('Guest/KTP/Pemula/PemulaFile', compact('application'));
    //  }
    //
    //  public function pemulaUploadAction(KKFileRequest $request, Application $application) {
    //     $this->upload->deleteKK($request->category,$application);
    //     $this->upload->uploadKK($request,$request->category,$application);
    //     $application->status = 'PENDING';
    //     $application->status_description = '';
    //     $application->save();
    //     session()->flash('message', 'Berhasil mengupload file.');
    //     return redirect('/');
    //  }
    //
    //  //rusak
    //  public function rusak()
    //  {
    //      return Inertia::render('Guest/KTP/Rusak/Rusak');
    //  }
    //
    //   public function rusakUpload(Application $application)
    //   {
    //      return Inertia::render('Guest/KTP/Rusak/RusakFile', compact('application'));
    //   }
    //
    //   public function rusakUploadAction(KKKtpFileRequest $request, Application $application) {
    //      $this->upload->deleteKK($request->category,$application);
    //      $this->upload->uploadKK($request,$request->category,$application);
    //      $this->upload->deleteKTP($request->category,$application);
    //      $this->upload->uploadKTP($request,$request->category,$application);
    //      $application->status = 'PENDING';
    //      $application->status_description = '';
    //      $application->save();
    //      session()->flash('message', 'Berhasil mengupload file.');
    //      return redirect('/');
    //   }
    //
    //   //hilang
    //   public function hilang()
    //   {
    //       return Inertia::render('Guest/KTP/Hilang/Hilang');
    //   }
    //
    //    public function hilangUpload(Application $application)
    //    {
    //       return Inertia::render('Guest/KTP/Hilang/HilangFile', compact('application'));
    //    }
    //
    //    public function hilangUploadAction(AllFileRequest $request, Application $application) {
    //       $this->upload->deleteKK($request->category,$application);
    //       $this->upload->uploadKK($request,$request->category,$application);
    //       if ($request->file_id_card != null) {
    //         $this->upload->deleteKTP($request->category,$application);
    //         $this->upload->uploadKTP($request,$request->category,$application);
    //       }
    //       $this->upload->deleteSurat($request->category,$application);
    //       $this->upload->uploadSurat($request,$request->category,$application);
    //       $application->status = 'PENDING';
    //       $application->status_description = '';
    //       $application->save();
    //       session()->flash('message', 'Berhasil mengupload file.');
    //       return redirect('/');
    //    }
    //
    //    //perubahan
    //    public function perubahan()
    //    {
    //        return Inertia::render('Guest/KTP/Perubahan/Perubahan');
    //    }
    //
    //     public function perubahanUpload(Application $application)
    //     {
    //        return Inertia::render('Guest/KTP/Perubahan/PerubahanFile', compact('application'));
    //     }
    //
    //     public function perubahanUploadAction(KKKtpFileRequest $request, Application $application) {
    //        $this->upload->deleteKK($request->category,$application);
    //        $this->upload->uploadKK($request,$request->category,$application);
    //          $this->upload->deleteKTP($request->category,$application);
    //          $this->upload->uploadKTP($request,$request->category,$application);
    //          $application->status = 'PENDING';
    //          $application->status_description = '';
    //        $application->save();
    //        session()->flash('message', 'Berhasil mengupload file.');
    //        return redirect('/');
    //     }
    //
    //     //disabilitas
    //     public function disabilitas()
    //     {
    //         return Inertia::render('Guest/KTP/Disabilitas/Disabilitas');
    //     }
    //
    //      public function disabilitasUpload(Application $application)
    //      {
    //         return Inertia::render('Guest/KTP/Disabilitas/DisabilitasFile', compact('application'));
    //      }
    //
    //      public function disabilitasUploadAction(KKFileRequest $request, Application $application) {
    //         $this->upload->deleteKK($request->category,$application);
    //         $this->upload->uploadKK($request,$request->category,$application);
    //         $application->status = 'PENDING';
    //         $application->status_description = '';
    //         $application->save();
    //         session()->flash('message', 'Berhasil mengupload file.');
    //         return redirect('/');
    //      }

    public function kelurahan($id)
    {
        $district = District::where('name', $id)->first();
        $wards = $district->wards()->get();
        return response()->json([
            'wards' => $wards
        ]);
    }
}
