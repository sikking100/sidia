<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;

    protected $fillable = [
      'id_card_number',
      'category',
      'name',
      'phone',
      'email',
      'district',
      'ward',
      'description',
      'images',
      'sex',
    ];
}
