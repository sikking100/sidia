import { checkFile, defImage, permasalahan, Subtitle } from "@/hooks/functions";
import Guest from "@/layouts/guest";
import { Applicant, District, FilesForm, Menu } from "@/types";
import { router, useForm } from "@inertiajs/react";
import React from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { GoNumber, GoPerson } from 'react-icons/go'
import { BiBuilding, BiFace, BiHome, BiIdCard, BiUpload, BiUser } from "react-icons/bi";
import { FaRestroom } from "react-icons/fa";
import { GiVillage } from 'react-icons/gi'
import { MdWarning } from 'react-icons/md'
import { HiSave } from "react-icons/hi";


interface Props {
    districts: District[]
    menu: Menu
    category: string
    application: Applicant
}

export default function GuestCreate({ category, menu, application, districts }: Props) {
    const { data, setData, post, errors, processing } = useForm<Applicant>(
        {
            id: application?.id ?? 0,
            family_card_number: application?.family_card_number ?? '',
            family_head_name: application?.family_head_name ?? '',
            category: category,
            name: application?.name ?? '',
            id_card_number: application?.id_card_number ?? '',
            religion: application?.religion ?? '',
            phone: application?.phone ?? '',
            email: application?.email ?? '',
            district: application?.district ?? '',
            ward: application?.ward ?? '',
            problem: application?.problem ?? '',
            description: application?.description ?? '',
            sex: application?.sex ?? '',
            images: application?.images ?? undefined,
            filessss: [],
            pendukung: [],
            filess: [],
            files: undefined,
            supports: [],
            created_at: '',
        }
    )
    const [stateDistrict, setStateDistrict] = React.useState<District | null>()
    const [selectedFile, setSelectedFile] = React.useState<Blob | MediaSource>()
    const [preview, setPreview] = React.useState<string>()
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const filessRef = React.useRef<FilesForm[]>([])





    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        // post(route('form.action'))
        const formData = new FormData()

        formData.append('id_card_number', data.id_card_number);
        formData.append('family_card_number', data.family_card_number);
        formData.append('family_head_name', data.family_head_name);
        formData.append('name', data.name);
        if (data.images !== null && data.images !== undefined) {
            formData.append('images', data.images);
        }
        formData.append('category', category);
        formData.append('description', data.description);
        formData.append('email', data.email);

        // Append files ke FormData
        data.filessss?.forEach((fileObj, index) => {
            formData.append(`filessss[${index}][name]`, fileObj.name);
            formData.append(`filessss[${index}][filenya]`, fileObj.filenya);
            formData.append(`filessss[${index}][place]`, fileObj.place);
        });

        // berkas pendukung
        data.pendukung?.forEach((v, i) => {
            formData.append(`pendukung[${i}][name]`, v?.name ?? '')
            formData.append(`pendukung[${i}][filenya]`, v?.filenya ?? '')
        })

        formData.append('ward', data.ward);
        formData.append('ward_id', String(stateDistrict?.wards?.find(e => e.name === data.ward)?.id ?? 0));
        formData.append('district', data.district);
        formData.append('district_id', String(stateDistrict?.id ?? 0));
        formData.append('phone', data.phone);
        formData.append('religion', data.religion);
        formData.append('sex', data.sex);
        formData.append('problem', data.problem ?? '');
        if (application !== null) {
            formData.append('_method', 'put');
            formData.append('id', String(application.id));
            router.post(route('form.update', application.id), {
                forceFormData: true,
            })
        } else {
            post(route('form.action'), {
                onError: (e) => {
                    console.log(e);
                    // setError(`${e}`)
                    // setShowModal(true)

                }
            })
        }
        return
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
        <Guest title={category}>
            <div
                className={'container-fluid'}
            >
                <Form onSubmit={handleSubmit} validated={errors == null}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Formulir Persyaratan</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{`Pelayanan ${Subtitle.get(category)}`}</Card.Subtitle>
                            <Card.Title><BiHome /> Data Kepala Keluarga : </Card.Title>
                            <Row>
                                <Col xs={12} md={6} className="mb-3">
                                    <InputGroup hasValidation>
                                        <InputGroup.Prepend className="sm">
                                            <InputGroup.Text style={{ height: '35px' }}><BiIdCard /></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            required
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
                                <Col className="mb-3" xs={12} sm={3}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text style={{ height: '36px' }}><FaRestroom /></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            onChange={e => setData('sex', e.target.value)}

                                            required
                                            as={"select"}
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
                                <Col className="mb-3" xs={12} sm={3}>
                                    <Form.Control as={"select"}
                                        required
                                        onChange={e => setData('religion', e.target.value)}

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
                                <Col className="mb-3" xs={12} sm={3}>
                                    <InputGroup>
                                        <InputGroup.Prepend className="sm">
                                            <InputGroup.Text style={{ height: '36px' }}><BiBuilding /></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            required
                                            as={"select"} onChange={e => {
                                                setStateDistrict(districts.find(d => d.name === e.target.value))
                                                setData('district', e.target.value)
                                            }}
                                            isInvalid={errors.district != null} >

                                            <option value={''}>-- Pilih Kecamatan --</option>
                                            {districts.map((e, i) =>
                                                <option key={i} value={e.name}>{e.name}</option>
                                            )}
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.district}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                                <Col className="mb-3" xs={12} sm={3}>
                                    <InputGroup>
                                        <InputGroup.Prepend className="sm">
                                            <InputGroup.Text style={{ height: '36px' }}><GiVillage /></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            required
                                            as={"select"} onChange={e => setData('ward', e.target.value)}
                                            isInvalid={errors.ward != null} >
                                            <option value={''}>-- Pilih Desa --</option>
                                            {districts.find(e => e.id === stateDistrict?.id)?.wards?.map((e, i) =>
                                                <option key={i} value={e.name}>{e.name}</option>
                                            )}

                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.ward}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>

                            </Row>
                            {category == 'PENGADUAN' && <Row>
                                <Col className="mb-3">
                                    <InputGroup>
                                        <InputGroup.Prepend className="sm">
                                            <InputGroup.Text style={{ height: '36px' }}><MdWarning /></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            required
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
                                    <Form.Control required as="textarea" rows={12} placeholder="Jelaskan alasan permohonan" isInvalid={errors.description != null}
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
                                                required
                                                ref={fileInputRef}
                                                custom
                                                id="custom-file"
                                                label="Custom file input"
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
                                            <Form.Label column lg={2}>{checkFiles !== undefined && checkFiles.status == 2 ? <span className="text-danger">PERLU REVISI</span> : ''} {v.name} {v.require ? '(WAJIB)' : ''}</Form.Label>
                                            <Col>
                                                <Form.File
                                                    custom
                                                    id="custom-file"
                                                    required={data.filessss.find(f => f.name === v.name)?.place === '' ? v.require === 1 ? true : false : false}
                                                    label={data.filessss[k]?.filenya.name ?? ''}
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
                                        disabled={processing}
                                        className='mt-5'
                                        type='submit'
                                        size='sm'
                                        variant="primary"
                                    >
                                        <HiSave className={'mr-2'} />

                                        {processing ? <><i className="fa fa-spinner fa-spin"></i>{" "}
                                            <span>Loading...</span>
                                        </> : application !== null ? 'Revisi' : 'Ajukan'} Permohoan
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Form>
            </div>
        </Guest >
    )
}
