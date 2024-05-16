<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Models\Image;
use Illuminate\Http\Request;

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
            'image' => 'required|image|max:512000',
            'collection' => 'optional|exists:collections,id'
        ]);

        $path = $request->file('image')->store('images', 'public');

        $image = Image::create([
            'path' => $path,
            'title' => $request->file('image')->getClientOriginalName(),
            'alt_text' => "alt test",
        ]);

        $collection = Collection::find(1);
        $collection->images()->attach($image->id);
    }
}
