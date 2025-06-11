<?php

use App\Http\Controllers\CardsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('cards', function () {
        return Inertia::render('cards/cards');
    })->name('cards.cards');
    Route::post('cards', [CardsController::class, 'store'])->name('cards.store');
    Route::get('cards/create', [CardsController::class, 'create'])->name('cards.create');
});
