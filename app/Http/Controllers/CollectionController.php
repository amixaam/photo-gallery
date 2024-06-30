<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
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
                $collection->cover_blurhash = $collection->images->first()->blurhash;
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

    public function pin($slug)
    {
        $collection = Collection::where('slug', $slug)->first();

        if ($collection) {
            $collection->is_featured = !$collection->is_featured;
            $collection->save();
        }

        return back()->with('success', 'Collection pinned/unpinned successfully!');
    }


    public function SingleCollection(Request $request, $slug)
    {
        if (auth()->check()) {
            $collection = Collection::where('slug', $slug)->with('images')->first();
        } else {
            $collection = Collection::where('slug', $slug)->where('is_public', true)->with('images')->first();
        }

        // must not exist or is not public
        if (!$collection) {
            return redirect(route('landing'));
        }

        return Inertia::render('Gallery', [
            'collection' => $collection,
        ]);
    }

    public function ShowImage(Request $request, $slug, $id)
    {
        $collection = Collection::where('slug', $slug)->with('images:id')->firstOrFail();
        $image = Image::find($id);

        if (!$image) {
            return redirect(route('gallery', ['slug' => $slug]));
        }

        return Inertia::render('Photo', [
            'collection' => ['title' => $collection['title'], 'slug' => $collection['slug'], 'images' => $collection['images']],
            'image' => $image
        ]);
    }

    public function update(Request $request, $slug)
    {
        $collection = Collection::where('slug', $slug)->first();

        if (!$collection) {
            return back()->withErrors([
                'error' => 'Collcetion not found.',
            ]);
        }

        $collection->update($request->all());

        return back();
    }

    public function setCover($slug, $id)
    {
        $collection = Collection::where('slug', $slug)->first();

        if (!$collection) {
            return back()->withErrors([
                'error' => 'Collcetion not found.',
            ]);
        }

        $image = Image::find($id);

        if (!$image) {
            return back()->withErrors([
                'error' => 'Image not found.',
            ]);
        }

        $collection->update(['cover_path' => $image->path, 'cover_blurhash' => $image->blurhash]);

        return back();
    }

    public function destroy($slug)
    {
        $collection = Collection::where('slug', $slug)->first();

        if (!$collection) {
            return back()->withErrors([
                'error' => 'Collcetion not found.',
            ]);
        }

        foreach ($collection->images as $image) {
            $image->delete();
            if (str_contains($image->path, 'premade/')) continue;

            // Check if the image is only in this collection
            if ($image->collection->count() <= 1) {
                Log::info('Deleting image ' . $image->path);
                if (Storage::exists("public/" . $image->path)) Storage::delete("public/" . $image->path);
            }
        }

        $collection->delete();

        return redirect(route('dashboard'));
    }
}
