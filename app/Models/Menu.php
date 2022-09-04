<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Requirement;

class Menu extends Model
{
    use HasFactory;

    public function requirements()
    {
        return $this->hasMany(Requirement::class);
    }
}
