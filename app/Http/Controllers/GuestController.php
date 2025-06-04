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

class GuestController extends Controller
{
    private $upload;

    public function __construct()
    {
        $this->upload = new MyUploadFile();
    }

    public function check()
    {
        return Inertia::render('Guest/CheckApplicant');
    }

    public function applicant($id)
    {
        $applicant = Application::where('id_card_number', $id)->orderBy('created_at', 'desc')
            ->whereIn('status', ['PENDING', 'DEFFICIENT', 'VERIFIED'])->get();
        return response()->json(
            $applicant
        );
    }

    public function form($category)
    {
        return Inertia::render('Guest/Form', ['category' => $category]);
    }

    public function formAction(StoreApplicationRequest $request)
    {
        $applicant = Application::make($request->all());

        $this->upload->uploadImages($request, 'images', $applicant);
        $applicant->status_description = "Mohon cek secara berkala, sementara permohonan Anda sedang diverifikasi";
        $applicant->save();

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
            "nomor_tiket" => $applicant->id . "/" . $applicant->id_card_number . "/" . $applicant->created_at->format('d') . "/" . $applicant->created_at->format('m') . "/" . $applicant->created_at->format('Y'),
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
        $category = $request->category;

        // dd(gettype($syarat));
        session()->flash('message', 'Silakan upload file yang dibutuhkan');
        // return redirect()->route($name.'.upload', [$applicant]);
        // return Inertia::render('Guest/UploadFile', ['applicant' => $applicant, 'requirements' => $syarat]);
        return redirect()->route('upload', [$applicant->id, $category]);
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
            $applicant->files()->save($files);
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
