<?php

namespace App\Http\Controllers;

use App\Models\Hamlet;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HamletController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $hamlets = Hamlet::all();
        return Inertia::render('Admin/Hamlet/Index', compact('hamlets'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Admin/Hamlet/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $hamlet = Hamlet::make($request->all());
        $user = auth()->user();
        $hamlet->ward_id = $user->ddesa->id;
        $hamlet->save();
        session()->flash('message', 'Data berhasil disimpan');
        return redirect()->route('hamlet.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Hamlet  $hamlet
     * @return \Illuminate\Http\Response
     */
    public function show(Hamlet $hamlet)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Hamlet  $hamlet
     * @return \Illuminate\Http\Response
     */
    public function edit(Hamlet $hamlet)
    {
        return Inertia::render('Admin/Hamlet/Edit', compact('hamlet'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Hamlet  $hamlet
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Hamlet $hamlet)
    {
        $hamlet->name = $request->name;
        $hamlet->save();
        session()->flash('message', 'Data berhasil diubah');
        return redirect()->route('hamlet.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Hamlet  $hamlet
     * @return \Illuminate\Http\Response
     */
    public function destroy(Hamlet $hamlet)
    {
        $hamlet->delete();
        session()->flash('message', 'Data berhasil dihapus');
        return redirect()->route('hamlet.index');
    }
}
