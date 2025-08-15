import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Link, usePage } from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import { Inertia } from '@inertiajs/inertia'
import Alert from '@/Components/Alert'
import { Applicant, DesaApplication, Hamlet, Meta, statusOptions, User } from '@/Interface/Interface'
import { getStatus, useIsMobile } from '@/Functions/functions'
import { Button, Select, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput } from 'flowbite-react'
import { makeIntlFormatter } from 'react-timeago/defaultFormatter'
import { HiDownload, HiEye, HiRefresh, HiSearch } from 'react-icons/hi'
import TimeAgo from 'react-timeago'
import axios from 'axios'
import { Paginate } from '../District/Index'


interface Props {
  desaApps: Array<Applicant>
  meta: Meta
  hamlets: Array<Hamlet>
}

interface PagingProps {
  desaApps: Array<Applicant>
  meta: Meta
}

export default function DesaApplicationIndex(props: Props) {
  const { flash } = usePage().props
  const { user } = usePage().props.auth as { user: User }

  const f = flash as { message: string }
  const [showAlert, setShowAlert] = React.useState(true);


  const [paging, setPaging] = React.useState<PagingProps>({
    meta: props.meta,
    desaApps: props.desaApps,
  })
  const [idHamlet, setIdHamlet] = React.useState<number>(-1)
  const [query, setQuery] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [status, setStatus] = React.useState('')
  const [tahun, setTahun] = React.useState(-1)
  const [years, setYears] = React.useState<number[]>([])
  const isMobile = useIsMobile()

  React.useEffect(() => {
    const fetchTahun = async () => {
      const response = await axios.get('/desa-years')
      setYears(response.data);
    }
    fetchTahun()
  }, [])

  const reset = () => {
    setIdHamlet(-1)
    setStatus('')
    setQuery('')
    setTahun(-1)
    setError('')
    setPaging({
      desaApps: props.desaApps,
      meta: props.meta
    })
  }

  const search = async (page?: number | null, perPage?: number | null) => {
    try {
      setLoading(true)

      const params: { tahun: number, status: string, q: string, page: number, per_page: number, hamlet_id: number } = {
        status: status,
        hamlet_id: idHamlet,
        q: query,
        tahun: tahun,
        page: page ?? paging.meta.current_page,
        per_page: perPage ?? paging.meta.per_page,
      }

      const response = await axios.get('/desa-paging', { params })

      const result = response.data as PagingProps
      setPaging({
        desaApps: result.desaApps,
        meta: {
          current_page: result.meta.current_page,
          last_page: result.meta.last_page,
          per_page: result.meta.per_page,
          total: result.meta.total
        }
      }
      )
    } catch (error) {
      setError(`Gagal ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const list: any = []
  // props.desaApps?.forEach((e, i) => {
  //   list.push(
  //     <tr key={i}>
  //       <td className={'p-4 border border-slate-700'}><p className={'flex justify-center'}>{((current_page - 1) * (per_page)) + i + 1}</p></td>
  //       <td className={'p-4 border border-slate-700'}><p className={'flex justify-center'}>{e.id}</p></td>
  //       <td className={'p-4 border border-slate-700 justify-items-center'}><p className={'flex justify-center'}>{getStatus(e.status ?? '')} </p>
  //         {/* <p className={'text-green-500'}>{e.filess !== null && e.filess!.length !== 0 && e.filess![0].name.includes('Hasil') ? '(Berkas terupload)' : ''}</p> */}
  //       </td>

  //       <td className={'p-4 border border-slate-700'}>{e.name}</td>
  //       <td className={'p-4 border border-slate-700'}>{e.category}</td>

  //       <td className='p-4 border border-slate-700'>
  //         <div className="flex flex-row gap-2">

  //           {
  //             e.status == 'COMPLETED' && (e.filess !== null && e.filess !== undefined && e.filess!.length !== 0 && e.filess!.filter((e) => e.name.includes('Hasil')).length !== 0) ?
  //               // <Link
  //               //   className={'inline-block bg-green-600 px-4 py-2 text-white rounded-md font-semibold'}
  //               //   type={'a'}
  //               //   target="_blank"
  //               //   rel="noopener noreferrer"
  //               //   href={route('file.download', { 'place': a.filess!.filter((e) => e.name.includes('Hasil'))[0].place })}
  //               // >
  //               //   Download Hasil

  //               // </Link>
  //               <a className={'inline-block bg-green-600 px-4 py-2 text-white rounded-md font-semibold'} href={`/download-file?place=${e.filess!.filter((a) => a.name.includes('Hasil'))[0].place}`} target="_blank" rel="noopener noreferrer">Download Hasil</a>
  //               : <div></div>
  //           }
  //           <Link
  //             href={route('desa.show', e.id)}
  //             className={'bg-kemenag hover:bg-kemenag-dark text-white font-bold py-2 px-4 rounded'}>
  //             Detail
  //           </Link>

  //         </div>
  //       </td>
  //     </tr>
  //   )
  // })

  return (
    <Authenticated
      header={<h2>Permohonan</h2>}
    >

      <div>
        <p className='header'>Data Semua Pemohon</p>
        <div className='grid grid-cols-1 sm:grid-cols-6 gap-4 mt-6'>
          <Select id="dusun"
            value={idHamlet}
            onChange={(e) => setIdHamlet(Number.parseInt(e.target.value))}
          >
            <option key={-1} value={-1}>Dusun</option>
            {user.ddesa !== null && user.ddesa !== undefined &&
              props.hamlets.filter((item) => item.ward.id === user.ddesa.id).map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))
            }
          </Select>
          <Select id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option key={-1} value={-1}>Status</option>
            {
              statusOptions.map((item) => (
                <option key={item} value={item}>{getStatus(item)}</option>
              ))
            }
          </Select>
          <Select id="tahun"
            value={tahun}
            onChange={(e) => setTahun(Number.parseInt(e.target.value))}
          >
            <option value={0}>Tahun</option>
            {years.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </Select>
          <TextInput
            id="search"
            placeholder="Nik atau Nama"
            value={query}
            onChange={(e) => { setQuery(e.target.value) }}
          />
        </div>
        <div className='mt-4 mb-6 flex gap-x-4 w-full justify-between'>
          <div>
            <select id="view"

              // value={per_page}
              // sizing='sm'
              className={"w-fit block p-2 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-8"}
              onChange={(e) => {
                e.preventDefault();
                // Inertia.get(route('application.index', { 'per_page': e.target.value }))
                search(null, Number.parseInt(e.target.value))

              }}
            >
              <option value={10} id='10'>10</option>
              <option value={15} id='15'>15</option>
              <option value={20} id='20'>20</option>
              <option value={25} id='25'>25</option>
            </select>
          </div>
          {isMobile ? <div></div> : Paginate(paging.meta, search)}
          <div className='inline-flex gap-2'>
            <Button
              onClick={() => search()}
              color={"cyan"}
              size={"xs"}
              disabled={loading}
            >
              <HiSearch className="mr-2 h-5 w-5" />
              Cari
            </Button>
            <Button
              onClick={reset}
              color={"red"}
              size={"xs"}
            >
              <HiRefresh className="mr-2 h-5 w-5" />
              Reset
            </Button>
          </div>
        </div>
        {
          <div className="overflow-x-scroll">
            {
              <Table striped>
                <TableHead className='divide-y'>
                  {
                    isMobile ? <TableRow>
                      <TableHeadCell>No</TableHeadCell>
                      <TableHeadCell>Status</TableHeadCell>
                      <TableHeadCell>Pemohon</TableHeadCell>
                      <TableHeadCell>Aksi</TableHeadCell>


                    </TableRow> : <TableRow className=''>
                      <TableHeadCell>No</TableHeadCell>
                      <TableHeadCell>Tanggal</TableHeadCell>
                      <TableHeadCell>Status</TableHeadCell>
                      <TableHeadCell>Kategori</TableHeadCell>
                      <TableHeadCell>NIK</TableHeadCell>
                      <TableHeadCell>Pemohon</TableHeadCell>
                      <TableHeadCell>Aksi</TableHeadCell>
                    </TableRow>
                  }
                </TableHead>
                <TableBody className="divide-y">
                  {

                    paging.desaApps !== null && paging.desaApps !== undefined && paging.desaApps.map((e, i) => {
                      const date = new Date(e.created_at ?? '')
                      const formattedDate = new Intl.DateTimeFormat('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      }).format(date)
                      const intlFormatter = makeIntlFormatter({
                        locale: "id-ID", // string
                      });
                      if (isMobile) return (
                        <TableRow key={i} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                          <TableCell>
                            <p>{((paging.meta.current_page - 1) * (paging.meta.per_page)) + i + 1}</p>
                          </TableCell>

                          <TableCell className="whitespace-nowrap font-bold text-gray-900 dark:text-white">
                            <p>{getStatus(e.status ?? '')} </p>
                            <p className={'text-green-500'}>{(e.filess !== null && e.filess!.length !== 0 && e.filess!.filter((e) => e.name.includes('Hasil')).length !== 0) ? '(Berkas terupload)' : ''}</p>
                          </TableCell>

                          <TableCell>
                            {e.name}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-row justify-end gap-2">

                              <Button
                                // color={"green"}
                                className='bg-blue-500 hover:bg-blue-800 text-white font-bold'
                                href={route('application.show', e.id)}
                                size='xs'
                              >
                                <HiEye className='mr-2' />
                                Detail
                              </Button>

                            </div>
                          </TableCell>
                        </TableRow >
                      )
                      return (
                        <TableRow key={i} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                          <TableCell>
                            <p>{((paging.meta.current_page - 1) * (paging.meta.per_page)) + i + 1}</p>
                          </TableCell>
                          <TableCell>
                            <p>{formattedDate}</p>
                            <TimeAgo date={e.created_at ?? ''} formatter={intlFormatter} />
                          </TableCell>
                          <TableCell className="whitespace-nowrap font-bold text-gray-900 dark:text-white">
                            <p>{getStatus(e.status ?? '')} </p>
                            <p className={'text-green-500'}>{(e.filess !== null && e.filess!.length !== 0 && e.filess!.filter((e) => e.name.includes('Hasil')).length !== 0) ? '(Berkas terupload)' : ''}</p>
                          </TableCell>
                          <TableCell>
                            {e.category}
                          </TableCell>
                          <TableCell>
                            {e.id_card_number}
                          </TableCell>
                          <TableCell>
                            {e.name}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-row justify-end gap-2">

                              <Button
                                // color={"green"}
                                className='bg-blue-500 hover:bg-blue-800 text-white font-bold'
                                href={route('desa.show', e.id)}
                                size='xs'
                              >
                                <HiEye className='mr-2' />
                                Detail
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow >
                      )
                    })
                  }
                </TableBody>
              </Table>
            }

          </div>
        }
        <div className='flex overflow-x-auto sm:justify-center mt-6'>{
          Paginate(paging.meta, search)}
        </div>
      </div>
    </Authenticated>
  )
}
