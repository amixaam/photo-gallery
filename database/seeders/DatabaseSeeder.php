<?php

namespace Database\Seeders;

use App\Models\Collection;
use App\Models\Image;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Collection::create([
            'title' => 'Misc.',
        ]);

        $bestWorkCollection = Collection::create([
            'title' => 'My best work',
            'is_public' => false,
        ]);

        $images = [
            [
                'path' => 'premade/home.webp',
                'title' => 'Home',
                'alt_text' => 'A blue sky with sea-bed like clouds',
                'location' => 'Latvia',
            ],
            [
                'path' => 'premade/lithuania.webp',
                'title' => 'Nested',
                'alt_text' => 'A building nested within trees with a pink sky',
                'location' => 'Lithuania'
            ],
            [
                'path' => 'premade/freedom.webp',
                'title' => 'Freedom statue',
                'alt_text' => 'Freedom statue in Rīga',
                'location' => 'Latvia'
            ],
            [
                'path' => 'premade/poland.webp',
                'title' => 'Stranded',
                'alt_text' => 'Hilly Poland terrain in the background. A ski lift in the foreground',
                'location' => 'Poland'
            ],
            [
                'path' => 'premade/cesis.webp',
                'title' => 'Uzvaras statue',
                'alt_text' => 'A statue in the night',
                'location' => 'Latvia'
            ],
        ];

        // Loop through and create images, then attach to 'My best work' collection
        foreach ($images as $imageData) {
            $image = Image::create($imageData);
            $bestWorkCollection->images()->attach($image->id);
        }

        User::create([
            'username' => env('ADMIN_USERNAME'),
            'password' => env('ADMIN_PASSWORD'),
        ]);
    }
}
