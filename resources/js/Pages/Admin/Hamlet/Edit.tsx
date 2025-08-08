import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import DistrictForm from '@/Pages/Admin/District/Form'
import { District } from '@/Interface/Interface'

interface Props {
  district: District
}

export default function HamletEdit(props: Props) {
  return (
    <Authenticated header={<h2>Dusun</h2>}>
      <DistrictForm
        district={props.district} />
    </Authenticated>
  )
}
