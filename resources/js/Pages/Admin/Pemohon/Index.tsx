import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Link, useForm, usePage } from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import { Inertia } from '@inertiajs/inertia'
import Alert from '@/Components/Alert'
import { Applicant, Files } from '@/Interface/Interface'
import { getStatus } from '@/Functions/functions'
import Button from '@/Components/Button'
import { Modal } from 'flowbite-react'
import { ErrorText } from '@/Components/Error'
import Input from '@/Components/Input'
import Label from '@/Components/Label'


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

interface Berkas {
  b: string | File | undefined
}

export default function PemohonIndex(props: Props) {
  const { flash } = usePage().props
  const f = flash as { message: string }
  const [showAlert, setShowAlert] = React.useState(true);
  const { current_page, last_page, per_page, total } = props.meta
  const [showModal, setShowModal] = React.useState(false);
  const { data, setData, post, processing } = useForm<Berkas>(
    {
      b: undefined
    }
  )


  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return
    }
    const file = e.target.files[0]
    setData('b', file)
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>, id: number) {
    e.preventDefault()
    console.log(data)
    post(route('upload.berkas', id))
    setShowModal(!showModal)
    return
  }

  const list: any = []
  props.data?.forEach((e, i) => {
    list.push(
      <tr key={i}>
        <td className={'p-4 border border-slate-700'}><p className={'flex justify-center'}>{((current_page - 1) * (per_page)) + i + 1}</p></td>
        <td className={'p-4 border border-slate-700'}><p className={'flex justify-center'}>{e.id}</p></td>
        <td className={'p-4 border border-slate-700 justify-items-center'}><p className={'flex justify-center'}>{getStatus(e.status ?? '')} </p><p className={'text-green-500'}>{e.filess !== null && e.filess!.length !== 0 && e.filess![0].name.includes('Hasil') ? '(Berkas terupload)' : ''}</p></td>

        <td className={'p-4 border border-slate-700'}>{e.name}</td>
        <td className={'p-4 border border-slate-700'}>{e.category}</td>

        <td className='p-4 border border-slate-700'>
          <div className="flex flex-row gap-2">
            {
              e.category.includes('KTP') || e.category.includes('KIA') ? <div></div> : e.status !== 'COMPLETED' ? <div></div> : (e.filess !== null && e.filess!.length > 0 && e.filess![0].name.includes('Hasil')) ? <div>
                <a className={'inline-block bg-blue-300 px-4 py-2 text-black rounded-md font-semibold'} href={`/download-file?place=${e.filess!.filter((a) => a.name.includes('Hasil'))[0].place}`} target="_blank" rel="noopener noreferrer">Lihat Hasil</a>
              </div> :

                <React.Fragment>
                  <button
                    onClick={(e) => setShowModal(!showModal)}
                    className={'bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded'}
                  >
                    Upload
                  </button>
                  <Modal
                    show={showModal}
                    size="md"
                    popup={true}
                  // onClose={onClose}
                  >
                    <Modal.Header />
                    <Modal.Body>
                      <div className="text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                          Upload data yang akan diunduh oleh pemohon
                        </h3>
                        <div className="flex justify-center gap-4">
                          <form onSubmit={(ev) => onSubmit(ev, e.id ?? 0)}>

                            <Label forInput={'status_description'} value={'PDF / Word'} className={'pt-6 pb-2'} />

                            <Input
                              name='images'
                              type={'file'}
                              handleChange={onSelectFile}
                              className={'w-full'}
                            />

                            <Button className={'mt-6 mr-2'} processing={processing} type='submit'>Selanjutnya</Button>
                            <Button type={'reset'} className={'mt-6 ml-2'} processing={false} onClick={(_) => setShowModal(!showModal)}>Batal</Button>

                          </form>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                </React.Fragment>
            }
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
              className={'bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded'}
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
        <div className={'mx-6 pb-8'}>
          <div className="flex items-center gap-8 justify-center">
            <Link href={current_page === 1 ? '' : route('application.index', { 'page': current_page - 1 })} className={"rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600  focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" + (current_page !== 1 ? 'hover:text-white hover:bg-slate-800 hover:border-slate-800' : '')} type="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
              </svg>
            </Link>

            <p className="text-slate-600">
              Halaman <strong className="text-slate-800">{current_page}</strong> dari&nbsp;<strong className="text-slate-800">{last_page}</strong>
            </p>

            <Link href={last_page === current_page ? '' : route('application.index', { 'page': current_page + 1 })} className={'rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none' + (last_page !== current_page ? 'hover:text-white hover:bg-slate-800 hover:border-slate-800' : '')} type="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>

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
              <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
            </svg>
          </Link>

          <p className="text-slate-600">
            Halaman <strong className="text-slate-800">{current_page}</strong> dari&nbsp;<strong className="text-slate-800">{last_page}</strong>
          </p>

          <Link href={last_page === current_page ? '' : route('application.index', { 'page': current_page + 1 })} className={'rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none' + (last_page !== current_page ? 'hover:text-white hover:bg-slate-800 hover:border-slate-800' : '')} type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </Authenticated>
  )
}
