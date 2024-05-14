<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    use HasFactory;

    protected $fillable = ['title'];

    protected $casts = [
        'images' => 'array',
    ];

    public function images()
    {
        return $this->hasMany(Image::class);
    }
}
