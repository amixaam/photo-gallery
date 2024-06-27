<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Models\Image;
use Carbon\Carbon;
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
        $image = Image::with('collection:id,title,slug,cover_path')->find($id);

        if (!$image) {
            return back()->withErrors([
                'error' => 'Image not found.',
            ]);
        }

        foreach ($image->collection as $collection) {
            // if theres not a cover_path set
            if (is_null($collection->cover_path)) {
                $collectionSource = Collection::find($collection->id);
                $collection->cover_path = $collectionSource->images->first()->path;
            }
        }

        return Inertia::render('EditPhoto', ["image" => $image]);
    }

    public function update(Request $request, $id)
    {
        $image = Image::find($id);

        if (!$image) {
            return back()->withErrors([
                'error' => 'Image not found.',
            ]);
        }

        $image->update($request->all());

        return back();
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

            return redirect(route('photo', ['slug' => $collection->slug, 'id' => $nextImage->id]));
        } catch (\Exception $e) {
            return back()->withErrors([
                'error' => 'An error occurred while deleting the image.',
            ]);
        }
    }

    public function upload(Request $request)
    {
        $validator = $request->validate([
            'zip' => 'required|file|mimes:zip|max:1024000',
            'collection' => 'nullable|string',
            'location' => 'nullable|string',
            'time' => 'nullable|string',
            'specificValues' => 'nullable|json',
        ]);

        if (!$request->file('zip')->isValid()) return back()->withErrors(['error' => 'Invalid zip file.']);

        // Save the zip file to temporary storage
        $zipPath = $request->file('zip')->storeAs('temp', $request->file('zip')->getClientOriginalName());

        $zip = new ZipArchive();
        $zip->open(storage_path('app/' . $zipPath));


        // ----------- Handle default collection and create new collection
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
                // check if it already exists
                $collection = Collection::find($request->input('collection'));

                // if anything else, create a collection
                if (!$collection) {
                    $collection = Collection::create([
                        'title' => $request->input('collection'),
                    ]);
                }
            }
        } else {
            // Defaults to Misc. collection
            $collection = Collection::first();
        }


        // specificValues: {"PXL_20230923_163109859.jpg":{"title":"test","location":"","time":""}}...
        $specificValues = json_decode($request->input('specificValues') ?? '{}', true);


        // ----------- Extract and process each file in the zip
        for ($i = 0; $i < $zip->numFiles; $i++) {
            $filename = $zip->getNameIndex($i, ZipArchive::FL_UNCHANGED);

            $title = null;
            $location = null;
            $time = null;

            if (array_key_exists($filename, $specificValues)) {
                $title = $specificValues[$filename]['title'] ?? $specificValues[$filename]['title'] ?? $filename;
                $location = $specificValues[$filename]['location'] ?? $specificValues[$filename]['location'] ?? $request->input('location');
                $time = $specificValues[$filename]['time'] ?? $specificValues[$filename]['time'] ?? $request->input('time');
            } else {
                $title = $filename;
                $location = $request->input('location');
                $time = $request->input('time');
            }

            $location = $location == "" ? null : $location;
            $time = $time == "" ? null : $time;


            $fileContents = $zip->getFromIndex($i);

            $timestampedFilename = Carbon::now()->timestamp . '_' . basename($filename);
            Log::info('Uploading image: ' . $timestampedFilename);
            $path = 'images/' . $timestampedFilename;
            Storage::put("public/" . $path, $fileContents);

            $image = Image::create([
                'path' => $path,
                'original_filename' => $filename,
                'title' => $title,
                'alt_text' => $title,
                'location' => $location,
                'time' => $time,
            ]);

            $collection->images()->attach($image->id);
        }

        // Close and delete the zip file
        $zip->close();
        Storage::delete($zipPath);

        return back()->with('success', 'Images uploaded successfully.');
    }
}
