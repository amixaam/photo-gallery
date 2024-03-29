<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Imagick\Driver;
use Intervention\Image\Encoders\JpegEncoder;
use Illuminate\Support\Facades\File;

use App\Models\Photo as PhotoTable;

class ImageController extends Controller
{
    public function getGalleryData()
    {
        $imagesWithDetails = PhotoTable::all();
        $formattedImages = $imagesWithDetails->map(function ($image) {
            return [
                'thumbnail' => asset("storage/$image->thumbnailURL"),
                'filename' => basename($image->thumbnailURL),
                'folder' => $image->folder,
            ];
        });

        $mainFolderPath = 'images';

        $folders = Storage::disk('public')->directories($mainFolderPath);

        $folderNames = array_map(function ($folderPath) use ($mainFolderPath) {
            return str_replace($mainFolderPath . '/', '', $folderPath);
        }, $folders);

        return response()->json(['images' => $formattedImages, 'folders' => $folderNames]);
    }

    public function getMoreInfoThumbnail()
    {
        $imagesWithDetails = PhotoTable::all();
        $formattedImages = $imagesWithDetails->map(function ($image) {
            return [
                'thumbnail' => asset("storage/$image->thumbnailURL"),
                'filename' => basename($image->thumbnailURL),
                'folder' => $image->folder,
                'picture_data' => [
                    'image_url' => asset("storage/$image->imageURL"),
                    'title' => $image->title,
                    'description' => $image->description,
                    'location' => $image->location,
                    'date' => $image->date,
                    'time' => $image->time,
                    'camera' => $image->camera,
                    'resolution' => $image->resolution,
                    'id' => $image->id,
                ]
            ];
        });

        $mainFolderPath = 'images';

        $folders = Storage::disk('public')->directories($mainFolderPath);

        $folderNames = array_map(function ($folderPath) use ($mainFolderPath) {
            return str_replace($mainFolderPath . '/', '', $folderPath);
        }, $folders);

        return response()->json(['images' => $formattedImages, 'folders' => $folderNames]);
    }

    public function getImage(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'filename' => 'nullable|string',
            'folder' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422); // Unprocessable Entity
        }

        $filename = $request->input('filename');
        $folder = $request->input('folder');
        $filePath = $folder . "/" . $filename;

        $path = storage_path('app/public/images/' . $filePath);

        if (!file_exists($path)) {
            abort(404);
        }

        $picture = PhotoTable::where('imageURL', 'images/' . $filePath)->first();

        return response()->json([
            'image_url' => asset("storage/images/$filePath"),
            'filename' => $filename,
            'picture_data' => [
                'title' => $picture->title,
                'description' => $picture->description,
                'location' => $picture->location,
                'date' => $picture->date,
                'time' => $picture->time,
                'camera' => $picture->camera,
            ]
        ]);
    }

    public function uploadImage(Request $request)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:20000', // 20 MB max size (in kb)
            'title' => 'nullable|string',
            'description' => 'nullable|string',
            'location' => 'nullable|string',
            'date' => 'nullable|date',
            'time' => 'nullable|date_format:H:i:s', // format: HH:mm:ss
            'camera' => 'nullable|string',
            'folder' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422); // Unprocessable Entity
        }

        try {
            // Determine the folder name or use a default one
            $folderName = $request->input('folder') ?: 'uncategorized';

            // Create the folder if it doesn't exist
            $fullResFolderPath = 'images/' . $folderName;
            $thumbnailFolderPath = 'thumbnails/' . $folderName;
            Storage::disk('public')->makeDirectory($fullResFolderPath);
            Storage::disk('public')->makeDirectory($thumbnailFolderPath);

            // Full-res image
            $imagePath = $request->file('image')->store($fullResFolderPath, 'public');

            // Thumbnails
            $manager = ImageManager::withDriver(new Driver());
            $image = $manager->read($request->file('image'));
            $resolutionString = $image->width() . ' x ' . $image->height();
            $resize = $image->scaleDown(height: 500)->encode(new JpegEncoder());
            $thumbnailPath = storage_path('app/public/' . $thumbnailFolderPath . '/' . $request->file('image')->hashName());
            $resize->save($thumbnailPath);

            $shortThumbnailPath = $thumbnailFolderPath . '/' . $request->file('image')->hashName();

            // Saving to the table
            $photo = new PhotoTable();
            $photo->title = $request->input('title');
            $photo->description = $request->input('description');
            $photo->imageURL = $imagePath;
            $photo->thumbnailURL = $shortThumbnailPath;
            $photo->location = $request->input('location');
            $photo->date = $request->input('date');
            $photo->time = $request->input('time');
            $photo->camera = $request->input('camera');
            $photo->resolution = $resolutionString;
            $photo->folder = $folderName;

            $photo->save();

            return response()->json(['message' => 'Image uploaded successfully', 'image_path' => $imagePath, 'thumbnail_path' => $shortThumbnailPath]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500); // Internal Server Error
        }
    }

    public function deleteImage($id)
    {
        try {
            // Find the image by ID
            $photo = PhotoTable::find($id);

            if (!$photo) {
                return response()->json(['error' => 'Image not found'], 404); // Not Found
            }

            Storage::disk('public')->delete($photo->imageURL);
            Storage::disk('public')->delete($photo->thumbnailURL);

            $photo->delete();
            $this->deleteEmptyFolders("app/public/images/" . $photo->folder);
            $this->deleteEmptyFolders("app/public/thumbnails/" . $photo->folder);

            return response()->json(['message' => 'Image deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500); // Internal Server Error
        }
    }

    private function deleteEmptyFolders($directory)
    {
        $items = File::allFiles(storage_path($directory));

        if (count($items) === 0) {
            // Directory is empty, delete it
            File::deleteDirectory(storage_path($directory));

            // Recursively check and delete parent directories if empty
            $parentDirectory = dirname($directory);
            $this->deleteEmptyFolders($parentDirectory);
        }
    }

    public function updateImage(Request $request)
    {

        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'id' => 'required|int',
            'title' => 'nullable|string',
            'description' => 'nullable|string',
            'location' => 'nullable|string',
            'date' => 'nullable|date',
            'time' => 'nullable|date_format:H:i:s', // format: HH:mm:ss
            'camera' => 'nullable|string',
            'folder' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422); // Unprocessable Entity
        }

        try {
            $photo = PhotoTable::where('id', $request->input('id'))->first();

            if (!$photo) {
                return response()->json(['error' => 'Image not found'], 404); // Not Found
            }

            $photo->title = $request->input('title', $photo->title);
            $photo->description = $request->input('description', $photo->description);
            $photo->location = $request->input('location', $photo->location);
            $photo->date = $request->input('date', $photo->date);
            $photo->time = $request->input('time', $photo->time);
            $photo->camera = $request->input('camera', $photo->camera);
            $photo->folder = $request->input('folder', $photo->folder);

            // Save changes
            $photo->save();

            return response()->json(['message' => 'Image updated successfully', 'updated_photo' => $photo]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500); // Internal Server Error
        }
    }
}
