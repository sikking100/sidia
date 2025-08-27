import CustomModal from "@/components/custom-modal";
import PageHeader from "@/components/page-header";
import Nav from "@/components/pagination";
import { getStatus, statusOptions } from "@/hooks/functions";
import { useIsMobile } from "@/hooks/use-mobile";
import useCustomModal from "@/hooks/use-modal";
import Admin from "@/layouts/admin";
import { Applicant, District, FlashProps, Paginator } from "@/types"
import { PageProps } from "@inertiajs/core";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import React from "react";
import { Button, FormControl } from "react-bootstrap";
import { GiCancel } from "react-icons/gi";
import { HiDownload, HiEye, HiRefresh, HiSearch, HiTrash, HiUpload } from "react-icons/hi";
import TimeAgo from "react-timeago";
import { makeIntlFormatter } from "react-timeago/defaultFormatter";


interface Props extends PageProps {
    applications: Paginator<Applicant>
    flash: FlashProps
    filters: SearchParam
}

interface SearchParam {
    kecamatan: string
    desa: string
    hamlet: string
    status: string
    search: string
    tahun: number
    per_page: number
    b: string | File | undefined
}

// interface Berkas {
//     b: string | File | undefined
// }

export default function PermohonanIndex(props: Props) {
    const INITIAL = {
        search: '',
        kecamatan: '',
        hamlet: '',
        per_page: 10,
        status: '',
        tahun: -1,
        desa: '',
        b: undefined
    }
    const id = React.useRef<number>(-1)
    const [districts, setDistricts] = React.useState<District[]>()
    const [tahunOptions, setTahunOptions] = React.useState<number[]>([])
    const isMobile = useIsMobile()
    const { data, setData, get, reset, processing } = useForm<SearchParam>(INITIAL)

    const { open, isOpen, close } = useCustomModal()
    const modalHapus = useCustomModal()


    React.useEffect(() => {
        const fetchTahun = async () => {
            const response = await axios.get('/years')
            setTahunOptions(response.data);
        }
        const fetchDistrict = async () => {
            const response = await axios.get('/districts-list')
            setDistricts(response.data)
        }
        fetchTahun()
        fetchDistrict()
    }, [])

    React.useEffect(() => {
        if (props.flash?.message !== undefined && props.flash?.message !== null && props.flash?.message !== '') {
            open()
        }
    }, [props.flash?.message, open])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        get(route('application.index'), {
            preserveState: true, replace: true,

        });
    };

    return (
        <Admin>
            {/* Modal Hapus */}
            <CustomModal
                show={modalHapus.isOpen}
                onHide={modalHapus.close}
                title="Peringatan"
                size="sm"
                footer={
                    <div>
                        <Button className="btn btn-sm btn-outline-primary" onClick={modalHapus.close}><GiCancel className="mr-2" /> Batal</Button>
                        <Button className="btn btn-sm btn-danger" onClick={async () => {
                            await axios.delete(route('application.destroy', id.current))
                            get(route('application.index'), {
                                replace: true,
                                preserveState: false,
                            })
                        }}><HiTrash className="mr-2" /> Hapus</Button>
                    </div>
                }
            >
                <h5>Anda yakin ingin menghapus data ini?</h5>
            </CustomModal>

            {/* modal error */}
            <CustomModal
                show={isOpen}
                onHide={close}
                title="Pemberitahuan"
                size="sm"
                footer={
                    <div>
                        <Button className="btn btn-sm btn-outline-primary" onClick={close}><GiCancel className="mr-2" /> Tutup</Button>

                    </div>
                }
            >
                <h5>{props.flash?.message}</h5>
            </CustomModal>

            <div className='container-fluid'>
                <PageHeader
                    HeaderText="Permohonan"
                    Breadcrumb={[{ name: "Permohonan" },]}
                />

                <div className="row clearfix">
                    <div className="col-lg-12 col-md-12">
                        <div className="card planned_task">
                            <div className="header">
                                <h2>Data Permohonan</h2>
                            </div>
                            <div className="body pb-0">
                                <div className='form-row'>
                                    <div className="col">
                                        <select className="custom-select" id="kecamatan"
                                            value={data.kecamatan}
                                            onChange={(e) => {
                                                e.preventDefault();
                                                setData('kecamatan', e.target.value)
                                            }}
                                        >
                                            <option key={''} value={''}>Kecamatan</option>
                                            {
                                                districts?.map((item) => (
                                                    <option key={item.name} value={item.name}>{item.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="col">
                                        <select className="custom-select" id="desa"
                                            value={data.desa}
                                            onChange={(e) => {
                                                e.preventDefault();
                                                setData('desa', e.target.value)

                                            }}
                                        >
                                            <option key={'-'} value={''}>Desa</option>
                                            {
                                                districts?.find((e) => e.name == data.kecamatan)?.wards?.map((item) => (
                                                    <option key={item.name} value={item.name}>{item.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="col">
                                        <select className="custom-select" id="desa"
                                            value={data.hamlet}
                                            onChange={(e) => {
                                                e.preventDefault();
                                                setData('hamlet', e.target.value)

                                            }}
                                        >
                                            <option key={-1} value={-1}>Dusun</option>
                                            {
                                                districts?.find(e => e.name == data.kecamatan)?.wards?.find(e => e.name == data.desa)?.hamlets?.map((item) => (
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
                                        <Nav pagination={props.applications.links} />
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
                            <div className="body table-responsive pt-0">
                                <table className="table table-bordered">
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
                                        {props.applications.data.map((d, i) => {
                                            const date = new Date(d.created_at ?? 1692230400000)
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
                                                        <p>{((props.applications.current_page - 1) * (props.applications.per_page)) + i + 1}</p>
                                                    </th>
                                                    <td>
                                                        <p>{formattedDate}</p>
                                                        <TimeAgo date={d.created_at ?? '1997-02-07'} formatter={intlFormatter} />
                                                    </td>
                                                    <td className="whitespace-nowrap font-bold text-gray-900 dark:text-white">
                                                        <p>{getStatus(d.status ?? '')} </p>
                                                        <p className={'text-green-500'}>{(d.filess !== null && d.filess!.length !== 0 && d.filess!.filter((e) => e.name.includes('Hasil')).length !== 0) ? '(Berkas terupload)' : ''}</p>
                                                    </td>
                                                    <td>
                                                        {d.category}
                                                    </td>
                                                    <td>
                                                        {d.id_card_number}
                                                    </td>
                                                    <td>
                                                        {d.name}
                                                    </td>
                                                    <td>
                                                        <div className="grid">
                                                            {d.category.includes('KTP') || d.category.includes('KIA') ? <div></div> : d.status !== 'COMPLETED' ? <div></div> : (d.filess !== null && d.filess!.length > 0 && d.filess![0].name.includes('Hasil')) ? <div>

                                                                <a className="btn btn-sm btn-success col mb-2"
                                                                    // className={'inline-block bg-blue-300 px-4 py-2 text-black rounded-md font-semibold'}
                                                                    href={`/download-file?place=${d.filess!.filter((a) => a.name.includes('Hasil'))[0].place}`} target="_blank" rel="noopener noreferrer">
                                                                    <Button
                                                                        className='btn btn-sm btn-primary'
                                                                    >
                                                                        <HiDownload className='mr-1' />
                                                                        Download
                                                                    </Button>
                                                                </a>
                                                            </div> :

                                                                <>
                                                                    <Button
                                                                        // color={'green'}
                                                                        className={'btn btn-sm btn-primary col mb-1'}
                                                                        onClick={(ev) => {
                                                                            ev.preventDefault()
                                                                            // setShowModal(!showModal)
                                                                            id.current = d.id ?? 0
                                                                        }}
                                                                    >
                                                                        <HiUpload className='mr-2' />
                                                                        Upload
                                                                    </Button>
                                                                </>
                                                            }
                                                            <Button
                                                                // color={"green"}
                                                                className='btn btn-sm btn-info col mb-1'
                                                                href={route('application.show', d.id)}
                                                            >
                                                                <HiEye className='mr-2' />
                                                                Detail
                                                            </Button>
                                                            <Button
                                                                className='btn btn-sm btn-danger col mb-1'
                                                                onClick={(e) => {
                                                                    e.preventDefault()
                                                                    id.current = d.id ?? 0;
                                                                    // setShowModalDelete(true);
                                                                }}
                                                            >
                                                                <HiTrash className='mr-2' />
                                                                Hapus
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="body pt-0">
                                <Nav pagination={props.applications.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Admin>
    )
}
