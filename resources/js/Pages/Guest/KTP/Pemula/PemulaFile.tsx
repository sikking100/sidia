import React from 'react'
import Guest from '@/Layouts/Guest'
import  { Head, usePage, useForm } from '@inertiajs/inertia-react'
import {Inertia} from '@inertiajs/inertia'
import Alert from '@/Components/Alert'
import Container from '@/Components/Container'
import Label from '@/Components/Label'
import Input from '@/Components/Input'
import route from 'ziggy-js'
import {Applicant} from '@/Interface/Interface'
import Button from '@/Components/Button'

interface Props {
    application: Applicant
}

interface PemulaFileProps {
    file_family_card: File | null
}

export default function PemulaFile({application}: Props) {
    console.log(application.id)
  const [showAlert, setShowAlert] = React.useState(true)
  const { flash } = usePage().props
  const f = flash as { message: string }

  const { data,setData, processing } = useForm<PemulaFileProps>({
      file_family_card: null,
  })

  function onSubmit(e: React.ChangeEvent<HTMLFormElement>) {
      e.preventDefault()
      Inertia.post(route('pemula.action', application.id), {
          'file_family_card': data.file_family_card,
          'category': application.category,
          '_method': 'PUT',
      })
      return

  }
  return (
    <Guest
      title='KTP-Pemula'>
      <Head title={'KTP-Pemula'} />
      <Alert
        message={f.message}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
      />
      <Container>
        <h5 className={'text-lg font-bold'}>
          Formulir Persyaratan
        </h5>
        <span className={'text-sm font-thin text-gray-500'}>
          Upload File
        </span>
        <form onSubmit={onSubmit}>
          <Label forInput={'kk'} className={'w-full pt-6 pb-2'} value={'KK'} />
          <Input
            className={'files'}
            type={'file'}
            handleChange={e => {
              const files = e.target.files
              if (files != null) {
                setData('file_family_card', files[0])
              }
            }}
            name={'file_family_card'}
          />
            <Button processing={processing}>Simpan</Button>
        </form>
      </Container>
    </Guest>
  )
}
