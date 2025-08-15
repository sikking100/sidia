import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Applicant, persyaratan, Files, Menu, Requirement, DesaApplication, Hamlet } from '@/Interface/Interface'
import Label from '@/Components/Label'
import Input from '@/Components/Input'
import { ErrorText } from '@/Components/Error'
import { Link, useForm } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'

import { Avatar, Button, CloseIcon, Modal, ModalBody, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react'
import route from 'ziggy-js'
import axios from 'axios'
import { url } from 'inspector'
import { getFileType, getStatus, getStatusBerkas } from '@/Functions/functions'
import { Parser } from 'html-to-react'
import { BackButton } from '@/Components/Button'
import { MdVerified } from 'react-icons/md'
import { BiCheck, BiFace, BiFile, BiHome, BiMap, BiMapAlt, BiMapPin, BiPhone, BiPrinter, BiRevision, BiText, BiTime, BiUserCircle } from 'react-icons/bi'
import { SiTicktick } from 'react-icons/si'
import TimeAgo from 'react-timeago'
import { makeIntlFormatter } from 'react-timeago/defaultFormatter'
import { HiEye } from 'react-icons/hi'
import { BsDownload } from 'react-icons/bs'


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
  hamlet: Hamlet
}

interface FormUpdateStatus {
  status: string
  status_description: string
}

export default function DesaApplicationShow({ desaApplication, files, menu, requirements, hamlet }: Props) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<Files | null>(null);

  const { data, errors, setData, put, get } = useForm<FormUpdateStatus>({
    status: '',
    status_description: ''
  })


  function handleClick(name: string) {
    window.open(route('photo', name))
  }

  const handleView = (file: Files) => {
    setSelectedFile(file);
    setIsModalOpen(true);
  };


  const dateCreated = Date.parse(desaApplication.created_at ?? '')
  const dateCreate = Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }).format(dateCreated)
  const intlFormatter = makeIntlFormatter({
    locale: "id-ID", // string
  });

  const checkFile = (name: string, id: number): Files | undefined => {

    const file = files.find(e => {
      if (e.requirement_id === null) return e.name === name
      return e.requirement_id === id
    })
    return file === undefined ? undefined : file

  }
  return (
    <Authenticated
      header={<h2>Pemohon</h2>}
    >
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
      <div className='flex flex-col'>
        <div>
          <BackButton
            route='desa'
          />
        </div>

        <p className='mx-auto font-bold text-xl text-black'>{desaApplication.category}</p>
        <Avatar className='mt-2' img={`../../storage/images/${desaApplication.images}`} rounded size='xl' />
        <p className={`justify-center inline-flex mt-2 text-center text-2xl font-extrabold ${desaApplication.status === 'COMPLETED' ? 'text-green-400' : desaApplication.status === 'CANCEL' ? 'text-red-600' : 'text-yellow-400'}`}>
          <MdVerified className='mr-1' size={'30'} />
          {getStatus(desaApplication.status ?? '')}</p>
        <span className='text-center'>{desaApplication.status_description}</span>


        <div className='flex flex-auto flex-wrap self-center gap-4 mt-6'>

          {(desaApplication.status == 'DEFFICIENT') &&
            <Button
              color={'yellow'}
              href={route('desa.edit', desaApplication.id)}
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
                <TableCell>{desaApplication.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='flex gap-2 items-center'><BiUserCircle />NIK Pemohon</TableCell>
                <TableCell>:</TableCell>
                <TableCell>{desaApplication.id_card_number}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='flex gap-2 items-center'><BiFile />Tiket</TableCell>
                <TableCell>:</TableCell>
                <TableCell>{desaApplication.ticket}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='flex gap-2 items-center'><BiPhone />Nomor Telepon</TableCell>
                <TableCell>:</TableCell>
                <TableCell>{desaApplication.phone}</TableCell>
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
                  desaApplication.description
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
                <TableCell>{desaApplication.family_head_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='flex gap-2 items-center'><BiFile />Nomor Kartu Keluarga</TableCell>
                <TableCell>:</TableCell>
                <TableCell>{desaApplication.family_card_number}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='flex gap-2 items-center'><BiMapPin />Dusun</TableCell>
                <TableCell>:</TableCell>
                <TableCell>{hamlet.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='flex gap-2 items-center'><BiMapAlt />Desa</TableCell>
                <TableCell>:</TableCell>
                <TableCell>{desaApplication.ward}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='flex gap-2 items-center'><BiMap />Kecamatan</TableCell>
                <TableCell>:</TableCell>
                <TableCell>{desaApplication.district}</TableCell>
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
          </Table>
        </div>

        {
          files.filter(e => e.name.toLowerCase().includes('hasil')).length > 0 && (
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
                    files.filter(e => e.name.toLowerCase().includes('hasil')).map((file, index) => (
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
    </Authenticated >
  )
}
