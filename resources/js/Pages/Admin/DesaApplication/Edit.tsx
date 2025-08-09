import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import DistrictForm from '@/Pages/Admin/District/Form'
import { District, Hamlet } from '@/Interface/Interface'
import HamletForm from './Form'
import DesaApplicationForm from './Form'

interface Props {
  hamlet: Hamlet
}

export default function DesaApplicationEdit(props: Props) {
  return (
    <Authenticated header={<h2>Dusun</h2>}>
      <DesaApplicationForm
        hamlet={props.hamlet} />
    </Authenticated>
  )
}
