import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Applicant, persyaratan, Files, Menu, Requirement, Hamlet } from '@/Interface/Interface'

import { Inertia } from '@inertiajs/inertia'

import route from 'ziggy-js'

import { HiBackward } from 'react-icons/hi2'
import { ArrowLeftIcon, Avatar, Button, ButtonGroup, buttonTheme, CloseIcon, Modal, ModalBody, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Textarea, ThemeProvider } from 'flowbite-react'
import { Link, useForm } from '@inertiajs/inertia-react'
import { getFileType, getStatus } from '@/Functions/functions'
import { MdArchive, MdCancel, MdDownloading, MdPrint, MdVerified } from 'react-icons/md'
import { BsBack, BsDownload } from 'react-icons/bs'
import { PiBackspace } from 'react-icons/pi'
import { FcPrevious } from 'react-icons/fc'
import { GiPreviousButton } from 'react-icons/gi'
import { HiAdjustments, HiClock, HiCloudDownload, HiEye, HiPhone, HiTicket, HiUserCircle } from 'react-icons/hi'
import { SiTicktick } from 'react-icons/si'
import { BiCheck, BiCode, BiFace, BiFile, BiHome, BiMap, BiMapAlt, BiMapPin, BiPhone, BiPrinter, BiRevision, BiText, BiTime, BiUser, BiUserCircle } from 'react-icons/bi'
import TimeAgo from 'react-timeago'
import { makeIntlFormatter } from 'react-timeago/defaultFormatter'
import Label from '@/Components/Label'
import Input from '@/Components/Input'
import { ErrorText } from '@/Components/Error'


interface FileTicket {
  TypeName: string
  FilePath: string
  FileName: string
}
interface Props {
  application: Applicant
  files: Array<Files>
  menu: Menu
  requirements: Array<Requirement>
  hamlet?: Hamlet
}

interface FormUpdateStatus {
  status: string
  status_description: string
}

export default function PemohonShow({ application, files, menu, requirements, hamlet }: Props) {
  const [showModal, setShowModal] = React.useState<boolean>(false)
  const [showModalPenolakan, setShowModalPenolakan] = React.useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<Files | null>(null);

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

  function onRevisi(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault()
    setData('status', 'DEFFICIENT')
    setShowModal(!showModal)
  }

  function onTolak(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault()
    setData('status', 'CANCEL')
    setShowModalPenolakan(!showModalPenolakan)
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
    put(route('status', application.id))
    // setShowModal(!showModal)
    return
  }

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
  return (
    <Authenticated
      header={<h2>Pemohon</h2>}
    >
      {isModalOpen && selectedFile && (
        <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} size="4xl">
          <ModalHeader>Pratinjau File</ModalHeader>
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

      <Modal
        show={showModal}
        // size="xl"
        popup={true}
        onClose={showModal ? () => setShowModal(!showModal) : undefined}
      >
        <ModalHeader>
          <p className='ml-4'>Berikan alasan revisi</p>
        </ModalHeader>
        <ModalBody
        >
          <form onSubmit={handleSubmit}>
            <Textarea
              rows={10}
              className='min-w-screen'
              name='status_description'
              value={data.status_description}
              onChange={e => setData('status_description', e.target.value)}
            >
            </Textarea>
            <ErrorText message={errors.status_description} />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button type={'reset'} color={'red'} className={'mt-6 ml-2'} onClick={(_) => setShowModal(!showModal)}>Batal</Button>
          <Button type={'submit'} className={'blue-gradient mt-6 mr-2'}>Revisi</Button>
        </ModalFooter>
      </Modal>

      <Modal
        show={showModalPenolakan}
        // size="md"
        popup={true}
        onClose={() => setShowModalPenolakan(false)}
      >
        <ModalHeader>
          <p className='ml-4'>Berikan Alasan penolakan</p>


        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <Textarea
              name='status_description'
              onChange={e => setData('status_description', e.target.value)}
              // className={'w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'}
              rows={5}
              value={data.status_description}
            >
            </Textarea>
            <ErrorText message={errors.status_description} />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button type={'reset'} color={'red'} onClick={_ => setShowModalPenolakan(!showModalPenolakan)}>Batal</Button>
          <Button type={'submit'} className={'blue-gradient'}>Tolak</Button>
        </ModalFooter>
      </Modal>

      <div className='flex flex-col'>
        <div>
          <Button
            // as={Link}
            href={route('application.index')}
            size='sm'
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
          {(application.status == 'VERIFIED' || application.status == 'COMPLETED') &&
            <Button
              color={'blue'}
              onClick={onClick}
            >
              <BiPrinter className="me-2 h-4 w-4" />
              Print PDF
            </Button>}
          {
            (application.status == 'VERIFIED') &&
            <Button
              color={'green'}
              onClick={onSelesai}
            >
              <SiTicktick className="me-2 h-4 w-4" />
              Selesai
            </Button>
          }
          {(application.status == 'PENDING' || application.status == 'REVISED') &&
            <Button
              color={'yellow'}
              onClick={onRevisi}

            >
              <BiRevision className="me-2 h-4 w-4" />
              {application.status === 'REVISED' ? 'Revisi Ulang' : 'Revisi Berkas'}
            </Button>
          }
          {(application.status == 'PENDING') &&
            <Button
              color={'red'}
              onClick={onTolak}

            >
              <BiRevision className="me-2 h-4 w-4" />
              Tolak
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
              <TableRow>
                <TableCell className='flex gap-2 items-center'><BiMapPin />Dusun</TableCell>
                <TableCell>:</TableCell>
                <TableCell>{hamlet?.name}</TableCell>
              </TableRow>
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
                <TableHeadCell>Aksi</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className='divide-y text-black'>
              {
                application.ticket !== null && application.ticket !== '' ?
                  application.files !== null && application.files !== '' ? (JSON.parse(application.files!) as Array<FileTicket>).map((v, k) => {
                    return (
                      <TableRow key={k}>
                        <TableCell>{k + 1}</TableCell>
                        <TableCell>{v.TypeName}</TableCell>
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
                  }) : <p>Berkas tidak lengkap</p> :
                  files.filter(file => file.name.toLowerCase().includes('hasil') === false).map((file, index) => (
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
