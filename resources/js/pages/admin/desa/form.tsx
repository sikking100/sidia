import PageHeader from "@/components/page-header"
import { District, Ward } from "@/types"
import { useForm } from "@inertiajs/react"
import { Button, Form, InputGroup } from "react-bootstrap"
import { BiMapPin, BiSave } from "react-icons/bi"

interface Props {
    district: District
    ward?: Ward
}

export default function DesaForm({ district, ward }: Props) {

    const title = ward !== null && ward !== undefined ? 'Ubah' : 'Simpan'
    const { data, setData, put, post, processing } = useForm({
        id: ward?.id ?? 0,
        name: ward?.name ?? '',
        district_id: district.id
    })

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (ward !== null && ward !== undefined) {
            put(route('ward.update', ward.id))
        } else {
            post(route('ward.store'))
        }
    }

    const breadcumb = ward !== null && ward !== undefined ? 'Ubah' : 'Buat'
    return (
        <div className="container-fluid">
            <PageHeader
                HeaderText={`Kelurahan / Desa di Kecamatan ${district.name}`}
                Breadcrumb={[{ name: 'Kecamatan', navigate: 'district.index' }, { name: 'Kel - Des', navigate: 'district.show', id: district.id }, { name: breadcumb }]}
            />
            <div className="row clearfix">
                <div className="col-md-12 col-lg-12">
                    <div className="card planned-task">
                        <div className="body">
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Nama Desa</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>
                                                <BiMapPin />
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
