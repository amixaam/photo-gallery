<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $fillable = [
        'path', 'title', 'camera', 'location', 'date', 'alt'
    ];

    protected $hidden = [
        'id'
    ];

    protected $casts = [
        'location' => 'array',
    ];

    public function collection()
    {
        return $this->belongsTo(Collection::class);
    }
}
