<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DesaApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'hamlet_id',
        'id_card_number',
        'family_card_number',
        'family_head_name',
        'category',
        'name',
        'phone',
        'email',
        'sex',
        'religion',
        'images',
        'description',
        'problems',
    ];

    public function files()
    {
        return $this->hasMany(DesaFile::class);
    }
}
