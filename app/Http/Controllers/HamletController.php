<?php

namespace App\Http\Controllers;

use App\Models\Hamlet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HamletController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $perPage = $request->get('per_page', 10);
        $hamlets = Hamlet::where('ward_id', $user->ddesa->id)->when($request->has('search'), function ($q) use ($request) {
            $q->where('name', 'LIKE', '%' . $request->search . '%');
        })->paginate($perPage);
        return Inertia::render('admin/dusun/index', [
            'hamlets' => $hamlets,
            'ward' => $user->ddesa,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('admin/dusun/create');
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
        $user = Auth::user();
        $hamlet->ward_id = $user->ddesa->id;
        $hamlet->save();

        return redirect()->route('hamlet.index')->with('message', 'Data berhasil disimpan');
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
        return Inertia::render('admin/dusun/edit', compact('hamlet'));
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
        return redirect()->route('hamlet.index')->with('message', 'Data berhasil diubah');
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
        return response()->json([
            'message' => 'Berhasil menghapus kecamatan',
            'status' => 'success'
        ]);
    }
}
