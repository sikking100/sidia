import PageHeader from "@/components/page-header"
import { checkFile, defImage, permasalahan } from "@/hooks/functions"
import { DesaApplication, DesaApplicationPost, FilesForm, Hamlet, Menu } from "@/types"
import { useForm } from "@inertiajs/react"
import React from "react"
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap"
import { BiFace, BiHome, BiIdCard, BiUpload, BiUser } from "react-icons/bi"
import { FaRestroom } from "react-icons/fa"
import { GiVillage } from "react-icons/gi"
import { GoNumber, GoPerson } from "react-icons/go"
import { HiSave } from "react-icons/hi"
import { MdWarning } from "react-icons/md"

interface Props {
    hamlets: Hamlet[]
    menu: Menu
    category: string
    application?: DesaApplication
}

export default function DesaApplicationForm({ hamlets, menu, category, application }: Props) {

    const title = application !== null && application !== undefined ? 'Ubah' : 'Simpan'
    const breadcumb = application !== null && application !== undefined ? 'Revisi' : 'Buat'

    const { data, setData, post, put, errors } = useForm<DesaApplicationPost>(
        {
            hamlet: application?.hamlet ?? '',
            id_card_number: application?.id_card_number ?? '',
            family_card_number: application?.family_card_number ?? '',
            family_head_name: application?.family_head_name ?? '',
            category: application?.category ?? category,
            name: application?.name ?? '',
            phone: application?.phone ?? '',
            email: application?.email ?? '',
            sex: application?.sex ?? '',
            religion: application?.religion ?? '',
            images: application?.images ?? '',
            description: application?.description ?? '',
            problem: application?.problem ?? '',
            filessss: []
        }
    )
    const [selectedFile, setSelectedFile] = React.useState<Blob | MediaSource>()
    const [preview, setPreview] = React.useState<string>()
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const filessRef = React.useRef<FilesForm[]>([])

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (application !== null && application !== undefined) {
            put(route('desa.update', application.id))
        } else {
            post(route('desa.store'))
        }
    }

    React.useEffect(() => {
        if (!selectedFile) {
            setPreview(defImage)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        const file = e.target.files[0]
        setSelectedFile(file)
        setData('images', file)
    }

    return (
        <div className="container-fluid">
            <PageHeader
                HeaderText={application != null ? `Permohonan ${category}` : `Ajukan Permohonan ${category}`}
                Breadcrumb={[{ name: application != null ? `Permohonan ${category}` : `Ajukan Permohonan ${category}`, navigate: application != null ? 'desa.index' : 'buat' }, { name: breadcumb }]}
            />
            <div className="row clearfix">
                <div className="col-md-12 col-lg-12">
                    <div className="body">
                        <div className="body">
                            <Form onSubmit={handleSubmit} validated={errors == null}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title><BiHome /> Data Kepala Keluarga : </Card.Title>
                                        <Row>
                                            <Col xs={12} md={6} className="mb-3">
                                                <InputGroup hasValidation>
                                                    <InputGroup.Prepend className="sm">
                                                        <InputGroup.Text style={{ height: '35px' }}><BiIdCard /></InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control
                                                        required
                                                        value={data.family_card_number}
                                                        placeholder="Masukkan No. Kartu Keluarga"
                                                        isInvalid={errors.family_card_number != null}
                                                        onChange={e => setData('family_card_number', e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.family_card_number}
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Col>
                                            <Col xs={12} md={6} className="mb-3">
                                                <InputGroup>
                                                    <InputGroup.Prepend className="sm">
                                                        <InputGroup.Text style={{ height: '35px' }}><BiFace /></InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control
                                                        required
                                                        value={data.family_head_name}

                                                        placeholder="Masukkan Nama Kepala Keluarga"
                                                        isInvalid={errors.family_head_name != null}
                                                        onChange={e => setData('family_head_name', e.target.value)}

                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.family_head_name}
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                        <Card.Title><BiUser /> Data Pemohon : </Card.Title>
                                        <Row>
                                            <Col xs={12} md={3} className="mb-3">
                                                <InputGroup>
                                                    <InputGroup.Prepend className="sm">
                                                        <InputGroup.Text style={{ height: '35px' }}><GoNumber /></InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control
                                                        required
                                                        value={data.id_card_number}

                                                        placeholder="Masukkan NIK"
                                                        isInvalid={errors.id_card_number != null}
                                                        onChange={e => setData('id_card_number', e.target.value)}

                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.id_card_number}
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Col>
                                            <Col xs={12} md={3} className="mb-3">
                                                <InputGroup>
                                                    <InputGroup.Prepend className="sm">
                                                        <InputGroup.Text style={{ height: '35px' }}><GoPerson /></InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control
                                                        required
                                                        value={data.name}

                                                        placeholder="Masukkan Nama Pemohon"
                                                        isInvalid={errors.name != null}
                                                        onChange={e => setData('name', e.target.value)}

                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.name}
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Col>
                                            <Col xs={12} md={3} className="mb-3">
                                                <InputGroup>
                                                    <InputGroup.Prepend className="sm">
                                                        <InputGroup.Text style={{ height: '35px' }}><i className="fa fa-phone"></i></InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control
                                                        required
                                                        value={data.phone}

                                                        placeholder="Masukkan No. Telepon"
                                                        isInvalid={errors.phone != null}
                                                        onChange={e => setData('phone', e.target.value)}

                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.phone}
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Col>
                                            <Col xs={12} md={3} className="mb-3">
                                                <InputGroup>
                                                    <InputGroup.Prepend className="sm">
                                                        <InputGroup.Text style={{ height: '35px' }}>@</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control
                                                        required
                                                        value={data.email}

                                                        placeholder="Masukkan Email"
                                                        isInvalid={errors.email != null}
                                                        onChange={e => setData('email', e.target.value)}

                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.email}
                                                    </Form.Control.Feedback>
                                                    <Form.Text id="passwordHelpBlock" muted>
                                                        Email akan digunakan untuk mengirim notifikasi terkait permohonan
                                                    </Form.Text>
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="mb-3" xs={12} sm={4}>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text style={{ height: '36px' }}><FaRestroom /></InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control
                                                        onChange={e => setData('sex', e.target.value)}

                                                        required
                                                        as={"select"}
                                                        value={data.sex}

                                                        isInvalid={errors.sex != null} >
                                                        <option value={''}>-- Pilih Jenis Kelamin --</option>
                                                        <option value={'L'}>Laki - Laki</option>
                                                        <option value={'P'}>Perempuan</option>
                                                    </Form.Control>

                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.sex}
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Col>
                                            <Col className="mb-3" xs={12} sm={4}>
                                                <Form.Control as={"select"}
                                                    required
                                                    onChange={e => setData('religion', e.target.value)}

                                                    value={data.religion}

                                                    isInvalid={errors.religion != null} >
                                                    <option value={''}>-- Pilih Agama --</option>
                                                    <option value={'Islam'}>Islam</option>
                                                    <option value={'Katolik'}>Katolik</option>
                                                    <option value={'Protestan'}>Protestan</option>
                                                    <option value={'Buddha'}>Buddha</option>
                                                    <option value={'Hindu'}>Hindu</option>
                                                    <option value={'Konghucu'}>Konghucu</option>
                                                </Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.religion}
                                                </Form.Control.Feedback>
                                            </Col>

                                            <Col className="mb-3" xs={12} sm={4}>
                                                <InputGroup>
                                                    <InputGroup.Prepend className="sm">
                                                        <InputGroup.Text style={{ height: '36px' }}><GiVillage /></InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control
                                                        required
                                                        value={data.hamlet}

                                                        as={"select"} onChange={e => setData('hamlet', e.target.value)}
                                                        isInvalid={errors.hamlet != null} >
                                                        <option value={''}>-- Pilih Dusun --</option>
                                                        {hamlets?.map((e, i) =>
                                                            <option key={i} value={e.name}>{e.name}</option>
                                                        )}

                                                    </Form.Control>
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.hamlet}
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                        {data.category === 'PENGADUAN' && <Row>
                                            <Col className="mb-3">
                                                <InputGroup>
                                                    <InputGroup.Prepend className="sm">
                                                        <InputGroup.Text style={{ height: '36px' }}><MdWarning /></InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control
                                                        required
                                                        value={data.problem}

                                                        as={"select"} onChange={e => setData('problem', e.target.value)}>
                                                        <option value={''}>-- Pilih Jenis Pengaduan --</option>
                                                        {permasalahan.map((e, i) =>
                                                            <option key={i} value={e}>{e}</option>
                                                        )}
                                                    </Form.Control>
                                                </InputGroup>
                                            </Col>
                                        </Row>}
                                        <Row>
                                            <Col sm={8} className="mb-3">
                                                <Form.Control
                                                    value={data.description}

                                                    required as="textarea" rows={12} placeholder="Jelaskan alasan permohonan" isInvalid={errors.description != null}
                                                    onChange={e => setData('description', e.target.value)}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.description}
                                                </Form.Control.Feedback>
                                            </Col>
                                            <Col>
                                                {preview === defImage && data.images !== undefined ? <img src={`../../storage/images/${data.images}`} style={{ maxHeight: 200, minHeight: 0 }} className={'mb-2'} /> : <img src={preview} style={{ maxHeight: 200, minHeight: 0 }} className={'mb-2'} />}
                                                <Row>
                                                    <Col xs={9}>
                                                        <Form.File
                                                            required={application === null}
                                                            ref={fileInputRef}
                                                            custom
                                                            id="custom-file"
                                                            label={'pilih foto'}
                                                            onChange={onSelectFile}
                                                            isInvalid={errors.images != null}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.images}
                                                        </Form.Control.Feedback>
                                                        <Form.Text id="passwordHelpBlock" muted>
                                                            Ket: Foto wajah yang jelas
                                                        </Form.Text>
                                                    </Col>
                                                    {preview !== defImage && <Col>
                                                        <Button
                                                            variant="danger"
                                                            onClick={() => {
                                                                setSelectedFile(undefined)
                                                                setData('images', undefined)
                                                                if (fileInputRef.current) {
                                                                    fileInputRef.current.value = '';
                                                                }
                                                                // setPreview(defImage)
                                                            }}
                                                        >Hapus</Button>
                                                    </Col>}
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                                <Card>
                                    <Card.Body>
                                        <Card.Title><BiUpload /> Dokumen Persyaratan : </Card.Title>
                                        <Row>
                                            <Col>
                                                {menu.requirements.map((v, k) => {
                                                    const checkFiles = checkFile(v.name, v.id, application?.filess ?? [])
                                                    if (checkFiles !== undefined && checkFiles.status == 1) return null
                                                    return <Form.Row key={k} className="mb-3">
                                                        <Form.Label column lg={2}>{checkFiles !== undefined && checkFiles.status == 2 ? 'PERLU REVISI ' : ''} {v.name}</Form.Label>
                                                        <Col>
                                                            <Form.File
                                                                custom
                                                                id="custom-file"
                                                                label={data.filessss[k]?.filenya?.name ?? ''}
                                                                onChange={e => {
                                                                    const listFiles = e.target.files
                                                                    if (listFiles != null) {
                                                                        if (application !== null && application !== undefined && application.filess?.filter((e) => e.name === v.name)[0] !== undefined) {
                                                                            console.log(v.name);
                                                                            console.log(application.filess?.filter((e) => e.name === v.name));
                                                                            filessRef.current.push({ name: v.name, filenya: listFiles[0], place: application.filess?.filter((e) => e.name === v.name)[0].place ?? '' })
                                                                        } else {
                                                                            filessRef.current.push({ name: v.name, filenya: listFiles[0], place: '' })
                                                                        }
                                                                        console.log(filessRef.current.length);
                                                                        setData('filessss', filessRef.current)

                                                                    }
                                                                }}
                                                                name={v.name}
                                                            />
                                                        </Col>
                                                    </Form.Row>
                                                })}
                                            </Col>
                                        </Row>
                                        {/* <Card.Title className="mt-3"><BiFile /> Berkas lainnya : <CgAdd
                                onClick={e => {
                                    e.preventDefault()
                                    setPendukung([...pendukung, null])
                                    setData('pendukung', [...data.pendukung, { name: '', filenya: undefined }])
                                }}
                            /></Card.Title>
                            <Row>
                                <Col>
                                    {pendukung.map((v, k) => {
                                        return <Form.Row key={k}>
                                            <Col className="mb-3">
                                                <Form.Control
                                                    placeholder="Masukkan Nama Berkas"
                                                />
                                            </Col>
                                            <Col>
                                                <Form.File
                                                    custom
                                                    id="custom-file"
                                                    label={k + 1}
                                                    onChange={e => {
                                                        const listFiles = e.target.files
                                                        if (listFiles != null) {
                                                            // if (applicant !== null && applicant !== undefined && applicant.filess?.filter((e) => e.name === v.name)[0] !== undefined) {
                                                            //   filessRef.current.push({ name: v.name, filenya: listFiles[0], place: applicant.filess?.filter((e) => e.name === v.name)[0].place ?? '' })
                                                            // } else {
                                                            // pendukungRef.current.push({ name: `${k}`, filenya: listFiles[0], place: '' })
                                                            const updated = [...data.pendukung]
                                                            updated[k].filenya = listFiles[0]

                                                            setData('pendukung', updated)
                                                            // }
                                                        }
                                                    }}
                                                    name={`${k + 1}`}
                                                />
                                            </Col>
                                            <Col xs={1}>
                                                <CgRemove
                                                    size={25}
                                                    className={'cursor-pointer'}
                                                    color='red'
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        setPendukung(pendukung.filter((_, i) => i !== k))
                                                    }}
                                                />
                                            </Col>
                                        </Form.Row>
                                    })}
                                </Col>
                            </Row>
                            */}
                                        <Row className="justify-content-md-center">
                                            <Col md={"auto"}>
                                                <Button
                                                    className='mt-5'
                                                    type='submit'
                                                    size='sm'
                                                    variant="primary"
                                                >
                                                    <HiSave className={'mr-2'} />
                                                    {title} Permohoan
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
