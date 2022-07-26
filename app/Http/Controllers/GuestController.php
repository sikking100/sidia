<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\District;
use App\Models\Application;
use App\Http\Requests\StoreApplicationRequest;
use App\Support\MyUploadFile;
use App\Http\Requests\KtpPemulaFileRequest;

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
        $applicant = Application::where('id_card_number', $id)->first();
        return response()->json(
          $applicant
        );
    }

    public function form(StoreApplicationRequest $request)
    {
        $applicant = Application::make($request->all());
        $this->upload->uploadImages($request,'images',$applicant);
        $applicant->save();
        session()->flash('message', 'Silakan upload file yang dibutuhkan');
        return redirect()->route('pemula.upload', [$applicant]);
    }

    public function pemula()
    {
        return Inertia::render('Guest/KTP/Pemula/Pemula');
    }

     public function pemulaUpload(Application $application)
     {
        return Inertia::render('Guest/KTP/Pemula/PemulaFile', compact('application'));
     }

     public function pemulaUploadAction(KtpPemulaFileRequest $request, Application $application) {
        $this->upload->deleteKK($request->category,$application);
        $this->upload->uploadKK($request,$request->category,$application);
        $application->save();
        session()->flash('message', 'Berhasil mengupload file.');
        return redirect('/');
     }

    public function kelurahan($id)
    {
        $district = District::where('name', $id)->first();
        $wards = $district->wards()->get();
        return response()->json([
          'wards' => $wards
        ]);
    }


}
