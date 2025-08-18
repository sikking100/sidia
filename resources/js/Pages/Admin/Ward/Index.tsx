import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Link, usePage } from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import { Inertia } from '@inertiajs/inertia'
import Alert, { ModalAlert } from '@/Components/Alert'
import { District, Meta } from '@/Interface/Interface'
import { CgAdd } from 'react-icons/cg'
import { BackButton } from '@/Components/Button'
import axios from 'axios'
import { useIsMobile } from '@/Functions/functions'
import { Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput, Toast, ToastToggle } from 'flowbite-react'
import { HiCheck, HiRefresh, HiSearch, HiX } from 'react-icons/hi'
import { Paginate } from '../District/Index'
import { GiPencil, GiTrashCan } from 'react-icons/gi'

export interface Ward {
  id: number
  district_id: number
  name: string
}

interface Props {
  district: District
  wards: Array<Ward>
  meta: Meta
}

export default function Ward(props: Props) {
  const { flash } = usePage().props
  const f = flash as { message: string }
  const [showAlert, setShowAlert] = React.useState(false);
  const [paging, setPaging] = React.useState<Props>({
    district: props.district,
    meta: props.meta,
    wards: props.wards,
  })
  const [ward, setWard] = React.useState<Ward | null>(null)
  const [query, setQuery] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const isMobile = useIsMobile()

  const search = async (page?: number | null, perPage?: number | null) => {
    try {
      setLoading(true)

      const params: { page: number, per_page: number, q?: string, id: number } = {
        page: page ?? props.meta.current_page,
        per_page: perPage ?? props.meta.per_page,
        q: query,
        id: props.district.id
      }
      const response = await axios.get('/ward', { params })
      const result = response.data as Props
      setPaging({
        district: result.district,
        wards: result.wards,
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
      district: props.district,
      wards: props.wards,
      meta: props.meta
    })
  }
  return (
    <Authenticated
      header={<h2>Kecamatan {props.district.name}</h2>}
    >
      <ModalAlert
        title={error !== '' ? 'Error' : ward !== null ? 'Peringatan' : null}
        close={() => setShowAlert(false)}
        content={error !== '' ? error : ward !== null ? 'Yakin ingin menghapus data?' : f.message}
        show={showAlert}
        buttonTitle={ward !== null ? 'Hapus' : null}
        function={ward === null ? null : async () => {
          const response = await axios.delete(route('ward.destroy', ward?.id))
          // setDistrict(null)
          // setShowAlert(false)
          Inertia.get(route('district.show', props.district.id))
        }}
      />

      <div className='p-6 bg-white shadow-md rounded-md'>
        <div className='flex gap-2 items-center'>
          <BackButton route='district' />
          <p className='header'>Data Kelurahan / Desa Kecamatan {props.district.name}</p>
          <CgAdd
            size={25}
            className={'cursor-pointer'}
            color='green'
            onClick={_ => Inertia.get(route('ward.create', props.district.id))}
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
        {
          props.wards?.length == 0 ? <p>Tidak ada data</p>
            :
            <div className={'mt-2'}>
              <Table striped>
                <TableHead>
                  <TableRow>
                    <TableHeadCell>No</TableHeadCell>
                    <TableHeadCell>Nama</TableHeadCell>
                    <TableHeadCell>Aksi</TableHeadCell>
                  </TableRow>
                </TableHead>
                <TableBody className='divider-y'>
                  {
                    paging.wards.map((v, k) => {
                      return (
                        <TableRow key={k}>
                          <TableCell>{((paging.meta.current_page - 1) * (paging.meta.per_page)) + k + 1}</TableCell>
                          <TableCell>{v.name}</TableCell>
                          <TableCell className='flex gap-2'>
                            <Button
                              color={'blue'}
                              size='xs'
                              href={route('ward.edit', v.id)}
                            >
                              <GiPencil className='mr-2' />
                              Ubah
                            </Button>
                            <Button
                              color={'red'}
                              size='xs'
                              onClick={_ => {
                                setWard(v)
                                setShowAlert(true)
                              }}
                            >
                              <GiTrashCan className='mr-2' />
                              Hapus
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  }
                </TableBody>
              </Table>
            </div>
        }
        <div className='flex overflow-x-auto sm:justify-center mt-6'>
          {Paginate(paging.meta, search)}
        </div>
      </div>
    </Authenticated >
  )
}
