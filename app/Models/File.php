<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Application;

class File extends Model
{
    use HasFactory;

    protected $fillable = [
      'name', 'place'
    ];

    public function application()
    {
        return $this->belongsTo(Application::class);
    }
}
