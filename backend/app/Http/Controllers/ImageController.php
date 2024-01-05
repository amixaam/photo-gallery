<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\image;

class ImageController extends Controller
{

    public function getAllImages()
    {
        // $csrf = csrf_token();
        // // return response()->json(["images" => $csrf]);

        // Fetch all images from the database with associated data
        $imagesWithDetails = Image::all(); // Or use any suitable query to fetch images with data

        // Format the response to include image URL and associated data for each image
        $formattedImages = $imagesWithDetails->map(function ($image) {
            return [
                'image_url' => asset("storage/$image->imageURL"), // Adjust this based on your URL structure
                'picture_data' => [
                    'title' => $image->title,
                    'description' => $image->description,
                    // Add other fields as needed
                ]
            ];
        });

        // Return the formatted data as a JSON response
        return response()->json(['images' => $formattedImages]);
    }

    public function getImage($filename)
    {
        // $path = storage_path('app/public/images/' . $filename);
        // // $picture = Image::where('imageURL', 'images/' . $filename)->first();

        // if (!file_exists($path)) {
        //     abort(404);
        // }

        // return response()->file($path);
        // // if (!$picture) {
        // //     abort(404);
        // // }

        // // return response()->json([
        // //     'image_url' => asset("storage/$picture->imageURL"),
        // //     'picture_data' => [
        // //         'title' => $picture->title,
        // //         'description' => $picture->description,
        // //     ]
        // // ]);

        $path = storage_path('app/public/images/' . $filename);

        if (!file_exists($path)) {
            abort(404);
        }

        // Fetch picture data from the database based on the filename or any other criteria
        $picture = Image::where('imageURL', 'images/' . $filename)->first();

        return response()->json([
            'image_url' => asset("storage/images/$filename"),
            'picture_data' => [
                'title' => $picture->title,
                'description' => $picture->description,
                // Add other fields as needed
            ]
        ]);
    }

    public function uploadImage(Request $request)
    {
        // Validate the incoming request, check if the request contains an image, etc.
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Example validation rules
            'title' => 'required|string',
            'description' => 'nullable|string',
            'location' => 'nullable|string',
            'date' => 'nullable|date',
        ]);

        // Store the uploaded image in the 'images' folder within the storage directory
        $imagePath = $request->file('image')->store('images', 'public');

        // Create a new photo instance and set its properties
        $photo = new Image();
        $photo->title = $request->input('title');
        $photo->description = $request->input('description') ?: "No description provided."; // Set default if empty or null
        $photo->imageURL = $imagePath; // Assuming imageURL is the path to the image
        $photo->location = $request->input('location') ?: "No location provided."; // Set default if empty or null
        $photo->date = $request->input('date');

        // Save the photo details to the database
        $photo->save();

        // You can save the $imagePath to your database along with any other image-related data

        return response()->json(['message' => 'Image uploaded successfully', 'image_path' => $imagePath]);
    }
}
