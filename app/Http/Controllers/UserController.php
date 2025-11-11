<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

use function App\Support\generateStrongPassword;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = $request->search;
        $perPage = $request->get('per_page', 10);
        $q = User::query();
        if ($query != null && $query != '') {
            if (is_numeric($query)) {
                $q->where('phone', $query);
            } else {
                $q->where(function ($sub) use ($query) {
                    $sub->where('name', 'LIKE', "%{$query}%")
                        ->orWhereHas('ddesa', function ($q2) use ($query) {
                            // sesuaikan nama kolom di tabel wards
                            $q2->where('name', 'LIKE', "%{$query}%");
                        });
                });
            }
        }
        $q->whereIn('role', ['desa', 'bpjs']);
        $users = $q->with('ddesa')->paginate($perPage)
            ->onEachSide(1)
            ->appends($request->all());
        return Inertia::render('admin/pengguna/index', [
            'users' => $users,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/pengguna/create');
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = User::make($request->all());
        $user->role = $request->role;
        $user->password = bcrypt(generateStrongPassword(6));
        $user->phone = $request->phone;
        $user->save();

        return redirect()->route('user.index')->with('message', 'Data berhasil disimpan');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return Inertia::render('admin/pengguna/show', compact('user'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('admin/pengguna/edit', compact('user'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->save();

        return redirect()->route('user.index')->with('message', 'Data berhasil diubah');
    }

    public function updates(Request $request, $id)
    {
        $user = User::find($id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        if ($request->password != null) {
            $user->password = bcrypt($request->password);
        }
        $user->save();
        if ($user->role == 'desa') {
            return back()->with('message', 'Data berhasil diubah');
        }
        return redirect()->route('user.index')->with('message', 'Data berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }

    public function regen($id)
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

    public function kirim_pass(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if ($user == null) {
            throw ValidationException::withMessages([
                'email' => ['email tidak tidak terkait dengan akun apapun'],
            ]);
        }
        $pass = generateStrongPassword(6);
        $user->password = bcrypt($pass);
        $user->save();

        Mail::html('Ini adalah password terbaru Anda <strong>' . $pass . '</strong>.  Silakan untuk mengubah password tersebut setelah Anda login.', function ($message) use ($request) {
            $message->to($request->email)
                ->subject('Password baru');
        });

        return back()->with('status', __('Silakan cek email Anda'));
    }

    public function bpjs($id)
    {
        $user = User::find($id);
        return Inertia::render('admin/bpjs/user', compact('user'));
    }

    public function bpjs_update(Request $request, $id)
    {
        $user = User::find($id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        if ($request->password != null) {
            $user->password = bcrypt($request->password);
        }
        $user->save();
        if ($user->role == 'bpjs') {
            return back()->with('message', 'Data berhasil diubah');
        }
        return redirect()->route('user.index')->with('message', 'Data berhasil diubah');
    }
}
