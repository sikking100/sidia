import React, { useRef, useState } from 'react'
import { Applicant, DesaApplicationPost, Files, FilesForm, Hamlet, Menu, permasalahan, Requirement, subtitle } from '@/Interface/Interface'
import { BackButton } from '@/Components/Button'
import route from 'ziggy-js'
import { defImage } from '@/Components/Constant'
import Authenticated from '@/Layouts/Authenticated'
import { useForm, usePage } from '@inertiajs/inertia-react'
import { Parser } from 'html-to-react'
import { ErrorText } from '@/Components/Error'
import Container from '@/Components/Container'
import { Inertia, Method } from '@inertiajs/inertia'
import Alert from '@/Components/Alert'
import { ArrowLeftIcon, Button, CloseIcon, FileInput, Label, Modal, ModalBody, ModalFooter, ModalHeader, Select, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Textarea, TextInput } from 'flowbite-react'
import { HiEye, HiSave } from 'react-icons/hi'
import { BiFile, BiHome, BiUserCircle } from 'react-icons/bi'
import { log } from 'console'
import { HiNumberedList } from 'react-icons/hi2'
import { PiNumberZero } from 'react-icons/pi'
import { RiSortNumberAsc } from 'react-icons/ri'
import { DiGit } from 'react-icons/di'
import { LuAtSign, LuFileDigit, LuMail, LuPersonStanding, LuPhone, LuUser } from 'react-icons/lu'
import { GoNumber, GoPerson } from 'react-icons/go'
import { FaPrayingHands, FaRestroom } from 'react-icons/fa'
import { FcPicture } from 'react-icons/fc'
import { GiVillage } from 'react-icons/gi'
import { checkFile, getFileType } from '@/Functions/functions'
import { BsDownload } from 'react-icons/bs'

interface Props {
  filess?: Array<Files>
  applicant?: Applicant
  category: string
  hamlets: Array<Hamlet>
  menu: Menu
  requirements: Array<Requirement>
}

