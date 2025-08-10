import axios from "axios"

export const getStatus = (status: string): string => {
    switch (status) {
        case 'PENDING': return 'Pending'
        case 'COMPLETED': return 'Selesai'
        case 'DEFFICIENT': return 'Berkas tidak sesuai'
        case 'VERIFIED': return 'Terverfikasi'
        case 'REVISED' : return 'Sudah direvisi'
        default: return 'Tertolak'
    }
}
