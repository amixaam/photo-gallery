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
        $collections = Collection::where('is_public', true)
            ->has('images')
            ->with('images')
            ->orderBy('created_at', 'desc')
            ->withCount('images')
            ->get();

        // Transform collections to set cover_path if null
        $collections = $collections->map(function ($collection) {
            if (is_null($collection->cover_path) && $collection->images->isNotEmpty()) {
                $collection->cover_path = $collection->images->first()->path;
            }

            // Remove the images relationship from the final output
            $collection->unsetRelation('images');
            return $collection;
        });

        // Feature a new collection that has been created in the last 7 days, if there are none, then feature the featured collection
        $featuredCollection = $collections->where('created_at', '>=', now()->subDays(7))->first();
        $reason = 'newly_created';
        if (is_null($featuredCollection)) {
            $featuredCollection = $collections->where('is_featured', true)->first();
            $reason = 'featured';
        }

        return Inertia::render('Collections', [
            'collections' => $collections,
            'featured_collection' => [
                'collection' => $featuredCollection,
                'reason' => $reason
            ]
        ]);
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
