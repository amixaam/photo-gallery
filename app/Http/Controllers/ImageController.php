<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
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

    public function upload(Request $request)
    {
        $request->validate([
            'zip' => 'required|file|mimes:zip|max:512000',
            'collection_id' => 'optional|exists:collections,id'
        ]);

        if (!$request->file('zip')->isValid()) return response()->json(['message' => 'Invalid file'], 400);

        // Save the zip file to temporary storage
        $zipPath = $request->file('zip')->storeAs('temp', $request->file('zip')->getClientOriginalName());

        $zip = new ZipArchive();
        $zip->open(storage_path('app/' . $zipPath));

        // Extract and process each file in the zip
        for ($i = 0; $i < $zip->numFiles; $i++) {
            $filename = $zip->getNameIndex($i);

            // Read the file contents
            $fileContents = $zip->getFromIndex($i);

            // Save the image to storage
            $path = 'images/' . basename($filename); // Adjust the storage path as needed
            Storage::put("public/" . $path, $fileContents);

            // Create a database entry for the image
            $image = Image::create([
                'path' => $path,
                'title' => basename($filename),
                'alt_text' => 'alt test',
            ]);

            // Attach the image to the specified collection or the first collection
            if ($request->filled('collection_id')) {
                $collection = Collection::find($request->input('collection_id'));
            } else {
                $collection = Collection::first();
            }
            $collection->images()->attach($image->id);
        }

        // Close and delete the zip file
        $zip->close();
        Storage::delete($zipPath);

        // return response()->json(['message' => 'Images uploaded successfully'], 200);
    }
}
