export interface Applicant {
  category: string
  name: string
  id_card_number: string
    sex: string
  phone: string
  email: string
  district: string
  ward: string
  description: string
  id?: number
  file_id_card?: string | null | File
  file_family_card?: string | null | File
  file_lost_letter?: string | null | File
    images: string | File | undefined
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
