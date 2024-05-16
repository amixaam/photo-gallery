<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Collection extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'cover_path', 'slug'];

    public function images()
    {
        return $this->belongsToMany(Image::class);
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($collection) {
            $collection->slug = Str::slug($collection->title);
        });
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
