<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CollectionImage extends Model
{
    use HasFactory;

    public function images()
    {
        return $this->belongsToMany(Image::class);
    }

    public function collections()
    {
        return $this->belongsToMany(Collection::class);
    }
}
