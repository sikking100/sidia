import React, { useState } from 'react'
import { Head, usePage } from '@inertiajs/inertia-react'
import Guest from '@/Layouts/Guest'
import axios from 'axios'
import { Applicant } from '@/Interface/Interface'
import { useForm, Link } from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import { getStatus, useIsMobile } from '@/Functions/functions'
import { Button, Label, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput } from 'flowbite-react'
import { ModalAlert } from '@/Components/Alert'
import { makeIntlFormatter } from 'react-timeago/defaultFormatter'
import { HiDownload, HiEye } from 'react-icons/hi'
import TimeAgo from 'react-timeago'

interface FormProps {
  nik: string
}
export default function CheckApplicant() {
  const { flash } = usePage().props
  const f = flash as { message: string }
  const [applicant, setStateApplicant] = useState<Array<Applicant>>()
  const [showModal, setShowModal] = useState<boolean>(false)
  const isMobile = useIsMobile()
  const { data, setData, progress } = useForm<FormProps>(
    {
      nik: ''
    }
  )
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setData('nik', e.target.value)
    return
  }

  React.useEffect(() => {
    console.log(f.message);

    if (f.message != null && f.message !== '') {
      setShowModal(true)
    } else {
      setShowModal(false)
    }

    return
  }, [flash])


  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.log(data.nik)
    axios.get(`/applicant/${data.nik}`).then(res => {
      if (res.data != null) {
        const da = res.data as Array<Applicant>
        console.log(da)

        setStateApplicant(da)
      }

      return
    }).catch(e => console.log(e))
    return
  }
  const process = progress && progress.percentage > 0 || false



  return (
    <Guest
      title='Cek Permohonan'>
      <Head title={'Cek Permohonan'} />
      <ModalAlert
        title='Pemberitahun'
        close={() => setShowModal(false)}
        content={f.message}
        show={showModal}
      />
      <form onSubmit={onSubmit}>
        <Label>NIK Pemohon</Label>
        <TextInput
          name={'nik'}
          onChange={handleChange}
          className={'w-full'}
        />
        <Button color={'blue'} className='mt-2' type='submit'>Cari</Button>
      </form>
      {applicant &&
        <div className='overflow-x-scroll'>
          <Table striped className='mt-6'>
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
            <TableBody className='divider-y'>
              {applicant.map((e, i) => {
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
                      <p>{i + 1}</p>
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
                          href={route('check.detail', e.id)}
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
                      <p>{i + 1}</p>
                    </TableCell>
                    <TableCell>
                      <p>{formattedDate}</p>
                      <TimeAgo date={e.created_at ?? ''} formatter={intlFormatter} />
                    </TableCell>
                    <TableCell className="whitespace-nowrap font-bold text-gray-900 dark:text-white">
                      <p>{getStatus(e.status ?? '')} </p>
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
                          e.status == 'COMPLETED' && (e.filess !== null && e.filess!.length !== 0 && e.filess!.filter((ee) => ee.name.includes('Hasil')).length !== 0) ?
                            // <Link
                            //   className={'inline-block bg-green-600 px-4 py-2 text-white rounded-md font-semibold'}
                            //   type={'a'}
                            //   target="_blank"
                            //   rel="noopener noreferrer"
                            //   href={route('file.download', { 'place': a.filess!.filter((e) => e.name.includes('Hasil'))[0].place })}
                            // >
                            //   Download Hasil

                            // </Link>
                            <a className={'inline-block bg-green-600 px-4 py-2 text-white rounded-md font-semibold'} href={`/download-file?place=${e.filess!.filter((ee) => ee.name.includes('Hasil'))[0].place}`} target="_blank" rel="noopener noreferrer">Download Hasil</a>
                            : <div></div>
                        }
                        {
                          <Button
                            // color={"green"}
                            className='bg-blue-500 hover:bg-blue-800 text-white font-bold'
                            href={route('check.detail', e.id)}
                            size='xs'
                          >
                            <HiEye className='mr-2' />
                            Detail
                          </Button>
                        }
                      </div>
                    </TableCell>
                  </TableRow >
                )
              })}
            </TableBody>
          </Table>
        </div>
      }
    </Guest>
  )
}
