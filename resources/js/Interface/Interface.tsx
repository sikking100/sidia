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
  created_at?: string | null
  files?: string | null
  ticket?: string | null
  upload?: string | null
  filess?: Array<Files>
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

export interface Menu {
  id: number
  id_citigov: number
  name: string
  name_citigov: string
  description: string
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
    '1.Membawa formulir isisan kartu keluarga (KK) dari desa/kelurahan',
    '2.Membawa SKPWNI (bagi penduduk pindah datang)',
    '3.Membawa buku nikah/akta perkawinan (bagi pasangan baru menikah dan/atau bagi pasangan jika status dalam KK "kawin belum tercatat")',
    '4.Membawa Surat Keterangan kelahiran putra/putri pemohon yang akan menjadi anggota keluarga baru dalam Kartu Keluarga (KK) (jika ada penambahan anggota keluarga)',
    '5.Membawa Surat Keterangan Kematian (jika ada pengurangan anggota keluarga)',
  ]],
  ['KK-Rusak', [
    '1.Membawa KK yang Rusak ( Harap dibawa pada saat pengambilan KK Baru )',
    '2.Buku nikah/akta nikah (bagi pasangan jika status dalam KK “kawin belum tercatat”)',
  ]],
  ['KK-Hilang', [
    '1.Membawa Surat Keterangan Hilang dari desa atau kelurahan',
    '2.Membawa Buku nikah/akta nikah (bagi pasangan jika status dalam KK “kawin belum tercatat”)',
  ]],
  ['KK-Perubahan-Data', [
    '1.Membawa Ijazah atau berkas data dukung perubahan data lainnya',
    '2.Membawa KK Asli',
    '3.Membawa Buku nikah/akta nikah (bagi pasangan jika status dalam KK “kawin belum tercatat”)',
  ]],
  //KIA
  ['KIA-Baru', [
    '1.Kutipan akta kelahiran',
    '2.Kartu Keluarga (KK)',
    '3.Membawa Pas Foto anak ukuran 2x3 (1 lembar) (untuk anak usia 5 tahun s/d 17 tahun kurang 1 hari)',
  ]],
  ['KIA-Rusak', [
    '1.KIA yang rusak',
    '2.Kartu Keluarga (KK)',
    '',
    'Catatan :',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    'Harap membawa KIA yang sudah rusak pada saat pengambilan KIA Baru'
  ]],
  ['KIA-Hilang', [
    '1.Membawa Surat Keterangan Hilang dari desa atau kelurahan',
    '2.KK',
  ]],
  ['KIA-Perubahan-Data', [
    '1.Membawa Ijazah atau berkas data dukung perubahan data lainnya',
    '2.Membawa KIA Asli',
    '3.Kartu Keluarga (KK)',
  ]],
  ['SKPWNI-Pindah-Keluar', [
    '1.Membawa Surat Keterangan Pindah dari desa atau kelurahan',
    '2.Membawa KK asli',
    '3.Membawa KTP-El',
  ]],
  ['Akta-Kelahiran-Baru', [
    '1.Membawa surat keterangan lahir dari Dokter / Bidan / Penolong kelahiran/ Rumah Sakit/ Puskesmas dan atau Rumah Bersalin',
    '2.Membawa Form isian akta kelahiran dari desa / kelurahan',
    '3.Membawa Buku nikah/akta perkawinan orang tua',
    '4.KK Asli ( jika yang bersangkutan belum ditambahkan dalam KK )',
    '5.KK ( jika yang bersangkutan sudah ditambahkan dalam KK )',
    'Bagi WNA syaratnya ditambah :',
    '1.Pasport',
    '2.Surat Tanda Lapor Diri (STLD) dari kepolisian.',
  ]],
  ['Akta-Kelahiran-Rusak', [
    '1.Foto Akta kelahiran yang rusak',
    '2.KK',
    ' ',
    'Catatan :',
    ' ',
    'Harap membawa Akta yang sudah rusak pada saat pengambilan Akta Baru',
  ]],
  ['Akta-Kelahiran-Hilang', [
    '1.Membawa Surat Keterangan Hilang dari Desa atau Kelurahan',
    '2.KK',
  ]],
  ['Akta-Kelahiran-Perubahan', [
    '1.Membawa Fotokopi Ijazah ( atau berkas data dukung perubahan data lainnya )',
    '2.Membawa Akta Lahir asli',
  ]],
  ['Perkawinan', [
    '1.Membawa Formulir N1-N4 dari desa/kelurahan',
    '2.Surat Nikah Agama',
    '3.KK orang tua',
    '4.KTP-El suami-istri',
    '5.KTP-El masing-masing saksi',
    '6.Membawa Pas foto kembar 4X6 (3 lembar)',
  ]],
  ['Perceraian', [
    '1.Membawa Salinan Putusan Pengadilan',
    '2.Membawa Akta Perkawinan asli',
    '3.KTP-El suami-istri',
    '4.Membawa Kartu Keluarga Asli',
  ]],
  ['Kematian', [
    '1.Membawa Surat keterangan kematian dari Desa / Kelurahan',
    '2.Membawa KTP-El asli yang bersangkutan',
    '3.Membawa KK Asli yang bersangkutan',
    '',
    'Catatan :',
    '',
    '',
    'Diharapkan untuk membawa persyaratan di atas pada saat pengambilan Akta'
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
