<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Models\Image;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CollectionController extends Controller
{
    public function Index()
    {
        // Eager load images for each collection
        $collections = Collection::where('is_public', true)->with('images')->withCount('images')->get();

        // Transform collections to set cover_path if null
        $collections = $collections->map(function ($collection) {
            if (is_null($collection->cover_path) && $collection->images->isNotEmpty()) {
                $collection->cover_path = $collection->images->first()->path;
            }

            // Remove the images relationship from the final output
            $collection->unsetRelation('images');
            return $collection;
        });

        return Inertia::render('Collections', ['collections' => $collections]);
    }



    public function SingleCollection(Request $request, $slug)
    {
        $collection = Collection::where('slug', $slug)->with('images')->firstOrFail();

        // Check if the request has the 'i' query parameter, to check if the user has selected an image
        $selectedImage = null;
        if ($request->has('i')) {
            $imageId = $request->input('i');
            $selectedImage = Image::find($imageId);
        }

        return Inertia::render('Gallery', [
            'collection' => $collection,
            'selectedImage' => $selectedImage,
        ]);
    }
}
