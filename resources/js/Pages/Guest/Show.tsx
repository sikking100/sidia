import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Applicant, persyaratan, Files, Menu, Requirement, DesaApplication, Hamlet } from '@/Interface/Interface'
import Label from '@/Components/Label'
import Input from '@/Components/Input'
import { ErrorText } from '@/Components/Error'
import { Link, useForm, usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'

import { ArrowLeftIcon, Avatar, Button, CloseIcon, Modal, ModalBody, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react'
import route from 'ziggy-js'
import axios from 'axios'
import { url } from 'inspector'
import { getFileType, getStatus, getStatusBerkas } from '@/Functions/functions'
import { Parser } from 'html-to-react'
import { BackButton } from '@/Components/Button'
import { MdVerified } from 'react-icons/md'
import { BiCheck, BiCheckCircle, BiFace, BiFile, BiHome, BiMap, BiMapAlt, BiMapPin, BiPhone, BiPrinter, BiRevision, BiText, BiTime, BiUserCircle } from 'react-icons/bi'
import { SiTicktick } from 'react-icons/si'
import TimeAgo from 'react-timeago'
import { makeIntlFormatter } from 'react-timeago/defaultFormatter'
import { HiEye } from 'react-icons/hi'
import { BsDownload } from 'react-icons/bs'
import Guest from '@/Layouts/Guest'


interface FileTicket {
  TypeName: string
  FilePath: string
  FileName: string
}
interface Props {
  application: Applicant
  requirements: Array<Requirement>
}

interface FormUpdateStatus {
  status: string
  status_description: string
}

export default function GuesApplicationShow({ application, requirements }: Props) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<Files | null>(null);

  const { flash } = usePage().props
  const f = flash as { message: string }

  React.useEffect(() => {
    if (f.message !== null && f.message !== '') {
      setShowAlert(true)
    }
  }, [f])

  function handleClick(name: string) {
    window.open(route('photo', name))
  }



  const handleView = (file: Files) => {
    setSelectedFile(file);
    setIsModalOpen(true);
  };


  const dateCreated = Date.parse(application.created_at ?? '')
  const dateCreate = Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }).format(dateCreated)
  const intlFormatter = makeIntlFormatter({
    locale: "id-ID", // string
  });

  const checkFile = (name: string, id: number): Files | undefined => {

    const file = application.filess?.find(e => {
      if (e.requirement_id === null) return e.name === name
      return e.requirement_id === id
    })
    return file === undefined ? undefined : file

  }
  return (
    <Guest>
      <Modal
        show={showAlert}
        // size="md"
        popup={true}
        onClose={() => setShowAlert(false)}
      >
        <ModalHeader>
          <p className='header'>Pemberitahuan</p>
        </ModalHeader>
        <ModalBody className='justify-items-center'>
          <p>{f.message}</p>
        </ModalBody>
      </Modal>
      {isModalOpen && selectedFile && (
        <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} size="4xl">
          <ModalHeader>Pratinjau File {getStatusBerkas(selectedFile.status)}</ModalHeader>
          <ModalBody>
            {getFileType(selectedFile) === 'pdf' ? (
              <iframe
                src={`../../storage/${selectedFile.place}`}
                width="100%"
                height="600px"
                title="PDF Viewer"
              />
            ) : (
              <img
                src={`../../storage/${selectedFile.place}`}
                alt={selectedFile.name}
                className="max-w-full max-h-[600px] mx-auto"
              />
            )}
            {
              selectedFile.comment !== '' && <p>{selectedFile.comment}</p>
            }
          </ModalBody>
          <ModalFooter>
            <Button className={"bg-red-500"} size='xs' onClick={() => setIsModalOpen(false)}>
              <CloseIcon className="me-2 h-4 w-4" />
              Tutup
            </Button>
            <Button className={"bg-cyan-600"} size='xs' href={route('file.download', { place: selectedFile.place })}>
              <BsDownload className='me-2 h-4 w-4' />
              Download
            </Button>
          </ModalFooter>
        </Modal>
      )}
      <div className='flex flex-col bg-white p-6 rounded-md'>
        <div>
          <Button
            // as={Link}
            href={route('check')}
            size='xs'
            className='w-fit'
            color={'dark'}
          >
            <ArrowLeftIcon />
          </Button>
        </div>

        <p className='mx-auto font-bold text-xl text-black'>{application.category}</p>
        <Avatar className='mt-2' img={`../../storage/images/${application.images}`} rounded size='xl' />
        <p className={`justify-center inline-flex mt-2 text-center text-2xl font-extrabold ${application.status === 'COMPLETED' ? 'text-green-400' : application.status === 'CANCEL' ? 'text-red-600' : 'text-yellow-400'}`}>
          <MdVerified className='mr-1' size={'30'} />
          {getStatus(application.status ?? '')}</p>
        <span className='text-center'>{application.status_description}</span>


        <div className='flex flex-auto flex-wrap self-center gap-4 mt-6'>

          {(application.status == 'DEFFICIENT') &&
            <Button
              color={'yellow'}
              href={route('form', {
                'category': application.category,
                'id': application.id
              })}
            >
              <BiRevision className="me-2 h-4 w-4" />
              Revisi Berkas
            </Button>
          }

        </div>
        <div className='mt-6'>
          <p className='sub-header inline-flex items-center gap-2'><BiUserCircle size={25} /> Informasi Pemohon : </p>
          <Table>
            <TableBody className='divide-y text-black'>
              <TableRow>
                <TableCell className='flex gap-2 items-center'><BiUserCircle />Nama Pemohon</TableCell>
                <TableCell>:</TableCell>
                <TableCell>{application.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='flex gap-2 items-center'><BiUserCircle />NIK Pemohon</TableCell>
                <TableCell>:</TableCell>
                <TableCell>{application.id_card_number}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='flex gap-2 items-center'><BiFile />Tiket</TableCell>
                <TableCell>:</TableCell>
                <TableCell>{application.ticket}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='flex gap-2 items-center'><BiPhone />Nomor Telepon</TableCell>
                <TableCell>:</TableCell>
                <TableCell>{application.phone}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='flex gap-2 items-center'><BiTime />Tanggal Pembuatan Permohonan</TableCell>
                <TableCell>:</TableCell>
                <TableCell>{
                  dateCreate + ','
                } <TimeAgo
                  date={dateCreated}
                  formatter={intlFormatter}
                ></TimeAgo></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='flex gap-2 items-center'><BiText />Deskripsi Permohonan</TableCell>
                <TableCell>:</TableCell>
                <TableCell>{
                  application.description
                }</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className='mt-6'>
          <p className='sub-header flex items-center gap-2'><BiHome size={25} /> Data Kepala Keluarga : </p>
          <Table>
            <TableBody className='divide-y text-black'>
              <TableRow>
                <TableCell className='flex gap-2 items-center'><BiFace />Nama Kepala Keluarga</TableCell>
                <TableCell>:</TableCell>
                <TableCell>{application.family_head_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='flex gap-2 items-center'><BiFile />Nomor Kartu Keluarga</TableCell>
                <TableCell>:</TableCell>
                <TableCell>{application.family_card_number}</TableCell>
              </TableRow>
              {/* <TableRow>
                <TableCell className='flex gap-2 items-center'><BiMapPin />Dusun</TableCell>
                <TableCell>:</TableCell>
                <TableCell>{hamlet?.name}</TableCell>
              </TableRow> */}
              <TableRow>
                <TableCell className='flex gap-2 items-center'><BiMapAlt />Desa</TableCell>
                <TableCell>:</TableCell>
                <TableCell>{application.ward}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='flex gap-2 items-center'><BiMap />Kecamatan</TableCell>
                <TableCell>:</TableCell>
                <TableCell>{application.district}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className='mt-6'>
          <p className='sub-header flex items-center gap-2 mb-2'><BiFile size={25} /> Lampiran Permohonan : </p>
          <Table striped className='border rounded-lg border-collapse'>
            <TableHead>
              <TableRow>
                <TableHeadCell>#</TableHeadCell>
                <TableHeadCell>Nama Lampiran</TableHeadCell>
                <TableHeadCell>status</TableHeadCell>
                <TableHeadCell>Aksi</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className='divide-y text-black'>
              {
                application.ticket !== null && application.ticket !== '' && application.ticket !== '-' ?
                  application.files !== null && application.files !== '' ? (JSON.parse(application.files!) as Array<FileTicket>).map((v, k) => {
                    return (
                      <TableRow key={k}>
                        <TableCell>{k + 1}</TableCell>
                        <TableCell>{v.TypeName}</TableCell>
                        <TableCell>{ }</TableCell>
                        <TableCell>
                          <Button
                            size='xs'
                            className='bg-green-400'
                            onClick={() => handleClick(v.FileName)}
                          >
                            <HiEye className='mr-2' />
                            Lihat
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  }) : <TableRow>
                    <TableCell colSpan={3} className='text-center'>Berkas tidak lengkap</TableCell>
                  </TableRow> :
                  requirements.map((file, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{file.name}</TableCell>
                      <TableCell>{checkFile(file.name, file.id) !== undefined ? getStatusBerkas(checkFile(file.name, file.id)?.status ?? 0) : ''}</TableCell>
                      <TableCell>
                        {
                          checkFile(file.name, file.id) !== undefined ?
                            < Button
                              size='xs'
                              className='bg-green-400'
                              onClick={() => {
                                return handleView(checkFile(file.name, file.id)!)
                              }}
                            >
                              <HiEye className='mr-2' />
                              Lihat
                            </Button>
                            : <p className='text-red-400'>Tidak diupload</p>
                        }
                      </TableCell>
                    </TableRow>
                  ))
              }
            </TableBody>
          </Table>
        </div>

        {
          application.filess && application.filess?.filter(e => e.name.toLowerCase().includes('hasil')).length > 0 && (
            <div className='mt-6'>
              <p className='sub-header flex items-center gap-2 mb-2'><BiCheck size={25} /> Permohonan Disetujui : </p>
              <Table striped className='border rounded-lg border-collapse'>
                <TableHead>
                  <TableRow>
                    <TableHeadCell>#</TableHeadCell>
                    <TableHeadCell>Dokumen yang dihasilkan</TableHeadCell>
                    <TableHeadCell>Aksi</TableHeadCell>
                  </TableRow>
                </TableHead>
                <TableBody className='divide-y text-black'>
                  {
                    application.filess?.filter(e => e.name.toLowerCase().includes('hasil')).map((file, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{file.name}</TableCell>
                        <TableCell>
                          <Button
                            size='xs'
                            className='bg-green-400'
                            onClick={() => handleView(file)}
                          >
                            <HiEye className='mr-2' />
                            Lihat
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </div>)
        }
      </div>
    </Guest >
  )
}
