import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Applicant, persyaratan, Files, Menu, Requirement, DesaApplication } from '@/Interface/Interface'
import Button from '@/Components/Button'
import Label from '@/Components/Label'
import Input from '@/Components/Input'
import { ErrorText } from '@/Components/Error'
import { Link, useForm } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'

import { Modal } from 'flowbite-react'
import route from 'ziggy-js'
import axios from 'axios'
import { url } from 'inspector'
import { getStatus } from '@/Functions/functions'
import { Parser } from 'html-to-react'


interface FileTicket {
  TypeName: string
  FilePath: string
  FileName: string
}
interface Props {
  desaApplication: DesaApplication
  files: Array<Files>
  menu: Menu
  requirements: Array<Requirement>
}

interface FormUpdateStatus {
  status: string
  status_description: string
}

export default function DesaApplicationShow({ desaApplication, files, menu, requirements }: Props) {
  const [showModal, setShowModal] = React.useState<boolean>(false)
  function onReady(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault()
    Inertia.get(route('desa.edit', desaApplication.id))
  }

  function onSelesai(e: React.FormEvent<HTMLButtonElement>) {
    console.log('tes')
    e.preventDefault()
    Inertia.post(route('status', desaApplication.id), {
      'status': 'COMPLETED',
      'status_description': 'Selesai',
      '_method': 'PUT',
    })
  }

  function onRevisi(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault()
    setData('status', 'DEFFICIENT')
    setShowModal(!showModal)
  }

  function onTolak(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault()
    setData('status', 'CANCEL')
    setShowModal(!showModal)
  }

  function onVerified(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault()
    setData('status', 'VERIFIED')
    setShowModal(!showModal)
    return
  }

  const { data, errors, setData, put, get } = useForm<FormUpdateStatus>({
    status: '',
    status_description: ''
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.log(data)
    put(route('status', desaApplication.id))
    // setShowModal(!showModal)
    return
  }

  function handleClick(e: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>, name: string) {
    e.preventDefault()
    window.open(route('photo', name))
  }

  return (
    <Authenticated
      header={<h2>Pemohon</h2>}
    >
      <div className={'container mx-auto bg-white rounded w-full p-6'}>
        {
          desaApplication.status === 'DEFFICIENT' ? <Button
            onClick={onReady}
            type={'button'}
            className={'mb-6 mr-6'}
            processing={false}
          >
            REVISI DATA
          </Button> : <div></div>
        }
        <h5 className={'block text-lg font-bold'}>Persyaratan</h5>
        <div className={'bg-green-200 p-6 rounded mt-4 mb-4 text-green-800 font-bold'}>
          <p>Berkas Upload :</p>
          {requirements.map((v, i) => <p key={i}>{v.name}</p>)}
          {/* {persyaratan.get(desaApplication.category)?.map((v, i) => <p key={i}>{v}</p>)} */}

          {menu.description === null || menu.description === '' ? <div></div> : <div>
            <p>Persyaratan Tambahan :</p>
            <div className="prose">
              {Parser().parse(menu.description)}
            </div>
          </div>}

        </div>
        <table>
          <tbody>


            <tr>
              <td>Status</td>
              <td>:</td>
              <td>{getStatus(desaApplication.status ?? '')}</td>
            </tr>
            <tr>
              <td>Deskripsi Status</td>
              <td>:</td>
              <td>{desaApplication.status_description}</td>
            </tr>
            <tr>
              <td>Nik</td>
              <td>:</td>
              <td>{desaApplication.id_card_number}</td>
            </tr>
            <tr>
              <td>Nama</td>
              <td>:</td>
              <td>{desaApplication.name}</td>
            </tr>
            <tr>
              <td>Nomor HP</td>
              <td>:</td>
              <td>{desaApplication.phone}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>:</td>
              <td>{desaApplication.email}</td>
            </tr>
            <tr>
              <td>Keterangan</td>
              <td>:</td>
              <td>{desaApplication.description}</td>
            </tr>
            <tr>
              <td>Kategori</td>
              <td>:</td>
              <td>{desaApplication.category}</td>
            </tr>
          </tbody>

        </table>
        {
          <div>
            <div className={'mt-6'}>
              Foto Wajah jelas
              <img src={`../../storage/images/${desaApplication.images}`} className={'h-40'} />


            </div>
            {files.map((v, k) => {
              if (v.name.includes('Hasil')) {
                return <div></div>
              }
              return <div className={'mt-6'} key={k}>
                <p>{v.name}</p>
                <img src={`../../storage/${v.place}`} />
              </div>
            })}
          </div>
        }



      </div>
    </Authenticated >
  )
}
