
import React from 'react'
import Guest from '@/Layouts/Guest'
import { Head } from '@inertiajs/inertia-react'
import Form from '@/Pages/Guest/Form'

export default function Perubahan() {
  return (
    <Guest
      title='KTP-Perubahan'>
      <Head title={'KTP-Perubahan'} />
      <Form
        category={'KTP-Perubahan'}
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
