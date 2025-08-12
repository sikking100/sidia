import React, { useEffect, useRef } from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Link, useForm, usePage } from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import { Inertia } from '@inertiajs/inertia'
import Alert from '@/Components/Alert'
import { Applicant, District, Files, Hamlet, Meta, User, Ward } from '@/Interface/Interface'
import { getStatus, useIsMobile } from '@/Functions/functions'
import { Button, createTheme, Modal, ModalBody, ModalHeader, Pagination, Select, Spinner, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput, ThemeProvider } from 'flowbite-react'
import { ErrorText } from '@/Components/Error'
import Input from '@/Components/Input'
import Label from '@/Components/Label'
import { HiDownload, HiEye, HiRefresh, HiSearch, HiShoppingCart, HiTrash, HiUpload } from 'react-icons/hi'
import axios from 'axios'
import TimeAgo from 'react-timeago'
import { makeIntlFormatter } from 'react-timeago/defaultFormatter'
interface Props {
  data: Array<Applicant>
  meta: Meta
  districts: Array<District>
  wards: Array<Ward>
  hamlets: Array<Hamlet>
}

interface SearchApplicant {
  data: Array<Applicant>
  meta: Meta
}

interface SearchParam {
  district: string
  ward: string
  hamlet_id: number
  status: string
  nikname: string
  tahun: number
  page: number
  per_page: number
}

interface Berkas {
  b: string | File | undefined
}

