import { Filess } from "@/types"

export const defImage = 'https://www.chanchao.com.tw/images/default.jpg'

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

export const getStatus = (status: string): string => {
    switch (status) {
        case 'PENDING': return 'Pending'
        case 'COMPLETED': return 'Selesai'
        case 'COMPLETED_FILE': return 'Selesai'
        case 'DEFFICIENT': return 'Berkas tidak sesuai'
        case 'VERIFIED': return 'Terverfikasi'
        case 'REVISED' : return 'Sudah direvisi'
        default: return 'Tertolak'
    }
}

export const getStatusBerkas = (status: string|number): string => {
    switch (status) {
        case '1': return 'Disetujui'
        case '2': return 'Ditolak'
        default: return 'Pending'
    }
}

export const checkFile = (name: string, id: number, files: Filess[]): Filess | undefined => {

    const file = files.find(e => {
      return e.name === name
    })
    return file === undefined ? undefined : file

  }

export const getFileType = (file: Filess | null) => {
  if (file == null) return 'image'
  const ext = file.place.split('.').pop()?.toLowerCase();
  return ext === 'pdf' ? 'pdf' : 'image';
};

export const statusOptions = ['PENDING', 'DEFFICIENT', 'REVISED', 'VERIFIED', 'COMPLETED', 'CANCEL']

export const isTicket = (ticket: string): boolean => {
        return ticket.at(0) !== 'S' || ticket.at(0) !== 'J';
    }
