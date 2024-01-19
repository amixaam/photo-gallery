<?php

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/images', [ImageController::class, 'getGalleryData']);
Route::get('/image', [ImageController::class, 'getImage']);
Route::get('/dir', [ImageController::class, 'getAllFolders']);
Route::post('/images/upload', [ImageController::class, 'uploadImage']);
