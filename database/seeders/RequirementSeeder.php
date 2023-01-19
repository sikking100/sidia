<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Requirement;

class RequirementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Requirement::truncate();
        $req = [
            //KTP
            [
                'menu_id' => '1',
                'name' => 'Foto KK Terbaru',
                'link' => null
            ],
            [
                'menu_id' => '2',
                'name' => 'Foto KTP-el (rusak)',
                'link' => null
            ],
            [
                'menu_id' => '2',
                'name' => 'Foto KK Asli',
                'link' => null
            ],
            [
                'menu_id' => '3',
                'name' => 'Foto copy KTP-el (jika masih ada)',
                'link' => null
            ],
            [
                'menu_id' => '3',
                'name' => 'Foto KK Asli',
                'link' => null
            ],
            [
                'menu_id' => '3',
                'name' => 'Surat keterangan hilang dari kepolisian',
                'link' => null
            ],
            [
                'menu_id' => '4',
                'name' => 'Foto KTP-el asli',
                'link' => null
            ],
            [
                'menu_id' => '4',
                'name' => 'Foto KK Asli',
                'link' => null
            ],
            [
                'menu_id' => '5',
                'name' => 'Foto Kartu Keluarga',
                'link' => null
            ],
            //KK
            [
                'menu_id' => '6',
                'name' => 'Foto formulir isian kartu keluarga (KK) dari desa/kelurahan yang sudah diisi',
                'link' => null
            ],
            [
                'menu_id' => '6',
                'name' => 'Foto Skpwni (bagi penduduk pindah datang)',
                'link' => null
            ],
            [
                'menu_id' => '6',
                'name' => 'Foto buku nikah/akta perkawinan (bagi pasangan baru menikah dan/atau bagi pasangan jika status dalam KK “kawin belum tercatat”)',
                'link' => null
            ],
            [
                'menu_id' => '6',
                'name' => 'Foto Surat Keterangan kelahiran putra/putri pemohon yang akan menjadi anggota keluarga baru dalam Kartu Keluarga (KK) (jika ada penambahan anggota keluarga)',
                'link' => null
            ],
            [
                'menu_id' => '6',
                'name' => 'Foto Surat Keterangan Kematian (jika ada pengurangan anggota keluarga',
                'link' => null
            ],
            [
                'menu_id' => '7',
                'name' => 'Foto nikah/akta nikah (bagi pasangan jika status dalam KK “kawin belum tercatat”)',
                'link' => null
            ],
            [
                'menu_id' => '8',
                'name' => 'Foto Surat keterangan hilang dari desa atau kelurahan',
                'link' => null
            ],
            [
                'menu_id' => '8',
                'name' => 'Foto nikah/akta nikah (bagi pasangan jika status dalam KK “kawin belum tercatat”)',
                'link' => null
            ],
            [
                'menu_id' => '9',
                'name' => 'Foto Ijazah atau berkas data dukung perubahan data lainnya',
                'link' => null
            ],
            [
                'menu_id' => '9',
                'name' => 'Foto KK Asli',
                'link' => null
            ],
            [
                'menu_id' => '9',
                'name' => 'Foto nikah/akta nikah (bagi pasangan jika status dalam KK “kawin belum tercatat”)',
                'link' => null
            ],
            //KIA
            [
                'menu_id' => '10',
                'name' => 'Kutipan akta kelahiran',
                'link' => null
            ],
            [
                'menu_id' => '10',
                'name' => 'Kartu Keluarga (KK)',
                'link' => null
            ],
            [
                'menu_id' => '11',
                'name' => 'foto kia rusak',
                'link' => null
            ],
            [
                'menu_id' => '11',
                'name' => 'Foto KK',
                'link' => null
            ],
            [
                'menu_id' => '12',
                'name' => 'Surat Kehilangan KIA dari desa atau kelurahan',
                'link' => null
            ],
            [
                'menu_id' => '12',
                'name' => 'Foto KK',
                'link' => null
            ],
            [
                'menu_id' => '13',
                'name' => 'Foto Ijazah atau berkas data dukung perubahan data lainnya',
                'link' => null
            ],
            [
                'menu_id' => '13',
                'name' => 'Foto KIA Asli',
                'link' => null
            ],
            [
                'menu_id' => '13',
                'name' => 'Foto KK',
                'link' => null
            ],
            //SKPWNI
            [
                'menu_id' => '14',
                'name' => 'Foto Surat Keterangan Pindah dari desa atau kelurahan',
                'link' => null,
            ],
            [
                'menu_id' => '14',
                'name' => 'Foto KK asli',
                'link' => null
            ],
            [
                'menu_id' => '14',
                'name' => 'Foto KTP asli',
                'link' => null
            ],
            //Akta kelahiran
            [
                'menu_id' => '15',
                'name' => 'Surat kelahiran asli dari (Bidan/RSU/Puskesmas dll)',
                'link' => null
            ],
            [
                'menu_id' => '15',
                'name' => 'Foto isian akta kelahiran dari desa / kelurahan',
                'link' => null
            ],
            [
                'menu_id' => '15',
                'name' => 'Foto Buku nikah / akta perkawinan orang tua',
                'link' => null
            ],
            [
                'menu_id' => '15',
                'name' => 'Foto KK asli ( jika yang bersangkutan belum ditambahkan dalam KK )',
                'link' => null
            ],
            [
                'menu_id' => '16',
                'name' => 'Foto KK',
                'link' => null
            ],
            [
                'menu_id' => '17',
                'name' => 'Foto KK',
                'link' => null
            ],
            [
                'menu_id' => '17',
                'name' => 'Foto Surat Keterangan Hilang dari Desa atau Kelurahan',
                'link' => null
            ],
            [
                'menu_id' => '18',
                'name' => 'Foto fotocopy ijazah ( atau berkas data dukung perubahan data lainnya )',
                'link' => null
            ],
            [
                'menu_id' => '18',
                'name' => 'Foto Akta Lahir asli',
                'link' => null
            ],
            //PERKAWINAN
            // [
            //   'menu_id' => '19',
            //   'name' => 'Foto Formulir N1 yang sudah diisi',
            //   'link' => null
            // ],
            // [
            //   'menu_id' => '19',
            //   'name' => 'Foto Formulir N2 yang sudah diisi',
            //   'link' => null
            // ],
            // [
            //   'menu_id' => '19',
            //   'name' => 'Foto Formulir N3 yang sudah diisi',
            //   'link' => null
            // ],
            // [
            //   'menu_id' => '19',
            //   'name' => 'Foto Formulir N4 yang sudah diisi',
            //   'link' => null
            // ],
            [
                'menu_id' => '19',
                'name' => 'Foto Surat Nikah Agama',
                'link' => null
            ],
            [
                'menu_id' => '19',
                'name' => 'Foto KK orang tua Suami',
                'link' => null
            ],
            [
                'menu_id' => '19',
                'name' => 'Foto KK orang tua Istri',
                'link' => null
            ],
            [
                'menu_id' => '19',
                'name' => 'Foto KTP-El Suami',
                'link' => null
            ],
            [
                'menu_id' => '19',
                'name' => 'Foto KTP-El Istri',
                'link' => null
            ],
            [
                'menu_id' => '19',
                'name' => 'Foto KTP-El Saksi 1',
                'link' => null
            ],
            [
                'menu_id' => '19',
                'name' => 'Foto KTP-El Saksi 2',
                'link' => null
            ],
            // [
            //   'menu_id' => '19',
            //   'name' => 'Pas Foto 4 x 6',
            //   'link' => null
            // ],
            //PERCERAIAN
            [
                'menu_id' => '20',
                'name' => 'Foto salinan putusan pengadilan',
                'link' => null
            ],
            // [
            //   'menu_id' => '20',
            //   'name' => 'Foto Akta Perkawinan Asli',
            //   'link' => null
            // ],
            [
                'menu_id' => '20',
                'name' => 'Foto KTP-El suami',
                'link' => null
            ],
            [
                'menu_id' => '20',
                'name' => 'Foto KTP-El istri',
                'link' => null
            ],
            // [
            //   'menu_id' => '20',
            //   'name' => 'Foto KK Asli',
            //   'link' => null
            // ],
            //KEMATIAN
            [
                'menu_id' => '21',
                'name' => 'Foto Surat keterangan kematian dari Desa / Kelurahan',
                'link' => null
            ],
            [
                'menu_id' => '21',
                'name' => 'Foto KTP-El asli yang bersangkutan',
                'link' => null
            ],
            [
                'menu_id' => '21',
                'name' => 'Foto KK Asli yang bersangkutan',
                'link' => null
            ],
            //PENGADUAN
            [
                'menu_id' => '22',
                'name' => 'Foto KTP',
                'link' => null
            ],
            [
                'menu_id' => '22',
                'name' => 'Foto KK',
                'link' => null
            ],
        ];
        Requirement::insert($req);
    }
}
