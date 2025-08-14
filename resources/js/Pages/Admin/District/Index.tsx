import React, { useEffect } from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Link, usePage } from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import { Inertia } from '@inertiajs/inertia'
import Alert, { ModalAlert } from '@/Components/Alert'
import { District, Meta } from '@/Interface/Interface'
import { customTheme, useIsMobile } from '@/Functions/functions'
import { CgAdd } from 'react-icons/cg'
import { Button, Modal, ModalHeader, Pagination, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput, ThemeProvider } from 'flowbite-react'
import { HiEye, HiRefresh, HiSearch } from 'react-icons/hi'
import axios from 'axios'
import { verify } from 'crypto'
import { GiPencil, GiTrashCan, GiVillage } from 'react-icons/gi'


interface Props {
  districts: Array<District>
  meta: Meta
}

export function Paginate(meta: Meta, search: (page?: number | null, perPage?: number | null) => Promise<void>) {
  return (
    <div className="overflow-x-auto sm:justify-center">
      <ThemeProvider
        theme={customTheme}>
        <Pagination
          currentPage={meta.current_page} totalPages={meta.last_page} onPageChange={(e) => search(e, meta.per_page)} showIcons />
      </ThemeProvider>
    </div>
  )
}


export default function DistrictIndex(props: Props) {
  const { flash } = usePage().props
  const f = flash as { message: string }
  const [showAlert, setShowAlert] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const isMobile = useIsMobile()
  const [district, setDistrict] = React.useState<District | null>(null)
  const [paging, setPaging] = React.useState<Props>({
    districts: props.districts,
    meta: props.meta
  })
  const [query, setQuery] = React.useState('')
  const [error, setError] = React.useState('')

  useEffect(() => {
    if ((f.message !== null && f.message !== '') || (error !== '')) {
      setShowAlert(true)
    }
  }, [f, error])


  const search = async (page?: number | null, perPage?: number | null) => {
    try {
      setLoading(true)

      const params: { page: number, per_page: number, q?: string } = {
        page: page ?? props.meta.current_page,
        per_page: perPage ?? props.meta.per_page,
        q: query
      }
      const response = await axios.get('/district-paging', { params })
      const result = response.data as Props
      setPaging({
        districts: result.districts,
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

  const reset = () => {
    setQuery('')
    setError('')
    setPaging({
      districts: props.districts,
      meta: props.meta
    })
  }
  return (
    <Authenticated
      header={<h2>Kecamatan</h2>}
    >
      <ModalAlert
        buttonTitle={district !== null ? 'Hapus' : null}
        function={district !== null ? async () => {
          await axios.delete(route('district.destroy', district.id))

          // setDistrict(null)
          // setShowAlert(false)
          Inertia.get(route('district.index'))
        } : null}
        show={showAlert} close={() => setShowAlert(false)}
        content={error !== '' ? error : district !== null ? 'Yakin ingin menghapus data?' : f.message}
        title={error !== '' ? 'Error' : district !== null ? 'Peringatan' : null}
      />

      <div>
        <div className='flex gap-2 items-center'>
          <p className='header'>Data Kecamatan</p>

          <CgAdd
            size={25}
            className={'cursor-pointer'}
            color='green'
            onClick={_ => Inertia.get(route('district.create'))}
          />
        </div>
        <div className={'flex justify-between mt-6'}>
          <select id="view"
            className={"w-fit block p-2 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-8"}
            onChange={(e) => {
              e.preventDefault();
              search(null, Number.parseInt(e.target.value))
            }}
          >
            <option value={10} id='5'>10</option>
            <option value={15} id='10'>15</option>
            <option value={20} id='15'>20</option>
            <option value={25} id='20'>25</option>
          </select>
          {isMobile ? <div></div> : Paginate(paging.meta, search)}

          <div className='flex gap-2'>
            <TextInput
              sizing='sm'
              id="search"
              placeholder="Nama"
              value={query}
              onChange={(e) => { setQuery(e.target.value) }}
            />
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
        <div className='mt-2'>
          {
            props.districts?.length == 0 ? <p>Tidak ada data</p>
              :
              <Table striped>
                <TableHead>
                  <TableRow>
                    <TableHeadCell>No</TableHeadCell>
                    <TableHeadCell>Nama</TableHeadCell>
                    <TableHeadCell>Aksi</TableHeadCell>
                  </TableRow>
                </TableHead>
                <TableBody className={'divider-y'}>
                  {
                    paging.districts !== null && paging.districts !== undefined && paging.districts.map((v, k) => {
                      return (
                        <TableRow key={k}>
                          <TableCell>{((paging.meta.current_page - 1) * (paging.meta.per_page)) + k + 1}</TableCell>
                          <TableCell>{v.name}</TableCell>
                          <TableCell className='flex gap-2'>
                            <Button
                              href={route('district.show', v.id)}
                              size='xs'
                              color={'green'}
                            >
                              <GiVillage className='mr-2' />
                              Kelurahan / Desa
                            </Button>
                            <Button
                              color={'blue'}
                              size='xs'
                              href={route('district.edit', v.id)}
                            >
                              <GiPencil className='mr-2' />
                              Ubah
                            </Button>
                            <Button
                              color={'red'}
                              size='xs'
                              onClick={_ => {
                                setDistrict(v)
                                setShowAlert(true)
                              }}
                            >
                              <GiTrashCan className='mr-2' />
                              Hapus
                            </Button>

                            {/* <button
                              onClick={(ef) => {
                                ef.preventDefault()
                                if (confirm("Are you sure you want to delete this user?")) {
                                  setShowAlert(true)
                                  Inertia.delete(route('district.destroy', v.id));
                                }
                              }}
                              className={'bg-red-500 hover:bg-kemenag-dark text-white font-bold py-2 px-4 rounded'}
                            >
                              Hapus
                            </button> */}
                          </TableCell>
                        </TableRow>
                      )
                    })
                  }
                </TableBody>
              </Table>
          }
        </div >
        <div className='flex overflow-x-auto sm:justify-center mt-6'>
          {Paginate(paging.meta, search)}
        </div>
      </div >
    </Authenticated >
  )
}
