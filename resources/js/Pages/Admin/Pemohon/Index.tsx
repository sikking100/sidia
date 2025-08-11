import React, { useRef } from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Link, useForm, usePage } from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import { Inertia } from '@inertiajs/inertia'
import Alert from '@/Components/Alert'
import { Applicant, Files, Meta } from '@/Interface/Interface'
import { getStatus } from '@/Functions/functions'
import { Button, createTheme, Modal, ModalBody, ModalHeader, Pagination, Select, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, ThemeProvider } from 'flowbite-react'
import { ErrorText } from '@/Components/Error'
import Input from '@/Components/Input'
import Label from '@/Components/Label'
import { HiDownload, HiEye, HiRefresh, HiSearch, HiShoppingCart, HiTrash, HiUpload } from 'react-icons/hi'
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
  const id = useRef<number>()


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

  const list: any = []
  props.data?.forEach((e, i) => {
    list.push(
      <TableRow key={i} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
        <TableCell>
          <p>{((current_page - 1) * (per_page)) + i + 1}</p>
        </TableCell>
        <TableCell>
          <p>{e.id}</p>
        </TableCell>
        <TableCell className="whitespace-nowrap font-bold text-gray-900 dark:text-white">
          <p>{getStatus(e.status ?? '')} </p>
          <p className={'text-green-500'}>{(e.filess !== null && e.filess!.length !== 0 && e.filess!.filter((e) => e.name.includes('Hasil')).length !== 0) ? '(Berkas terupload)' : ''}</p>
        </TableCell>
        <TableCell>
          {e.category}
        </TableCell>
        <TableCell>
          {e.name}
        </TableCell>
        <TableCell>
          <div className="flex flex-row justify-end gap-2">
            {
              e.category.includes('KTP') || e.category.includes('KIA') ? <div></div> : e.status !== 'COMPLETED' ? <div></div> : (e.filess !== null && e.filess!.length > 0 && e.filess![0].name.includes('Hasil')) ? <div>
                <Button
                  color={"light"}
                  size='xs'
                >
                  <HiDownload className='mr-2' />
                  Lihat Hasil
                </Button>
                {/* <a className={'inline-block bg-blue-300 px-4 py-2 text-black rounded-md font-semibold'} href={`/download-file?place=${e.filess!.filter((a) => a.name.includes('Hasil'))[0].place}`} target="_blank" rel="noopener noreferrer">Lihat Hasil</a> */}
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
                  {/* <button
                    onClick={(ev) => {
                      setShowModal(!showModal)
                      id.current = e.id
                    }}
                    className={'bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded'}
                  >
                    Upload
                  </button> */}
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
      //  <tr key={i}>
      //   <td className={'p-4 border border-slate-700'}><p className={'flex justify-center'}>{((current_page - 1) * (per_page)) + i + 1}</p></td>
      //   <td className={'p-4 border border-slate-700'}><p className={'flex justify-center'}>{e.id}</p></td>
      //   <td className={'p-4 border border-slate-700 justify-items-center'}>
      //     <p className={'flex justify-center'}>{getStatus(e.status ?? '')} </p>
      //     <p className={'text-green-500'}>{(e.filess !== null && e.filess!.length !== 0 && e.filess!.filter((e) => e.name.includes('Hasil')).length !== 0) ? '(Berkas terupload)' : ''}</p></td>

      //   <td className={'p-4 border border-slate-700'}>{e.name}</td>
      //   <td className={'p-4 border border-slate-700'}>{e.category}</td>

      //   <td className='p-4 border border-slate-700'>
      //     <div className="flex flex-row gap-2">
      //       {
      //         e.category.includes('KTP') || e.category.includes('KIA') ? <div></div> : e.status !== 'COMPLETED' ? <div></div> : (e.filess !== null && e.filess!.length > 0 && e.filess![0].name.includes('Hasil')) ? <div>
      //           <a className={'inline-block bg-blue-300 px-4 py-2 text-black rounded-md font-semibold'} href={`/download-file?place=${e.filess!.filter((a) => a.name.includes('Hasil'))[0].place}`} target="_blank" rel="noopener noreferrer">Lihat Hasil</a>
      //         </div> :

      //           <React.Fragment>
      //             <button
      //               onClick={(ev) => {
      //                 setShowModal(!showModal)
      //                 id.current = e.id
      //               }}
      //               className={'bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded'}
      //             >
      //               Upload
      //             </button>
      //             <Modal
      //               show={showModal}
      //               size="md"
      //               popup={true}
      //             // onClose={onClose}
      //             >
      //               <Modal.Header />
      //               <Modal.Body>
      //                 <div className="text-center">
      //                   <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
      //                     Upload data yang akan diunduh oleh pemohon
      //                   </h3>
      //                   <div className="flex justify-center gap-4">
      //                     <form onSubmit={(ev) => onSubmit(ev)}>

      //                       <Label forInput={'status_description'} value={'PDF / Word'} className={'pt-6 pb-2'} />

      //                       <Input
      //                         name='images'
      //                         type={'file'}
      //                         handleChange={onSelectFile}
      //                         className={'w-full'}
      //                       />

      //                       {/* <Button className={'mt-6 mr-2'} processing={processing} type='submit'>Selanjutnya</Button>
      //                       <Button type={'reset'} className={'mt-6 ml-2'} processing={false} onClick={(_) => setShowModal(!showModal)}>Batal</Button> */}

      //                     </form>
      //                   </div>
      //                 </div>
      //               </Modal.Body>
      //             </Modal>
      //           </React.Fragment>
      //       }
      //       <Link
      //         href={route('application.show', e.id)}
      //         className={'bg-kemenag hover:bg-kemenag-dark text-white font-bold py-2 px-4 rounded'}>
      //         Detail
      //       </Link>
      //       <button
      //         onClick={(ef) => {
      //           ef.preventDefault()
      //           if (confirm("Are you sure you want to delete this user?")) {
      //             setShowAlert(true)
      //             Inertia.delete(route('application.destroy', e.id));
      //           }
      //         }}
      //         className={'bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded'}
      //       >
      //         Hapus
      //       </button>
      //     </div>
      //   </td>
      // </tr>
    )
  })
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
        {/* <div className={'mx-6 pb-8'}>
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
        </div> */}
        <p className='text-xl font-bold text-gray-500'>Data Semua Permohonan</p>
        <div className='grid grid-cols-1 sm:grid-cols-6 gap-4 mt-6'>
          <Select id="1"

          >
            <option>United States</option>
            <option>Canada</option>
            <option>France</option>
            <option>Germany</option>
          </Select>
          <Select id="2"
          >
            <option>United States</option>
            <option>Canada</option>
            <option>France</option>
            <option>Germany</option>
          </Select>
          <Select id="3"
          >
            <option>United States</option>
            <option>Canada</option>
            <option>France</option>
            <option>Germany</option>
          </Select>
          <Select id="4"
          >
            <option>United States</option>
            <option>Canada</option>
            <option>France</option>
            <option>Germany</option>
          </Select>
          <Select id="5"
          >
            <option>United States</option>
            <option>Canada</option>
            <option>France</option>
            <option>Germany</option>
          </Select>
          <Select id="6"
          >
            <option>United States</option>
            <option>Canada</option>
            <option>France</option>
            <option>Germany</option>
          </Select>

        </div>
        <div className='mt-4 mb-6 flex gap-x-4 w-full justify-between'>
          <div>
            <Select id="view"
              value={per_page}
              sizing='sm'
              className={"w-fit"}
              onChange={(e) => {
                e.preventDefault();
                Inertia.get(route('application.index', { 'per_page': e.target.value }))

              }}
            >
              <option value={10} id='10'>10</option>
              <option value={15} id='15'>15</option>
              <option value={20} id='20'>20</option>
              <option value={25} id='25'>25</option>
            </Select>
          </div>
          <div className="overflow-x-auto sm:justify-center">
            <ThemeProvider
              theme={customTheme}>
              <Pagination
                className='' currentPage={current_page} totalPages={total} onPageChange={(e) => {
                  console.log(e);

                  Inertia.get(route('application.index', { 'page': e }))

                }} showIcons />
            </ThemeProvider>
          </div>
          <div className='inline-flex gap-2'>
            <Button
              color={"cyan"}
              size={"xs"}
            >
              <HiSearch className="mr-2 h-5 w-5" />
              Cari
            </Button>
            <Button
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
            <Table striped>
              <TableHead className='divide-y'>
                <TableRow className=''>
                  <TableHeadCell>No</TableHeadCell>
                  <TableHeadCell>No. Antrian</TableHeadCell>
                  <TableHeadCell>Status</TableHeadCell>
                  <TableHeadCell>Kategori</TableHeadCell>
                  <TableHeadCell>Nama</TableHeadCell>
                  <TableHeadCell>
                    <span className="sr-only">Aksi</span>
                  </TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody className="divide-y">
                {list}
              </TableBody>
            </Table>
          </div>
          // <table
          // // className={'w-full'}
          // >
          //   <thead>
          //     <tr>
          //       <th className='p-4 border border-slate-600'>No</th>
          //       <th className='p-4 border border-slate-600'>No. Antrian</th>
          //       <th className='p-4 border border-slate-600'>Status</th>
          //       <th className='p-4 border border-slate-600'>Nama</th>
          //       <th className='p-4 border border-slate-600'>Kategori</th>
          //       <th className='p-4 border border-slate-600'>Aksi</th>
          //     </tr>
          //   </thead>
          //   <tbody>
          //     {list}
          //   </tbody>
          // </table>
        }
      </div>
      <ThemeProvider
        theme={customTheme}
      >
        <div className="flex overflow-x-auto sm:justify-center mt-6">
          <Pagination className='' currentPage={1} totalPages={100} onPageChange={(e) => { }} showIcons />
        </div>
      </ThemeProvider>

      {/* <div className={'mx-6 pt-8 pb-8'}>
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
      </div> */}
    </Authenticated >
  )
}
