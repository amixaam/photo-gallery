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
        Schema::create('images', function (Blueprint $table) {
            $table->id();
            $table->string('path');
            $table->string('original_filename');
            $table->string('blurhash')->nullable();
            $table->string('title');
            $table->string('alt_text');
            $table->string('location')->nullable();
            $table->string('time')->nullable();

            $table->integer('width')->nullable();
            $table->integer('height')->nullable();
            $table->string('aspect_ratio')->nullable();

            // could be a cool addition
            // $table->string('people')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('images');
    }
};
