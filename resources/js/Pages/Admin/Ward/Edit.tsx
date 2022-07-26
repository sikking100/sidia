import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { District } from '@/Interface/Interface'
import { Ward } from '@/Pages/Admin/Ward/Index'
import WardForm from '@/Pages/Admin/Ward/Form'

interface Props {
  district: District
  ward: Ward
}

export default function WardEdit(props: Props) {
  return (
    <Authenticated header={<h2>Kecamatan {props.district.name}</h2>}>
      <WardForm
        district_id={props.district.id}

        ward={props.ward}
      />
    </Authenticated>
  )
}
