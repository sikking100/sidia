import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import DesaApplicationForm from './Form'
import { Hamlet, Menu, Requirement } from '@/Interface/Interface'

interface Props {
    category: string
    hamlets: Array<Hamlet>
    menu: Menu
    requirements: Array<Requirement>
}

export default function DesaApplicationCreate({ category, hamlets, requirements, menu }: Props) {
    return (
        <Authenticated header={<h2>Dusun</h2>}>
            <DesaApplicationForm category={category} hamlets={hamlets} requirements={requirements} menu={menu} />
        </Authenticated>
    )
}
