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

class GuestController extends Controller
{
    private $upload;

    public function __construct()
    {
        $this->upload = new MyUploadFile();
    }

    public function check() {
        return Inertia::render('Guest/CheckApplicant');
    }

    public function applicant($id) {
        $applicant = Application::where('id_card_number', $id)->whereIn('status',['PENDING', 'DEFFICIENT', 'VERIFIED'])->get();
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
        $this->upload->uploadImages($request,'images',$applicant);
        $applicant->status_description = "Mohon cek secara berkala, sementara permohonan Anda sedang diverifikasi";
        $applicant->save();
        // $exp = explode("-",$request->category);
        // $last = end($exp);
        // $name = strtolower($last);
        $category = $request->category;

        // dd(gettype($syarat));
        session()->flash('message', 'Silakan upload file yang dibutuhkan');
        // return redirect()->route($name.'.upload', [$applicant]);
        // return Inertia::render('Guest/UploadFile', ['applicant' => $applicant, 'requirements' => $syarat]);
        return redirect()->route('upload', [$applicant->id, $category]);
    }

    public function uploadFile($id, $category) {
      $menu = Menu::firstWhere('name', $category);
      $syarat = $menu->requirements;
      return Inertia::render('Guest/UploadFile', ['id' => $id, 'requirements' => $syarat, 'category' => $category]);
    }

    public function uploadAction(Request $request)
    {
      $menu = Menu::firstWhere('name', $request->category);
      $syarat = $menu->requirements;
      $names = '';
      for ($i=0; $i < count($syarat); $i++) {
        $applicant = Application::find($request->id);
        $name = join('_', explode(' ', $syarat[$i]->name));
        $nameExt = time().'.'.$request->$name->extension();
        $request->$name->storeAs($request->category, $nameExt, 'public');
        $files = new File;
        $files->name = $syarat[$i]->name;
        $files->place = $request->category.'/'.$nameExt;
        $applicant->files()->save($files);
      }

      // foreach ($syarat as $key => $value) {
      //
      //   // $applicant->files()->save($files);
      // }
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
