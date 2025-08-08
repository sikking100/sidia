<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Ward;

class Hamlet extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'ward_id'
    ];

    public function ward()
    {
        return $this->belongsTo(Ward::class);
    }
}
