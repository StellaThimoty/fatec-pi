<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cards extends Model
{
    protected $fillable = ['userId', 'game', 'name', 'setNumber', 'rarity', 'state', 'altart', 'color', 'quantity', 'observations'];
}
