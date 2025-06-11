<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CardsController extends Controller
{
    public function create(){
        return Inertia::render('cards/create');
    }
    public function store(Request $request) {
        dd($request);
    }
}
