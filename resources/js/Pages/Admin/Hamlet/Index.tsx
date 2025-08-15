import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Link, usePage } from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import { Inertia } from '@inertiajs/inertia'
import Alert, { ModalAlert } from '@/Components/Alert'
import { Hamlet, Meta } from '@/Interface/Interface'
import { useIsMobile } from '@/Functions/functions'
import axios from 'axios'
import { Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput } from 'flowbite-react'
import { CgAdd } from 'react-icons/cg'
import { HiRefresh, HiSearch } from 'react-icons/hi'
import { Paginate } from '../District/Index'
import { GiPencil, GiTrashCan } from 'react-icons/gi'


interface Props {
  hamlets: Array<Hamlet>
  meta: Meta
}

export default function HamletIndex(props: Props) {
  const { flash } = usePage().props
  const f = flash as { message: string }
  const [showAlert, setShowAlert] = React.useState(false);

  const [paging, setPaging] = React.useState<Props>({
    meta: props.meta,
    hamlets: props.hamlets,
  })
  const [hamlet, setHamlet] = React.useState<Hamlet | null>(null)
  const [query, setQuery] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const isMobile = useIsMobile()

  const search = async (page?: number | null, perPage?: number | null) => {
    try {
      setLoading(true)

      const params: { page: number, per_page: number, q?: string } = {
        page: page ?? props.meta.current_page,
        per_page: perPage ?? props.meta.per_page,
        q: query,
      }
      const response = await axios.get('/hamlet-paging', { params })
      const result = response.data as Props
      setPaging({
        hamlets: result.hamlets,
        meta: result.meta
      }
      )
    } catch (error) {
      setError(`Gagal ${error}`)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    if ((f.message !== null && f.message !== '') || (error !== '')) {
      setShowAlert(true)
    }
  }, [f, error])

  const reset = () => {
    setQuery('')
    setError('')
    setPaging({
      hamlets: props.hamlets,
      meta: props.meta
    })
  }

  const list: any = []
  props.hamlets?.forEach((e, i) => {
    list.push(
      <tr key={i}>
        <td className={'p-4 border border-slate-700'}><p className={'flex justify-center'}>{i + 1}</p></td>
        <td className={'p-4 border border-slate-700'}>{e.name}</td>
        <td className='p-4 border border-slate-700'>
          <div className="flex flex-row gap-2">

            <Link
              href={route('hamlet.edit', e.id)}
              className={'bg-yellow-500 hover:bg-kemenag-dark text-white font-bold py-2 px-4 rounded'}>
              Ubah
            </Link>
            <button
              onClick={(ef) => {
                ef.preventDefault()
                if (confirm("Are you sure you want to delete this user?")) {
                  setShowAlert(true)
                  Inertia.delete(route('hamlet.destroy', e.id));
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
      header={<h2>Kecamatan</h2>}
    >
      <ModalAlert
        title={error !== '' ? 'Error' : hamlet !== null ? 'Peringatan' : null}
        close={() => setShowAlert(false)}
        content={error !== '' ? error : hamlet !== null ? 'Yakin ingin menghapus data?' : f.message}
        show={showAlert}
        buttonTitle={hamlet !== null ? 'Hapus' : null}
        function={hamlet === null ? null : async () => {
          const response = await axios.delete(route('hamlet.destroy', hamlet.id))
          // setDistrict(null)
          // setShowAlert(false)
          Inertia.get(route('hamlet.index'))
        }}
      />
      <div>

        <div className='flex gap-2 items-center'>
          <p className='header'>Data Dusun</p>
          <CgAdd
            size={25}
            className={'cursor-pointer'}
            color='green'
            onClick={_ => Inertia.get(route('hamlet.create'))}
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
            props.hamlets?.length == 0 ? <p>Tidak ada data</p>
              :
              <Table striped>
                <TableHead>
                  <TableRow>
                    <TableHeadCell>No</TableHeadCell>
                    <TableHeadCell>Nama</TableHeadCell>
                    <TableHeadCell>Aksi</TableHeadCell>
                  </TableRow>
                </TableHead>
                <TableBody className='divider-y'>
                  {paging.hamlets.map((hamlet, k) => (
                    <TableRow key={k}>
                      <TableCell>{((paging.meta.current_page - 1) * (paging.meta.per_page)) + k + 1}</TableCell>
                      <TableCell>{hamlet.name}</TableCell>
                      <TableCell className='flex gap-2'>
                        <Button
                          color={'blue'}
                          size='xs'
                          href={route('hamlet.edit', hamlet.id)}
                        >
                          <GiPencil className='mr-2' />
                          Ubah
                        </Button>
                        <Button
                          color={'red'}
                          size='xs'
                          onClick={_ => {
                            setHamlet(hamlet)
                            setShowAlert(true)
                          }}
                        >
                          <GiTrashCan className='mr-2' />
                          Hapus
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          }
        </div>
        <div className='flex overflow-x-auto sm:justify-center mt-6'>
          {Paginate(paging.meta, search)}
        </div>
      </div>
    </Authenticated>
  )
}
