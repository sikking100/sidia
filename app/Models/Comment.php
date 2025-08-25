<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'application_id',
        'user_id',
        'guest_name',
        'guest_email',
        'content'
    ];

    public function application()
    {
        return $this->hasOne(Application::class);
    }
}
