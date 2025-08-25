<?php

namespace App\Http\Controllers;

use App\Models\District;
use App\Models\User;
use App\Models\Ward;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

use function App\Support\generateStrongPassword;

class WardController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $page = $request->input('page', 1);

        $query = Ward::query();

        $query->where('district_id', $request->id);
        if ($request->has('q') && !empty($request->q)) {
            $query->where('name', 'like', '%' . $request->q . '%');
        }

        $wards = $query->paginate($perPage, ['*'], 'page', $page);
        $district = District::find($request->id);
        return response()->json([
            'district' => $district,
            'wards' => $wards->items(),
            'meta' => [
                'current_page' => $wards->currentPage(),
                'last_page' => $wards->lastPage(),
                'per_page' => $wards->perPage(),
                'total' => $wards->total(),
            ],
        ]);
    }

    public function create($id)
    {
        $district = District::find($id);
        return Inertia::render('admin/desa/create', compact('district'));
    }

    public function store(Request $request)
    {
        $user = User::create([
            'role' => 'desa',
            'name' => 'admin' . $request->name,
            'phone' => '0',
            'email' => $request->name . '@example.com',
            'password' => Hash::make(generateStrongPassword(6))
        ]);
        $ward = Ward::make($request->all());
        $ward->user_id = $user->id;
        $ward->save();

        return redirect()->route('district.show', $request->district_id)->with('message', 'Berhasil menambah desa / kelurahan');
    }

    public function edit(Ward $ward)
    {
        $district = $ward->district()->first();
        return Inertia::render('Admin/Ward/Edit', ['district' => $district, 'wards' => $ward]);
    }

    public function update(Request $request, Ward $ward)
    {
        $ward->name = $request->name;
        $ward->save();
        return redirect()->route('district.show', $ward->district_id)->with('message', 'Berhasil mengubah desa / kelurahan');
    }

    public function destroy(Ward $ward)
    {
        // try {
        $user = User::find($ward->user_id);
        $ward->delete();
        $user->delete();
        session()->flash('message', 'Berhasil menghapus kelurahan / desa');
        // return redirect()->route('district.index');
        return response()->json(200);
        // session()->flash('message', 'Berhasil menghapus desa / kelurahan');
        // return redirect()->route('district.show', $ward->district_id);
        //     return back()->with('success', 'Kelurahan / Desa berhasil dihapus');
        // } catch (\Throwable $th) {
        //     //throw $th;
        //     return back()->withErrors(['delete_error' => 'Terjadi kesalahan saat menghapus post.']);
        // }
    }
}
