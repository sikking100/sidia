<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\Requirement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class RequirementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($id)
    {
        $menu = Menu::find($id);
        return Inertia::render('admin/persyaratan/create', compact('menu'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $requirement = Requirement::create($request->all());
        $requirement->save();
        return redirect()->route('menu.show', $request->menu_id)->with('message', 'Data berhasil disimpan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Requirement $requirement)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Requirement $requirement)
    {
        $menu = $requirement->menu;
        return Inertia::render('admin/persyaratan/edit', [
            'requirement' => $requirement,
            'menu' => $menu
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Requirement $requirement)
    {
        $requirement->update($request->all());
        return redirect()->route('menu.show', $request->menu_id)->with('message', 'Data berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Requirement $requirement)
    {
        $requirement->delete();
        session()->flash('message', 'Data berhasil hapus');
        return redirect()->route('menu.show', $requirement->menu_id);
    }
}
