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
        if($request->hasFile('pics')){
            $file = $request->file('pics');
            $extension = $file->getClientOriginalExtension();

            $filename = time()+'.'.$extension;
            $path = 'uploads/cards/';
            $file->move($path,$filename);
        } else {
            $path = '';
            $filename = '';
        }

        $card->update([
            'game' => $request->get('game', $card->game),
            'name' => $request->get('name', $card->name),
            'price' => $request->get('price', $card->price),
            'setNumber' => $request->get('setNumber', $card->setNumber),
            'rarity' => $request->get('rarity', $card->rarity),
            'state' => $request->get('state', $card->state),
            'altart' =>$request->get('altart', $card->altart),   
            'color' => $request->get('color', $card->color),
            'quantity' => $request->get('quantity', $card->quantity),
            'image' => $path.$filename,
            'observations' => $request->get('observations', $card->observations),
        ]);

        return redirect()->route('cards.cards')->with('message', 'Carta editada com sucesso');
    }

    public function store(Request $request) {
        $request->validate([
        'game' => 'required|string',
        'name' => 'required|string',
        'price' => 'required|decimal:0,2',
        'setNumber' => 'required|string',
        'rarity' => 'required|string',
        'state' => 'required|string',
        'altart' => 'nullable|bool',
        'color' => 'nullable|string',
        'quantity' => 'required|numeric',
        'observations' => 'nullable|string'
        ]);
        $id = Auth::id();
        if($request->hasFile('pics')){
            $file = $request->file('pics');

            $filename = $file->getClientOriginalName();
            $path = 'uploads/cards/';
            $file->move($path,$filename);
        } else {
            $path = '';
            $filename = '';
        }

        Cards::create([
            'userId' => $id,
            'game' => $request->input('game'),
            'name' => $request->input('name'),
            'price' => $request->input('price'),
            'setNumber' => $request->input('setNumber'),
            'rarity' => $request->input('rarity'),
            'state' => $request->input('state'),
            'altart' =>$request->input('altart'),   
            'color' => $request->input('color'),
            'quantity' => $request->input('quantity'),
            'image' => $path.$filename,
            'observations' => $request->input('observations'),
        ]);

        

        return redirect()->route('cards.cards')->with('message', 'Carta cadastrada com sucesso');
    }
}
