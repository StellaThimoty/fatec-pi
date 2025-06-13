<?php

namespace App\Http\Controllers;

use App\Models\Cards;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CardsController extends Controller
{
    public function show() {
        $cards = Cards::all();
        return Inertia::render('cards/cards', compact('cards'));
    }
    public function create(){
        return Inertia::render('cards/create');
    }

    public function destroy(Cards $card) {
        $card->delete();
        return redirect()->route('cards.cards')->with('message', 'Carta deletada com sucesso!');
    }

    public function edit(Cards $card) {
        return Inertia::render('cards/edit', compact('card'));
    }

    public function update(Request $request, Cards $card) {
        $request->validate([
        'game' => 'required|string',
        'name' => 'required|string',
        'setNumber' => 'required|string',
        'rarity' => 'required|string',
        'state' => 'required|string',
        'altart' => 'nullable|bool',
        'color' => 'nullable|string',
        'quantity' => 'required|numeric',
        'observations' => 'nullable|string'
        ]);

        $card->update([
            'game' => $request->input('game'),
            'name' => $request->input('name'),
            'setNumber' => $request->input('setNumber'),
            'rarity' => $request->input('rarity'),
            'state' => $request->input('state'),
            'altart' =>$request->input('altart'),   
            'color' => $request->input('color'),
            'quantity' => $request->input('quantity'),
            'observations' => $request->input('observations'),
        ]);

        return redirect()->route('cards.cards')->with('message', 'Carta editada com sucesso');
    }

    public function store(Request $request) {
        // dd($request);
        $request->validate([
        'game' => 'required|string',
        'name' => 'required|string',
        'setNumber' => 'required|string',
        'rarity' => 'required|string',
        'state' => 'required|string',
        'altart' => 'nullable|bool',
        'color' => 'nullable|string',
        'quantity' => 'required|numeric',
        'observations' => 'nullable|string'
        ]);
        $id = Auth::id();


        Cards::create([
            'userId' => $id,
            'game' => $request->input('game'),
            'name' => $request->input('name'),
            'setNumber' => $request->input('setNumber'),
            'rarity' => $request->input('rarity'),
            'state' => $request->input('state'),
            'altart' =>$request->input('altart'),   
            'color' => $request->input('color'),
            'quantity' => $request->input('quantity'),
            'observations' => $request->input('observations'),
        ]);

        

        return redirect()->route('cards.cards')->with('message', 'Carta cadastrada com sucesso');
    }
}
