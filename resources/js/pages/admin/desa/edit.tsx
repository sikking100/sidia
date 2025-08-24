import { District, Ward } from "@/types"
import Admin from "@/layouts/admin"
import DesaForm from "./form"

interface Props {
    district: District
    ward?: Ward
}

export default function KecamatanEdit({ district, ward }: Props) {
    return (
        <Admin>
            <DesaForm district={district} ward={ward} />
        </Admin>
    )
}
