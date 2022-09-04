import React, { useState } from 'react'
import { Head } from '@inertiajs/inertia-react'
import Guest from '@/Layouts/Guest'
import Input from '@/Components/Input'
import Label from '@/Components/Label'
import axios from 'axios'
import { Applicant } from '@/Interface/Interface'
import Button from '@/Components/Button'
import { useForm, Link } from '@inertiajs/inertia-react'
import route from 'ziggy-js'

interface FormProps {
  nik: string
}
export default function CheckApplicant() {
  const [applicant, setStateApplicant] = useState<Array<Applicant>>()
  const { data, setData, progress } = useForm<FormProps>(
    {
      nik: ''
    }
  )
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setData('nik', e.target.value)
    return
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.log(data.nik)
    axios.get(`/applicant/${data.nik}`).then(res => {
      if (res.data != null) {
        const da = res.data as Array<Applicant>
        console.log(da)

        setStateApplicant(da)
      }

      return
    }).catch(e => console.log(e))
    return
  }
  const process = progress && progress.percentage > 0 || false

  return (
    <Guest
      title='Cek Permohonan'>
      <Head title={'Cek Permohonan'} />
      <form onSubmit={onSubmit}>
        <Label forInput={'nik'} value={'Nik pemohon'} className={'pt-6 pb-2'} />
        <Input
          name={'nik'}
          handleChange={handleChange}
          className={'w-full'}
        />
        <Button className={'mt-6'} processing={process}>Cari</Button>
      </form>
      {applicant && <div className={'mt-6'}>
        <table className={'table-auto w-full border-collapse border border-slate-400'}>
          <thead>
            <tr>
              <th className={'border border-slate-300 p-6 text-left'}>
                No
              </th>
              <th className={'border border-slate-300 p-6 text-left'}>
                Nik
              </th>
              <th className={'border border-slate-300 p-6 text-left'}>
                Nama
              </th>
              <th className={'border border-slate-300 p-6 text-left'}>
                Status
              </th>
              <th className={'border border-slate-300 p-6 text-left'}>
                Keterangan
              </th>
              <th className={'border border-slate-300 p-6 text-left'}>
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {applicant.map((a, i) => <tr key={i}>
              <td className={'border border-slate-300 p-6'}>
                {i}
              </td>
              <td className={'border border-slate-300 p-6'}>
                {a.id_card_number}
              </td>
              <td className={'border border-slate-300 p-6'}>
                {a.name}
              </td>
              <td className={'border border-slate-300 p-6'}>
                {a.status}
              </td>
              <td className={'border border-slate-300 p-6'}>
                {a.status_description}
              </td>
              <td className={'border border-slate-300 p-6'}>
                {a.status == 'DEFFICIENT' && <Link
                  className={'button'}
                  type={'a'}
                  href={route('upload', { 'id': a.id!, 'category': a.category })}
                >
                  Upload Berkas
                </Link>}
              </td>
            </tr>)}
          </tbody>
        </table>
      </div>}
    </Guest>
  )
}
