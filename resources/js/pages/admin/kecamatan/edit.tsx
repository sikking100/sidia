import { District } from "@/types"
import PenggunaForm from "./form"
import Admin from "@/layouts/admin"

interface Props {
    district: District
}

export default function KecamatanEdit({ district }: Props) {
    return (
        <Admin>
            <PenggunaForm district={district} />
        </Admin>
    )
}
