<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
        'ticket',
        'files'
    ];

    public function filess()
    {
        return $this->hasMany(File::class);
    }

    public function cat()
    {
        return $this->hasOne(Menu::class, 'name', 'category');
    }

    public function hamlet()
    {
        return $this->belongsTo(Hamlet::class);
    }

    public function supports()
    {
        return $this->hasMany(SupportFile::class);
    }

    public function scopeFilterByRole($query, $request, $role)
    {
        if ($role == 'superadmin') {
            if ($request->kecamatan != null && $request->kecamatan != '') {
                $query->where('district', $request->kecamatan);
            }
            if ($request->desa != null && $request->desa != '') {
                $query->where('ward', $request->desa);
            }
        }
        if ($request->hamlet_id != null && $request->hamlet_id != -1) {
            $query->where('hamlet_id', $request->hamlet_id);
        }
        if ($request->tahun != null && $request->tahun != -1) {
            $query->whereYear('created_at', $request->tahun);
        }
        if ($request->search != null && $request->search != '') {
            $search = $request->search;
            if (is_numeric($search)) {
                $query->where('id_card_number', $search);
            } else {
                $query->where('name', 'LIKE', '%' . $search . '%');
            }
        }
        if ($request->status != null && $request->status != '') {
            $query->where('status', $request->status);
        }
        return $query;
    }
}
