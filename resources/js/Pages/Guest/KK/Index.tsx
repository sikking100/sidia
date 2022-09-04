import React from 'react'
import Guest from '@/Layouts/Guest'
import { Head } from '@inertiajs/inertia-react'
import Form from '@/Pages/Guest/Form'

export default function Kk() {
  return <Guest
    title='KTP-Rusak'>
    <Head title={'KK-Baru'} />
    <Form
      category={'KK-Baru'}
      subtitle={''}
      terms={[
        'KTP-el (rusak)',
        'KK Asli (Pada saat pengambilan KTP-el lampirkan Fotocopy KK)'
      ]}
    />
  </Guest>
}
