<?php

use App\Http\Controllers\ImageController;
use App\Http\Controllers\UserController;
use App\Models\Collection;
use App\Models\Image;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

Route::get('/login', function () {
    return Inertia::render('Login');
})->name('login');

// Route::get('/register', function () {
//     return Inertia::render('Register');
// })->name('register');
// Route::post('/register', [UserController::class, 'register'])->name('post.register');

Route::post('/login', [UserController::class, 'login'])->name('post.login');
Route::get('/logout', [UserController::class, 'logout'])->name('logout');

Route::get('/', function () {
    return Inertia::render('Landing');
})->name('landing');

Route::get('/collections', function () {
    $collections = Collection::withCount('images')->get();
    return Inertia::render('Collections', ['collections' => $collections]);
})->name('collections');

Route::get('/collections/{slug}', function (Request $request, $slug) {
    $collection = Collection::where('slug', $slug)->with('images')->firstOrFail();

    // Check if the 'img' query parameter is present in the URL
    $selectedImage = null;
    if ($request->has('i')) {
        $imageId = $request->input('i');
        $selectedImage = Image::find($imageId);
    }

    return Inertia::render('Gallery', [
        'collection' => $collection,
        'selectedImage' => $selectedImage,
    ]);
})->name('gallery');


Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    Route::get('/upload', function () {
        return Inertia::render('Upload');
    })->name('upload');
});
Route::controller(ImageController::class)->group(function () {
    Route::post('/upload', 'upload')->name('upload.post');
});
