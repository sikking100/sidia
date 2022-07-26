<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Ward;

class District extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    public function wards()
    {
        return $this->hasMany(Ward::class);
    }
}
