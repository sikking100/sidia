import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import UserForm from './Form'

export default function UserCreate() {
    return (
        <Authenticated header={<h2>User</h2>}>
            <UserForm />
        </Authenticated>
    )
}
