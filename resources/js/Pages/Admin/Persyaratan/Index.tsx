import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Link, usePage } from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import { Inertia } from '@inertiajs/inertia'
import Alert, { ModalAlert } from '@/Components/Alert'
import { Menu, Meta } from '@/Interface/Interface'
import { useIsMobile } from '@/Functions/functions'
import { Paginate } from '../District/Index'
import axios from 'axios'
import { GiPencil, GiTrashCan, GiVillage } from 'react-icons/gi'
import { Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput } from 'flowbite-react'
import { HiRefresh, HiSearch } from 'react-icons/hi'


interface Props {
  menus: Array<Menu>
  meta: Meta
}

export default function PersyaratanIndex(props: Props) {
  const { flash } = usePage().props
  const f = flash as { message: string }
  const [showAlert, setShowAlert] = React.useState(false);
  const [paging, setPaging] = React.useState<Props>({
    meta: props.meta,
    menus: props.menus,
  })
  const [menu, setMenu] = React.useState<Menu | null>(null)
  const [query, setQuery] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const isMobile = useIsMobile()

  React.useEffect(() => {
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
      const response = await axios.get('/menu-paging', { params })
      const result = response.data as Props
      setPaging({
        menus: result.menus,
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
      menus: props.menus,
      meta: props.meta
    })
  }

  return (
    <Authenticated
      header={<h2>Kategori</h2>}
    >
      <ModalAlert
        buttonTitle={menu !== null ? 'Hapus' : null}
        function={menu !== null ? async () => {
          await axios.delete(route('district.destroy', menu.id))

          // setDistrict(null)
          // setShowAlert(false)
          Inertia.get(route('district.index'))
        } : null}
        show={showAlert} close={() => setShowAlert(false)}
        content={error !== '' ? error : menu !== null ? 'Yakin ingin menghapus data?' : f.message}
        title={error !== '' ? 'Error' : menu !== null ? 'Peringatan' : null}
      />
      <div className='p-6 bg-white shadow-md rounded-md'>
        <p className='header'>Kategori dan Persyaratan</p>
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
            props.menus?.length == 0 ? <p>Tidak ada data</p>
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
                    paging.menus.map((v, k) => {
                      return (
                        <TableRow key={k}>
                          <TableCell>{((paging.meta.current_page - 1) * (paging.meta.per_page)) + k + 1}</TableCell>
                          <TableCell>{v.name}</TableCell>
                          <TableCell className='flex gap-2'>
                            <Button
                              color={'blue'}
                              size='xs'
                              href={route('menu.show', v.id)}
                            >
                              <GiPencil className='mr-2' />
                              Ubah
                            </Button>


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
      </div>
    </Authenticated>
  )
}