export default function DesaApplicationForm({ filess, applicant, category, hamlets, requirements, menu }: Props) {

  const { flash } = usePage().props
  const f = flash as { message: string }
  const [showAlert, setShowAlert] = React.useState(true);
  const filessRef = useRef<FilesForm[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const { data, errors, setData, post, put, progress, processing } = useForm<DesaApplicationPost>(
    {
      id_card_number: applicant?.id_card_number ?? '',
      family_card_number: applicant?.family_card_number ?? '',
      family_head_name: applicant?.family_head_name ?? '',
      name: applicant?.name ?? '',
      images: applicant?.images ?? undefined,
      category: category,
      description: applicant?.description ?? '',
      email: applicant?.email ?? '',
      filessss: undefined,
      hamlet_id: applicant?.hamlet_id ?? 0,
      phone: applicant?.phone ?? '',
      religion: applicant?.religion ?? '',
      sex: applicant?.sex ?? '',
      problem: applicant?.problem ?? '',
    }
  )
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()


    if (applicant !== null && applicant !== undefined) {
      const formData = new FormData()

      formData.append('id_card_number', data.id_card_number);
      formData.append('family_card_number', data.family_card_number);
      formData.append('family_head_name', data.family_head_name);
      formData.append('name', data.name);
      if (data.images !== null && data.images !== undefined) {
        formData.append('images', data.images);
      }
      formData.append('category', category);
      formData.append('description', data.description);
      formData.append('email', data.email);

      // Append files ke FormData
      data.filessss?.forEach((fileObj, index) => {
        formData.append(`filessss[${index}][name]`, fileObj.name);
        formData.append(`filessss[${index}][filenya]`, fileObj.filenya);
        formData.append(`filessss[${index}][place]`, fileObj.place);
      });

      formData.append('hamlet_id', String(data.hamlet_id ?? 0));
      formData.append('phone', data.phone);
      formData.append('religion', data.religion);
      formData.append('sex', data.sex);
      formData.append('problem', data.problem ?? '');
      formData.append('_method', 'put');
      Inertia.post(route('desa.update', applicant?.id), formData)
      return
    }
    post(route('desa.store'), {
      onError: () => {
        setShowAlert(true)
      }
    })
    return
  }

  const process = progress && progress.percentage > 0 || false

  const [selectedFile, setSelectedFile] = React.useState<Blob | MediaSource>()
  const [selectFile, setSelecFile] = React.useState<Files | null>(null)
  const [preview, setPreview] = React.useState<string>()
  React.useEffect(() => {
    if (!selectedFile) {
      setPreview(defImage)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(!e.target.files || e.target.files.length === 0);

    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }
    const file = e.target.files[0]
    setSelectedFile(file)
    setData('images', file)
  }

  const handleView = (file: Files) => {
    setSelecFile(file);
    setIsModalOpen(true);
  };

  return (
    <div>
      <Alert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        message={f.message}
      />
      {isModalOpen && selectFile && (
        <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} size="4xl">
          <ModalHeader>Pratinjau File</ModalHeader>
          <ModalBody>
            {getFileType(selectFile) === 'pdf' ? (
              <iframe
                src={`../../storage/${selectFile.place}`}
                width="100%"
                height="600px"
                title="PDF Viewer"
              />
            ) : (
              <img
                src={`../../storage/${selectFile.place}`}
                alt={selectFile.name}
                className="max-w-full max-h-[600px] mx-auto"
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button className={"bg-red-500"} size='xs' onClick={() => setIsModalOpen(false)}>
              <CloseIcon className="me-2 h-4 w-4" />
              Tutup
            </Button>
            <Button className={"bg-cyan-600"} size='xs' href={route('file.download', { place: selectFile.place })}>
              <BsDownload className='me-2 h-4 w-4' />
              Download
            </Button>
          </ModalFooter>
        </Modal>
      )}
      <div
        className={'bg-white rounded'}
      >
        <Button
          // as={Link}
          href={'/buat'}
          size='xs'
          className='w-fit'
          color={'dark'}
        >
          <ArrowLeftIcon />
        </Button>
        <h5 className={'block text-lg font-bold mt-6'}>Persyaratan</h5>
        <div className={'bg-green-200 p-6 rounded mt-4 text-green-800 font-bold'}>
          {/* {persyaratan.get(category)!.map((e, i) => <p key={i}>{e}</p>)} */}
          <p>Berkas Upload :</p>
          {requirements.map((v, i) => <p key={i}>{v.name}</p>)}
          {/* {persyaratan.get(application.category)?.map((v, i) => <p key={i}>{v}</p>)} */}

          {menu.description === null || menu.description === '' ? <div></div> : <div>
            <p className='pt-6'>Persyaratan Tambahan :</p>
            <div className="prose">
              {Parser().parse(menu.description)}
            </div>
          </div>}
        </div>


      </div>
      {category.split('-')[0] != '' && <div
        className={'bg-white rounded mt-6'}
      >
        <h5 className={'text-lg font-bold'}>
          Formulir Persyaratan
        </h5>
        <span className={'text-sm font-thin text-gray-500'}>
          {`Pelayanan ${subtitle.get(category)}`}
        </span>
        <form onSubmit={handleSubmit} autoComplete="off">
          <p className='sub-header flex items-center gap-2 mt-6'><BiHome size={25} /> Data Kepala Keluarga : </p>
          <div className='flex flex-col sm:flex-row gap-x-4 gap-y-4 mt-2'>
            <div className='w-full'>
              <div className='mb-2 block'>
                <Label>No. Kartu Keluarga</Label>
              </div>
              <TextInput
                icon={LuFileDigit}
                name='family_card_number'
                value={data.family_card_number}
                onChange={e => setData('family_card_number', e.target.value)}
                className={'w-full'}
              />
              <ErrorText message={errors.family_card_number} />
            </div>
            <div className='gap-2 w-full'>
              <div className='mb-2 block'>
                <Label>Nama Kepala Keluarga</Label>
              </div>
              <TextInput
                icon={LuUser}
                name='family_head_name'
                value={data.family_head_name}
                onChange={e => setData('family_head_name', e.target.value)}
                className={'w-full'}
              />
              <ErrorText message={errors.family_head_name} />
            </div>
          </div>
          <p className='sub-header inline-flex items-center gap-2 mt-6'><BiUserCircle size={25} /> Data Pemohon : </p>
          <div className='flex flex-col sm:flex-row gap-x-4 gap-y-4 mt-2'>
            <div className='w-full'>
              <div className='mb-2 block'>
                <Label>No. KTP</Label>
              </div>
              <TextInput
                icon={GoNumber}
                name='id_card_number'
                value={data.id_card_number}
                onChange={e => setData('id_card_number', e.target.value)}
                className={'w-full'}
              />
              <ErrorText message={errors.id_card_number} />
            </div>
            <div className='gap-2 w-full'>
              <div className='mb-2 block'>
                <Label>Nama Pemohon</Label>
              </div>
              <TextInput
                icon={GoPerson}
                name='name'
                value={data.name}
                onChange={e => setData('name', e.target.value)}
                className={'w-full'}
              />
              <ErrorText message={errors.name} />
            </div>
            <div className='w-full'>
              <div className='mb-2 block'>
                <Label>No. Telepon</Label>
              </div>
              <TextInput
                icon={LuPhone}
                name='phone'
                value={data.phone}
                onChange={e => setData('phone', e.target.value)}
                className={'w-full'}
              />
              <ErrorText message={errors.phone} />
            </div>
            <div className='w-full'>
              <div className='mb-2 block'>
                <Label>Email</Label>
              </div>
              <TextInput
                icon={LuAtSign}
                name='email'
                value={data.email}
                onChange={e => setData('email', e.target.value)}
                className={'w-full'}
              />
              <ErrorText message={errors.email} />
            </div>
          </div>
          <div className='flex flex-col sm:flex-row gap-x-4 gap-y-4 mt-2'>
            <div className='w-full'>
              <div className='mb-2 block'>
                <Label>Jenis Kelamin</Label>
              </div>
              <Select
                icon={FaRestroom}
                name='sex'
                value={data.sex}
                onChange={e => setData('sex', e.target.value)}
              >
                <option value={''}>-- Pilih Jenis Kelamin --</option>
                <option value={'L'}>Laki - Laki</option>
                <option value={'P'}>Perempuan</option>
              </Select>
              <ErrorText message={errors.sex} />
            </div>
            <div className='w-full'>
              <div className='mb-2 block'>
                <Label>Agama</Label>
              </div>
              <Select
                name='religion'
                value={data.religion}
                onChange={e => setData('religion', e.target.value)}
              >
                <option value={''}>-- Pilih Agama --</option>
                <option value={'Islam'}>Islam</option>
                <option value={'Katolik'}>Katolik</option>
                <option value={'Protestan'}>Protestan</option>
                <option value={'Buddha'}>Buddha</option>
                <option value={'Hindu'}>Hindu</option>
                <option value={'Konghucu'}>Konghucu</option>
              </Select>
              <ErrorText message={errors.religion} />
            </div>
            <div className='w-full'>
              <div className='mb-2 block'>
                <Label>Dusun</Label>
              </div>
              <Select
                icon={GiVillage}
                name='hamlet'
                value={data.hamlet_id}
                onChange={e => setData('hamlet_id', Number(e.target.value))}
              >
                <option value={''}>-- Pilih Dusun --</option>
                {hamlets.map((e, i) =>
                  <option key={i} value={e.id}>{e.name}</option>
                )}
              </Select>
              <ErrorText message={errors.hamlet_id} />
            </div>

            {category == 'Pengaduan-Data-Kependudukan' &&
              <div className='w-full'>
                <div className='mb-2 block'>
                  <Label>Permasalahan</Label>
                </div>
                <Select
                  name='problem'
                  value={data.problem}
                  onChange={e => setData('problem', e.target.value)}
                >
                  <option value={''}>-- Pilih --</option>
                  {permasalahan.map((e, i) =>
                    <option key={i} value={e}>{e}</option>
                  )}
                </Select>
                <ErrorText message={errors.problem} />
              </div>
            }
          </div>
          <div className='flex flex-col sm:flex-row gap-x-4 gap-y-4 mt-4'>
            <div className='w-full'>
              <div className='mb-2 block'>
                <Label>Keterangan / penjelasan keperluan</Label>
              </div>
              <Textarea
                rows={5}
                value={data.description}
                onChange={e => setData('description', e.target.value)}
              />
              <ErrorText message={errors.description} />
            </div>
          </div>
          <div className='gap-x-4 gap-y-4 mt-6'>
            {preview === defImage && data.images !== undefined ? <img src={`../../storage/images/${data.images}`} style={{ maxHeight: 200, minHeight: 0 }} className={'mb-2'} /> : <img src={preview} style={{ maxHeight: 200, minHeight: 0 }} className={'mb-2'} />}
            <FileInput
              ref={fileInputRef}
              name='images'
              onChange={onSelectFile}
              className='max-w-fit max-h-fit'
            />
            {preview !== defImage && <Button
              color={'red'}
              type='button'
              className='mt-2'
              onClick={() => {
                setSelectedFile(undefined)
                setData('images', undefined)
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
                // setPreview(defImage)
              }}
            >
              Hapus Foto
            </Button>}
            <Label className={'pt-2 font-bold'} >Ket : Foto Wajah Jelas</Label>

            <ErrorText message={errors.images} />
          </div>
          <div className='mt-6'>
            {requirements.map((v, k) => {
              const checkFiles = checkFile(v.name, v.id, filess ?? [])
              if (checkFiles !== undefined && checkFiles.status == 1) return null
              return <div key={k}>
                <Label><p className='font-extrabold'>{checkFiles !== undefined && checkFiles.status == 2 ? 'PERLU REVISI ' : ''}</p>{v.name}</Label>
                <FileInput
                  onChange={e => {
                    const listFiles = e.target.files
                    if (listFiles != null) {
                      if (applicant !== null && applicant !== undefined && applicant.filess?.filter((e) => e.name === v.name)[0] !== undefined) {
                        console.log(v.name);
                        console.log(applicant.filess?.filter((e) => e.name === v.name));
                        filessRef.current.push({ name: v.name, filenya: listFiles[0], place: applicant.filess?.filter((e) => e.name === v.name)[0].place ?? '' })
                      } else {
                        filessRef.current.push({ name: v.name, filenya: listFiles[0], place: '' })
                      }
                      console.log(filessRef.current.length);
                      setData('filessss', filessRef.current)

                    }
                  }}
                  name={v.name}
                />
              </div>
            })}
          </div>
          <Button
            className='mt-6'
            type='submit'
            size='sm'
            color={'purple'}
          >
            <HiSave className={'mr-2'} />
            {(applicant !== null && applicant !== undefined) ? 'Perbarui' : 'Simpan'}
          </Button>
        </form>
      </div >}
    </div >
  )
}
