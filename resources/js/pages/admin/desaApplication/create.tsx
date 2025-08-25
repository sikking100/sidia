import Admin from "@/layouts/admin";
import DesaApplicationForm from "./form";
import { Hamlet, Menu } from "@/types";

interface Props {
    hamlets: Hamlet[]
    menu: Menu
    category: string
}

export default function DesaApplicationCreate({ hamlets, menu, category }: Props) {
    return (
        <Admin>
            <DesaApplicationForm hamlets={hamlets} menu={menu} category={category} />
        </Admin>
    )
}
