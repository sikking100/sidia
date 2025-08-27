<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request, $role = 'superadmin'): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
            'role' => $role,
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {

        $credentials = $request->only('email', 'password');
        if ($request->role === 'superadmin') {
            // Hanya superadmin yang boleh login
            $canLogin = Auth::attempt(array_merge($credentials, ['role' => 'superadmin']));
        } elseif ($request->role === 'desa') {
            // Boleh role desa atau bpjs
            $canLogin = Auth::attempt(array_merge($credentials, ['role' => 'desa']))
                || Auth::attempt(array_merge($credentials, ['role' => 'bpjs']));
        } else {
            $canLogin = false;
        }
        if ($canLogin) {
            $request->authenticate();
            $request->session()->regenerate();
            if (Auth::user()->role == 'bpjs') {
                return redirect()->intended(route('bpjs.index', absolute: false));
            }
            return redirect()->intended(route('dashboard', absolute: false));
        }
        return back()->withErrors(['email' => 'Email atau password salah, atau bukan akun ' . $request->role . '.']);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('home');
    }
}
