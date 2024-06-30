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
            'cover_path' => 'premade/czechia.webp',
            'is_public' => false,
            'cover_blurhash' => "UrFP,3j?aJt7%%fka}fkyFt6fRazWFozozae",
        ]);

        $images = [
            [
                'path' => 'premade/freedom.webp',
                'original_filename' => 'freedom.webp',
                'title' => 'Freedom statue',
                'alt_text' => 'The Freedom statue with a blue sky in the background.',
                'location' => 'Latvia'
            ],
            [
                'path' => 'premade/mood.webp',
                'original_filename' => 'mood.webp',
                'title' => 'Mood',
                'alt_text' => 'Blue moody sky with clouds illuminated by the setting sun.',
                'location' => 'Latvia',
            ],
            [
                'path' => 'premade/lithuania.webp',
                'original_filename' => 'lithuania.webp',
                'title' => 'Nested',
                'alt_text' => 'A building nested within trees with a pink sky.',
                'location' => 'Lithuania'
            ],
            [
                'path' => 'premade/czechia.webp',
                'original_filename' => 'czechia.webp',
                'title' => 'Water alley',
                'alt_text' => 'A water canal in prague.',
                'location' => 'Czechia'
            ],
            [
                'path' => 'premade/poland.webp',
                'original_filename' => 'poland.webp',
                'title' => 'Stranded',
                'alt_text' => 'Hilly Poland terrain in the background, a ski lift in the foreground.',
                'location' => 'Poland'
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
