import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import DesaApplicationForm from './Form'

export default function DesaApplicationCreate() {
    return (
        <Authenticated header={<h2>Dusun</h2>}>
            <DesaApplicationForm />
        </Authenticated>
    )
}
