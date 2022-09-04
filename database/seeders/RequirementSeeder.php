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
          //KIA
          [
            'menu_id' => '10',
            'name' => 'Foto KTP suami/istri asli',
            'link' => null
          ],
          [
            'menu_id' => '10',
            'name' => 'Foto KTP suami/istri foto copy',
            'link' => null
          ],
          [
            'menu_id' => '10',
            'name' => 'Foto KK asli',
            'link' => null
          ],
          [
            'menu_id' => '10',
            'name' => 'Foto KK foto copy',
            'link' => null
          ],
          [
            'menu_id' => '10',
            'name' => 'Foto Akta Kelahiran asli',
            'link' => null
          ],
          [
            'menu_id' => '10',
            'name' => 'Foto Akta Kelahiran foto copy',
            'link' => null
          ],
          [
            'menu_id' => '10',
            'name' => 'Pas foto berwarna ukuran 4 x 6',
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
            'menu_id' => '11',
            'name' => 'Foto anak umur 5 tahun',
            'link' => null
          ],
          [
            'menu_id' => '12',
            'name' => 'Surat Kehilangan KIA dari Kepolisian',
            'link' => null
          ],
          [
            'menu_id' => '12',
            'name' => 'Foto KK',
            'link' => null
          ],
          [
            'menu_id' => '12',
            'name' => 'Foto / FC KIA hilang (jika masih ada)',
            'link' => null
          ],
          [
            'menu_id' => '13',
            'name' => 'Foto KIA asli',
            'link' => null
          ],
          [
            'menu_id' => '13',
            'name' => 'Pas Foto terbaru berwarna ukuran 4 x 6',
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
            'name' => 'Formulir F 1.03',
            'link' => 'https://google.com',
          ],
          [
            'menu_id' => '14',
            'name' => 'Foto KK asli',
            'link' => null
          ],
          [
            'menu_id' => '14',
            'name' => 'Foto KTP asli yang pindah/surat kehilangan jika KTP pindah',
            'link' => null
          ],
          [
            'menu_id' => '14',
            'name' => 'Foto Buku nikah/Akta perkawinan',
            'link' => null
          ],
          [
            'menu_id' => '14',
            'name' => 'Surat cerai/Akta perceraian',
            'link' => null
          ],
          [
            'menu_id' => '14',
            'name' => 'Fotocopy akta kelahiran',
            'link' => null
          ],
          [
            'menu_id' => '14',
            'name' => 'Fotocopy ijazah',
            'link' => null
          ],
          [
            'menu_id' => '14',
            'name' => 'Surat Keterangan gol darah (seluruh anggota keluarga yang ada di KK)',
            'link' => null
          ],
          //Akta kelahiran
          [
            'menu_id' => '15',
            'name' => 'Foto formulir F-2.01 yang sudah diisi',
            'link' => 'https://google.com',
          ],
          [
            'menu_id' => '15',
            'name' => 'Surat kelahiran asli dari (Bidan/RSU/Puskesmas dll) / jika tidak ada gunakan formulir SPTJM',
            'link' => 'https://google.com'
          ],
          [
            'menu_id' => '15',
            'name' => 'Foto KK orang tua',
            'link' => null
          ],
          [
            'menu_id' => '15',
            'name' => 'Foto KTP orang tua (berdampingan)',
            'link' => null
          ],
          [
            'menu_id' => '15',
            'name' => 'Foto Buku nikah/akta perkawinan orangtua pada bagian yang berisi biodata (jika tidak ada gunakan formulir SPTJM)',
            'link' => null
          ],
          [
            'menu_id' => '15',
            'name' => 'Foto KK saksi kelahiran 1',
            'link' => null
          ],
          [
            'menu_id' => '15',
            'name' => 'Foto KK saksi kelahiran 2',
            'link' => null
          ],
          [
            'menu_id' => '15',
            'name' => 'Foto Surat Pernyataan bagi pemohon yang berumur lebih dari 1 Tahun',
            'link' => null
          ],
          [
            'menu_id' => '15',
            'name' => 'Foto surat pernyatan perubahan data kependudukan (jika ada perubahan di buku nikah atau di kk tidak sama)',
            'link' => null
          ],
          [
            'menu_id' => '16',
            'name' => 'Foto KTP',
            'link' => null
          ],
          [
            'menu_id' => '16',
            'name' => 'Foto KK',
            'link' => null
          ],
          [
            'menu_id' => '16',
            'name' => 'FOTO Akta Kelahiran, apabila tidak ada diganti Surat Keputusan Penetapan Pengadilan',
            'link' => null
          ],
          [
            'menu_id' => '16',
            'name' => 'surat permohonan',
            'link' => null
          ],
          [
            'menu_id' => '17',
            'name' => 'Foto KTP',
            'link' => null
          ],
          [
            'menu_id' => '17',
            'name' => 'Foto KK',
            'link' => null
          ],
          [
            'menu_id' => '17',
            'name' => 'Surat Kehilangan Akta Kelahiran Dari Kepolisian',
            'link' => null
          ],
          [
            'menu_id' => '17',
            'name' => 'Foto Copy Akta Kelahiran',
            'link' => null
          ],
          [
            'menu_id' => '17',
            'name' => 'surat permohonan',
            'link' => null
          ],
          [
            'menu_id' => '18',
            'name' => 'Foto formulir F-2.49 yang telah diisi',
            'link' => 'https://google.com'
          ],
          [
            'menu_id' => '18',
            'name' => 'Foto KTP',
            'link' => null
          ],
          [
            'menu_id' => '18',
            'name' => 'Foto Akta Kelahiran',
            'link' => null
          ],
          [
            'menu_id' => '18',
            'name' => 'Foto Buku Nikah Orang Tua',
            'link' => null
          ],
          [
            'menu_id' => '18',
            'name' => 'Foto Surat Permohonan perubahan akta kelahiran',
            'link' => null
          ],
          [
            'menu_id' => '18',
            'name' => 'Foto KK',
            'link' => null
          ],
          //PERKAWINAN
          [
            'menu_id' => '19',
            'name' => 'Foto formulir F-2.12 yang sudah diisi',
            'link' => 'https://google.com'
          ],
          [
            'menu_id' => '19',
            'name' => 'Foto Surat untuk kawin dari kelurahan',
            'link' => null
          ],
          [
            'menu_id' => '19',
            'name' => 'Foto Akta Kelahiran Calon Pengantin',
            'link' => null
          ],
          [
            'menu_id' => '19',
            'name' => 'Foto KK Calon Pengantin',
            'link' => null
          ],
          [
            'menu_id' => '19',
            'name' => 'Pas foto berdampingan calon pengantin 4 x 6 cm sebanyak 4 lembar',
            'link' => null
          ],
          [
            'menu_id' => '19',
            'name' => 'Akta kematian/perceraian bagi yang berstatus janda/duda',
            'link' => null
          ],
          //PERCERAIAN
          [
            'menu_id' => '20',
            'name' => 'Foto formulir F-2.19 yang sudah diisi',
            'link' => 'https://google.com'
          ],
          [
            'menu_id' => '20',
            'name' => 'Foto Surat keputusan pengadilan yang mempunyai kekuatan hukum tetap',
            'link' => null
          ],
          [
            'menu_id' => '20',
            'name' => 'Foto Akta perkawinan suami istri asli',
            'link' => null
          ],
          [
            'menu_id' => '20',
            'name' => 'Foto KTP suami',
            'link' => null
          ],
          [
            'menu_id' => '20',
            'name' => 'Foto KTP istri',
            'link' => null
          ],
          [
            'menu_id' => '20',
            'name' => 'Foto KK suami',
            'link' => null
          ],
          [
            'menu_id' => '20',
            'name' => 'Foto KK istri',
            'link' => null
          ],
          //KEMATIAN
          [
            'menu_id' => '21',
            'name' => 'Foto Formulir F-2.28 yang sudah diisi',
            'link' => 'https://google.com'
          ],
          [
            'menu_id' => '21',
            'name' => 'Foto Formulir F-2.29 yang sudah diisi',
            'link' => 'https://google.com'
          ],
          [
            'menu_id' => '21',
            'name' => 'Foto Surat Keterangan Kematian Dari Kelurahan',
            'link' => null
          ],
          [
            'menu_id' => '21',
            'name' => 'Foto Akta kelahiran',
            'link' => null
          ],
          [
            'menu_id' => '21',
            'name' => 'Foto surat keterangan kematian dari rumah sakit',
            'link' => null
          ],
          [
            'menu_id' => '21',
            'name' => 'Foto KTP',
            'link' => null
          ],
          [
            'menu_id' => '21',
            'name' => 'Foto KK',
            'link' => null
          ],
          [
            'menu_id' => '21',
            'name' => 'Foto surat nikah/akta perkawinan',
            'link' => null
          ],
          [
            'menu_id' => '21',
            'name' => 'Foto Surat Keputusan pengadlian yang mempunyai kekuatan hukum tetap jika kematian diatas 5 tahun',
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
