export interface Applicant {
  family_head_name: string
  family_card_number: string
  category: string
  name: string
  id_card_number: string
  sex: string
  religion: string
  phone: string
  email: string
  district: string
  ward: string
  problem?: string
  description: string
  id?: number
  file_id_card?: string | null | File
  file_family_card?: string | null | File
  file_lost_letter?: string | null | File
  images: string | File | undefined
  status?: string
  status_description?: string | null
}

export interface District {
  id: number
  name: string
}

export interface Ward {
  id: number
  district_id: number
  name: string
}

export interface Requirement {
  id: number
  link?: string
  menu_id: number
  name: string
}

export interface Files {
  name: string
  place: string
}

export const subtitle: Map<string, string> = new Map<string, string>([
  ['KTP-Pemula', 'KTP Baru'],
  ['KTP-Rusak', 'KTP Rusak'],
  ['KTP-Perubahan', 'KTP Perubahan Data'],
  ['KTP-Hilang', 'KTP Hilang'],
  ['KTP-Disabilitas', 'Perekaman Disabilitas'],
  //kk
  ['KK-Baru', 'KK Baru'],
  ['KK-Rusak', 'KK Rusak'],
  ['KK-Hilang', 'KK Hilang'],
  ['KK-Perubahan-Data', 'KK Perubahan Data'],
  //KIA
  ['KIA-Baru', 'KIA Baru'],
  ['KIA-Rusak', 'KIA Rusak'],
  ['KIA-Hilang', 'KIA Hilang'],
  ['KIA-Perubahan-Data', 'KIA Perubahan Data'],
  ['SKPWNI-Pindah-Keluar', 'SKPWNI Pindah Keluar'],
  ['Akta-Kelahiran-Baru', 'Akta Kelahiran Baru'],
  ['Akta-Kelahiran-Rusak', 'Akta Kelahiran Rusak'],
  ['Akta-Kelahiran-Hilang', 'Akta Kelahiran Hilang'],
  ['Akta-Kelahiran-Perubahan', 'Akta Kelahiran Perubahan'],
  ['Perkawinan', 'Akta Perkawinan'],
  ['Perceraian', 'Akta Perceraian'],
  ['Kematian', 'Akta Kematian'],
  ['Pengaduan-Data-Kependudukan', 'Pengaduan Data Kependudukan'],
]);

