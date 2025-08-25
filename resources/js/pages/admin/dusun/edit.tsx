import { Hamlet } from "@/types"
import Admin from "@/layouts/admin"
import DusunForm from "./form"

interface Props {
    hamlet: Hamlet
}

export default function DusunEdit({ hamlet }: Props) {
    return (
        <Admin>
            <DusunForm hamlet={hamlet} />
        </Admin>
    )
}
