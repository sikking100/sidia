<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\WardController;
use App\Http\Controllers\GuestController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\DesaApplicationController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\HamletController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\RequirementController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Mail;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('/');

Route::post('pass-reset', [UserController::class, 'kirim_pass'])->name('pass.reset');

Route::middleware(['auth', 'role:desa'])->group(function () {
    // desa
    Route::get('/desa', [DesaApplicationController::class, 'index'])->name('desa.index');
    Route::post('/desa', [DesaApplicationController::class, 'store'])->name('desa.store');
    Route::get('/desa-years', [DesaApplicationController::class, 'get_years']);
    Route::get('/desa-paging', [DesaApplicationController::class, 'paging']);
    Route::get('/buat', [DesaApplicationController::class, 'buat'])->name('buat');
    Route::get('/desa/create/{category}', [DesaApplicationController::class, 'create'])->name('desa.create');
    Route::get('/desa/{id}', [DesaApplicationController::class, 'show'])->name('desa.show');
    Route::get('/desa/{id}/edit', [DesaApplicationController::class, 'edit'])->name('desa.edit');
    Route::put('/desa/{id}', [DesaApplicationController::class, 'update'])->name('desa.update');
    Route::put('/desa/{id}/status', [DesaApplicationController::class, 'update_status'])->name('desa.status');
    Route::resource('hamlet', HamletController::class);
    Route::get('/hamlet-paging', [HamletController::class, 'pagination']);
    Route::get('/user/{user}', [UserController::class, 'show'])->name('user.show');
    Route::put('/user/{id}/update', [UserController::class, 'updates'])->name('user.updates');
    // end desa
});


Route::middleware(['auth', 'role:superadmin'])->group(function () {
    Route::resource('application', ApplicationController::class);
    Route::get('/paging', [ApplicationController::class, 'paging']);
    Route::get('/years', [ApplicationController::class, 'get_years']);
    Route::resource('requirements', RequirementController::class);
    Route::resource('menu', MenuController::class);
    Route::get('/menu-paging', [MenuController::class, 'pagination']);
    // Route::resource('user', UserController::class);
    Route::get('/user', [UserController::class, 'index'])->name('user.index');
    Route::post('/user', [UserController::class, 'store'])->name('user.store');
    Route::get('/user/create', [UserController::class, 'create'])->name('user.create');
    Route::put('/user/{user}', [UserController::class, 'update'])->name('user.update');
    Route::get('/user/{user}/edit', [UserController::class, 'edit'])->name('user.edit');

    Route::get('/user-paging', [UserController::class, 'pagination']);


    Route::put('/regen/{id}', [UserController::class, 'user_regen'])->name('regen');
    Route::put('/applicants/{id}', [ApplicationController::class, 'update_status'])->name('status');
    Route::get('/applicants', [ApplicationController::class, 'count'])->name('count');

    Route::resource('district',  DistrictController::class);
    Route::get('/district-paging', [DistrictController::class, 'paging'])->name('district.paging');

    Route::get('/ward', [WardController::class, 'index']);
    Route::get('/ward/create/{ward}', [WardController::class, 'create'])->name('ward.create');
    Route::post('/ward', [WardController::class, 'store'])->name('ward.store');
    Route::get('/ward/{ward}/edit', [WardController::class, 'edit'])->name('ward.edit');
    Route::put('/ward/{ward}', [WardController::class, 'update'])->name('ward.update');
    Route::delete('/ward/{ward}', [WardController::class, 'destroy'])->name('ward.destroy');
    Route::get('/photo/{name}', [ApplicationController::class, 'photo'])->name('photo');
    Route::get('/download-file', [ApplicationController::class, 'downloadFile'])->name('file.download');
    Route::post('/uploadFile/{id}/berkas', [ApplicationController::class, 'uploadBerkas'])->name('upload.berkas');
    Route::get('/open-file', [ApplicationController::class, 'openFile'])->name('file.open');

    Route::put('/files/{id}', [FileController::class, 'update'])->name('files.update');
});

Route::controller(GuestController::class)->group(function () {
    Route::get('/cek-permohonan', 'check')->name('check');
    Route::get('/cek-permohonan/{id}', 'check_detail')->name('check.detail');
    Route::get('/applicant/{id}', 'applicant');
    Route::get('/form/{category}', 'form')->name('form');
    Route::post('/form', 'formAction')->name('form.action');
    Route::put('/form', 'form_update')->name('form.update');
    Route::get('/uploadFile/{id}/{category}', 'uploadFile')->name('upload');
    Route::post('/uploadFile/{id}', 'uploadAction')->name('upload.action');
    Route::get('/wards/{id}', 'kelurahan');
    Route::get('/download-file', 'downloadFile')->name('file.download');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [ApplicationController::class, 'dashboard'])->name('dashboard');
    Route::get('/dashboard-statistic', [ApplicationController::class, 'dashboard_statistic'])->name('dashboard.statistic');
});


Route::get('/test-email', function () {
    Mail::raw('Ini pesan uji coba dari Laravel via Hostinger 🚀', function ($message) {
        $message->to('sigithadiprawira@gmail.com')
            ->subject('Test Email Laravel');
    });

    return 'Email terkirim!';
});

require __DIR__ . '/auth.php';