export const persyaratan: Map<string, string[]> = new Map<string, string[]>([
  ['KTP-Pemula', ['KK terbaru']],
  ['KTP-Rusak', [
    'KTP-el (rusak)',
    'KK Asli (Pada saat pengambilan KTP-el lampirkan Fotocopy KK)'
  ]],
  ['KTP-Perubahan', [
    'KTP-el asli',
    'KK Asli (Pada saat pengambilan KTP-el lampirkan Fotocopy KK)',
    'Catatan : ',
    'KTP lama wajib diserahkan pada saat pengambilan dokumen'
  ]],
  ['KTP-Hilang', [
    'Foto copy KTP-el (jika masih ada)',
    'KK Asli (Pada saat pengambilan KTP-el lampirkan Fotocopy KK)',
    'Surat keterangan hilang dari kepolisian',
  ]],
  ['KTP-Disabilitas', [
    'Kartu Keluarga'
  ]],
  //kk
  ['KK-Baru', [
    '1.Mengisi  Formulir F-1.01',
    '2.Mengisi  Formulir F-1.15 (DOWNLOAD)',
    '3.KTP',
    '4.KK / Surat Pindah',
    '5.Buku Nikah',
    '6.Surat Keterangan Gol Darah Bagi yang Belum ada di Dalam KK',
    'Catatan : ',
    'Pengurusan KK dilakukan di kelurahan sampai dengan kecamatan',
  ]],
  ['KK-Rusak', [
    '1.KK yang Rusak',
    '2.KTP',
    '3.Buku Nikah',
    '4.Surat Keterangan Gol Darah Bagi yang Belum Ada Di Dalam KK',
    'Catatan :',
    'Pengurusan KK dilakukan di kelurahan sampai dengan kecamatan',
  ]],
  ['KK-Hilang', [
    '1.Surat Kehilangan KK dari Kepolisian',
    '2.KTP',
    '3.Buku Nikah',
    '4.Surat Keterangan Gol Darah Bagi yang Belum Ada Di Dalam KK',
    'Catatan :',
    'Pengurusan KK dilakukan di kelurahan sampai dengan kecamatan',
  ]],
  ['KK-Perubahan-Data', [
    '1.Mengisi Formulir F-1.16',
    '2.KK',
    '3.KTP',
    '4.Buku Nikah',
    '5.Surat Keterangan Gol Darah Bagi yang Belum ada di Dalam KK',
    '6.Berkas Pendukung Sesuai dengan Perubahan Data (buku nikah,ijazah,akta kelahiran,SK)',
    'Catatan :',
    'Pengurusan KK dilakukan di kelurahan sampai dengan kecamatan',
  ]],
  //KIA
  ['KIA-Baru', [
    '1.KTP suami/istri asli dan foto copy',
    '2.KK asli dan foto copy',
    '3.Akta kelahiran asli dan foto copy',
    '4.Pas foto berwarna ukuran 4 x 6 sebanyak 1 lembar bagi usia 6 th s/d 17 th kurang 1 hari',
  ]],
  ['KIA-Rusak', [
    '1.foto kia rusak',
    '2.KK',
    '3.Foto anak umur 5 tahun',
  ]],
  ['KIA-Hilang', [
    '1.Surat Kehilangan KIA dari Kepolisian',
    '2.KK',
    '3.Foto / FC KIA hilang (jika masih ada)',
  ]],
  ['KIA-Perubahan-Data', [
    '1.Foto KIA asli',
    '2.Pas Foto terbaru berwarna ukuran 4 x 6 cm sebanyak 1 lembar',
    '3.KK',
  ]],
  ['SKPWNI-Pindah-Keluar', [
    '1.Formulir F 1.03',
    '2.KK asli.',
    '3.KTP asli yang pindah/surat kehilangan jika KTP pindah',
    '4.Buku nikah/Akta perkawinan.',
    '5.Surat cerai/Akta perceraian bagi yang berstatus janda/duda, jika berstatus cerai mati melampirkan akta kematian',
    '6.Melengkapi dokumen pendukung yang diperluakan ( fotocopy kenal lahir/akta kelahiran, fotocopy ijazah, surat keterangan gol darah dan lain-lain. Apabila cetak KK baru).',
    '7.Surat Keterangan gol darah (seluruh anggota keluarga yang ada di KK)',
  ]],
  ['Akta-Kelahiran-Baru', [
    '1.Mengisi formulir F-2.01',
    '2.Surat kelahiran asli dari (Bidan/RSU/Puskesmas dll).',
    '3.KTP orangtua.',
    '4.KK orangtua.',
    '5.Buku nikah/akta perkawinan orangtua.',
    '6.KK saksi-saksi kelahiran (2 orang saksi).',
    '7.Surat pernyataan bagi pemohon yang berumur lebih dari 1 tahun.',
    '8.surat keterangan golongan darah atau ',
    'Bagi WNA syaratnya ditambah :',
    '1.Pasport',
    '2.Surat Tanda Lapor Diri (STLD) dari kepolisian.',
    ' ',
    'Catatan :',
    '1.SPTJM kebenaran data kelahiran bila tidak memiliki surat lahir',
    '2.SPTJM kebenaran sebagai pasangan suami istri bila tidak memiliki Surat Nikah/Akta Perkawinan orangtua',
    '3.Surat pernyataan perubahan data kependudukan (jika ada perubahan di buku nikah atau di kk tidak sma namanya)',
  ]],
  ['Akta-Kelahiran-Rusak', [
    '1.KTP',
    '2.KK',
    '3.Foto Akta kelahiran yang rusak',
    '4.Surat Permohonan Akta kelahiran Kutipan Kedua',
    ' ',
    'Catatan :',
    ' ',
    'Dokumen Fisik Akta Kelahiran Rusak Harus Ada',
  ]],
  ['Akta-Kelahiran-Hilang', [
    '1.KTP',
    '2.KK',
    '3.Surat Kehilangan Akta Kelahiran Dari Kepolisian',
    '4.Foto Copy Akta Kelahiran',
    '5.Surat Permohonan Kutipan Kedua',
    ' ',
    'Catatan :',
    ' ',
    'Dokumen Fisik Akta Kelahiran Rusak Harus Ada',
  ]],
  ['Akta-Kelahiran-Perubahan', [
    '1.Mengisi Formulir F-2.49',
    '2.Surat Permohonan perubahan akta kelahiran',
    '3.KTP',
    '4.KK',
    '5.Akta Kelahiran Asli',
    '6.Buku Nikah Orang tua',
    ' ',
    'Catatan :',
    ' ',
    'Dokumen Fisik Akta Kelahiran Rusak Harus Ada',
  ]],
  ['Perkawinan', [
    '1.Mengisi formulir F-2.01',
    '2.Surat untuk kawin dari kelurahan',
    '3.akta kelahiran calon pengantin asli dan fotocopy.',
    '4.KK calon pengantin asli dan fotocopy.',
    '5.akta kematian/perceraian bagi yang berstatus janda/duda.',
    '6.Pas foto berdampingan calon pengantin 4 x 6 cm sebanyak 4 lembar.',
    '7.Izin orang tua bagi mereka yang belum berusia 21 tahun.',
    '8.Izin orang tua bagi mereka yang (berusia dari 19 tahun) dengan melampirkan dispensasi dari pengadilan negeri.',
    '9.Izin komandan bagi anggota ABRI.',
    '10.Perkawinan kedua dan seterusnya melampirkan penetapan pengadilan (Izin perkawinan).',
    ' ',
    'Pembuatan akta perkawinan bagi WNA ditambah',
    '11.Passport',
    '12.SKLD(Surat Keterangan Lapor Diri) dari kepolisian.',
    '13.Izin dari kedutaan.',
    ' ',
    'Catatan :',
    ' ',
    ' ',
    ' ',
    'Prosedur untuk mendapatkan akta perkawinan',
    'a.Pemohon melengkapi persyaratan ',
    'b.10 hari kemudian (suami dan istri) beserta 2 orang saksi menendatangani persetujuan pencatatan kawin, bila pengumuman perkawinan yang diumumkan pada Dinas Kependudukan dan Pencatatan Sipil tidak ada yang menyanggah',
    'c.Pengantin mendapatkan akta perkawinan',
  ]],
  ['Perceraian', [
    '1.Mengisi formulir F-2.01',
    '2.Surat keputusan pengadilan yang mempunyai kekuatan hukum tetap.',
    '3.Akta perkawinan suami istri asli',
    '4.KTP suami istri asli dan fotocopy.',
    '5.KK suami istri asli dan Fotocopy.',
    'Bagi WNA :',
    '6.Paspor dokumen migrasi asli dan fotocopy .',
  ]],
  ['Kematian', [
    '1.Mengisi formulir F-2.01',
    '2.Surat keterangan kematian dari kelurahan.',
    '3.Akta kelahiran asli dan fotocopy',
    '4.Surat keterangan  kematian dari rumah sakit.',
    '5.KTP asli dan fotocopy.',
    '6.KK asli dan Fotocopy.',
    '7.surat nikah/akta perkawinan asli dan fotocopy.',
    '8.surat keputusan pengadilan yang mempunyai kekuatan hukum tetap jika kematian diatas 5 tahun.'
  ]],
  ['Pengaduan-Data-Kependudukan', [
    '1.KTP',
    '2.KK',
  ]],
])

export const permasalahan = [
  'BPJS',
  'BPN',
  'NPWP',
  'BANK',
  'Registrasi Sim Card',
  'Daftar Nikah',
  'Migrasi',
  'Lainnya',
]
