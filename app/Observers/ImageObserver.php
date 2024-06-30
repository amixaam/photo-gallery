<?php

namespace App\Observers;

use App\Models\Image;
use Bepsvpt\Blurhash\Facades\BlurHash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ImageObserver
{
    private function GenerateBlurhash($path)
    {
        return BlurHash::encode($path);
    }

    /**
     * Handle the Image "created" event.
     */
    public function created(Image $image): void
    {
        // generate blurhash
        $blurhash = $this->GenerateBlurhash(Storage::path("public/" . $image->path));

        // calculate aspect ratio
        $dimensions = getimagesize(Storage::path("public/" . $image->path));
        $aspect_ratio = round($dimensions[0] / $dimensions[1], 2);

        $image->update(['blurhash' => $blurhash, 'width' => $dimensions[0], 'height' => $dimensions[1], 'aspect_ratio' => $aspect_ratio]);
    }

    /**
     * Handle the Image "updated" event.
     */
    public function updated(Image $image): void
    {
        //
    }

    /**
     * Handle the Image "deleted" event.
     */
    public function deleted(Image $image): void
    {
        //
    }

    /**
     * Handle the Image "restored" event.
     */
    public function restored(Image $image): void
    {
        //
    }

    /**
     * Handle the Image "force deleted" event.
     */
    public function forceDeleted(Image $image): void
    {
        //
    }
}
