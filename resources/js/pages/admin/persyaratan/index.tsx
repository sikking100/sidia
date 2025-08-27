import CustomModal from "@/components/custom-modal";
import PageHeader from "@/components/page-header";
import { useIsMobile } from "@/hooks/use-mobile";
import useCustomModal from "@/hooks/use-modal";
import Admin from "@/layouts/admin";
import { FlashProps, Menu, Paginator, Requirement } from "@/types";
import { Button, FormControl } from "react-bootstrap";
import { GrAddCircle } from "react-icons/gr";
import { PageProps } from "node_modules/@inertiajs/core/types/types";
import axios from "axios";
import React from "react";
import { GiCancel } from "react-icons/gi";
import { useForm } from "@inertiajs/react";
import { HiPencil, HiRefresh, HiSearch, HiTrash } from "react-icons/hi";
import Nav from "@/components/pagination";


interface Props extends PageProps {
    menu: Menu
    flash: FlashProps
    requirements: Paginator<Requirement>
}

export default function PersyaratanIndex({ menu, requirements, flash }: Props) {
    const { open, close, isOpen } = useCustomModal()
    const modalHapus = useCustomModal()
    const isMobile = useIsMobile()
    const id = React.useRef(-1)

    const { data, setData, get, processing } = useForm({
        search: '',
        per_page: 10,
    })

    React.useEffect(() => {

        if (flash?.message !== null && flash?.message !== undefined && flash?.message !== '') {
            open()
        }
    }, [flash?.message, open])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        get(route('menu.show', menu.id), {
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
                            await axios.delete(route('requirement.destroy', id.current))
                            get(route('menu.show', menu.id), {
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
                    HeaderText="Persyaratan"
                    Breadcrumb={[{ name: 'Kategori', navigate: 'menu.index' }, { name: 'Persyaratan' }]}
                />
                <div className="row clearfix">
                    <div className="col-md-12 col-lg-12">
                        <div className="card">
                            <div className="header">
                                <div className="d-flex">
                                    <h2>Data Persyaratan</h2>
                                    <a href={route('requirement.create', menu.id)}><GrAddCircle size={20} className="ml-1 text-success" style={{ alignSelf: 'center' }} /></a>
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
                                        <Nav pagination={requirements.links} />
                                    </div>}
                                    <div className="col">
                                        <FormControl
                                            id="search"
                                            placeholder="Nama Persyaratan"
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
                                                    get(route('menu.show', menu.id), {
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
                            <div className="body table-responsive pt-0">
                                {
                                    requirements.data.length == 0 ? <p>Tidak ada data</p>
                                        :
                                        <table className='table table-bordered'>
                                            <thead>
                                                <tr>
                                                    <th>No</th>
                                                    <th>Nama</th>
                                                    <th>Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {requirements.data.map((v, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <th>{((requirements.current_page - 1) * (requirements.per_page)) + i + 1}</th>
                                                            <td>{v.name}</td>
                                                            <td>

                                                                <div className="d-flex">
                                                                    <Button
                                                                        className="btn btn-sm btn-info mr-2"
                                                                        href={route('requirement.edit', v.id)}
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
                                }
                                <Nav pagination={requirements.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Admin>
    )
}
