<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWardRequest;
use App\Http\Requests\UpdateWardRequest;
use App\Models\Ward;
use App\Models\District;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

use function App\Support\generateStrongPassword;

class WardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
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
        $user = User::create([
            'role' => 'desa',
            'name' => 'admin' . $request->name,
            'email' => $request->name . '@example.com',
            'password' => Hash::make(generateStrongPassword(6))
        ]);
        $ward = Ward::make($request->all());
        $ward->user_id = $user->id;
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
        // try {
        $user = User::find($ward->user_id);
        $ward->delete();
        $user->delete();
        session()->flash('message', 'Berhasil menghapus kelurahan / desa');
        // return redirect()->route('district.index');
        return response()->json([
            'message' => 'Berhasil menghapus kelurahan / desa',
            'status' => 'success'
        ]);
        // session()->flash('message', 'Berhasil menghapus desa / kelurahan');
        // return redirect()->route('district.show', $ward->district_id);
        //     return back()->with('success', 'Kelurahan / Desa berhasil dihapus');
        // } catch (\Throwable $th) {
        //     //throw $th;
        //     return back()->withErrors(['delete_error' => 'Terjadi kesalahan saat menghapus post.']);
        // }
    }
}
