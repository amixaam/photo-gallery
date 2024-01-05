<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\image;
use Illuminate\Support\Facades\Validator;

class ImageController extends Controller
{

    public function getAllImages()
    {
        // $csrf = csrf_token();
        // // return response()->json(["images" => $csrf]);


        $imagesWithDetails = Image::all();

        $formattedImages = $imagesWithDetails->map(function ($image) {
            return [
                'image_url' => asset("storage/$image->imageURL"),
                'picture_data' => [
                    'title' => $image->title,
                    'description' => $image->description,
                ]
            ];
        });

        return response()->json(['images' => $formattedImages]);
    }

    public function getImage($filename)
    {

        $path = storage_path('app/public/images/' . $filename);

        if (!file_exists($path)) {
            abort(404);
        }

        $picture = Image::where('imageURL', 'images/' . $filename)->first();

        return response()->json([
            'image_url' => asset("storage/images/$filename"),
            'picture_data' => [
                'title' => $picture->title,
                'description' => $picture->description,
            ]
        ]);
    }

    // public function uploadImage(Request $request)
    // {
    //     // Validate the incoming request, check if the request contains an image, etc.
    //     $request->validate([
    //         'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Example validation rules
    //         'title' => 'required|string',
    //         'description' => 'nullable|string',
    //         'location' => 'nullable|string',
    //         'date' => 'nullable|date',
    //     ]);

    //     // Store the uploaded image in the 'images' folder within the storage directory
    //     $imagePath = $request->file('image')->store('images', 'public');

    //     // Create a new photo instance and set its properties
    //     $photo = new Image();
    //     $photo->title = $request->input('title');
    //     $photo->description = $request->input('description') ?: "No description provided."; // Set default if empty or null
    //     $photo->imageURL = $imagePath; // Assuming imageURL is the path to the image
    //     $photo->location = $request->input('location') ?: "No location provided."; // Set default if empty or null
    //     $photo->date = $request->input('date');

    //     // Save the photo details to the database
    //     $photo->save();

    //     // You can save the $imagePath to your database along with any other image-related data

    //     return response()->json(['message' => 'Image uploaded successfully', 'image_path' => $imagePath]);
    // }
    public function uploadImage(Request $request)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:15000', // 15 MB max size (in kb)
            'title' => 'required|string',
            'description' => 'nullable|string',
            'location' => 'nullable|string',
            'date' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422); // Unprocessable Entity
        }

        try {
            // Store the uploaded image in the 'images' folder within the storage directory
            $imagePath = $request->file('image')->store('images', 'public');

            // Create a new photo instance and set its properties
            $photo = new Image();
            $photo->title = $request->input('title');
            $photo->description = $request->input('description') ?: "No description provided.";
            $photo->imageURL = $imagePath;
            $photo->location = $request->input('location') ?: "No location provided.";
            $photo->date = $request->input('date');

            // Save the photo details to the database
            $photo->save();

            return response()->json(['message' => 'Image uploaded successfully', 'image_path' => $imagePath]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to upload image.'], 500); // Internal Server Error
        }
    }
}
