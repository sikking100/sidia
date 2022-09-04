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
        ['name' => 'KK-Perubahan'],
        ['name' => 'KIA-Baru'],
        ['name' => 'KIA-Rusak'],
        ['name' => 'KIA-Hilang'],
        ['name' => 'KIA-Perubahan'],
        ['name' => 'SKPWNI-Pindah'],
        ['name' => 'AKTA-Baru'],
        ['name' => 'AKTA-Rusak'],
        ['name' => 'AKTA-Hilang'],
        ['name' => 'AKTA-Perubahan'],
        ['name' => 'PERKAWINAN'],
        ['name' => 'PERCERAIAN'],
        ['name' => 'KEMATIAN'],
        ['name' => 'PENGADUAN'],
      ];
      Menu::insert($menu);
    }
}
