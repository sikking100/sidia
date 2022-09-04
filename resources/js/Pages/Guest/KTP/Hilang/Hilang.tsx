
import React from 'react'
import Guest from '@/Layouts/Guest'
import { Head } from '@inertiajs/inertia-react'
import Form from '@/Pages/Guest/Form'

export default function Hilang(props: any) {
  console.log(props)
  return (
    <Guest
      title='KTP-Hilang'>
      <Head title={'KTP-Hilang'} />
      <Form
        category={'KTP-Hilang'}
        subtitle={'Pembuatan Dokumen KTP Baru'}
        terms={[
          'Foto copy KTP-el (jika masih ada)',
          'KK Asli (Pada saat pengambilan KTP-el lampirkan Fotocopy KK)',
          'Surat keterangan hilang dari kepolisian',
        ]}
      />
    </Guest>
  )
}
