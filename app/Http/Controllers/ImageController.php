<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Symfony\Component\ErrorHandler\Debug;
use ZipArchive;

class ImageController extends Controller
{
    public function getByCollection($id)
    {
        $collection = Collection::findOrFail($id);

        $images = $collection->images;
        $images = Image::find($images);
        return $images;
    }

    public function renderEdit($id)
    {
        $image = Image::find($id);

        return Inertia::render('EditPhoto', ["image" => $image]);
    }

    public function destroy($id)
    {
        $image = Image::find($id);

        if (!$image) {
            return back()->withErrors([
                'error' => 'Image not found.',
            ]);
        }

        $collection = $image->collection->first();

        if (!$collection) {
            return back()->withErrors([
                'error' => 'Collection not found.',
            ]);
        }

        $images = $collection->images->keyBy('id');
        $nextImage = $images->where('id', '>', $id)->first();

        // if it's the last image in the collection, get the previous image
        if (!$nextImage) {
            $nextImage = $images->where('id', '<', $id)->sortByDesc('id')->first();
            // if still null, will get redirected by the CollectionController
        }

        try {
            $filePath = 'public/storage/' . $image->path;
            if (Storage::exists($filePath)) Storage::delete($filePath);
            $image->delete();

            return redirect(route('photo', ['slug' => $collection->slug, 'id' => $nextImage->id]))->with('error', 'Image deleted successfully.');
        } catch (\Exception $e) {
            return back()->withErrors([
                'error' => 'An error occurred while deleting the image.',
            ]);
        }
    }

    public function upload(Request $request)
    {

        $request->validate([
            'zip' => 'required|file|mimes:zip|max:1024000',
            'collection' => 'nullable|string',
            'massAssignValues' => 'nullable|string',
            'specificValues' => 'nullable|string',
        ]);

        $massAssignValues = json_decode($request->input('massAssignValues'), true);
        $specificValues = json_decode($request->input('specificValues'), true);

        Log::debug("massAssignValues: " . print_r($massAssignValues, true));
        Log::debug("specificValues: " . print_r($specificValues, true));

        if (!$request->file('zip')->isValid()) return response()->json(['message' => 'Invalid file'], 400);

        // Save the zip file to temporary storage
        $zipPath = $request->file('zip')->storeAs('temp', $request->file('zip')->getClientOriginalName());

        $zip = new ZipArchive();
        $zip->open(storage_path('app/' . $zipPath));

        // handle default collection and create new collection
        if ($request->filled('collection')) {
            // if is numeric, then it should be an id
            if (is_numeric($request->input('collection'))) {
                $collection = Collection::find($request->input('collection'));

                // if collection was numeric, but didnt match any id's
                // the user must have intended to create a new collection with a number as title
                if (!$collection) {
                    $collection = Collection::create([
                        'title' => $request->input('collection'),
                    ]);
                }
            } else {
                // if anything else, create a collection
                $collection = Collection::create([
                    'title' => $request->input('collection'),
                ]);
            }
        } else {
            // Defaults to Misc. collection
            $collection = Collection::first();
        }

        // Extract and process each file in the zip
        for ($i = 0; $i < $zip->numFiles; $i++) {
            $filename = $zip->getNameIndex($i);

            if (isset($specificValues[$filename])) {
                Log::debug("Setting specific values for {$filename}: " . print_r($specificValues[$filename], true));
            } else {
                Log::debug("Nope {$filename}: ");
            }

            // Read the file contents
            $fileContents = $zip->getFromIndex($i);

            // Save the image to storage
            $path = 'images/' . basename($filename); // Adjust the storage path as needed
            Storage::put("public/" . $path, $fileContents);

            // Create a database entry for the image
            $image = Image::create([
                'path' => $path,
                'title' => $filename,
                'alt_text' => $specificValues[$filename]['title'] ?? $filename,
                'location' => $specificValues[$filename]['location'] ?? $massAssignValues['location'] ?? null,
                'time' => $specificValues[$filename]['time'] ?? $massAssignValues['time'] ?? null,
            ]);

            // Attach the image to the specified collection or the first collection
            $collection->images()->attach($image->id);
        }

        // Close and delete the zip file
        $zip->close();
        Storage::delete($zipPath);
    }
}
