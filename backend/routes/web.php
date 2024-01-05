<?php

use App\Http\Controllers\ImageController;
use App\Http\Middleware\CorsMiddleware;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::middleware([CorsMiddleware::class])->group(function () {
    Route::get('/images', [ImageController::class, 'getAllImages']);
    Route::get('/images/{filename}', [ImageController::class, 'getImage']);
    Route::post('/images/upload', [ImageController::class, 'uploadImage']);
});
