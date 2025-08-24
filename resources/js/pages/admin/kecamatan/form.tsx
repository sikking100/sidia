import PageHeader from "@/components/page-header"
import { District } from "@/types"
import { useForm } from "@inertiajs/react"
import { Button, Form, InputGroup } from "react-bootstrap"
import { BiMap, BiSave } from "react-icons/bi"

interface Props {
    district?: District
}

export default function KecamatanForm({ district }: Props) {

    const title = district !== null && district !== undefined ? 'Ubah' : 'Simpan'
    const { data, setData, put, post, processing } = useForm({
        id: district?.id ?? 0,
        name: district?.name ?? '',
    })

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (district !== null && district !== undefined) {
            put(route('district.update', district.id))
        } else {
            post(route('district.store'))
        }
    }

    const breadcumb = district !== null && district !== undefined ? 'Ubah' : 'Buat'
    return (
        <div className="container-fluid">
            <PageHeader
                HeaderText="Kecamatan"
                Breadcrumb={[{ name: 'Kecamatan', navigate: 'district.index' }, { name: breadcumb }]}
            />
            <div className="row clearfix">
                <div className="col-md-12 col-lg-12">
                    <div className="card planned-task">
                        <div className="body">
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Nama Kecamatan</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>
                                                <BiMap />
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
