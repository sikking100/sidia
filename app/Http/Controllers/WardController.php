<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWardRequest;
use App\Http\Requests\UpdateWardRequest;
use App\Models\Ward;
use App\Models\District;
use Inertia\Inertia;

class WardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create($id)
    {
        $district = District::find($id);
        return Inertia::render('Admin/Ward/Create', compact('district'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreWardRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreWardRequest $request)
    {
        $ward = Ward::make($request->all());
        $ward->save();
        session()->flash('message', 'Berhasil menambah kelurahan');
        return redirect()->route('district.show', $request->district_id);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Index  $ward
     * @return \Illuminate\Http\Response
     */
    public function show(Index $ward)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Index  $ward
     * @return \Illuminate\Http\Response
     */
    public function edit(Index $ward)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateWardRequest  $request
     * @param  \App\Models\Index  $ward
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateWardRequest $request, Index $ward)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Index  $ward
     * @return \Illuminate\Http\Response
     */
    public function destroy(Index $ward)
    {
        //
    }
}
