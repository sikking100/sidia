import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

// export interface User {
//     id: number;
//     name: string;
//     email: string;
//     avatar?: string;
//     email_verified_at: string | null;
//     created_at: string;
//     updated_at: string;
//     [key: string]: unknown; // This allows for additional properties...
// }

export interface User {
  id: number
  ddesa?: Ward | null
  name: string
  email: string
  password: string
  role: string
  phone: string
}


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
  created_at: string | null
  files?: string | null
  ticket?: string | null
  upload?: string | null
  filess: Array<Filess>
  hamlet_id?: number | null
  filessss: FilesForm[]
  pendukung: Pendukung[]
  supports: Array<Filess>

}

export interface CustomComment {
    user_id?: number
    guest_name?: string
    guest_email?: string
    content: string
    created_at: string
}

export interface DesaApplication {
  id?: number
  ticket?: string | null
  id_card_number: string
  family_card_number: string
  family_head_name: string
  category: string
  district: string
  ward: string
  hamlet: string
  name: string
  phone: string
  email: string
  sex: string
  religion: string
  images: string | File | undefined
  description: string
  problem?: string
  status?: string
  status_description?: string | null
  created_at?: string | null
  files?: string | null
  filess?: Array<Files>
  supports?: Array<Files>
}

export interface Meta {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface DesaApplicationPost {
  hamlet: string
  id_card_number: string
  family_card_number: string
  family_head_name: string
  category: string
  name: string
  phone: string
  email: string
  sex: string
  religion: string
  images: string | File | undefined
  description: string
  problem?: string
  filessss: FilesForm[]
}

export interface District {
  id: number
  name: string
  wards?: Ward[]
}

export interface Hamlet {
  id: number
  name: string
  ward?: Ward
}

export interface Ward {
  id: number
  district_id: number
  name: string
  hamlets: Hamlet[]
}

export interface Requirement {
  id: number
  link?: string
  menu_id: number
  name: string
  menu?: Menu
  require: number
}

export interface Menu {
  id: number
  id_citigov: number
  name: string
  name_citigov: string
  description: string
  requirements: Requirement[]
}

export type Pendukung = {
  name: string
  filenya?: File
}

export interface FilesForm {
  name: string
  filenya: File
  place: string
}

export interface Filess {
  id: number
  name: string
  place: string
  status?: number
  comment?: string
}

export interface User {
  id: number
  ddesa?: Ward
  name: string
  email: string
  password: string
  role: string
  phone: string
}

export interface ModalProp {
  content: string
  title?: string | null
  buttonTitle?: string | null
  function?: (() => void) | null
  close: () => void | undefined
  show: boolean
}

export interface FlashProps {
  message?: string;
  success?: string;
  error?: string;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface Paginator<T> {
  data: T[]
  links: PaginationLink[]
  current_page: number,
  per_page: number,
}
