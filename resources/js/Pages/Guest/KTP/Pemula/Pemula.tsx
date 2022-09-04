import React from 'react'
import Guest from '@/Layouts/Guest'
import { Head } from '@inertiajs/inertia-react'
import Form from '@/Pages/Guest/Form'
import { persyaratan } from '@/Interface/Interface'

export default function Pemula(props: any) {
  return (
    <Guest
      title='KTP-Pemula'>
      <Head title={'KTP-Pemula'} />
      <Form
        category={'KTP-Pemula'}
      />
    </Guest>
  )
}
