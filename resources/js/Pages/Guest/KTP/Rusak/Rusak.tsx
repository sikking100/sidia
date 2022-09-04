import React from 'react'
import Guest from '@/Layouts/Guest'
import { Head } from '@inertiajs/inertia-react'
import Form from '@/Pages/Guest/Form'

export default function Rusak(props: any) {
  console.log(props)
  return (
    <Guest
      title='KTP-Rusak'>
      <Head title={'KTP-Rusak'} />
      <Form
        category={'KTP-Rusak'}
        subtitle={'Pembuatan Dokumen KTP Baru'}
        terms={[
          'KTP-el (rusak)',
          'KK Asli (Pada saat pengambilan KTP-el lampirkan Fotocopy KK)'
        ]}
      />
    </Guest>
  )
}
