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
        session()->flash('message', 'Berhasil menambah desa / kelurahan');
        return redirect()->route('district.show', $request->district_id);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Index  $ward
     * @return \Illuminate\Http\Response
     */
    public function show(Ward $ward)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Index  $ward
     * @return \Illuminate\Http\Response
     */
    public function edit(Ward $ward)
    {
        $district = $ward->district()->first();
        return Inertia::render('Admin/Ward/Edit', ['district' => $district, 'wards' => $ward]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateWardRequest  $request
     * @param  \App\Models\Index  $ward
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateWardRequest $request, Ward $ward)
    {
        $ward->name = $request->name;
        $ward->save();
        session()->flash('message', 'Berhasil mengubah desa / kelurahan');
        return redirect()->route('district.show', $ward->district_id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Index  $ward
     * @return \Illuminate\Http\Response
     */
    public function destroy(Ward $ward)
    {
        $ward->delete();
        session()->flash('message', 'Berhasil menghapus desa / kelurahan');
        return redirect()->route('district.show', $ward->district_id);
    }
}
