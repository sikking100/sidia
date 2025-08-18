import React, { useState } from 'react'
import axios from 'axios'
import { Applicant, District, Ward, persyaratan, subtitle, permasalahan, Menu, Requirement, FilesForm } from '@/Interface/Interface'
import { useForm, usePage } from '@inertiajs/inertia-react'
import { ErrorText } from '@/Components/Error'
import route from 'ziggy-js'
import { defImage } from '@/Components/Constant'
import Guest from '@/Layouts/Guest'
import { Head } from '@inertiajs/inertia-react'
import { Parser } from 'html-to-react'
import { HiSave } from 'react-icons/hi'
import { ArrowLeftIcon, Button, FileInput, Label, Select, Textarea, TextInput } from 'flowbite-react'
import { LuAtSign, LuFileDigit, LuPhone, LuUser } from 'react-icons/lu'
import { GoNumber, GoPerson } from 'react-icons/go'
import { FaRestroom } from 'react-icons/fa'
import { BiBuilding, BiFile, BiHome, BiUserCircle } from 'react-icons/bi'
import { GiVillage } from 'react-icons/gi'
import { Inertia } from '@inertiajs/inertia'
import { BackButton } from '@/Components/Button'
import { ModalAlert } from '@/Components/Alert'
import { checkFile } from '@/Functions/functions'
import { CgAdd, CgRemove } from 'react-icons/cg'

interface Props {
  subtitle: string
  category: string
  menu: Menu
  requirements: Array<Requirement>
  districts: District[]
  application?: Applicant
}

