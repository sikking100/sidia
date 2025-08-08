import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import DistrictForm from '@/Pages/Admin/District/Form'

export default function HamletCreate() {
    return (
        <Authenticated header={<h2>Dusun</h2>}>
            <DistrictForm />
        </Authenticated>
    )
}
