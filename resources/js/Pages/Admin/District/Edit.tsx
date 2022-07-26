import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import DistrictForm from '@/Pages/Admin/District/Form'
import { District } from '@/Interface/Interface'

interface Props {
  district: District
}

export default function DistrictEdit(props: Props) {
  return (
    <Authenticated header={<h2>Kecamatan</h2>}>
      <DistrictForm
        district={props.district} />
    </Authenticated>
  )
}
