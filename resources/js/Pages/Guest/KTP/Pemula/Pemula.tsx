import React from 'react'
import Guest from '@/Layouts/Guest'
import { Head } from '@inertiajs/inertia-react'
import Form from '@/Pages/Guest/Form'

export default function Pemula(props: any) {
  console.log(props)
  return (
    <Guest
      title='KTP-Pemula'>
      <Head title={'KTP-Pemula'} />
      <Form
        category={'KTP-Pemula'}
        subtitle={'Pembuatan Dokumen KTP Baru'}
        terms={[
          'KK terbaru'
        ]}
      />
    </Guest>
  )
}
