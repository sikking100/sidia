import PageHeader from "@/components/page-header";
import { Menu, Requirement } from "@/types";
import { useForm } from "@inertiajs/react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { BiRename, BiSave } from "react-icons/bi";

interface Props {
    requirement?: Requirement
    menu: Menu
}

export default function PersyaratanForm({ requirement, menu }: Props) {
    const title = requirement !== null && requirement !== undefined ? 'Ubah' : 'Simpan'
    const { data, setData, put, post, processing } = useForm({
        id: requirement?.id ?? 0,
        name: requirement?.name ?? '',
        require: requirement?.require ?? 0,
        link: requirement?.link ?? '',
        menu_id: requirement?.menu_id ?? menu.id
    })

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (requirement !== null && requirement !== undefined) {
            put(route('requirement.update', requirement.id))
        } else {
            post(route('requirement.store'))
        }
    }

    const breadcumb = requirement !== null && requirement !== undefined ? 'Ubah' : 'Buat'
    return (
        <div className="container-fluid">
            <PageHeader
                HeaderText={`Persyaratan di Kategori ${menu.name}`}
                Breadcrumb={[{ name: 'Kategori', navigate: 'menu.index' }, { name: 'Persyaratan', navigate: 'menu.show', id: menu.id }, { name: breadcumb }]}
            />
            <div className="row clearfix">
                <div className="col-md-12 col-lg-12">
                    <div className="card planned-task">
                        <div className="body">
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Nama Persyaratan</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>
                                                <BiRename />
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control value={data.name} onChange={e => setData('name', e.target.value)} type="text" />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check
                                        checked={data.require != 0} type="checkbox" label="Wajib"
                                        onChange={() => {
                                            setData('require', data.require == 0 ? 1 : 0)
                                            return;
                                        }} />
                                    <Form.Text id="passwordHelpBlock" muted>
                                        Jika pilihan ini dicentang, maka pemohon wajib mengupload berkas. Apabila berkas opsional, maka jangan dicentang!
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Link Berkas</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>
                                                <BiRename />
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control value={data.link} onChange={e => setData('link', e.target.value)} type="text" />

                                    </InputGroup>
                                    <Form.Text id="passwordHelpBlock" muted>
                                        Jika persyaratan memilik berkas contoh, maka sertakan link nya agar pemohon dapat mendownload kemudian mengupload berkas yang sesuai.
                                    </Form.Text>
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
