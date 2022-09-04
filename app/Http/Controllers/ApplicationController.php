<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\StoreApplicationRequest;
use App\Http\Requests\UpdateApplicationRequest;
use App\Http\Requests\UpdateStatusRequest;

use App\Models\Application;
use App\Models\Menu;
use Inertia\Inertia;
use App\Support\MyUploadFile;

class ApplicationController extends Controller
{

    private $up;

    public function __construct()
    {
        $this->up = new MyUploadFile();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $application = Application::all();
        return Inertia::render('Admin/Pemohon/Index', compact('application'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreApplicationRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreApplicationRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Application  $application
     * @return \Illuminate\Http\Response
     */
    public function show(Application $application)
    {
        $files = $application->files;
        return Inertia::render('Admin/Pemohon/Show', compact('application', 'files'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Application  $application
     * @return \Illuminate\Http\Response
     */
    public function edit(Application $application)
    {
      $pdf = app('dompdf.wrapper');
      $pdf->getDomPDF()->set_option("enable_php",true);
      $pdf->loadView('report',compact('application'));
      return $pdf->stream('applicant.pdf');
     // return view('report', compact('application'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateApplicationRequest  $request
     * @param  \App\Models\Application  $application
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateApplicationRequest $request, Application $application)
    {
        dd($application);
    }



    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Application  $application
     * @return \Illuminate\Http\Response
     */
    public function destroy(Application $application)
    {
        $this->up->deleteKK($application->category,$application);
        $this->up->deleteKTP($application->category,$application);
        $this->up->deleteSurat($application->category,$application);
        $this->up->deleteImages('applicant',$application);
        $application->delete();
        return redirect()->route('application.index');
    }

    public function update_status(UpdateStatusRequest $request, $id)
    {
      $application = Application::where('id', $id)->first();
      $application->status = $request->status;
      $application->status_description = $request->status_description;
      $application->save();
      session()->flash('message', 'Sukses mengubah status');
      return redirect()->route('application.index');
    }

    public function count()
    {
      $c = Application::all()->whereIn('status',['PENDING', 'DEFFICIENT', 'VERIFIED']);
      return response()->json([
        'count' => count($c)
      ]);
    }

}
