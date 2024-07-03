<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Models\Image;
use Bepsvpt\Blurhash\Facades\BlurHash;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
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
        $image = Image::with('collection:id,title,slug,cover_path,cover_blurhash')->find($id);

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

        $collectionOptions = Collection::whereNotIn('id', $image->collection->pluck('id'))->orderBy('created_at', 'desc')->get()->map(function ($collection) {
            return ['value' => $collection->id, 'label' => $collection->title];
        })->toArray();

        return Inertia::render('EditPhoto', ["image" => $image, "options" => $collectionOptions]);
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

        if (str_contains($image->path, 'premade/')) return back()->withErrors(['error' => 'You cannot delete premade images.']);

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
            if (Storage::exists("public/" . $image->path)) Storage::delete("public/" . $image->path);
            $image->delete();

            return redirect(route('photo', ['slug' => $collection->slug, 'id' => $nextImage->id]));
        } catch (\Exception $e) {
            return back()->withErrors([
                'error' => 'An error occurred while deleting the image.',
            ]);
        }
    }

    public function massDestroy(Request $request)
    {
        $validator = $request->validate([
            'images' => 'required|array',
        ]);

        foreach ($request->all() as $id) {
            $image = Image::find($id);

            if ($image) {
                if (str_contains($image->path, 'premade/')) return back()->withErrors(['error' => 'You cannot delete premade images.']);

                if (Storage::exists("public/" . $image->path)) Storage::delete("public/" . $image->path);
                $image->delete();
            }
        }

        return back();
    }

    public function upload(Request $request)
    {
        $validator = $request->validate([
            'zip' => 'required|file|mimes:zip|max:1024000',
            'collection' => 'nullable|string',
            'location' => 'nullable|string',
            'time' => 'nullable|string',
            'specificValues' => 'nullable|array',
        ]);

        if (!$request->file('zip')->isValid()) return back()->withErrors(['error' => 'Invalid zip file.']);

        // Save the zip file to temporary storage
        $zipPath = $request->file('zip')->storeAs('temp', $request->file('zip')->getClientOriginalName());

        $zip = new ZipArchive();
        $zip->open(storage_path('app/' . $zipPath));


        $createdCollection = false;
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
                    $createdCollection = true;
                }
            } else {
                // check if it already exists
                $collection = Collection::find($request->input('collection'));

                // if anything else, create a collection
                if (!$collection) {
                    $collection = Collection::create([
                        'title' => $request->input('collection'),
                    ]);
                    $createdCollection = true;
                }
            }
        } else {
            // Defaults to Misc. collection
            $collection = Collection::first();
        }


        // specificValues: {"PXL_20230923_163109859.jpg":{"title":"test","location":"","time":""}}...
        $specificValues = $request->input('specificValues');


        // ----------- Extract and process each file in the zip
        for ($i = 0; $i < $zip->numFiles; $i++) {
            $filename = $zip->getNameIndex($i, ZipArchive::FL_UNCHANGED);

            $title = null;
            $location = null;
            $time = null;


            if ($specificValues != null && array_key_exists($filename, $specificValues)) {
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

            $blurhash = BlurHash::encode(Storage::path("public/" . $path));

            if ($createdCollection && $collection->cover_path == null) {
                $collection->cover_path = $path;
                $collection->cover_blurhash = $blurhash;
                $collection->save();

                $createdCollection = false;
            }

            $image = Image::create([
                'path' => $path,
                'original_filename' => $filename,
                'title' => $title,
                'alt_text' => $title,
                'location' => $location,
                'time' => $time,
                'blurhash' => $blurhash,
            ]);

            $collection->images()->attach($image->id);
        }

        // Close and delete the zip file
        $zip->close();
        Storage::delete($zipPath);

        return back()->with('success', 'Images uploaded successfully.');
    }

    public function AddToCollection(Request $request, $id)
    {
        $validate = $request->validate([
            'collection' => 'required|exists:collections,id',
        ]);

        $image = Image::find($id);
        $collection = Collection::find($request->input('collection'));

        if ($collection->images->contains($image)) {
            return back()->withErrors(['error' => 'Image is already in this collection!']);
        }

        $collection->images()->attach($image->id);
        return back();
    }

    public function RemoveFromCollection(Request $request, $id)
    {
        $validate = $request->validate([
            'collection' => 'required|exists:collections,id',
        ]);

        $image = Image::find($id);
        $collection = Collection::find($request->input('collection'));

        if (!$collection->images->contains($image)) {
            return back()->withErrors(['error' => 'Image is not in this collection!']);
        }

        $collection->images()->detach($image->id);
        return back();
    }
}
