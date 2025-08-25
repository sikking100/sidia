import Admin from "@/layouts/admin";
import { Menu } from "@/types";
import KategoriForm from "./form";

interface Props {
    menu: Menu
}

export default function KategoriEdit({ menu }: Props) {
    return (
        <Admin>
            <KategoriForm menu={menu} />
        </Admin>
    )
}
