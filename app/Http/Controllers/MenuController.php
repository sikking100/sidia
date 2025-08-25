<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\Requirement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $menus = Menu::when($request->has('search') && $request->search != '', function ($q) use ($request) {
            return $q->where('name', 'LIKE', '%' . $request->search . '%');
        })->paginate($perPage);
        return Inertia::render('admin/kategori/index', [
            'menus' => $menus
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Inertia::render('admin/kategori/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $menu = Menu::create($request->all());
        $menu->save();

        return redirect()->route('menu.index')->with('message', 'Berhasil menyimpan data');
    }

    /**
     * Display the specified resource.
     */
    public function show(Menu $menu, Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $requirements = Requirement::where('menu_id', $menu->id)
            ->when($request->has('search'), function ($q) use ($request) {
                return $q->where('name', 'LIKE', '%' . $request->search . '%');
            })
            ->paginate($perPage);
        return Inertia::render('admin/persyaratan/index', [
            'requirements' => $requirements,
            'menu' => $menu
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Menu $menu)
    {
        return Inertia::render('admin/kategori/edit', compact('menu'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Menu $menu)
    {
        $menu->name = $request->name;
        $menu->save();

        return redirect()->route('menu.index')->with('message', 'Data berhasil diperbaharui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Menu $menu)
    {
        //
    }
}
