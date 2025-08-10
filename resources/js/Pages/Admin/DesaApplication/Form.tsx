import React, { useRef, useState } from 'react'
import { Applicant, DesaApplicationPost, FilesForm, Hamlet, Menu, permasalahan, Requirement, subtitle } from '@/Interface/Interface'
import Button, { BackButton } from '@/Components/Button'
import route from 'ziggy-js'
import { defImage } from '@/Components/Constant'
import Authenticated from '@/Layouts/Authenticated'
import { useForm, usePage } from '@inertiajs/inertia-react'
import { Parser } from 'html-to-react'
import Label from '@/Components/Label'
import Input from '@/Components/Input'
import { ErrorText } from '@/Components/Error'
import Container from '@/Components/Container'
import { Inertia, Method } from '@inertiajs/inertia'
import Alert from '@/Components/Alert'

interface Props {
  filess?: Array<File>
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

  const { data, errors, setData, post, put, progress, processing } = useForm<DesaApplicationPost>(
    {
      id_card_number: applicant?.id_card_number ?? '',
      family_card_number: applicant?.family_card_number ?? '',
      family_head_name: applicant?.family_head_name ?? '',
      name: applicant?.name ?? '',
      images: undefined,
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

  console.log('data awal' + data.name);

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
    console.log('setelah pilih foto awal' + data.images);

  }

  return (
    <div>
      <Alert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        message={f.message}
      />
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
          <Label forInput={'hamlet_id'} value={'Dusun'} className={'pt-6 pb-2'} />
          <select
            onChange={e => setData('hamlet_id', Number(e.target.value))}
            value={data.hamlet_id}
            className={'w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'}
          >
            <option value={''}>-- Pilih Dusun --</option>
            {hamlets.map((e, i) =>
              <option key={i} value={e.id}>{e.name}</option>
            )}
          </select>
          <ErrorText message={errors.hamlet_id} />
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
          {preview === defImage && data.images !== undefined ? <img src={`../../storage/images/${data.images}`} style={{ maxHeight: 200, minHeight: 0 }} className={'mb-2'} /> : <img src={preview} style={{ maxHeight: 200, minHeight: 0 }} className={'mb-2'} />}
          <Input
            name='images'
            type={'file'}
            handleChange={onSelectFile}
            className={'w-full'}
          />
          <button
            type='button'
            onClick={() => setData('images', undefined)}
          >
            batal pilih foto
          </button>
          <Label forInput={'images'} value={'Ket : Foto Wajah Jelas'} className={'pt-2 font-bold'} />

          <ErrorText message={errors.images} />
          <p className={'text-red-900 mt-6'}>* Harus diisi</p>

          {filess !== null && filess !== undefined && filess.length > 0 ? <div>
            Berkas yang sudah diupload
            <ol >
              {filess.map((v, k) => {
                return (
                  <li key={k}>{v.name}</li>
                )
              })}
            </ol>
          </div> : <div></div>}

          <span className={'text-sm font-thin text-gray-500'}>
            Upload File
          </span>
          {requirements.map((v, k) => {
            return <div key={k}>
              <Label forInput={v.name} className={'w-full'} value={v.name} />
              <Input
                className={'files'}
                type={'file'}
                handleChange={e => {
                  const listFiles = e.target.files
                  if (listFiles != null) {
                    if (applicant !== null && applicant !== undefined) {
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
          <Button className={'mt-2'} processing={process}>{(applicant !== null && applicant !== undefined) ? 'Perbarui' : 'Simpan'}</Button>
        </form>
      </div>}
    </div>
  )
}
