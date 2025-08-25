import Admin from "@/layouts/admin";
import { Menu, Requirement } from "@/types";
import PersyaratanForm from "./form";

interface Props {
    requirement: Requirement
    menu: Menu
}

export default function PersyaratanEdit({ requirement, menu }: Props) {
    return (
        <Admin>
            <PersyaratanForm requirement={requirement} menu={menu} />
        </Admin>
    )
}