export default function PemohonIndex(props: Props) {
  const { flash } = usePage().props
  const { user } = usePage().props.auth as { user: User }
  const f = flash as { message: string }
  const [showAlert, setShowAlert] = React.useState(true);
  // const { current_page, last_page, per_page, total } = props.meta
  const [applicant, setApplicant] = React.useState<SearchApplicant>({
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
      per_page: 10,
      total: 10
    }
  })
  const [showModal, setShowModal] = React.useState(false);

  const { data, setData, post, processing } = useForm<Berkas>(
    {
      b: undefined
    }
  )
  const id = useRef<number>()
  // const idDistrict = useRef<number>()
  const [idDistrict, setIdDistrict] = React.useState<number>(-1)
  const [idWard, setIdWard] = React.useState<number>(-1)
  const [tahunOptions, setTahunOptions] = React.useState<number[]>([]);
  const [status, setStatus] = React.useState('')
  const [tahun, setTahun] = React.useState(0)
  const [idHamlet, setIdHamlet] = React.useState(-1)
  const [nikname, setNikname] = React.useState('')

  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [isSearch, setIsSearch] = React.useState(false)

  const statusOptions = ['PENDING', 'DEFFICIENT', 'REVISED', 'VERIFIED', 'COMPLETED', 'CANCEL']

  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchTahun = async () => {
      const response = await axios.get('/years')
      setTahunOptions(response.data);
    }

    fetchTahun()
    setApplicant({
      data: props.data,
      meta: props.meta
    })
  }, [])




  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return
    }
    const file = e.target.files[0]
    setData('b', file)
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    post(route('upload.berkas', id.current))
    setShowModal(!showModal)
    return
  }

  const reset = () => {
    setIdDistrict(-1)
    setIdWard(-1)
    setIdHamlet(-1)
    setStatus('')
    setNikname('')
    setTahun(0)
    setError('')
    setApplicant(prev => ({
      data: props.data,
      meta: props.meta
    }))
  }

  const search = async (page?: number | null, perPage?: number | null) => {
    try {
      setLoading(true)
      var district = ''
      if (idDistrict !== -1) {
        district = props.districts.filter((e) => e.id === idDistrict)[0].name
      }
      var ward = ''
      if (idWard !== -1) {
        ward = props.wards.filter((e) => e.id === idWard)[0].name
      }
      const params: SearchParam = {
        district: district,
        ward: ward,
        hamlet_id: idHamlet,
        status: status,
        nikname: nikname,
        tahun: tahun,
        page: page ?? applicant.meta.current_page,
        per_page: perPage ?? applicant.meta.per_page,
      }
      const response = await axios.get('/paging', { params })
      console.log(response);

      const result = response.data as SearchApplicant
      setApplicant({
        // ...prev,
        data: result.data,
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

  const customTheme = createTheme({
    pagination: {
      "base": "text-xs",
      "layout": {
        "table": {
          "base": "text-xs text-gray-700 dark:text-gray-400",
          "span": "font-semibold text-gray-900 dark:text-white"
        }
      },
      "pages": {
        "base": "xs:mt-0 mt-0 inline-flex items-center -space-x-px",
        "showIcon": "inline-flex",
        "previous": {
          "base": "ml-0 rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
          "icon": "h-3.5 w-3.5"
        },
        "next": {
          "base": "rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
          "icon": "h-3.5 w-3.5"
        },
        "selector": {
          "base": "w-12 border border-gray-300 bg-white py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
          "active": "bg-cyan-50 text-cyan-600 hover:bg-cyan-100 hover:text-cyan-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white",
          "disabled": "cursor-not-allowed opacity-50"
        }
      }
    },
  });


  return (
    <Authenticated
      header={<h2>Pemohon</h2>}
    >
      <div>
        <Alert
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          message={f.message}
        />

        <p className='text-xl font-bold text-gray-500'>Data Semua Permohonan</p>
        <div className='grid grid-cols-1 sm:grid-cols-6 gap-4 mt-6'>
          <Select id="kecamatan"
            value={idDistrict}
            onChange={(e) => {
              e.preventDefault();
              setIdDistrict(Number.parseInt(e.target.value));
            }}
          >
            <option key={-1} value={-1}>Kecamatan</option>
            {
              props.districts.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))
            }
          </Select>
          <Select id="desa"
            value={idWard}
            onChange={(e) => {
              e.preventDefault();
              setIdWard(Number.parseInt(e.target.value));
            }}
          >
            <option key={-1} value={-1}>Desa</option>
            {
              props.wards.filter((item) => item.district_id === idDistrict).map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))
            }
          </Select>
          {
            user.role === 'desa' ?
              <Select id="dusun"
                value={idHamlet}
                onChange={(e) => setIdHamlet(Number.parseInt(e.target.value))}
              >
                <option key={-1} value={-1}>Dusun</option>
                {
                  props.hamlets.filter((item) => item.ward.id === idWard).map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))
                }
              </Select> : <div></div>
          }
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
            {tahunOptions.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </Select>
          <TextInput
            id="search"
            placeholder="Nik atau Nama"
            value={nikname}
            onChange={(e) => { setNikname(e.target.value) }}
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
          {isMobile ? <div></div> : <div className="overflow-x-auto sm:justify-center">
            <ThemeProvider
              theme={customTheme}>
              <Pagination
                currentPage={applicant.meta.current_page} totalPages={applicant.meta.total} onPageChange={(e) => search(e)} showIcons />
            </ThemeProvider>
          </div>}
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
              error !== '' ? <p>{error}</p> : loading ? <Spinner /> : <Table striped>
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
                  {/* {list} */}
                  {

                    applicant.data.map((e, i) => {
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
                            <p>{((applicant.meta.current_page - 1) * (applicant.meta.per_page)) + i + 1}</p>
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
                              {
                                e.category.includes('KTP') || e.category.includes('KIA') ? <div></div> : e.status !== 'COMPLETED' ? <div></div> : (e.filess !== null && e.filess!.length > 0 && e.filess![0].name.includes('Hasil')) ? <div>

                                  <a
                                    // className={'inline-block bg-blue-300 px-4 py-2 text-black rounded-md font-semibold'}
                                    href={`/download-file?place=${e.filess!.filter((a) => a.name.includes('Hasil'))[0].place}`} target="_blank" rel="noopener noreferrer">
                                    <Button
                                      color={"light"}
                                      size='xs'
                                    >
                                      <HiDownload className='mr-2' />
                                      Lihat Hasil
                                    </Button>
                                  </a>
                                </div> :

                                  <React.Fragment>
                                    <Button
                                      // color={'green'}
                                      className={'bg-green-500 hover:bg-green-800 text-white font-bold'}
                                      onClick={(ev) => {
                                        setShowModal(!showModal)
                                        id.current = e.id
                                      }}
                                      size='xs'>

                                      <HiUpload className='mr-2' />
                                      Upload
                                    </Button>
                                    <Modal
                                      show={showModal}
                                      size="md"
                                      popup={true}
                                      onClose={() => {
                                        setShowModal(!showModal)
                                        id.current = undefined
                                      }}
                                    >
                                      <ModalHeader />
                                      <ModalBody>
                                        <div className="text-center">
                                          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                            Upload data yang akan diunduh oleh pemohon
                                          </h3>
                                          <div className="flex justify-center gap-4">
                                            <form onSubmit={(ev) => onSubmit(ev)}>

                                              <Label forInput={'status_description'} value={'PDF / Word'} className={'pt-6 pb-2'} />

                                              <Input
                                                name='images'
                                                type={'file'}
                                                handleChange={onSelectFile}
                                                className={'w-full'}
                                              />
                                              <div className={'inline-flex'}>
                                                <Button
                                                  className={'mt-6 mr-2 bg-green-500 hover:bg-green-800 text-white font-bold'}
                                                  type='submit'
                                                >
                                                  Upload
                                                </Button>
                                                <Button
                                                  className={'mt-6 ml-2'}
                                                  color={'red'}
                                                  type='reset'
                                                  onClick={(_) => setShowModal(!showModal)}
                                                >Batal
                                                </Button>
                                              </div>
                                              {/* <Button className={'mt-6 mr-2'} processing={processing} type='submit'>Selanjutnya</Button>
                             <Button type={'reset'} className={'mt-6 ml-2'} processing={false} onClick={(_) => setShowModal(!showModal)}>Batal</Button> */}

                                            </form>
                                          </div>
                                        </div>
                                      </ModalBody>
                                    </Modal>
                                  </React.Fragment>
                              }
                              <Button
                                // color={"green"}
                                className='bg-blue-500 hover:bg-blue-800 text-white font-bold'
                                href={route('application.show', e.id)}
                                size='xs'
                              >
                                <HiEye className='mr-2' />
                                Detail
                              </Button>
                              <Button
                                className='bg-red-500 hover:bg-red-800 text-white font-bold'
                                size='xs'
                                onClick={(ev) => {
                                  ev.preventDefault()
                                  if (confirm("Are you sure you want to delete this user?")) {
                                    setShowAlert(true)
                                    Inertia.delete(route('application.destroy', e.id));
                                  }
                                }}
                              >
                                <HiTrash className='mr-2' />
                                Hapus
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow >
                      )
                      return (
                        <TableRow key={i} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                          <TableCell>
                            <p>{((applicant.meta.current_page - 1) * (applicant.meta.per_page)) + i + 1}</p>
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
                              {
                                e.category.includes('KTP') || e.category.includes('KIA') ? <div></div> : e.status !== 'COMPLETED' ? <div></div> : (e.filess !== null && e.filess!.length > 0 && e.filess![0].name.includes('Hasil')) ? <div>

                                  <a
                                    // className={'inline-block bg-blue-300 px-4 py-2 text-black rounded-md font-semibold'}
                                    href={`/download-file?place=${e.filess!.filter((a) => a.name.includes('Hasil'))[0].place}`} target="_blank" rel="noopener noreferrer">
                                    <Button
                                      color={"light"}
                                      size='xs'
                                    >
                                      <HiDownload className='mr-2' />
                                      Lihat Hasil
                                    </Button>
                                  </a>
                                </div> :

                                  <React.Fragment>
                                    <Button
                                      // color={'green'}
                                      className={'bg-green-500 hover:bg-green-800 text-white font-bold'}
                                      onClick={(ev) => {
                                        setShowModal(!showModal)
                                        id.current = e.id
                                      }}
                                      size='xs'>

                                      <HiUpload className='mr-2' />
                                      Upload
                                    </Button>
                                    <Modal
                                      show={showModal}
                                      size="md"
                                      popup={true}
                                      onClose={() => {
                                        setShowModal(!showModal)
                                        id.current = undefined
                                      }}
                                    >
                                      <ModalHeader />
                                      <ModalBody>
                                        <div className="text-center">
                                          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                            Upload data yang akan diunduh oleh pemohon
                                          </h3>
                                          <div className="flex justify-center gap-4">
                                            <form onSubmit={(ev) => onSubmit(ev)}>

                                              <Label forInput={'status_description'} value={'PDF / Word'} className={'pt-6 pb-2'} />

                                              <Input
                                                name='images'
                                                type={'file'}
                                                handleChange={onSelectFile}
                                                className={'w-full'}
                                              />
                                              <div className={'inline-flex'}>
                                                <Button
                                                  className={'mt-6 mr-2 bg-green-500 hover:bg-green-800 text-white font-bold'}
                                                  type='submit'
                                                >
                                                  Upload
                                                </Button>
                                                <Button
                                                  className={'mt-6 ml-2'}
                                                  color={'red'}
                                                  type='reset'
                                                  onClick={(_) => setShowModal(!showModal)}
                                                >Batal
                                                </Button>
                                              </div>
                                              {/* <Button className={'mt-6 mr-2'} processing={processing} type='submit'>Selanjutnya</Button>
                             <Button type={'reset'} className={'mt-6 ml-2'} processing={false} onClick={(_) => setShowModal(!showModal)}>Batal</Button> */}

                                            </form>
                                          </div>
                                        </div>
                                      </ModalBody>
                                    </Modal>
                                  </React.Fragment>
                              }
                              <Button
                                // color={"green"}
                                className='bg-blue-500 hover:bg-blue-800 text-white font-bold'
                                href={route('application.show', e.id)}
                                size='xs'
                              >
                                <HiEye className='mr-2' />
                                Detail
                              </Button>
                              <Button
                                className='bg-red-500 hover:bg-red-800 text-white font-bold'
                                size='xs'
                                onClick={(ev) => {
                                  ev.preventDefault()
                                  if (confirm("Are you sure you want to delete this user?")) {
                                    setShowAlert(true)
                                    Inertia.delete(route('application.destroy', e.id));
                                  }
                                }}
                              >
                                <HiTrash className='mr-2' />
                                Hapus
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
      </div>

      <div className="flex overflow-x-auto sm:justify-center mt-6">
        <ThemeProvider
          theme={customTheme}>
          <Pagination

            layout={isMobile ? 'navigation' : undefined} currentPage={applicant.meta.current_page} totalPages={applicant.meta.total} onPageChange={(e) => search(e)} showIcons />
        </ThemeProvider>
      </div>
    </Authenticated >
  )
}
