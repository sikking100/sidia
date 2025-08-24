import Admin from "@/layouts/admin";
import DesaForm from "./form";
import { District } from "@/types";

interface Props {
    district: District
}

export default function PenggunaCreate({ district }: Props) {
    return (
        <Admin>
            <DesaForm district={district} />
        </Admin>
    )
}
