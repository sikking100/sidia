import { DesaApplication, Hamlet, Menu } from "@/types"
import Admin from "@/layouts/admin"
import DesaApplicationForm from "./form"

interface Props {
    hamlets: Hamlet[]
    menu: Menu
    category: string
    application?: DesaApplication
}

export default function DesaApplicationEdit({ hamlets, menu, category, application }: Props) {
    return (
        <Admin>
            <DesaApplicationForm hamlets={hamlets} menu={menu} category={category} application={application} />
        </Admin>
    )
}
