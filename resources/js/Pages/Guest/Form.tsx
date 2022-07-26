import React, { useState } from 'react'
import axios from 'axios'
import { Applicant, District, Ward } from '@/Interface/Interface'
import { useForm, usePage } from '@inertiajs/inertia-react'
import Label from '@/Components/Label'
import Input from '@/Components/Input'
import { ErrorText } from '@/Components/Error'
import route from 'ziggy-js'
import Button from '@/Components/Button'
import {defImage} from '@/Components/Constant'

interface Props {
  terms: Array<string>
  subtitle: string
  category: string
}

export default function Form({ subtitle, terms, category }: Props) {
  const { data, errors, setData, post, progress } = useForm<Applicant>(
    {
      category: category,
      name: '',
      id_card_number: '',
      phone: '',
      email: '',
      district: '',
      ward: '',
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
    post(route('form'))
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
    <>
      <div
        className={'bg-white rounded p-6 mb-6'}
      >
        <h5 className={'block text-lg font-bold'}>Persyaratan</h5>
        <div className={'bg-green-200 p-6 rounded mt-4 text-green-800 font-bold'}>
          {terms.map((e, i) => <p key={i}>{e}</p>)}
        </div>
      </div>
      <div
        className={'bg-white rounded p-6'}
      >
        <h5 className={'text-lg font-bold'}>
          Formulir Persyaratan
        </h5>
        <span className={'text-sm font-thin text-gray-500'}>
          {subtitle}
        </span>
        <form onSubmit={handleSubmit}>
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
          <Label forInput={'phone'} value={'No HP pemohon'} className={'pt-6 pb-2'} />
          <Input
            name='phone'
            value={data.phone}
            handleChange={e => setData('phone', e.target.value)}
            className={'w-full'}
          />
          <ErrorText message={errors.phone} />
          <Label forInput={'email'} value={'Email pemohon'} className={'pt-6 pb-2'} />
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
          <Label forInput={'ward'} value={'Kelurahan'} className={'pt-6 pb-2'} />
          <select
            onChange={e => setData('ward', e.target.value)}
            value={data.ward}
            className={'w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'}
          >
            <option value={''}>-- Pilih Kelurahan --</option>
            {stateWard.map((e, i) =>
              <option key={i} value={e.name}>{e.name}</option>
            )}
          </select>
          <ErrorText message={errors.ward} />
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
            <ErrorText message={errors.images} />
          <Button className={'mt-6'} processing={process}>Selanjutnya</Button>
        </form>
      </div>
    </>
  )
}
