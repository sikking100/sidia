import React, { useState } from 'react'
import axios from 'axios'
import { Applicant, District, Ward, persyaratan, subtitle, permasalahan } from '@/Interface/Interface'
import { useForm, usePage } from '@inertiajs/inertia-react'
import Label from '@/Components/Label'
import Input from '@/Components/Input'
import { ErrorText } from '@/Components/Error'
import route from 'ziggy-js'
import Button from '@/Components/Button'
import { defImage } from '@/Components/Constant'
import Guest from '@/Layouts/Guest'
import { Head } from '@inertiajs/inertia-react'

interface Props {
  subtitle: string
  category: string
}

export default function Form({ category }: Props) {
  const { data, errors, setData, post, progress } = useForm<Applicant>(
    {
      family_card_number: '',
      family_head_name: '',
      category: category,
      name: '',
      id_card_number: '',
      religion: '',
      phone: '',
      email: '',
      district: '',
      ward: '',
      problem: '',
      description: '',
      sex: '',
      images: undefined,
    }
  )

  const page = usePage().props
  const district = page.district as Array<District>

  const [stateWard, setStateWard] = useState<Array<Ward>>([])




  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setData('district', e.target.value)
    axios.get(`/wards/${e.target.value}`).then(res => {
      console.log(res.data.wards)
      const da = res.data.wards as Array<Ward>
      console.log(da)
      setStateWard(da)
      return
    }).catch(e => console.log(e))
    return
  }



  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    post(route('form.action'))
    return
  }

  const process = progress && progress.percentage > 0 || false

  const [selectedFile, setSelectedFile] = React.useState<Blob | MediaSource>()
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
      <div
        className={'bg-white rounded p-6 mb-6'}
      >
        <h5 className={'block text-lg font-bold'}>Persyaratan</h5>
        <div className={'bg-green-200 p-6 rounded mt-4 text-green-800 font-bold'}>
          {persyaratan.get(category)!.map((e, i) => <p key={i}>{e}</p>)}
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
          <Label forInput={''} value={'No. KK'} className={'pt-6 pb-2'} />
          <Input
            name='family_card_number'
            value={data.family_card_number}
            handleChange={e => setData('family_card_number', e.target.value)}
            className={'w-full'}
          />
          <ErrorText message={errors.name} />
          <Label forInput={''} value={'Nama Kepala Keluarga'} className={'pt-6 pb-2'} />
          <Input
            name='family_head_name'
            value={data.family_head_name}
            handleChange={e => setData('family_head_name', e.target.value)}
            className={'w-full'}
          />
          <ErrorText message={errors.name} />
          <Label forInput={'name'} value={'Nama pemohon'} className={'pt-6 pb-2'} />
          <Input
            name='name'
            value={data.name}
            handleChange={e => setData('name', e.target.value)}
            className={'w-full'}
          />
          <ErrorText message={errors.name} />
          <Label forInput={'name'} value={'Nik pemohon'} className={'pt-6 pb-2'} />
          <Input
            name='nik'
            value={data.id_card_number}
            handleChange={e => setData('id_card_number', e.target.value)}
            className={'w-full'}
          />
          <ErrorText message={errors.id_card_number} />
          <Label forInput={'sex'} value={'Jenis Kelamin'} className={'pt-6 pb-2'} />
          <select
            onChange={e => setData('sex', e.target.value)}
            value={data.sex}
            className={'w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'}
          >
            <option value={''}>-- Pilih Jenis Kelamin --</option>
            <option value={'L'}>Laki - Laki</option>
            <option value={'P'}>Perempuan</option>

          </select>
          <ErrorText message={errors.sex} />
          <Label forInput={'sex'} value={'Agama'} className={'pt-6 pb-2'} />
          <select
            onChange={e => setData('religion', e.target.value)}
            value={data.religion}
            className={'w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'}
          >
            <option value={''}>-- Pilih Agama --</option>
            <option value={'Islam'}>Islam</option>
            <option value={'Katolik'}>Katolik</option>
            <option value={'Protestan'}>Protestan</option>
            <option value={'Buddha'}>Buddha</option>
            <option value={'Hindu'}>Hindu</option>
            <option value={'Konghucu'}>Konghucu</option>
          </select>
          <ErrorText message={errors.sex} />
          <Label forInput={'phone'} value={'No HP pemohon'} className={'pt-6 pb-2'} />
          <Input
            name='phone'
            value={data.phone}
            handleChange={e => setData('phone', e.target.value)}
            className={'w-full'}
          />
          <ErrorText message={errors.phone} />
          <Label forInput={'email'} value={'Email pemohon'} className={'pt-6 pb-2'} required={false} />
          <Input
            name='email'
            type={'email'}
            value={data.email}
            handleChange={e => setData('email', e.target.value)}
            className={'w-full'}
          />
          <ErrorText message={errors.email} />

          <Label forInput={'district'} value={'Kecamatan'} className={'pt-6 pb-2'} />
          <select
            onChange={handleChange}
            value={data.district}
            className={'w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'}
          >
            <option value={''}>-- Pilih Kecamatan --</option>
            {district.map((e, i) =>
              <option key={i} value={e.name}>{e.name}</option>
            )}
          </select>
          <ErrorText message={errors.district} />
          <Label forInput={'ward'} value={'Kelurahan / Desa'} className={'pt-6 pb-2'} />
          <select
            onChange={e => setData('ward', e.target.value)}
            value={data.ward}
            className={'w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'}
          >
            <option value={''}>-- Pilih Kelurahan / Desa --</option>
            {stateWard.map((e, i) =>
              <option key={i} value={e.name}>{e.name}</option>
            )}
          </select>
          <ErrorText message={errors.ward} />
          {category == 'Pengaduan-Data-Kependudukan' && <>
            <Label forInput={'problem'} value={'Permasalahan'} className={'pt-6 pb-2'} />
            <select
              onChange={e => setData('problem', e.target.value)}
              value={data.problem}
              className={'w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'}
            >
              <option value={''}>-- Pilih --</option>
              {permasalahan.map((e, i) =>
                <option key={i} value={e}>{e}</option>
              )}
            </select>
            <ErrorText message={errors.problem} /></>}
          <Label forInput={'keterangan / penjelasan keperluan'} value={'Keterangan / penjelasan keperluan'} className={'pt-6 pb-2'} />
          <textarea
            value={data.description}
            onChange={e => setData('description', e.target.value)}
            className={'w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'}
            rows={5}
          >
          </textarea>
          <ErrorText message={errors.description} />
          <Label forInput={'images'} value={'Foto'} className={'pt-6'} />
          <img src={preview} style={{ maxHeight: 200, minHeight: 0 }} className={'mb-2'} />
          <Input
            name='images'
            type={'file'}
            handleChange={onSelectFile}
            className={'w-full'}
          />
          <Label forInput={'images'} value={'Ket : Foto Wajah Jelas'} className={'pt-2 font-bold'} />

          <ErrorText message={errors.images} />
          <p className={'text-red-900 mt-6'}>* Harus diisi</p>
          <Button className={'mt-2'} processing={process}>Selanjutnya</Button>
        </form>
      </div>}
    </Guest>
  )
}
