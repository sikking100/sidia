<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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

    public function applications()
    {
        return $this->hasMany(Application::class);
    }
}
