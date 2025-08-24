<?php

namespace App\Http\Controllers;

use App\Models\District;
use App\Models\Ward;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DistrictController extends Controller
{
    public function get_districts()
    {
        $districts = District::with('wards.hamlets')->get();
        return response()->json(
            $districts
        );
    }

    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $districts = District::when($request->has('search'), function ($q) use ($request) {
            $q->where('name', 'LIKE', '%' . $request->search . '%');
        })->paginate($perPage);
        return Inertia::render('admin/kecamatan/index', [
            'districts' => $districts,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/kecamatan/create');
    }

    public function store(Request $request)
    {
        $district = District::make($request->all());
        $district->save();
        session()->flash('message', 'Berhasil menambah kecamatan');
        return redirect()->route('district.index');
    }

    public function show(District $district, Request $request)
    {
        $perPage = $request->get('per_page', 10);

        $wards = Ward::where('district_id', $district->id)->when($request->has('search'), function ($q) use ($request) {
            $q->where('name', 'LIKE', '%' . $request->search . '%');
        })->orderBy('created_at', 'DESC')->paginate($perPage);
        return Inertia::render('admin/desa/index', [
            'district' => $district,
            'wards' => $wards,
        ]);
    }

    public function edit(District $district)
    {
        return Inertia::render('admin/kecamatan/edit', compact('district'));
    }

    public function update(Request $request, District $district)
    {
        $district->name = $request->name;
        $district->save();
        session()->flash('message', 'Berhasil mengubah kecamatan');

        return redirect()->route('district.index');
    }

    public function destroy(District $district)
    {
        $district->delete();
        session()->flash('message', 'Berhasil menghapus kecamatan');
        // return redirect()->route('district.index');
        return response()->json([
            'message' => 'Berhasil menghapus kecamatan',
            'status' => 'success'
        ]);
    }
}
