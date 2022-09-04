import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Applicant, persyaratan, Files } from '@/Interface/Interface'
import Button from '@/Components/Button'
import Label from '@/Components/Label'
import Input from '@/Components/Input'
import { ErrorText } from '@/Components/Error'
import { useForm } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'

import { Modal } from 'flowbite-react'
import route from 'ziggy-js'

interface Props {
  application: Applicant
  files: Array<Files>
}

interface FormUpdateStatus {
  status: string
  status_description: string
}

export default function PemohonShow({ application, files }: Props) {
  const [showModal, setShowModal] = React.useState<boolean>(false)
  function onClick(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault()
    window.open(route('application.edit', application.id))
  }

  function onSelesai(e: React.FormEvent<HTMLButtonElement>) {
    console.log('tes')
    e.preventDefault()
    Inertia.post(route('status', application.id), {
      'status': 'COMPLETED',
      'status_description': 'Selesai',
      '_method': 'PUT',
    })
  }

  function onTolak(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault()
    setData('status', 'DEFFICIENT')
    setShowModal(!showModal)
  }

  function onVerified(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault()
    setData('status', 'VERIFIED')
    setShowModal(!showModal)
    return
  }

  const { data, errors, setData, put } = useForm<FormUpdateStatus>({
    status: '',
    status_description: ''
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.log(data)
    put(route('status', application.id))
    // setShowModal(!showModal)
    return
  }

  return (
    <Authenticated
      header={<h2>Pemohon</h2>}
    >
      <div className={'container mx-auto bg-white rounded w-full p-6'}>
        {(application.status == 'VERIFIED' || application.status == 'COMPLETED') && <Button
          onClick={onClick}
          type={'button'}
          className={'mb-6 mr-6'}
          processing={false}
        >
          Print Pdf
        </Button>}
        {(application.status == 'VERIFIED') && <Button
          onClick={onSelesai}
          type={'button'}
          className={'mb-6 mr-6'}
          processing={false}
        >
          Selesai
        </Button>}
        {application.status == 'PENDING' && <React.Fragment>
          <Button
            onClick={onTolak}
            type={'button'}
            className={'mb-6 mr-6'}
            processing={false}
          >
            Tolak
          </Button>
          <Modal
            show={showModal}
            size="md"
            popup={true}
          // onClose={onClose}
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Berikan alasan penolakan
                </h3>
                <div className="flex justify-center gap-4">
                  <form onSubmit={handleSubmit}>

                    <Label forInput={'status_description'} value={'Alasan'} className={'pt-6 pb-2'} />

                    <Input
                      name='status_description'
                      value={data.status_description}
                      handleChange={e => setData('status_description', e.target.value)}
                      className={'w-full'}
                    />
                    <ErrorText message={errors.status_description} />

                    <Button className={'mt-6 mr-2'} processing={false}>Selanjutnya</Button>
                    <Button type={'reset'} className={'mt-6 ml-2'} processing={false} onClick={(_) => setShowModal(!showModal)}>Batal</Button>

                  </form>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </React.Fragment>}
        {(application.status == 'PENDING' || application.status == 'DEFFICIENT') &&
          <React.Fragment>
            <Button
              onClick={onVerified}
              type={'button'}
              className={'mb-6'}
              processing={false}
            >
              Verifikasi
            </Button>

            <Modal
              show={showModal}
              size="md"
              popup={true}
            // onClose={onClose}
            >
              <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Berikan Keterangan
                  </h3>
                  <div className="w-full">
                    <form onSubmit={handleSubmit}>

                      <Label forInput={'status_description'} value={'Alasan'} className={'pt-6 pb-2'} />
                      <textarea
                        name='status_description'
                        onChange={e => setData('status_description', e.target.value)}
                        className={'w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'}
                        rows={5}
                        value={data.status_description}
                      >
                      </textarea>
                      <ErrorText message={errors.status_description} />

                      <Button className={'mt-6 mr-2'} processing={false}>Selanjutnya</Button>
                      <Button type={'reset'} className={'mt-6 ml-2'} processing={false} onClick={(_) => setShowModal(!showModal)}>Batal</Button>

                    </form>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </React.Fragment>}
        <h5 className={'block text-lg font-bold'}>Persyaratan</h5>
        <div className={'bg-green-200 p-6 rounded mt-4 mb-4 text-green-800 font-bold'}>
          {persyaratan.get(application.category)?.map((v, i) => <p key={i}>{v}</p>)}
        </div>
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
          Foto Wajah jelas
          <img src={`../../storage/images/${application.images}`} className={'h-40'} />


        </div>
        {files.map((v, k) => {
          return <div className={'mt-6'} key={k}>
            <p>{v.name}</p>
            <img src={`../../storage/${v.place}`} />
          </div>
        })}
      </div>
    </Authenticated >
  )
}
