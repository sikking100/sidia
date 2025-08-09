<?php

namespace App\Http\Controllers;

use App\Models\DesaApplication;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DesaApplicationController extends Controller
{
    public function buat()
    {
        return Inertia::render('Admin/DesaApplication/Buat');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $applications = DesaApplication::all();
        return Inertia::render('Admin/DesaApplication/Index', compact('applications'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Admin/DesaApplication/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $desaApplication = DesaApplication::make($request->all());
        $desaApplication->save();
        session()->flash('message', 'Data berhasil dibuat');
        return redirect()->route('desa-applications.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DesaApplication  $desaApplication
     * @return \Illuminate\Http\Response
     */
    public function show(DesaApplication $desaApplication)
    {
        return Inertia::render('Admin/DesaApplication/Show', compact('desaApplication'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\DesaApplication  $desaApplication
     * @return \Illuminate\Http\Response
     */
    public function edit(DesaApplication $desaApplication)
    {
        // 
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DesaApplication  $desaApplication
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DesaApplication $desaApplication)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DesaApplication  $desaApplication
     * @return \Illuminate\Http\Response
     */
    public function destroy(DesaApplication $desaApplication)
    {
        //
    }
}
