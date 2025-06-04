import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Link, usePage } from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import { Inertia } from '@inertiajs/inertia'
import Alert from '@/Components/Alert'
import { Applicant } from '@/Interface/Interface'


interface Meta {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

interface Props {
  data?: Array<Applicant>
  meta: Meta
}

export default function PemohonIndex(props: Props) {
  const { flash } = usePage().props
  const f = flash as { message: string }
  const [showAlert, setShowAlert] = React.useState(true);
  const { current_page, last_page, per_page, total } = props.meta

  const list: any = []
  props.data?.forEach((e, i) => {
    list.push(
      <tr key={i}>
        <td className={'p-4 border border-slate-700'}><p className={'flex justify-center'}>{((current_page - 1) * (per_page)) + i + 1}</p></td>
        <td className={'p-4 border border-slate-700'}><p className={'flex justify-center'}>{e.id}</p></td>
        <td className={'p-4 border border-slate-700'}><p className={'flex justify-center'}>{e.status}</p></td>

        <td className={'p-4 border border-slate-700'}>{e.name}</td>
        <td className={'p-4 border border-slate-700'}>{e.category}</td>

        <td className='p-4 border border-slate-700'>
          <div className="flex flex-row gap-2">
            <Link
              href={route('application.show', e.id)}
              className={'bg-kemenag hover:bg-kemenag-dark text-white font-bold py-2 px-4 rounded'}>
              Detail
            </Link>
            <button
              onClick={(ef) => {
                ef.preventDefault()
                if (confirm("Are you sure you want to delete this user?")) {
                  setShowAlert(true)
                  Inertia.delete(route('application.destroy', e.id));
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
      header={<h2>Pemohon</h2>}
    >
      <div className={'mx-6'}>
        <Alert
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          message={f.message}
        />
        {
          props.data?.length == 0 ? <p>Tidak ada data</p>
            :
            <table
              className={'w-full'}
            >
              <thead>
                <tr>
                  <th className='p-4 border border-slate-600'>No</th>
                  <th className='p-4 border border-slate-600'>No. Antrian</th>
                  <th className='p-4 border border-slate-600'>Status</th>
                  <th className='p-4 border border-slate-600'>Nama</th>
                  <th className='p-4 border border-slate-600'>Kategori</th>
                  <th className='p-4 border border-slate-600'>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {list}
              </tbody>
            </table>
        }
      </div>
      <div className={'mx-6 pt-8 pb-8'}>
        <div className="flex items-center gap-8 justify-center">
          <Link href={current_page === 1 ? '' : route('application.index', { 'page': current_page - 1 })} className={"rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600  focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" + (current_page !== 1 ? 'hover:text-white hover:bg-slate-800 hover:border-slate-800' : '')} type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path fill-rule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
            </svg>
          </Link>

          <p className="text-slate-600">
            Halaman <strong className="text-slate-800">{current_page}</strong> dari&nbsp;<strong className="text-slate-800">{last_page}</strong>
          </p>

          <Link href={last_page === current_page ? '' : route('application.index', { 'page': current_page + 1 })} className={'rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none' + (last_page !== current_page ? 'hover:text-white hover:bg-slate-800 hover:border-slate-800' : '')} type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </Authenticated>
  )
}
