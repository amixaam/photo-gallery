<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use App\Http\Controllers\ImageController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/image', [ImageController::class, 'getImage']);
Route::get('/images', [ImageController::class, 'getGalleryData']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/images/upload', [ImageController::class, 'uploadImage']);
});

Route::post('/login', [AuthController::class, 'login']);
