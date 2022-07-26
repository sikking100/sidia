<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\StoreApplicationRequest;
use App\Http\Requests\UpdateApplicationRequest;
use App\Models\Application;
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
        return Inertia::render('Admin/Pemohon/Show', compact('application'));
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

     return view('report', compact('application'));
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Application  $application
     * @return \Illuminate\Http\Response
     */
    public function destroy(Application $application)
    {
        $this->up->deleteFile('applicant',$application);
        $this->up->deleteImage('applicant',$application);
        $application->delete();
        return redirect()->route('application.index');
    }
}
