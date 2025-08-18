import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Applicant, persyaratan, Files, Menu, Requirement, DesaApplication, Hamlet } from '@/Interface/Interface'
import Label from '@/Components/Label'
import Input from '@/Components/Input'
import { ErrorText } from '@/Components/Error'
import { Link, useForm, usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'

import { ArrowLeftIcon, Avatar, Button, Card, CloseIcon, Modal, ModalBody, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react'
import route from 'ziggy-js'
import axios from 'axios'
import { url } from 'inspector'
import { getFileType, getStatus, getStatusBerkas, useIsMobile } from '@/Functions/functions'
import { Parser } from 'html-to-react'
import { BackButton } from '@/Components/Button'
import { MdVerified } from 'react-icons/md'
import { BiCheck, BiCheckCircle, BiFace, BiFile, BiHome, BiIdCard, BiMap, BiMapAlt, BiMapPin, BiPhone, BiPrinter, BiRevision, BiText, BiTime, BiUserCircle } from 'react-icons/bi'
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
  const isMobile = useIsMobile()

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
          <ModalHeader>Pratinjau File {getStatusBerkas(selectedFile?.status ?? 0)}</ModalHeader>
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
          <div className='divide-y px-6 w-full'>
            <div className='py-3 gap-2 sm:items-center grid sm:grid-cols-[1fr_20px_2fr] xs:grid-cols-1 w-fit'>
              <div className='flex font-bold items-center gap-2'>
                <BiUserCircle />Nama Pemohon
              </div>
              {isMobile ? <></> : <p>:</p>}
              <p>{application.name}</p>
            </div>
            <div className='py-3 gap-2 sm:items-center grid sm:grid-cols-[1fr_20px_2fr] xs:grid-cols-1'>
              <div className='flex font-bold items-center gap-2'>
                <BiIdCard />NIK Pemohon
              </div>
              {isMobile ? <></> : <p>:</p>}
              <p>{application.id_card_number}</p>
            </div>
            <div className='py-3 gap-2 sm:items-center grid sm:grid-cols-[1fr_20px_2fr] xs:grid-cols-1'>
              <div className='flex font-bold items-center gap-2'>
                <BiFile />Tiket
              </div>
              {isMobile ? <></> : <p>:</p>}
              <p>{application.ticket}</p>
            </div>
            <div className='py-3 gap-2 sm:items-center grid sm:grid-cols-[1fr_20px_2fr] xs:grid-cols-1'>
              <div className='flex font-bold items-center gap-2'>
                <BiPhone />Nomor Telepon
              </div>
              {isMobile ? <></> : <p>:</p>}
              <p>{application.phone}</p>
            </div>
            <div className='py-3 gap-2 sm:items-center grid sm:grid-cols-[1fr_20px_2fr] xs:grid-cols-1'>
              <div className='flex font-bold items-center gap-2'>
                <BiTime />
                <p className='text-ellipsis'>Tanggal Pembuatan Permohonan</p>
              </div>
              {isMobile ? <></> : <p>:</p>}
              <p>{
                dateCreate + ','
              } <TimeAgo
                date={dateCreated}
                formatter={intlFormatter}
              ></TimeAgo></p>
            </div>
            <div className='py-3 gap-2 sm:items-center grid sm:grid-cols-[1fr_20px_2fr] xs:grid-cols-1'>
              <div className='flex font-bold items-center gap-2'>
                <BiText />Deskripsi Permohonan
              </div>
              {isMobile ? <></> : <p>:</p>}
              <p>{application.description}</p>
            </div>
            {application.problem && <div className='py-3 gap-2 sm:items-center grid sm:grid-cols-[1fr_20px_2fr] xs:grid-cols-1'>
              <div className='flex font-bold items-center gap-2'>
                <BiText />Deskripsi Permasalahan
              </div>
              {isMobile ? <></> : <p>:</p>}
              <p>{application.problem}</p>
            </div>}
          </div>
        </div>

        <div className='mt-6'>
          <p className='sub-header flex items-center gap-2'><BiHome size={25} /> Data Kepala Keluarga : </p>
          <div className='divide-y px-6 w-full'>
            <div className='py-3 gap-2 sm:items-center grid sm:grid-cols-[1fr_20px_2fr] xs:grid-cols-1 w-fit'>
              <div className='flex font-bold items-center gap-2'>
                <BiFace />Nama Kepala Keluarga
              </div>
              {isMobile ? <></> : <p>:</p>}
              <p>{application.family_head_name}</p>
            </div>
            <div className='py-3 gap-2 sm:items-center grid sm:grid-cols-[1fr_20px_2fr] xs:grid-cols-1'>
              <div className='flex font-bold items-center gap-2'>
                <BiFile />Nomor Kartu Keluarga
              </div>
              {isMobile ? <></> : <p>:</p>}
              <p>{application.family_card_number}</p>
            </div>
            {/* <div className='py-3 gap-2 sm:items-center grid sm:grid-cols-[1fr_20px_2fr] xs:grid-cols-1'>
              <div className='flex font-bold items-center gap-2'>
                <BiMapPin />Dusun
              </div>
              {isMobile ? <></> : <p>:</p>}
              <p>{hamlet.name}</p>
            </div> */}
            <div className='py-3 gap-2 sm:items-center grid sm:grid-cols-[1fr_20px_2fr] xs:grid-cols-1'>
              <div className='flex font-bold items-center gap-2'>
                <BiMapAlt />Desa
              </div>
              {isMobile ? <></> : <p>:</p>}
              <p>{application.ward}</p>
            </div>

            <div className='py-3 gap-2 sm:items-center grid sm:grid-cols-[1fr_20px_2fr] xs:grid-cols-1'>
              <div className='flex font-bold items-center gap-2'>
                <BiMap />Kecamatan
              </div>
              {isMobile ? <></> : <p>:</p>}
              <p>{application.district}</p>
            </div>
          </div>
        </div>

        <div className='mt-6'>
          <p className='sub-header flex items-center gap-2 mb-2'><BiFile size={25} /> Lampiran Permohonan : </p>
          {isMobile ? <div className='flex'>
            {
              requirements.map((file, index) => (
                <Card key={index} className='w-full'>
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {file.name}
                  </h5>
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
                </Card>
              ),)
            },
          </div> :
            <Table striped className='border rounded-lg border-collapse'>
              <TableHead>
                <TableRow>
                  <TableHeadCell>#</TableHeadCell>
                  <TableHeadCell>Nama Lampiran</TableHeadCell>
                  <TableHeadCell>Aksi</TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody className='divide-y text-black'>
                {
                  requirements.map((file, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{file.name}</TableCell>
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
            </Table>}
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
            </div>
          )
        }
        {
          application.supports && (
            <div className='mt-6'>
              <p className='sub-header flex items-center gap-2 mb-2'><BiFile size={25} /> Berkas lainnya : </p>
              {
                isMobile ? <div className='flex'>
                  {application.supports?.map((file, index) => (
                    <Card key={index} className='w-full'>
                      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {file.name}
                      </h5>
                      <Button
                        size='xs'
                        className='bg-green-400'
                        onClick={() => handleView(file)}
                      >
                        <HiEye className='mr-2' />
                        Lihat
                      </Button>
                    </Card>
                  ))}
                </div> :
                  <Table striped className='border rounded-lg border-collapse'>
                    <TableHead>
                      <TableRow>
                        <TableHeadCell>#</TableHeadCell>
                        <TableHeadCell>Nama</TableHeadCell>
                        <TableHeadCell>Aksi</TableHeadCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className='divide-y text-black'>
                      {
                        application.supports?.map((file, index) => (
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
                  </Table>}
            </div>
          )
        }
        {
          application.filess && application.filess?.filter(e => e.name.toLowerCase().includes('hasil')).length > 0 && (
            <div className='mt-6'>
              <p className='sub-header flex items-center gap-2 mb-2'><BiCheck size={25} /> Permohonan Disetujui : </p>
              {
                isMobile ? <div className='flex'>
                  {application.filess?.filter(e => e.name.toLowerCase().includes('hasil')).map((file, index) => (
                    <Card key={index} className='w-full'>
                      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {file.name}
                      </h5>
                      <Button
                        size='xs'
                        className='bg-green-400'
                        onClick={() => handleView(file)}
                      >
                        <HiEye className='mr-2' />
                        Lihat
                      </Button>
                    </Card>
                  ))}
                </div> :
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
                  </Table>}
            </div>
          )
        }
      </div>
    </Guest >
  )
}