export default function Form({ category, menu, requirements, districts, application }: Props) {
  const { data, setData, post, progress } = useForm<Applicant>(
    {
      id: application?.id ?? 0,
      family_card_number: application?.family_card_number ?? '',
      family_head_name: application?.family_head_name ?? '',
      category: category,
      name: application?.name ?? '',
      id_card_number: application?.id_card_number ?? '',
      religion: application?.religion ?? '',
      phone: application?.phone ?? '',
      email: application?.email ?? '',
      district: application?.district ?? '',
      ward: application?.ward ?? '',
      problem: application?.problem ?? '',
      description: application?.description ?? '',
      sex: application?.sex ?? '',
      images: application?.images ?? undefined,
      filessss: undefined,
      pendukung: []
    }
  )

  const page = usePage().props
  // const district = page.district as Array<District>

  // const [stateWard, setStateWard] = useState<Array<Ward>>([])
  const [stateDistrict, setStateDistrict] = React.useState<District | null>()
  const [error, setError] = React.useState<Record<keyof Applicant, string> | null>()
  const [showModal, setShowModal] = React.useState(false);
  const [pendukung, setPendukung] = React.useState<(FilesForm | null)[]>([])


  // function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
  //   setData('district', e.target.value)
  //   axios.get(`/wards/${e.target.value}`).then(res => {
  //     console.log(res.data.wards)
  //     const da = res.data.wards as Array<Ward>
  //     console.log(da)
  //     setStateWard(da)
  //     return
  //   }).catch(e => console.log(e))
  //   return
  // }



  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // post(route('form.action'))
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

    // berkas pendukung
    data.pendukung?.forEach((v, i) => {
      formData.append(`pendukung[${i}][name]`, v?.name ?? '')
      formData.append(`pendukung[${i}][filenya]`, v?.filenya ?? '')
    })

    formData.append('ward', data.ward);
    formData.append('ward_id', String(stateDistrict?.wards?.find(e => e.name === data.ward)?.id ?? 0));
    formData.append('district', data.district);
    formData.append('district_id', String(stateDistrict?.id ?? 0));
    formData.append('phone', data.phone);
    formData.append('religion', data.religion);
    formData.append('sex', data.sex);
    formData.append('problem', data.problem ?? '');
    if (application !== null) {
      formData.append('_method', 'put');
      formData.append('id', String(data.id));
      Inertia.post(route('form.update',), formData, {
        onError: (e) => {
          setError(e as Record<keyof Applicant, string>)
        }
      })
    } else {
      Inertia.post(route('form.action'), formData, {
        onError: (e) => {
          setError(e as Record<keyof Applicant, string>)
        }
      })
    }
    return
  }

  const process = progress && progress.percentage > 0 || false

  const [selectedFile, setSelectedFile] = React.useState<Blob | MediaSource>()
  const [preview, setPreview] = React.useState<string>()
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const filessRef = React.useRef<FilesForm[]>([])

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
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }
    const file = e.target.files[0]
    setSelectedFile(file)
    setData('images', file)
  }

  return (
    <Guest
      title={category}>
      <Head title={category} />
      {/* <ModalAlert
        title={error !== '' ? 'Error' : 'Berhasil mengajukan permohonan'}
        close={() => setShowModal(false)}
        content={error !== '' ? error : 'Cek data anda secara berkala'}
        show={showModal}
      /> */}
      <div
        className={'bg-white rounded p-6 mb-6'}
      >
        <h5 className={'block text-lg font-bold'}>Persyaratan</h5>
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
        className={'bg-white rounded p-6'}
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
              <ErrorText message={error?.family_card_number ?? ''} />
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
              <ErrorText message={error?.family_head_name ?? ''} />
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
              <ErrorText message={error?.id_card_number ?? ''} />
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
              <ErrorText message={error?.name ?? ''} />
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
              <ErrorText message={error?.phone ?? ''} />
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
              <ErrorText message={error?.email ?? ''} />
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
              <ErrorText message={error?.sex ?? ''} />
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
              <ErrorText message={error?.religion ?? ''} />
            </div>
            <div className='w-full'>
              <div className='mb-2 block'>
                <Label>Kecamatan</Label>
              </div>
              <Select
                icon={BiBuilding}
                name='district'
                value={data.district}
                onChange={e => {
                  setStateDistrict(districts.find(ee => ee.name === e.target.value))
                  return setData('district', e.target.value)
                }}
              >
                <option value={''}>-- Pilih Kecamatan --</option>
                {districts.map((e, i) =>
                  <option key={i} value={e.name}>{e.name}</option>
                )}
              </Select>
              <ErrorText message={error?.district ?? ''} />
            </div>
            <div className='w-full'>
              <div className='mb-2 block'>
                <Label>Desa</Label>
              </div>
              <Select
                icon={GiVillage}
                name='ward'
                value={data.ward}
                onChange={e => {
                  return setData('ward', e.target.value)
                }}
              >
                <option value={''}>-- Pilih Desa --</option>
                {districts.find(e => e.id === stateDistrict?.id)?.wards?.map((e, i) =>
                  <option key={i} value={e.name}>{e.name}</option>
                )}
              </Select>
              <ErrorText message={error?.district ?? ''} />
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
                <ErrorText message={error?.problem ?? ''} />
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
              <ErrorText message={error?.description ?? ''} />
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

            <ErrorText message={error?.images ?? ''} />
          </div>
          <div className='mt-6'>
            {requirements.map((v, k) => {
              const checkFiles = checkFile(v.name, v.id, application?.filess ?? [])
              if (checkFiles !== undefined && checkFiles.status == 1) return null
              return <div key={k}>
                <Label><p className='font-extrabold'>{checkFiles !== undefined && checkFiles.status == 2 ? 'PERLU REVISI ' : ''}</p>{v.name}</Label>
                <FileInput
                  onChange={e => {
                    const listFiles = e.target.files
                    if (listFiles != null) {
                      if (application !== null && application !== undefined && application.filess?.filter((e) => e.name === v.name)[0] !== undefined) {
                        console.log(v.name);
                        console.log(application.filess?.filter((e) => e.name === v.name));
                        filessRef.current.push({ name: v.name, filenya: listFiles[0], place: application.filess?.filter((e) => e.name === v.name)[0].place ?? '' })
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
          <div className='mt-6 w-full'>

            <p className='sub-header inline-flex items-center gap-2 mt-6'><BiFile size={25} /> Berkas lainnya : <CgAdd
              size={25}
              className={'cursor-pointer'}
              color='green'
              onClick={_ => {
                setPendukung([...pendukung, null])
                setData('pendukung', [...data.pendukung, { name: '', filenya: undefined }])
              }}
            /></p>

            {pendukung?.map((v, k) => {
              // const checkFiles = checkFile(v.name, v.id, filess ?? [])
              // if (checkFiles !== undefined && checkFiles.status == 1) return null
              return <div key={k} className='mt-3'>
                <Label>{`Berkas ${k + 1}`}</Label>
                <div className='flex gap-2 items-center mt-2'>
                  <CgRemove
                    size={25}
                    className={'cursor-pointer'}
                    color='red'
                    onClick={_ => {
                      setPendukung(pendukung.filter((_, i) => i !== k))
                    }}
                  />
                  <TextInput
                    className='w-full'
                    placeholder='Nama berkas'
                    onChange={e => {
                      // return setPendukungName({ k: e.target.value })
                      const updated = [...data.pendukung]
                      updated[k].name = e.target.value
                      setData('pendukung', updated)
                    }}
                  />
                  <FileInput

                    onChange={e => {
                      const listFiles = e.target.files
                      if (listFiles != null) {
                        // if (applicant !== null && applicant !== undefined && applicant.filess?.filter((e) => e.name === v.name)[0] !== undefined) {
                        //   filessRef.current.push({ name: v.name, filenya: listFiles[0], place: applicant.filess?.filter((e) => e.name === v.name)[0].place ?? '' })
                        // } else {
                        // pendukungRef.current.push({ name: `${k}`, filenya: listFiles[0], place: '' })
                        const updated = [...data.pendukung]
                        updated[k].filenya = listFiles[0]

                        setData('pendukung', updated)
                        // }
                      }
                    }}
                    name={`${k + 1}`}
                  />
                </div>
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
            {application !== null ? 'Revisi' : 'Ajukan'} Permohoan
          </Button>
        </form>
      </div>}
    </Guest >
  )
}
