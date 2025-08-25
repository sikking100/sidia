import PageHeader from "@/components/page-header"
import { Hamlet } from "@/types"
import { useForm } from "@inertiajs/react"
import { Button, Form, InputGroup } from "react-bootstrap"
import { BiMap, BiSave } from "react-icons/bi"

interface Props {
    hamlet?: Hamlet
}

export default function DusunForm({ hamlet }: Props) {

    const title = hamlet !== null && hamlet !== undefined ? 'Ubah' : 'Simpan'
    const { data, setData, put, post, processing } = useForm({
        id: hamlet?.id ?? 0,
        name: hamlet?.name ?? '',
    })

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (hamlet !== null && hamlet !== undefined) {
            put(route('hamlet.update', hamlet.id))
        } else {
            post(route('hamlet.store'))
        }
    }

    const breadcumb = hamlet !== null && hamlet !== undefined ? 'Ubah' : 'Buat'
    return (
        <div className="container-fluid">
            <PageHeader
                HeaderText="Dusun"
                Breadcrumb={[{ name: 'Dusun', navigate: 'hamlet.index' }, { name: breadcumb }]}
            />
            <div className="row clearfix">
                <div className="col-md-12 col-lg-12">
                    <div className="card planned-task">
                        <div className="body">
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Nama Dusun</Form.Label>
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
