<?php

use App\Http\Controllers\ImageController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/login', function () {
    return Inertia::render('Login');
})->name('login');

// Route::get('/register', function () {
//     return Inertia::render('Register');
// })->name('register');

Route::post('/login', [UserController::class, 'login'])->name('post.login');
// Route::post('/register', [UserController::class, 'register'])->name('post.register');
Route::get('/logout', [UserController::class, 'logout'])->name('logout');

Route::get('/', function () {
    return Inertia::render('Landing');
})->name('landing');
Route::get('/gallery', function () {
    return Inertia::render('Gallery');
})->name('gallery');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    Route::get('/upload', function () {
        return Inertia::render('Upload');
    })->name('upload');

    Route::controller(ImageController::class)->group(function () {
        Route::get('/images', 'index')->name('images.index');
        Route::post('/images', 'store')->name('images.store');
    });
});
