import { Files } from "@/Interface/Interface"
import axios from "axios"
import { useEffect, useState } from "react"

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

export function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);

    handleResize(); // cek saat mount

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}

export const getFileType = (file: Files) => {
  const ext = file.place.split('.').pop()?.toLowerCase();
  return ext === 'pdf' ? 'pdf' : 'image';
};
