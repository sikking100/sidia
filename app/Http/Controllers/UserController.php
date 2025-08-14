<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

use function App\Support\generateStrongPassword;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::where('role', 'desa')->with('ddesa')->paginate(10, ['*'], 'page', 1);
        return Inertia::render('Admin/User/Index', [
            'users' => $users->items(),
            'meta' => [
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
                'per_page' => $users->perPage(),
                'total' => $users->total(),
            ],
        ]);
    }

    public function pagination(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $page = $request->input('page', 1);
        $query = User::query();
        $query->where('role', 'desa');
        if ($request->has('d') && !empty($request->d)) {
            $query->where('name', 'like', '%' . $request->d . '%');
        }
        $users = $query->with('ddesa')->paginate($perPage, ['*'], 'page', $page);
        return response()->json([
            'users' => $users->items(),
            'meta' => [
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
                'per_page' => $users->perPage(),
                'total' => $users->total(),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Admin/User/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserRequest $request)
    {
        $user = User::make($request->all());
        $user->role = 'desa';
        $user->password = bcrypt(generateStrongPassword(6));
        $user->save();
        session()->flash('message', 'Data berhasil disimpan');
        return redirect()->route('user.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        return Inertia::render('Admin/User/Edit', compact('user'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(UserRequest $request, User $user)
    {
        $user->save();
        session()->flash('message', 'Data berhasil diubah');
        return redirect()->route('user.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $pass = generateStrongPassword(6);
        $user->password = bcrypt($pass);
        $user->save();
        session()->flash('message', "Password berhasil digenerate ulang = $pass");
        return redirect()->route('user.index');
    }

    public function user_regen($id)
    {
        $user = User::findOrFail($id);
        $pass = generateStrongPassword(6);
        $user->password = bcrypt($pass);
        $user->save();
        session()->flash('message', "Password berhasil digenerate ulang = $pass");
        return response()->json([
            'password' => $pass
        ]);
    }
}
