<?php

use App\Http\Controllers\ApplicationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Broadcast::routes(['middleware' => ['auth:sanctum']]);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth');

Route::post('/ticket', [ApplicationController::class, 'store']);
Route::post('/ticketupdate', [ApplicationController::class, 'updateApi']);
