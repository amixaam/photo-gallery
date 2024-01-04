<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{

    public function getAllImages()
    {
        $imagePaths = Storage::files('public/images');
        return response()->json(["images" => $imagePaths]);
    }

    public function uploadImage(Request $request)
    {
        // Validate the incoming request, check if the request contains an image, etc.
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Example validation rules
            'title' => 'required|string',
            'description' => 'required|string',
            'location' => 'required|string',
            'date' => 'required|date',
        ]);

        // Store the uploaded image in the 'images' folder within the storage directory
        $imagePath = $request->file('image')->store('images', 'public');

        // You can save the $imagePath to your database along with any other image-related data

        return response()->json(['message' => 'Image uploaded successfully', 'image_path' => $imagePath]);
    }
}
