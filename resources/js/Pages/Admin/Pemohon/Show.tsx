import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Applicant } from '@/Interface/Interface'
import Button from '@/Components/Button'
import route from 'ziggy-js'

interface Props {
  application: Applicant
}

export default function PemohonShow({ application }: Props) {
  function onClick(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault()
    window.open(route('application.edit', application.id))
  }
  return (
    <Authenticated
      header={<h2>Pemohon</h2>}
    >
      <div className={'container mx-auto bg-white rounded w-full p-6'}>
        <Button
          onClick={onClick}
          type={'button'}
          className={'mb-6'}
          processing={false}
        >
          Pdf
        </Button>
        <table>
          <tbody>
            <tr>
              <td>Nik</td>
              <td>:</td>
              <td>{application.id_card_number}</td>
            </tr>
            <tr>
              <td>Nama</td>
              <td>:</td>
              <td>{application.name}</td>
            </tr>
            <tr>
              <td>Nomor HP</td>
              <td>:</td>
              <td>{application.phone}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>:</td>
              <td>{application.email}</td>
            </tr>
            <tr>
              <td>Keterangan</td>
              <td>:</td>
              <td>{application.description}</td>
            </tr>
            <tr>
              <td>Kategori</td>
              <td>:</td>
              <td>{application.category}</td>
            </tr>
          </tbody>

        </table>
        <div className={'mt-6'}>
            <img src={`../../storage/images/${application.images}`} />
          {application.file_id_card && <img src={`../../storage/${application.category}/${application.file_id_card}`} />}
          {application.file_family_card && <img src={`../../storage/${application.category}/${application.file_family_card}`} />}
          {application.file_lost_letter && <img src={`../../storage/${application.category}/${application.file_lost_letter}`} />}
        </div>
      </div>
    </Authenticated >
  )
}
