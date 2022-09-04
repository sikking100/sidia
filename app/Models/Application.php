<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\File;

class Application extends Model
{
    use HasFactory;

    protected $fillable = [
      'family_card_number',
      'family_head_name',
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
      'religion',
      'status_description',
      'problems',
    ];

    public function files()
    {
        return $this->hasMany(File::class);
    }
}
