<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('collections', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug');
            $table->string('cover_path')->nullable(); // cover image id, must be inside 'images' row
            $table->string('cover_blurhash')->nullable();
            $table->boolean('is_public')->default(false); // mainly for "my best work" section in landing
            $table->boolean('is_featured')->default(false); // only 1 collection can be featured at a time. This can be ovveriden by a new collection.
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('collections');
    }
};
