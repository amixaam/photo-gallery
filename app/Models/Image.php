<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $fillable = [
        'path', 'title', 'alt_text', 'metadata'
    ];

    protected $casts = [
        'metadata' => 'array',
    ];

    public function collection()
    {
        return $this->belongsToMany(Collection::class);
    }
}
