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
        Schema::create('cards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('userId')->constrained('users');
            $table->timestamps();
            $table->string('game');
            $table->string('name');
            $table->string('setNumber');
            $table->string('rarity');
            $table->string('state');
            $table->boolean('altart')->nullable();
            $table->string('color')->nullable();
            $table->unsignedInteger('quantity');
            $table->text('observations')->nullable();
        });

        Schema::create('cards_pictures', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cardsId')->constrained('cards');
            $table->timestamps();
            $table->string('picture');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cards');
    }
};
