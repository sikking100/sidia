import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import DistrictForm from '@/Pages/Admin/District/Form'
import { District, User } from '@/Interface/Interface'
import UserForm from './Form'

interface Props {
  user: User
}

export default function UserEdit(props: Props) {
  return (
    <Authenticated header={<h2>User</h2>}>
      <UserForm
        user={props.user} />
    </Authenticated>
  )
}
