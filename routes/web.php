<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\WardController;
use App\Http\Controllers\GuestController;
use App\Http\Controllers\ApplicationController;

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
});

Route::group(['middleware' => 'auth'], function () {
    Route::resource('application', ApplicationController::class);
    Route::put('/applicants/{id}', [ApplicationController::class, 'update_status'])->name('status');
    Route::get('/applicants', [ApplicationController::class, 'count'])->name('count');
    Route::resource('district',  DistrictController::class);
    Route::get('/ward/create/{ward}', [WardController::class, 'create'])->name('ward.create');
    Route::post('/ward', [WardController::class, 'store'])->name('ward.store');
    Route::get('/ward/{ward}/edit/{district}', [WardController::class, 'edit'])->name('ward.edit');
    Route::put('/ward/{ward}', [WardController::class, 'update'])->name('ward.update');
    Route::delete('/ward/{ward}', [WardController::class, 'destroy'])->name('ward.destroy');
});

Route::controller(GuestController::class)->group(function() {
  Route::get('/cek-permohonan', 'check')->name('check');
  Route::get('/applicant/{id}', 'applicant');
  Route::get('/form/{category}', 'form')->name('form');
  Route::post('/form', 'formAction')->name('form.action');
  Route::get('/uploadFile/{id}/{category}', 'uploadFile')->name('upload');
  Route::post('/uploadFile/{id}', 'uploadAction')->name('upload.action');
  Route::get('/wards/{id}', 'kelurahan');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/auth.php';
