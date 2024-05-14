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
            $table->string('public_id')->nullable()->unique();
            $table->string('path');
            $table->string('title')->nullable();
            $table->string('camera')->nullable();
            $table->json('location')->default(json_encode(['country' => null, 'city' => null]));
            $table->date('date')->nullable();
            $table->string('alt')->nullable();
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
