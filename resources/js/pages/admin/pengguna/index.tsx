import CustomModal from "@/components/custom-modal";
import PageHeader from "@/components/page-header";
import Nav from "@/components/pagination";
import { useIsMobile } from "@/hooks/use-mobile";
import useCustomModal from "@/hooks/use-modal";
import Admin from "@/layouts/admin";
import { FlashProps, Paginator, User } from "@/types";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import { PageProps } from "node_modules/@inertiajs/core/types/types";
import React from "react";
import { Button, FormControl } from "react-bootstrap";
import { GiCancel } from "react-icons/gi";
import { GrAddCircle } from "react-icons/gr";
import { HiPencil, HiRefresh, HiSearch } from "react-icons/hi";
import { RiAiGenerate } from "react-icons/ri";

interface Props extends PageProps {
    users: Paginator<User>
    flash: FlashProps
}

export default function PenggunaIndex({ users, flash }: Props) {
    const { open, isOpen, close } = useCustomModal()
    const modalPass = useCustomModal()
    const isMobile = useIsMobile()
    const [newPass, setNewPass] = React.useState('')
    const [error, setError] = React.useState('')
    const [loading, setLoading] = React.useState(false);
    const [index, setIndex] = React.useState(-1)

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

    const handleRegeneratePassword = async ({ email, index }: { email: string, index: number }) => {
        try {
            setIndex(index)
            setLoading(true)
            await axios.post(route('pass.reset'), {
                'email': email
            });
            setNewPass(`Password baru telah dikirim ke Email : ${email}.`)
            modalPass.open()
            return;
        } catch (error) {
            setError(`${error}`);
            open()
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        get(route('user.index'), {
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
                {flash?.message ?? error}
            </CustomModal>

            {/* Modal Pass */}
            <CustomModal
                show={modalPass.isOpen}
                onHide={modalPass.close}
                title="Reset Password"
                footer={
                    <Button className="btn btn-sm btn-outline-primary" onClick={modalPass.close}><GiCancel className="mr-2" /> Tutup</Button>
                }
            >
                <h5>{newPass}</h5>
            </CustomModal>


            <div className="container-fluid">
                <PageHeader
                    HeaderText="Pengguna"
                    Breadcrumb={[{ name: 'Pengguna' }]}
                />
                <div className="row clearfix">
                    <div className="col-xs-12 col-lg-12 col-md-12">
                        <div className="card planned_task">
                            <div className="header">
                                <div className="d-flex">
                                    <h2>Data Pengguna</h2>
                                    <a href={route('user.create')}><GrAddCircle size={20} className="ml-1 text-success" style={{ alignSelf: 'center' }} /></a>
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
                                        <Nav pagination={users.links} />
                                    </div>}
                                    <div className="col">
                                        <FormControl
                                            id="search"
                                            placeholder="Nama atau nomor telepon"
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
                                                    get(route('user.index'), {
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
                                    users.data.length == 0 ? <p>Tidak ada data</p>
                                        :
                                        <table className='table table-bordered'>
                                            <thead>
                                                <tr>
                                                    <th>No</th>
                                                    <th>Kel / Des</th>
                                                    <th>Nama</th>
                                                    <th>Telp</th>
                                                    <th>Email</th>
                                                    <th>Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.data.map((v, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <th>{((users.current_page - 1) * (users.per_page)) + i + 1}</th>
                                                            <td>{v.ddesa?.name}</td>
                                                            <td>{v.name}</td>
                                                            <td>{v.phone}</td>
                                                            <td>{v.email}</td>
                                                            <td>

                                                                <div className="d-flex flex-column">
                                                                    <Button
                                                                        className="btn btn-sm btn-info mb-2"
                                                                        href={route('user.edit', v.id)}
                                                                    >
                                                                        <HiPencil className="mr-2 h-5 w-5" />
                                                                        Edit
                                                                    </Button>
                                                                    <Button
                                                                        onClick={() => handleRegeneratePassword({ email: v.email, index: i })}
                                                                        disabled={loading}
                                                                        className="btn btn-sm btn-danger"
                                                                    >
                                                                        {loading && index === i ? (
                                                                            <>
                                                                                <HiRefresh className="mr-2 h-5 w-5 animate-spin" />
                                                                                Processing...
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <RiAiGenerate className='mr-2' />
                                                                                Reset Pass
                                                                            </>
                                                                        )}
                                                                    </Button>
                                                                </div>



                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                }
                                <Nav pagination={users.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Admin>
    )
}
