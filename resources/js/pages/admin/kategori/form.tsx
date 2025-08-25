import PageHeader from "@/components/page-header";
import { Menu } from "@/types";
import { useForm } from "@inertiajs/react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { BiFile, BiSave } from "react-icons/bi";

interface Props {
    menu?: Menu
}

export default function KategoriForm({ menu }: Props) {
    const title = menu !== null && menu !== undefined ? 'Ubah' : 'Simpan'
    const { data, setData, put, post, processing } = useForm({
        id: menu?.id ?? 0,
        name: menu?.name ?? '',
    })

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (menu !== null && menu !== undefined) {
            put(route('menu.update', menu.id))
        } else {
            post(route('menu.store'))
        }
    }

    const breadcumb = menu !== null && menu !== undefined ? 'Ubah' : 'Buat'
    return (
        <div className="container-fluid">
            <PageHeader
                HeaderText={`Kategori`}
                Breadcrumb={[{ name: 'Kategori', navigate: 'menu.index' }, { name: breadcumb }]}
            />
            <div className="row clearfix">
                <div className="col-md-12 col-lg-12">
                    <div className="card planned-task">
                        <div className="body">
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Nama Kategori</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>
                                                <BiFile />
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control value={data.name} onChange={e => setData('name', e.target.value)} type="text" />
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
