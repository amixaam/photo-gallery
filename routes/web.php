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
        Route::get('/dashboard', function (Request $request) {
            $collections = Collection::orderBy('created_at', 'desc')->get();

            return Inertia::render('Dashboard', [
                'collections' => $collections,
            ]);
        })->name('dashboard');

        Route::get('/photo/upload', function () {
            $collectionOptions = Collection::all()->map(function ($collection) {
                return ['value' => $collection->id, 'label' => $collection->title];
            })->toArray();

            return Inertia::render('Upload', ["options" => $collectionOptions]);
        })->name('upload');
        Route::post('/photo/upload', [ImageController::class, 'upload'])->name('photo.post');
        Route::delete('/photo/mass-delete', [ImageController::class, 'massDestroy'])->name('photo.massDelete');
        Route::delete('/photo/{id}', [ImageController::class, 'destroy'])->name('photo.delete');
        Route::get('/photo/edit/{id}', [ImageController::class, 'renderEdit'])->name('photo.edit');
        // patch - modify, put - replace
        Route::patch('/collection/add/{id}/', [ImageController::class, 'AddToCollection'])->name('photo.addToCollection');
        Route::patch('/collection/remove/{id}/', [ImageController::class, 'RemoveFromCollection'])->name('photo.removeFromCollection');
        Route::patch('/photo/edit/{id}', [ImageController::class, 'update'])->name('photo.update');

        Route::get('/collection/{slug}/edit', function ($slug) {
            $collection = Collection::where('slug', $slug)->with('images')->first();
            return Inertia::render('EditCollection', ['collection' => $collection]);
        })->name('gallery.edit');
        Route::get('/collection/{slug}/pin', [CollectionController::class, 'pin'])->name('gallery.pin');
        Route::patch('/collection/{slug}/edit', [CollectionController::class, 'update'])->name('gallery.update');
        Route::get('/collection/{slug}/cover/{id}', [CollectionController::class, 'setCover'])->name('gallery.setCover');
        Route::delete('/collection/{slug}/delete', [CollectionController::class, 'destroy'])->name('gallery.delete');

        Route::get('/user/edit', function () {
            return Inertia::render('EditProfile');
        })->name('user.edit');

        Route::patch('/user/edit/username', [UserController::class, 'updateUsername'])->name('user.update.username');
        Route::patch('/user/edit/password', [UserController::class, 'updatePassword'])->name('user.update.password');
    });
