import { User } from "@/types"
import PenggunaForm from "./form"
import Admin from "@/layouts/admin"

interface Props {
    user: User
}

export default function PenggunaEdit({ user }: Props) {
    return (
        <Admin>
            <PenggunaForm user={user} />
        </Admin>
    )
}
