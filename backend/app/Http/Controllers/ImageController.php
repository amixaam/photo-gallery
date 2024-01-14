<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Imagick\Driver;
use Intervention\Image\Encoders\JpegEncoder;


use App\Models\Photo as PhotoTable;

class ImageController extends Controller
{

    public function getAllImages()
    {
        // $csrf = csrf_token();
        // return response()->json(["token" => $csrf]);

        $imagesWithDetails = PhotoTable::all();
        $formattedImages = $imagesWithDetails->map(function ($image) {
            return [
                'thumbnail' => asset("storage/$image->thumbnailURL"),
                'filename' => basename($image->thumbnailURL),
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

        $picture = PhotoTable::where('imageURL', 'images/' . $filename)->first();

        return response()->json([
            'image_url' => asset("storage/images/$filename"),
            'picture_data' => [
                'title' => $picture->title,
                'description' => $picture->description,
                'location' => $picture->location,
                'date' => $picture->date,
            ]
        ]);
    }

    public function uploadImage(Request $request)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:20000', // 20 MB max size (in kb)
            'title' => 'required|string',
            'description' => 'nullable|string',
            'location' => 'nullable|string',
            'date' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422); // Unprocessable Entity
        }


        try {
            //full-res
            $imagePath = $request->file('image')->store('images', 'public');

            //thumbnails
            $manager = ImageManager::withDriver(new Driver());
            $image = $manager->read($request->file('image'));
            $resize = $image->scaleDown(height: 400)->encode(new JpegEncoder());
            $thumbnailPath = storage_path('app/public/thumbnails/' . $request->file('image')->hashName());
            $resize->save($thumbnailPath);

            $shortThumbnailPath = 'thumbnails/' . $request->file('image')->hashName();

            //saving to table
            $photo = new PhotoTable();
            $photo->title = $request->input('title') ?: "No title provided.";
            $photo->description = $request->input('description') ?: "No description provided.";
            $photo->imageURL = $imagePath;
            $photo->thumbnailURL = $shortThumbnailPath;
            $photo->location = $request->input('location') ?: "No location provided.";
            $photo->date = $request->input('date');

            $photo->save();

            return response()->json(['message' => 'Image uploaded successfully', 'image_path' => $imagePath, 'thumbnail_path' => $shortThumbnailPath]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500); // Internal Server Error
        }
    }
}
