import Admin from "@/layouts/admin";
import PersyaratanForm from "./form";
import { Menu } from "@/types";

interface Props {
    menu: Menu
}

export default function PersyaratanCreate({ menu }: Props) {
    return (
        <Admin>
            <PersyaratanForm menu={menu} />
        </Admin>
    )
}
