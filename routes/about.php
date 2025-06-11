<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('about', function () {
    return Inertia::render( 'about');
})->name(name: 'about');