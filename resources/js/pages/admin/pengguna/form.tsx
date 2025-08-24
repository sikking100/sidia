import PageHeader from "@/components/page-header"
import { User } from "@/types"
import { useForm } from "@inertiajs/react"
import { Button, Form, InputGroup } from "react-bootstrap"
import { BiMailSend, BiPhone, BiRotateLeft, BiSave, BiUser } from "react-icons/bi"

interface Props {
    user?: User
}

export default function PenggunaForm({ user }: Props) {

    const title = user !== null && user !== undefined ? 'Ubah' : 'Simpan'
    const { data, setData, put, post, processing } = useForm({
        id: user?.id ?? 0,
        email: user?.email ?? '',
        name: user?.name ?? '',
        phone: user?.phone ?? '',
        role: user?.role ?? '',
    })

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (user !== null && user !== undefined) {
            put(route('user.update', user.id))
        } else {
            post(route('user.store'))
        }
    }

    const breadcumb = user !== null && user !== undefined ? 'Ubah' : 'Buat'
    return (
        <div className="container-fluid">
            <PageHeader
                HeaderText="Pengguna"
                Breadcrumb={[{ name: 'Pengguna', navigate: 'user.index' }, { name: breadcumb }]}
            />
            <div className="row clearfix">
                <div className="col-md-12 col-lg-12">
                    <div className="card planned-task">
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
                                    <Form.Label>Role</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>
                                                <BiRotateLeft />
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control value={data.role} onChange={e => setData('role', e.target.value)} as={'select'} custom>
                                            <option>--Pilih Role--</option>
                                            <option value={'bpjs'}>BPJS</option>
                                            <option value={'desa'}>Kelurahan / Desa</option>
                                        </Form.Control>
                                    </InputGroup>
                                </Form.Group>
                                <Button disabled={processing} className="btn btn-sm btn-primary" type="submit"><BiSave className="mr-1" /> {title}</Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
