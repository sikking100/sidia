
import React from 'react'
import Guest from '@/Layouts/Guest'
import { Head } from '@inertiajs/inertia-react'
import Form from '@/Pages/Guest/Form'

export default function Disabilitas() {
  return (
    <Guest
      title='Perekaman Disabilitas'>
      <Head title={'Perekaman Disabilitas'} />
      <Form
        category={'KTP-Disabilitas'}
        subtitle={'Pembuatan Dokumen KTP Baru'}
        terms={[
          'KTP-el asli',
          'KK Asli (Pada saat pengambilan KTP-el lampirkan Fotocopy KK)',
          'Catatan : ',
          'KTP lama wajib diserahkan pada saat pengambilan dokumen'
        ]}
      />
    </Guest>
  )
}
