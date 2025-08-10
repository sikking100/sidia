import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import DistrictForm from '@/Pages/Admin/District/Form'
import { Applicant, District, Hamlet, Menu, Requirement } from '@/Interface/Interface'
import HamletForm from './Form'
import DesaApplicationForm from './Form'

interface Props {
  filess?: Array<File>
  applicant: Applicant
  category: string
  hamlets: Array<Hamlet>
  menu: Menu
  requirements: Array<Requirement>
}

export default function DesaApplicationEdit(props: Props) {
  return (
    <Authenticated header={<h2>Dusun</h2>}>
      <DesaApplicationForm
        filess={props.filess}
        applicant={props.applicant}
        category={props.category}
        hamlets={props.hamlets}
        menu={props.menu}
        requirements={props.requirements}
      />
    </Authenticated>
  )
}
