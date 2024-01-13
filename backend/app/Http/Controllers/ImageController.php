<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use intervention\Image\Image;

use App\Models\image as ImageModel;
use Illuminate\Support\Facades\Validator;

class ImageController extends Controller
{

    public function getAllImages()
    {
        $csrf = csrf_token();
        return response()->json(["token" => $csrf]);


        $imagesWithDetails = ImageModel::all();

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

        $picture = ImageModel::where('imageURL', 'images/' . $filename)->first();

        return response()->json([
            'image_url' => asset("storage/images/$filename"),
            'picture_data' => [
                'title' => $picture->title,
                'description' => $picture->description,
            ]
        ]);
    }

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
            $imagePath = $request->file('image')->store('images', 'public');

            // // thumbnail creation
            // $lowResImagePath = "";

            // Read the uploaded image
            $manager = new ImageManager(new Driver());
            $image = $manager->read($request->file('image'));

            // Generate a low-resolution image
            $lowResImage = $image->resizeDown(null, 400);

            // Save the low-resolution image to storage
            $lowResImagePath = 'thumbnails/' . $request->file('image')->hashName();
            // Storage::put($lowResImagePath, (string) $lowResImage->encode('png', 100));
            // Save the high-resolution image to storage
            $imagePath = 'images/' . $request->file('image')->hashName();
            // Storage::put($imagePath, (string) $image->encode());


            // $photo = new ImageModel();
            // $photo->title = $request->input('title');
            // $photo->description = $request->input('description') ?: "No description provided.";
            // $photo->imageURL = $imagePath;
            // $photo->thumbnailURL = $lowResImagePath;
            // $photo->location = $request->input('location') ?: "No location provided.";
            // $photo->date = $request->input('date');

            // $photo->save();

            return response()->json(['message' => 'Image uploaded successfully', 'image_path' => $imagePath, 'thumbnail_path' => $lowResImagePath]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to upload image.'], 500); // Internal Server Error
        }
    }
}
