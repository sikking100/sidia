<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ward extends Model
{
    use HasFactory;

    protected $fillable = [
        'district_id',
        'name',
    ];

    public function district()
    {
        return $this->belongsTo(District::class);
    }

    public function hamlets()
    {
        return $this->hasMany(Hamlet::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
