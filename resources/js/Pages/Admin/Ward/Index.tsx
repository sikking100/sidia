import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Link, usePage } from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import { Inertia } from '@inertiajs/inertia'
import Alert from '@/Components/Alert'
import { District } from '@/Interface/Interface'

export interface Ward {
  id: number
  district_id: number
  name: string
}

interface Props {
  district: District
  wards?: Array<Ward>
}

export default function Ward(props: Props) {
  console.log(props.wards)
  const { flash } = usePage().props
  const f = flash as { message: string }
  const [showAlert, setShowAlert] = React.useState(true);

  const list: any = []

  props.wards?.forEach((e, i) => {
    list.push(
      <tr key={i}>
        <td className={'p-4 border border-slate-700'}><p className={'flex justify-center'}>{i + 1}</p></td>
        <td className={'p-4 border border-slate-700'}>{e.name}</td>
        <td className='p-4 border border-slate-700'>
          <div className="flex flex-row gap-2">
            <Link
              href={route('district.edit', e.id)}
              className={'bg-kemenag hover:bg-kemenag-dark text-white font-bold py-2 px-4 rounded'}>
              Kelurahan
            </Link>
            <Link
              href={route('district.edit', e.id)}
              className={'bg-yellow-500 hover:bg-kemenag-dark text-white font-bold py-2 px-4 rounded'}>
              Ubah
            </Link>
            <button
              onClick={(ef) => {
                ef.preventDefault()
                if (confirm("Are you sure you want to delete this user?")) {
                  setShowAlert(true)
                  Inertia.delete(route('district.destroy', e.id));
                }
              }}
              className={'bg-red-500 hover:bg-kemenag-dark text-white font-bold py-2 px-4 rounded'}
            >
              Hapus
            </button>
          </div>
        </td>
      </tr>
    )
  })
  return (
    <Authenticated
      header={<h2>Kecamatan {props.district.name}</h2>}
    >
      <div className={'mx-6'}>
        <Alert
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          message={f.message}
        />
        <Link className={'link'} href={route('ward.create', props.district.id)}>
          Tambah Data
        </Link>
        {
          props.wards?.length == 0 ? <p>Tidak ada data</p>
            :
            <table
              className={'w-full'}
            >
              <thead>
                <tr>
                  <th className='p-4 border border-slate-600'>No</th>
                  <th className='p-4 border border-slate-600'>Nama</th>
                  <th className='p-4 border border-slate-600'>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {list}
              </tbody>
            </table>
        }
      </div>
    </Authenticated>
  )
}
