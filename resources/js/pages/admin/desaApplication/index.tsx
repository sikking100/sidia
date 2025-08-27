import CustomModal from "@/components/custom-modal";
import PageHeader from "@/components/page-header";
import Nav from "@/components/pagination";
import { getStatus, statusOptions } from "@/hooks/functions";
import { useIsMobile } from "@/hooks/use-mobile";
import useCustomModal from "@/hooks/use-modal";
import Admin from "@/layouts/admin";
import { DesaApplication, FlashProps, Hamlet, Paginator, Ward } from "@/types";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import { PageProps } from "node_modules/@inertiajs/core/types/types";
import React from "react";
import { Button, FormControl } from "react-bootstrap";
import { GiCancel } from "react-icons/gi";
import { HiEye, HiRefresh, HiSearch, HiTrash } from "react-icons/hi";
import TimeAgo from "react-timeago";
import { makeIntlFormatter } from "react-timeago/defaultFormatter";

interface Props extends PageProps {
    desaApps: Paginator<DesaApplication>
    flash: FlashProps
    hamlets: Hamlet[]
    ward: Ward
}

interface SearchParam {
    hamlet: string
    status: string
    search: string
    tahun: number
    per_page: number
}


export default function DusunIndex({ hamlets, flash, desaApps, ward }: Props) {
    const { open, isOpen, close } = useCustomModal()
    const modalHapus = useCustomModal()
    const id = React.useRef(-1)
    const isMobile = useIsMobile()
    const [tahunOptions, setTahunOptions] = React.useState<number[]>([])



    const INITIAL = {
        search: '',
        hamlet: '',
        per_page: 10,
        status: '',
        tahun: 0,
    }
    const { data, setData, get, reset, processing } = useForm<SearchParam>(INITIAL)


    React.useEffect(() => {

        if (flash?.message !== null && flash?.message !== undefined && flash?.message !== '') {
            open()
        }
    }, [flash, open])

    React.useEffect(() => {
        const fetchTahun = async () => {
            const response = await axios.get('/desa-years')
            setTahunOptions(response.data);
        }

        fetchTahun()
    }, [])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        get(route('desa.index'), {
            preserveState: true, replace: true,

        });
    };



    return (
        <Admin>
            {/* Modal Flash */}
            <CustomModal
                show={isOpen}
                onHide={close}
                title="Pemberitahuan"
                footer={
                    <Button className="btn btn-sm btn-outline-primary" onClick={close}><GiCancel className="mr-2" /> Tutup</Button>
                }
            >
                {flash?.message}
            </CustomModal>

            {/* Modal Hapus */}
            <CustomModal
                show={modalHapus.isOpen}
                onHide={modalHapus.close}
                title="Peringatan"
                size="sm"
                footer={
                    <div className="d-flex">
                        <Button className="btn btn-sm btn-outline-primary mr-2" onClick={modalHapus.close}><GiCancel className="mr-2" /> Batal</Button>
                        <Button className="btn btn-sm btn-danger" onClick={async () => {
                            await axios.delete(route('desa.destroy', id.current))
                            get(route('desa.index'), {
                                replace: true,
                                preserveState: false,
                            })
                        }}><HiTrash className="mr-2" /> Hapus</Button>
                    </div>
                }
            >
                <h5>Anda yakin ingin menghapus data ini?</h5>
            </CustomModal>

            <div className="container-fluid">
                <PageHeader
                    HeaderText="Permohonan"
                    Breadcrumb={[{ name: 'Permohonan' }]}
                />
                <div className="row clearfix">
                    <div className="col-xs-12 col-lg-12 col-md-12">
                        <div className="card planned_task">
                            <div className="header">
                                {/* <div className="d-flex">/ */}
                                <h2>Data Pemohon di Kelurahan / Desa {ward.name}</h2>
                                {/* </div> */}

                            </div>
                            <div className="body pb-0">
                                <div className='form-row'>
                                    <div className="col">
                                        <select className="custom-select" id="desa"
                                            value={data.hamlet}
                                            onChange={(e) => {
                                                e.preventDefault();
                                                setData('hamlet', e.target.value)

                                            }}
                                        >
                                            <option key={0} value={0}>Dusun</option>
                                            {
                                                hamlets?.map((item) => (
                                                    <option key={item.id} value={item.name}>{item.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="col">
                                        <select className="custom-select" id="status"
                                            value={data.status}
                                            onChange={(e) => {
                                                setData('status', e.target.value)
                                                return
                                            }}
                                        >
                                            <option key={-1} value={''}>Status</option>
                                            {
                                                statusOptions.map((item) => (
                                                    <option key={item} value={item}>{getStatus(item)}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="col">
                                        <select className="custom-select" id="tahun"
                                            value={data.tahun}
                                            onChange={(e) => {
                                                setData('tahun', Number.parseInt(e.target.value))
                                                return
                                            }}
                                        >
                                            <option value={0}>Tahun</option>
                                            {tahunOptions.map((e) => (
                                                <option key={e} value={e}>{e}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col">
                                        <FormControl
                                            id="search"
                                            placeholder="Nik atau Nama"
                                            value={data.search}
                                            onChange={(e) => { setData('search', e.target.value) }}
                                        />
                                    </div>
                                </div>
                                <div className="form-row mt-2">
                                    <div className="col-xs-3">
                                        <select id="view"

                                            value={data.per_page}
                                            // sizing='sm'
                                            className={"w-fit block p-2 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-8"}
                                            onChange={(e) => {
                                                e.preventDefault();
                                                setData('per_page', Number.parseInt(e.target.value))
                                                // Inertia.get(route('application.index', { 'per_page': e.target.value }))
                                                // search(null, Number.parseInt(e.target.value))

                                            }}
                                        >
                                            <option value={10} id='10'>10</option>
                                            <option value={15} id='15'>15</option>
                                            <option value={20} id='20'>20</option>
                                            <option value={25} id='25'>25</option>
                                        </select>
                                    </div>
                                    {isMobile ? <div className="col"></div> : <div className="col">
                                        <Nav pagination={desaApps.links} />
                                    </div>}
                                    <div className='col-xs-4'>
                                        <form onSubmit={handleSearch} className="d-flex">
                                            <Button
                                                type="submit"
                                                className='btn btn-primary btn-sm mr-2'
                                                disabled={processing}
                                            >
                                                <HiSearch className="mr-2 h-5 w-5" />
                                                Cari
                                            </Button>
                                            <Button
                                                type="reset"
                                                disabled={processing}
                                                onClick={() => {
                                                    reset();
                                                    get(route('application.index'), {
                                                        replace: true,
                                                        preserveState: false,
                                                    });
                                                }}
                                                className='btn btn-danger btn-sm'
                                            >
                                                <HiRefresh className="mr-2 h-5 w-5" />

                                                Reset
                                            </Button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            {
                                desaApps.data === undefined || desaApps.data?.length === 0 ? <div className="body clearfix pt-3">
                                    <p>Tidak ada data</p>
                                </div>
                                    :
                                    <div className="body table-responsive pt-0">

                                        <table className='table table-bordered'>
                                            <thead>
                                                <tr>
                                                    <th>No</th>
                                                    <th>Tanggal</th>
                                                    <th>Status</th>
                                                    <th>Kategori</th>
                                                    <th>NIK</th>
                                                    <th>Pemohon</th>
                                                    <th>Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {desaApps.data !== undefined && desaApps.data.map((v, i) => {
                                                    const date = new Date(v.created_at ?? 1692230400000)
                                                    const formattedDate = new Intl.DateTimeFormat('id-ID', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    }).format(date)
                                                    const intlFormatter = makeIntlFormatter({
                                                        locale: "id-ID", // string
                                                    });
                                                    return (
                                                        <tr key={i}>
                                                            <th>
                                                                <p>{((desaApps.current_page - 1) * (desaApps.per_page)) + i + 1}</p>
                                                            </th>
                                                            <td>
                                                                <p>{formattedDate}</p>
                                                                <TimeAgo date={v.created_at ?? '1997-02-07'} formatter={intlFormatter} />
                                                            </td>
                                                            <td className="whitespace-nowrap font-bold text-gray-900 dark:text-white">
                                                                {getStatus(v.status ?? '')}
                                                            </td>
                                                            <td>
                                                                {v.category}
                                                            </td>
                                                            <td>
                                                                {v.id_card_number}
                                                            </td>
                                                            <td>
                                                                {v.name}
                                                            </td>
                                                            <td>

                                                                <div className="d-flex">
                                                                    {
                                                                        v.status == 'COMPLETED' && (v.filess !== null && v.filess !== undefined && v.filess!.length !== 0 && v.filess!.filter((e) => e.name.includes('Hasil')).length !== 0) ?
                                                                            // <Link
                                                                            //   className={'inline-block bg-green-600 px-4 py-2 text-white rounded-md font-semibold'}
                                                                            //   type={'a'}
                                                                            //   target="_blank"
                                                                            //   rel="noopener noreferrer"
                                                                            //   href={route('file.download', { 'place': a.filess!.filter((e) => e.name.includes('Hasil'))[0].place })}
                                                                            // >
                                                                            //   Download Hasil

                                                                            // </Link>
                                                                            <a className={'btn btn-sm btn-outline-success'} href={`/download-file?place=${v.filess!.filter((a) => a.name.includes('Hasil'))[0].place}`} target="_blank" rel="noopener noreferrer">Download Hasil</a>
                                                                            : <div></div>
                                                                    }
                                                                    <Button
                                                                        className="btn btn-sm btn-primary mr-2"
                                                                        href={route('desa.show', v.id)}
                                                                    >
                                                                        <HiEye className="mr-2 h-5 w-5" />
                                                                        Detail
                                                                    </Button>
                                                                    {/* <Button
                                                                        className="btn btn-sm btn-info mr-2"
                                                                        href={route('desa.edit', v.id)}
                                                                    >
                                                                        <HiPencil className="mr-2 h-5 w-5" />
                                                                        Edit
                                                                    </Button> */}
                                                                    {/* <Button
                                                                        onClick={() => {
                                                                            id.current = v.id ?? 0
                                                                            modalHapus.open()
                                                                        }}
                                                                        className="btn btn-sm btn-danger"
                                                                    >
                                                                        <HiTrash className="mr-2 h-5 w-5" />
                                                                        Hapus
                                                                    </Button> */}

                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                        <Nav pagination={desaApps.links} />
                                    </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </Admin>
    )
}
