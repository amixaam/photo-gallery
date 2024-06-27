    <?php

    use App\Http\Controllers\CollectionController;
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

    Route::post('/login', [UserController::class, 'login'])->name('post.login');
    Route::get('/logout', [UserController::class, 'logout'])->name('logout');

    // Route::get('/register', function () {
    //     return Inertia::render('Register');
    // })->name('register');
    // Route::post('/register', [UserController::class, 'register'])->name('post.register');

    Route::get('/', function () {
        return Inertia::render('Landing', [
            'collection' => Collection::where('slug', 'my-best-work')->with('images')->first(),
        ]);
    })->name('landing');

    // Collections
    Route::get('/collections', [CollectionController::class, 'Index'])->name('collections');
    // Single Collection
    Route::get('/collection/{slug}', [CollectionController::class, 'SingleCollection'])->name('gallery');
    // Image
    Route::get('/collection/{slug}/photo/{id}', [CollectionController::class, 'ShowImage'])->name('photo');

    // Admin
    Route::middleware('auth')->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('Dashboard');
        })->name('dashboard');
        Route::get('/photo/upload', function () {
            $collectionOptions = Collection::all()->map(function ($collection) {
                return ['value' => $collection->id, 'label' => $collection->title];
            })->toArray();

            return Inertia::render('Upload', ["options" => $collectionOptions]);
        })->name('upload');
        Route::post('/photo/upload', [ImageController::class, 'upload'])->name('upload.post');
        Route::delete('/photo/{id}', [ImageController::class, 'destroy'])->name('photo.delete');
        Route::get('/photo/edit/{id}', [ImageController::class, 'renderEdit'])->name('photo.edit');
        // patch - modify, put - replace
        Route::patch('/photo/edit/{id}', [ImageController::class, 'update'])->name('photo.update');

        Route::get('/collections/edit', function () {
            return Inertia::render('EditCollections');
        })->name('collections.edit');
    });
