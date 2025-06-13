<?php

use App\Http\Controllers\CardsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('cards', [CardsController::class, 'show'])->name('cards.cards');
    Route::post('cards', [CardsController::class, 'store'])->name('cards.store');
    Route::get('cards/create', [CardsController::class, 'create'])->name('cards.create');
    Route::delete('cards/{card}', [CardsController::class, 'destroy'])->name('cards.destroy');
    Route::get('cards/{card}/edit', [CardsController::class, 'edit'])->name('cards.edit');
    Route::put('cards/{card}', [CardsController::class, 'update'])->name('cards.update');
});
