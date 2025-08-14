import React, { useEffect, useState } from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Link, usePage } from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import { Inertia } from '@inertiajs/inertia'
import Alert from '@/Components/Alert'
import { Meta, User } from '@/Interface/Interface'
import { Button, CloseIcon, Modal, ModalBody, ModalFooter, Pagination, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput, ThemeProvider } from 'flowbite-react'
import axios from 'axios'
import { customTheme, useIsMobile } from '@/Functions/functions'
import { HiPencil, HiRefresh, HiSearch } from 'react-icons/hi'
import { RiAiGenerate } from 'react-icons/ri'
import { CgAdd } from 'react-icons/cg'


interface Props {
  users: Array<User>
  meta: Meta

}

interface PropsPaging {
  users: Array<User>
  meta: Meta
}

export default function UserIndex(props: Props) {
  const { flash } = usePage().props
  const f = flash as { message: string }
  const [showAlert, setShowAlert] = React.useState(true);
  const [openModal, setOpenModal] = React.useState(false);
  const [newPass, setNewPass] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [index, setIndex] = useState(0)
  const [desa, setDesa] = useState('')
  const isMobile = useIsMobile()
  const [user, setUser] = useState<PropsPaging>({
    users: props.users,
    meta: props.meta,
  })


  useEffect(() => {
    if (newPass) {
      const timer = setTimeout(() => {
        setNewPass('');
        setError('Password telah dihapus dari memori');
      }, 30000); // 30 detik

      return () => clearTimeout(timer);
    }
  }, [newPass]);

  const handleRegeneratePassword = async (userId: number, index: number) => {
    try {
      setIndex(index)
      setLoading(true)
      const response = await axios.put(route('regen', userId));
      setNewPass(response.data.password)
      setOpenModal(true)
      return;
    } catch (error) {
      setError(`${error}`);
      setOpenModal(true)
    } finally {
      setLoading(false)
    }
  }

  const search = async (page?: number | null, perPage?: number | null) => {
    try {
      setLoading(true)

      const params: { page: number, per_page: number, d?: string } = {
        page: page ?? user.meta.current_page,
        per_page: perPage ?? user.meta.per_page,
        d: desa
      }
      const response = await axios.get('/user-paging', { params })
      const result = response.data as PropsPaging
      setUser({
        users: result.users,
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
    setDesa('')
    setError('')
    setUser({
      users: props.users,
      meta: props.meta
    })
  }

  return (
    <Authenticated
      header={<h2>User</h2>}
    >
      <div>
        <div>
          <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <ModalBody>
              <div className="space-y-4">
                <p>{error}</p>
                {newPass && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Password Baru:</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        readOnly
                        value={newPass}
                        className="block w-full pr-10 border-gray-300 bg-gray-50 rounded-md"
                      />
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(newPass);
                          setError('Password telah disalin ke clipboard!');
                        }}
                        className="absolute inset-y-0 right-0 px-3 flex items-center bg-blue-100 hover:bg-blue-200 rounded-r-md"
                      >
                        Salin
                      </button>
                    </div>
                    <p className="mt-2 text-sm text-red-500">
                      Harap catat password ini karena hanya ditampilkan sekali!
                    </p>
                  </div>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color={'red'} onClick={() => setOpenModal(false)}><CloseIcon className='mr-2' /> Tutup</Button>
            </ModalFooter>
          </Modal>
        </div>

        {/* <div className='mb-6'>
          <Link className={'btn bg-green-600 text-white'} href={route('user.create')}>
            Tambah Data
          </Link>
        </div> */}
        <div className='flex gap-2 items-center'>
          <p className='header'>Data Semua Pengguna</p>

          <CgAdd
            size={25}
            className={'cursor-pointer'}
            color='green'
            onClick={_ => Inertia.get(route('user.create'))}
          />
        </div>
        <div className={'flex justify-between mt-6'}>
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
          {isMobile ? <div></div> : <div className="overflow-x-auto sm:justify-center">
            <ThemeProvider
              theme={customTheme}>
              <Pagination
                currentPage={user.meta.current_page} totalPages={user.meta.last_page} onPageChange={(e) => search(e)} showIcons />
            </ThemeProvider>
          </div>}

          <div className='flex gap-2'>
            <TextInput
              sizing='sm'
              id="search"
              placeholder="Nik atau Nama"
              value={desa}
              onChange={(e) => { setDesa(e.target.value) }}
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
          user.users.length == 0 ? <p>Tidak ada data</p>
            :
            <div className='overflow-x-scroll overflow-y-hidden'>
              <Table className='mt-2' striped>
                <TableHead>
                  <TableRow>
                    <TableHeadCell>No</TableHeadCell>
                    <TableHeadCell>Kel / Des</TableHeadCell>
                    <TableHeadCell>Nama</TableHeadCell>
                    <TableHeadCell>Email</TableHeadCell>
                    <TableHeadCell>Aksi</TableHeadCell>
                  </TableRow>
                </TableHead>
                <TableBody className='divider-y'>
                  {user.users.map((v, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell>{((user.meta.current_page - 1) * (user.meta.per_page)) + i + 1}</TableCell>
                        <TableCell>{v.ddesa.name}</TableCell>
                        <TableCell>{v.name}</TableCell>
                        <TableCell>{v.email}</TableCell>
                        <TableCell className={'flex gap-2'}>

                          <Button
                            size='xs'
                            color={'cyan'}
                            href={route('user.edit', v.id)}
                          >
                            <HiPencil className="mr-2 h-5 w-5" />
                            Edit
                          </Button>
                          <Button
                            size='xs'
                            onClick={() => handleRegeneratePassword(v.id, i)}
                            disabled={loading}
                            color="red"
                          >
                            {loading && index === i ? (
                              <>
                                <HiRefresh className="mr-2 h-5 w-5 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              <>
                                <RiAiGenerate className='mr-2' />
                                Regenerate Password
                              </>
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
        }
        <div className="flex overflow-x-auto sm:justify-center mt-6">
          <ThemeProvider
            theme={customTheme}>
            <Pagination

              layout={isMobile ? 'navigation' : undefined} currentPage={user.meta.current_page} totalPages={user.meta.last_page} onPageChange={(e) => search(e)} showIcons />
          </ThemeProvider>
        </div>
      </div>
    </Authenticated>
  )
}
