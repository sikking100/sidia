<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Menu;
use Illuminate\Support\Facades\DB;

class MenusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('menus')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        // Menu::truncate();
        $menu = [
            ['name' => 'KTP-Pemula', 'id_citigov' => 6538, 'name_citigov' => 'KTP - Pemula',],
            ['name' => 'KTP-Rusak', 'id_citigov' => 6539, 'name_citigov' => 'KTP - Rusak',],
            ['name' => 'KTP-Hilang', 'id_citigov' => 6540, 'name_citigov' => 'KTP - Hilang',],
            ['name' => 'KTP-Perubahan', 'id_citigov' => 6541, 'name_citigov' => 'KTP - Perubahan',],
            ['name' => 'KTP-Disabilitas', 'id_citigov' => 6542, 'name_citigov' => 'KTP - Disabilitas',],
            ['name' => 'KK-Baru', 'id_citigov' => 6543, 'name_citigov' => 'Kartu Keluarga - Baru',],
            ['name' => 'KK-Rusak', 'id_citigov' => 6544, 'name_citigov' => 'Kartu Keluarga - Rusak',],
            ['name' => 'KK-Hilang', 'id_citigov' => 6545, 'name_citigov' => 'Kartu Keluarga - Hilang',],
            ['name' => 'KK-Perubahan-Data', 'id_citigov' => 6546, 'name_citigov' => 'Kartu Keluarga - Perubahan Data',],
            ['name' => 'KIA-Baru', 'id_citigov' => 6547, 'name_citigov' => 'Kartu Identitas Anak - Baru',],
            ['name' => 'KIA-Rusak', 'id_citigov' => 6548, 'name_citigov' => 'Kartu Identitas Anak - Rusak',],
            ['name' => 'KIA-Hilang', 'id_citigov' => 6549, 'name_citigov' => 'Kartu Identitas Anak - Hilang',],
            ['name' => 'KIA-Perubahan-Data', 'id_citigov' => 6550, 'name_citigov' => 'Kartu Identitas Anak - Perubahan Data',],
            ['name' => 'SKPWNI-Pindah', 'id_citigov' => 6551, 'name_citigov' => 'SKPWNI - Pindah Keluar',],
            ['name' => 'Akta-Kelahiran-Baru', 'id_citigov' => 6552, 'name_citigov' => 'Akta Kelahiran - Baru',],
            ['name' => 'Akta-Kelahiran-Rusak', 'id_citigov' => 6553, 'name_citigov' => 'Akta Kelahiran - Rusak',],
            ['name' => 'Akta-Kelahiran-Hilang', 'id_citigov' => 6554, 'name_citigov' => 'Akta Kelahiran - Hilang',],
            ['name' => 'Akta-Kelahiran-Perubahan', 'id_citigov' => 6555, 'name_citigov' => 'Akta Kelahiran - Perubahan',],
            ['name' => 'PERKAWINAN', 'id_citigov' => 6556, 'name_citigov' => 'Perkawinan',],
            ['name' => 'PERCERAIAN', 'id_citigov' => 6557, 'name_citigov' => 'Perceraian',],
            ['name' => 'KEMATIAN', 'id_citigov' => 6558, 'name_citigov' => 'Kematian',],
            ['name' => 'PENGADUAN', 'id_citigov' => 6559, 'name_citigov' => 'Pengaduan Data Kependudukan',],
        ];
        Menu::insert($menu);
    }
}
