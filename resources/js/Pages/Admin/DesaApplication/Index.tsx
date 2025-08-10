import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Link, usePage } from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import { Inertia } from '@inertiajs/inertia'
import Alert from '@/Components/Alert'
import { Applicant, DesaApplication, Hamlet, Meta } from '@/Interface/Interface'
import { getStatus } from '@/Functions/functions'


interface Props {
  desaApps?: Array<Applicant>
  meta: Meta
}

export default function DesaApplicationIndex(props: Props) {
  const { flash } = usePage().props
  const f = flash as { message: string }
  const [showAlert, setShowAlert] = React.useState(true);
  const { current_page, last_page, per_page, total } = props.meta

  const list: any = []
  props.desaApps?.forEach((e, i) => {
    list.push(
      <tr key={i}>
        <td className={'p-4 border border-slate-700'}><p className={'flex justify-center'}>{((current_page - 1) * (per_page)) + i + 1}</p></td>
        <td className={'p-4 border border-slate-700'}><p className={'flex justify-center'}>{e.id}</p></td>
        <td className={'p-4 border border-slate-700 justify-items-center'}><p className={'flex justify-center'}>{getStatus(e.status ?? '')} </p>
          {/* <p className={'text-green-500'}>{e.filess !== null && e.filess!.length !== 0 && e.filess![0].name.includes('Hasil') ? '(Berkas terupload)' : ''}</p> */}
        </td>

        <td className={'p-4 border border-slate-700'}>{e.name}</td>
        <td className={'p-4 border border-slate-700'}>{e.category}</td>

        <td className='p-4 border border-slate-700'>
          <div className="flex flex-row gap-2">

            {
              e.status == 'COMPLETED' && (e.filess !== null && e.filess !== undefined && e.filess!.length !== 0 && e.filess!.filter((e) => e.name.includes('Hasil')).length !== 0) ?
                // <Link
                //   className={'inline-block bg-green-600 px-4 py-2 text-white rounded-md font-semibold'}
                //   type={'a'}
                //   target="_blank"
                //   rel="noopener noreferrer"
                //   href={route('file.download', { 'place': a.filess!.filter((e) => e.name.includes('Hasil'))[0].place })}
                // >
                //   Download Hasil

                // </Link>
                <a className={'inline-block bg-green-600 px-4 py-2 text-white rounded-md font-semibold'} href={`/download-file?place=${e.filess!.filter((a) => a.name.includes('Hasil'))[0].place}`} target="_blank" rel="noopener noreferrer">Download Hasil</a>
                : <div></div>
            }
            <Link
              href={route('desa.show', e.id)}
              className={'bg-kemenag hover:bg-kemenag-dark text-white font-bold py-2 px-4 rounded'}>
              Detail
            </Link>

          </div>
        </td>
      </tr>
    )
  })
  return (
    <Authenticated
      header={<h2>Kecamatan</h2>}
    >
      <div className={'mx-6'}>
        <Alert
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          message={f.message}
        />
        {
          props.desaApps?.length == 0 ? <p>Tidak ada data</p>
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
    </Authenticated>
  )
}
