<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Menu;

class MenusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Menu::truncate();
        $menu = [
            ['name' => 'KTP-Pemula'],
            ['name' => 'KTP-Rusak'],
            ['name' => 'KTP-Hilang'],
            ['name' => 'KTP-Perubahan'],
            ['name' => 'KTP-Disabilitas'],
            ['name' => 'KK-Baru'],
            ['name' => 'KK-Rusak'],
            ['name' => 'KK-Hilang'],
            ['name' => 'KK-Perubahan-Data'],
            ['name' => 'KIA-Baru'],
            ['name' => 'KIA-Rusak'],
            ['name' => 'KIA-Hilang'],
            ['name' => 'KIA-Perubahan-Data'],
            ['name' => 'SKPWNI-Pindah'],
            ['name' => 'Akta-Kelahiran-Baru'],
            ['name' => 'Akta-Kelahiran-Rusak'],
            ['name' => 'Akta-Kelahiran-Hilang'],
            ['name' => 'Akta-Kelahiran-Perubahan'],
            ['name' => 'PERKAWINAN'],
            ['name' => 'PERCERAIAN'],
            ['name' => 'KEMATIAN'],
            ['name' => 'PENGADUAN'],
        ];
        Menu::insert($menu);
    }
}
