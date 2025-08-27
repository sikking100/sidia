import CustomModal from "@/components/custom-modal";
import PageHeader from "@/components/page-header";
import Nav from "@/components/pagination";
import { useIsMobile } from "@/hooks/use-mobile";
import useCustomModal from "@/hooks/use-modal";
import Admin from "@/layouts/admin";
import { FlashProps, Hamlet, Paginator, Ward } from "@/types";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import { PageProps } from "node_modules/@inertiajs/core/types/types";
import React from "react";
import { Button, FormControl } from "react-bootstrap";
import { GiCancel } from "react-icons/gi";
import { GrAddCircle } from "react-icons/gr";
import { HiEye, HiPencil, HiRefresh, HiSearch, HiTrash } from "react-icons/hi";

interface Props extends PageProps {
    hamlets: Paginator<Hamlet>
    flash: FlashProps
    ward: Ward
}


export default function DusunIndex({ hamlets, flash, ward }: Props) {
    const { open, isOpen, close } = useCustomModal()
    const modalHapus = useCustomModal()
    const id = React.useRef(-1)
    const isMobile = useIsMobile()

    const INITIAL = {
        search: '',
        per_page: 10
    }
    const { data, setData, get, processing } = useForm(INITIAL)

    React.useEffect(() => {

        if (flash?.message !== null && flash?.message !== undefined && flash?.message !== '') {
            open()
        }
    }, [flash, open])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        get(route('hamlet.index'), {
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
                            await axios.delete(route('hamlet.destroy', id.current))
                            get(route('hamlet.index'), {
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
                    HeaderText="Dusun"
                    Breadcrumb={[{ name: 'Dusun' }]}
                />
                <div className="row clearfix">
                    <div className="col-xs-12 col-lg-12 col-md-12">
                        <div className="card planned_task">
                            <div className="header">
                                <div className="d-flex">
                                    <h2>Data Dusun di Kelurahan / Desa {ward.name}</h2>
                                    <a href={route('hamlet.create')}><GrAddCircle size={20} className="ml-1 text-success" style={{ alignSelf: 'center' }} /></a>
                                </div>

                            </div>
                            <div className="body pb-0">
                                <div className="form-row">
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
                                        <Nav pagination={hamlets.links} />
                                    </div>}
                                    <div className="col">
                                        <FormControl
                                            id="search"
                                            placeholder="Nama Dusun"
                                            value={data.search}
                                            onChange={(e) => { setData('search', e.target.value) }}
                                        />
                                    </div>
                                    <div className='col-xs-4'>
                                        <form onSubmit={handleSearch} className="d-flex">
                                            <Button
                                                type="submit"
                                                className='btn btn-primary btn-sm mr-2'
                                                disabled={processing}
                                            >
                                                <HiSearch className="mr-1 h-5 w-5" />
                                                Cari
                                            </Button>
                                            <Button
                                                type="reset"
                                                disabled={processing}
                                                onClick={() => {
                                                    setData({
                                                        search: '',
                                                        per_page: 10,
                                                    })
                                                    get(route('district.index'), {
                                                        replace: true,
                                                        preserveState: false,
                                                    });
                                                }}
                                                className='btn btn-danger btn-sm'
                                            >
                                                <HiRefresh className="mr-1 h-5 w-5" />
                                                Reset
                                            </Button>
                                        </form>
                                    </div>
                                </div>

                            </div>
                            {
                                hamlets.data === undefined || hamlets.data?.length === 0 ? <div className="body clearfix pt-3">
                                    <p>Tidak ada data</p>
                                </div>
                                    :
                                    <div className="body table-responsive pt-0">

                                        <table className='table table-bordered'>
                                            <thead>
                                                <tr>
                                                    <th>No</th>
                                                    <th>Nama</th>
                                                    <th>Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {hamlets.data !== undefined && hamlets.data.map((v, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <th>{((hamlets.current_page - 1) * (hamlets.per_page)) + i + 1}</th>
                                                            <td>{v.name}</td>
                                                            <td>

                                                                <div className="d-flex">
                                                                    <Button
                                                                        className="btn btn-sm btn-primary mr-2"
                                                                        href={route('district.show', v.id)}
                                                                    >
                                                                        <HiEye className="mr-2 h-5 w-5" />
                                                                        Detail
                                                                    </Button>
                                                                    <Button
                                                                        className="btn btn-sm btn-info mr-2"
                                                                        href={route('district.edit', v.id)}
                                                                    >
                                                                        <HiPencil className="mr-2 h-5 w-5" />
                                                                        Edit
                                                                    </Button>
                                                                    <Button
                                                                        onClick={() => {
                                                                            id.current = v.id
                                                                            modalHapus.open()
                                                                        }}
                                                                        className="btn btn-sm btn-danger"
                                                                    >
                                                                        <HiTrash className="mr-2 h-5 w-5" />
                                                                        Hapus
                                                                    </Button>

                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                        <Nav pagination={hamlets.links} />
                                    </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </Admin>
    )
}
