import { DesaApplication, Hamlet, Menu } from "@/types"
import Admin from "@/layouts/admin"
import DesaApplicationForm from "./form"

interface Props {
    hamlets: Hamlet[]
    menu: Menu
    category: string
    application?: DesaApplication
    isKelurahan?: boolean
}

export default function DesaApplicationEdit({ hamlets, menu, category, application, isKelurahan }: Props) {
    return (
        <Admin>
            <DesaApplicationForm hamlets={hamlets} menu={menu} category={category} application={application} isKelurahan={isKelurahan} />
        </Admin>
    )
}
