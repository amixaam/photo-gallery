<?php

namespace App\Models;

use App\Observers\ImageObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[ObservedBy([ImageObserver::class])]
class Image extends Model
{
    use HasFactory;

    protected $fillable = [
        'path', 'title', 'alt_text', 'location', 'time', "original_filename", "blurhash"
    ];

    public function collection()
    {
        return $this->belongsToMany(Collection::class);
    }
}
