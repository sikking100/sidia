import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { District } from '@/Interface/Interface'
import WardForm from '@/Pages/Admin/Ward/Form'

interface Props {
  district: District
}

export default function WardCreate(props: Props) {
  console.log(props)
  return (
    <Authenticated header={<h2>Kecamatan {props.district.name}</h2>}>
      <WardForm
        district_id={props.district.id}
      />
    </Authenticated>
  )
}
