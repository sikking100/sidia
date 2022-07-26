import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import DistrictForm from '@/Pages/Admin/District/Form'

export default function DistrictCreate() {
    return (
        <Authenticated header={<h2>Kecamatan</h2>}>
            <DistrictForm />
        </Authenticated>
    )
}
