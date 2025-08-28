import PageHeader from "@/components/page-header";
import Admin from "@/layouts/admin";
import { FlashProps, User } from "@/types";
import { Button, Form, InputGroup } from "react-bootstrap";
import { PageProps } from "node_modules/@inertiajs/core/types/types";
import useCustomModal from "@/hooks/use-modal";
import { useForm } from "@inertiajs/react";
import React from "react";
import { BiMailSend, BiPhone, BiRotateLeft, BiSave, BiUser } from "react-icons/bi";
import CustomModal from "@/components/custom-modal";
import { GiCancel } from "react-icons/gi";


interface Props extends PageProps {
    user: User
    flash: FlashProps
}

interface FormProps {
    email: string
    id: number
    name: string
    password: string | undefined,
    phone: string
}

export default function PenggunaShow({ user, flash }: Props) {
    const { open, isOpen, close } = useCustomModal()
    const { data, setData, put, processing } = useForm<FormProps>({
        email: user.email,
        id: user.id,
        name: user.name,
        password: undefined,
        phone: user.phone,
    })

    React.useEffect(() => {
        if (flash?.message !== null && flash?.message !== undefined && flash?.message !== '') {
            open()
        }
    }, [flash, open])

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log(data);

        put(route('user.updates', data.id))
    }
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
            <div className="container-fluid">
                <PageHeader
                    HeaderText="Profil"
                    Breadcrumb={[{ name: 'Profil' }]}
                />
                <div className="row clearfix">
                    <div className="col-lg-12 col-md-12">
                        <div className="card">
                            <div className="header">
                                <h2>Ubah Data Profil</h2>
                            </div>
                            <div className="body">
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>Nama</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                    <BiUser />
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control value={data.name} onChange={e => setData('name', e.target.value)} type="text" />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Email address</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                    <BiMailSend />
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control value={data.email} onChange={e => setData('email', e.target.value)} type="email" />
                                        </InputGroup>
                                        <Form.Text className="text-muted">
                                            Email digunakan untuk login dan menerima notifikasi
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Nomor Telepon</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                    <BiPhone />
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control value={data.phone} onChange={e => setData('phone', e.target.value)} type="phone" />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                    <BiRotateLeft />
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control value={data.password} onChange={e => setData('password', e.target.value)} />
                                        </InputGroup>
                                        <Form.Text className="text-muted">
                                            Isi password apabila Anda ingin mengganti password login
                                        </Form.Text>
                                    </Form.Group>
                                    <Button disabled={processing} className="btn btn-sm btn-primary" type="submit"><BiSave className="mr-1" /> Ubah</Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Admin>
    )
}
