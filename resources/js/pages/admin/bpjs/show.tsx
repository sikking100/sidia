import { PageProps } from "node_modules/@inertiajs/core/types/types";
import { BPJSNav } from ".";
import { Applicant, CustomComment, Filess, FlashProps, User } from "@/types";
import React from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import axios from "axios";
import { makeIntlFormatter } from "react-timeago/defaultFormatter";
import useCustomModal from "@/hooks/use-modal";
import CustomModal from "@/components/custom-modal";
import { Button, Col, Form, FormControl, Image, Row, Table } from "react-bootstrap";
import { GiCancel, GiTick } from "react-icons/gi";
import { BiFace, BiFile, BiHome, BiIdCard, BiMap, BiMapAlt, BiPhone, BiRevision, BiSolidDownload, BiText, BiTime, BiUserCircle } from "react-icons/bi";
import { GoVerified } from "react-icons/go";
import { checkFile, getFileType, getStatus, getStatusBerkas } from "@/hooks/functions";
import PageHeader from "@/components/page-header";
import { MdCreate, MdOutlineEmail, MdPending, MdVerified } from "react-icons/md";
import TimeAgo from "react-timeago";
import { HiEye } from "react-icons/hi";


interface Props extends PageProps {
    flash: FlashProps
    application: Applicant

}


interface FormUpdateStatus {
    status: string
    status_description: string
}

export default function BPJSShow({ application, flash }: Props) {
    const [selectedFile, setSelectedFile] = React.useState<Filess | null>(null);
    const [file, setFile] = React.useState<File | null>(null);

    const [error, setError] = React.useState<string>('');
    const [comments, setComment] = React.useState<CustomComment[]>([])
    const [content, setContent] = React.useState('')
    const { user } = usePage().props.auth as { user: User }
    const listRef = React.useRef<HTMLDivElement | null>(null);



    const { setData, put } = useForm<FormUpdateStatus>({
        status: '',
        status_description: ''
    })

    // function onClick() {
    //     window.open(route('application.edit', application.id))
    // }

    function onTolak() {
        setData('status', 'CANCEL')
        tolakModal.open()
    }

    const onVerified = async () => {
        const check = application.filess.filter(e => e.status != 1)
        if (check.length > 0) {
            setError('Berkas belum diverifikasi, silahkan verifikasi semua berkas terlebih dahulu')
            open()
            return
        }
        try {
            await axios.put(route('bpjs.update', application.id), {
                status: "VERIFIED",
                status_description: "Berkas sudah diverifikasi"
            })
            // window.location.reload()
        } catch (error) {
            setError(`${error}`)
            open()
        }
        return
    }

    const onVerifiedBerkas = async () => {
        try {
            await axios.put(route('bpjs.file', selectedFile?.id), {
                status: '1',
                status_description: 'Berkas terverifikasi'
            })
            window.location.reload()
        } catch (error) {
            setError(`${error}`)
            open()
        }
        return
    }





    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (selectedFile !== null && selectedFile !== undefined) {
            put(route('bpjs.file', selectedFile?.id), {
                onError: (e) => {
                    open()
                    setError(e.message)
                }
            })
        } else {
            put(route('bpjs.update', application.id), {
                onError: (e) => {
                    open()
                    setError(e.message)
                }
            })
        }
        return
    }

    const handleView = (file: Filess) => {
        setSelectedFile(file);
        // setIsModalOpen(true);
        lihatModal.open()
    };

    const dateCreated = Date.parse(application.created_at ?? '')
    const dateCreate = Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }).format(dateCreated)
    const intlFormatter = makeIntlFormatter({
        locale: "id-ID", // string
    });



    const tolakModal = useCustomModal()
    const { open, isOpen, close } = useCustomModal()
    const lihatModal = useCustomModal()

    React.useEffect(() => {
        if (flash?.message !== undefined && flash?.message !== null && flash?.message !== '') {
            open()
        }

    }, [flash?.message, open])



    React.useEffect(() => {
        const fetchComment = async () => {
            const response = await axios.get(`/comment/${application.id}`)
            setComment(response.data);
        }
        fetchComment()
        return
    }, [])

    React.useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [comments])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            setFile(file)
            setContent(file.name)
        }
    }

    return (
        <div id="wrapper">
            <BPJSNav {...user} />
            <CustomModal
                show={lihatModal.isOpen}
                onHide={lihatModal.close}
                title={`Status Berkas - ${getStatusBerkas(selectedFile?.status ?? 0)}`}
                size="xl"
                scrollable={true}
                footer={
                    <div className="row">
                        <Button className={"btn btn-sm btn-outline-danger mr-2"} onClick={lihatModal.close}>
                            <GiCancel className="mr-1 h-4 w-4" />
                            Tutup
                        </Button>
                        <Button className={"btn btn-sm btn-outline-secondary mr-2"} href={route('file.download', { place: selectedFile?.place })}>
                            <BiSolidDownload className='mr-1 h-4 w-4' />
                            Download
                        </Button>
                        {
                            application.supports && selectedFile?.status == 0 &&
                            <Button className={"btn btn-sm btn-outline-warning mr-2"} onClick={async e => {
                                e.preventDefault()
                                await axios.put(route('bpjs.file', selectedFile.id), {
                                    'status': '2',
                                    'status_description': 'Berkas ditolak'
                                })
                                window.location.reload()
                            }}>
                                <BiRevision className='mr-1 h-4 w-4' />
                                Revisi
                            </Button>
                        }
                        {
                            selectedFile?.status == 0 &&
                            <Button className={"btn btn-sm btn-outline-success"} onClick={onVerifiedBerkas}>
                                <GoVerified className='mr-1 h-4 w-4' />
                                Verifikasi
                            </Button>
                        }
                    </div>
                }
            >
                {getFileType(selectedFile) === 'pdf' ? (
                    <iframe
                        src={`../../storage/${selectedFile?.place}`}
                        width="100%"
                        height="600px"
                        title="PDF Viewer"
                    />
                ) : (
                    <img
                        src={`../../storage/${selectedFile?.place}`}
                        alt={selectedFile?.name}
                        className="img-fluid"
                    />
                )}
                {
                    selectedFile?.comment !== '' && <p>{selectedFile?.comment}</p>
                }

            </CustomModal>

            {/* kalau ada error */}
            <CustomModal
                show={isOpen}
                onHide={close}
                title="Kesalahan"
                size="sm"
                footer={
                    <Button type="reset" onClick={close} className="btn btn-sm btn-outline-primary mr-2">
                        <GiCancel className="mr-1" />
                        Tutup
                    </Button>
                }
            >
                {flash?.message ?? error}
            </CustomModal>


            {/* modal tolak */}
            <CustomModal
                show={tolakModal.isOpen}
                onHide={tolakModal.close}
                title="Peringatan"
                size="lg"
            >
                <div>
                    <h6>
                        Anda Yakin ingin menolak?
                    </h6>
                    <form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>
                                Sertakan alasan
                            </Form.Label>

                            <FormControl
                                onChange={e => setData('status_description', e.target.value)}
                                as={'textarea'}
                                rows={5}
                            />
                        </Form.Group>
                        <div className="d-flex">
                            <Button type="reset" onClick={tolakModal.close} className="btn btn-sm btn-outline-primary mr-2">
                                <GiCancel className="mr-1" />
                                Batal</Button>
                            <Button type="submit" className="btn btn-sm btn-danger">
                                <BiRevision className="mr-1 h-4 w-4" />
                                Tolak</Button>
                        </div>
                    </form>
                </div>
            </CustomModal>


            <div className="container-fluid mt-5">
                <PageHeader
                    role={user.role}
                    HeaderText={`Permohonan NIK ${application.id_card_number}`}
                    Breadcrumb={[{ name: "Permohonan", navigate: 'bpjs.index' }, { name: "Detail" }]}
                />

                <div className="row clearfix">
                    <div className="col-lg-12 col-md-12">
                        <div className="card">
                            <div className="body">
                                <div className="application">
                                    <h3>{application.category}</h3>
                                    <div>
                                        <Image src={`../../storage/images/${application.images}`} roundedCircle style={{ width: '20vh' }} />
                                    </div>
                                    <div className="status">
                                        {(application.status === 'COMPLETED' || application.status === 'COMPLETED_FILE') && <MdVerified className='text-success mr-1' size={'30'} />}
                                        {application.status === 'DEFFICIENT' || application.status === 'REVISED' && <MdCreate className='mr-1' color="orange" size={'30'} />}
                                        {application.status === 'PENDING' && <MdPending className='mr-1' size={'30'} color="orange" />}
                                        <div>
                                            <h3 className={`${(application.status === 'COMPLETED' || application.status === 'COMPLETED_FILE') ? 'text-success' : application.status === 'CANCEL' ? 'text-success' : 'text-warning'} mt-2`}>
                                                {getStatus(application.status ?? '')}
                                            </h3>
                                        </div>
                                    </div>
                                    <div>
                                        <h5>{application.status_description}</h5>
                                    </div>

                                    <div className='form-row mt-3'>
                                        {/* {(application.status == 'VERIFIED' || application.status == 'COMPLETED') &&
                                            <div className="col-xs-2">
                                                <Button
                                                    onClick={onClick}
                                                    className="btn btn-sm btn-outline-primary"
                                                >
                                                    <BiPrinter className="mr-2 h-4 w-4" />
                                                    Print PDF
                                                </Button>
                                            </div>
                                        } */}
                                        {(application.status == 'VERIFIED') &&
                                            <div className="col">
                                                <Button
                                                    onClick={async () => {
                                                        try {
                                                            await axios.put(route('bpjs.update', application.id), {
                                                                status: 'COMPLETED'
                                                            })
                                                            window.location.reload()
                                                        } catch (error) {
                                                            setError(`${error}`)
                                                            open()
                                                        }
                                                    }}
                                                    className="btn btn-sm btn-success"
                                                >
                                                    <GiTick className="mr-2 h-4 w-4" />
                                                    Selesai
                                                </Button>
                                            </div>
                                        }
                                        {(application.status == 'PENDING' || application.status == 'REVISED') &&
                                            <div className="col-xs-2">
                                                <Button
                                                    className="btn btn-sm btn-secondary"
                                                    onClick={async e => {
                                                        e.preventDefault()
                                                        await axios.put(route('bpjs.update', application.id), {
                                                            'status': 'DEFFICIENT',
                                                            'status_description': 'Revisi Berkas'

                                                        })
                                                        window.location.reload()
                                                    }}
                                                >
                                                    <BiRevision className="mr-2 h-4 w-4" />
                                                    {application.status === 'REVISED' ? 'Revisi Ulang' : 'Revisi Berkas'}
                                                </Button>
                                            </div>
                                        }
                                        {(application.status == 'PENDING' || application.status == 'REVISED') &&
                                            <div className="col">
                                                <Button
                                                    onClick={onVerified}
                                                    className="btn btn-sm btn-primary"
                                                >
                                                    <GoVerified className="mr-2 h-4 w-4" />
                                                    Verifikasi
                                                </Button>
                                            </div>
                                        }
                                        {(application.status == 'PENDING') &&
                                            <div className="col">
                                                <Button
                                                    color={'red'}
                                                    onClick={() => onTolak()}
                                                    className="btn btn-sm btn-danger"
                                                >
                                                    <BiRevision className="mr-2 h-4 w-4" />
                                                    Tolak
                                                </Button>
                                            </div>
                                        }
                                    </div>

                                    <div className="sub-header">
                                        <BiUserCircle size={25} />
                                        <span>Informasi Pemohon : </span>
                                    </div>
                                    <div className="content">
                                        <Row>
                                            <Col className="title" xs={12} sm={3}>
                                                <BiUserCircle />
                                                <span>Nama Pemohon</span>
                                            </Col>
                                            <Col xs={12} sm={1} className="d-none d-sm-block d-md-block">
                                                :
                                            </Col>
                                            <Col className="subtitle" xs={12} sm={8}>
                                                {application.name}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="title" xs={12} sm={3}>
                                                <BiIdCard />
                                                <span>NIK Pemohon</span>
                                            </Col>
                                            <Col xs={12} sm={1} className="d-none d-sm-block d-md-block">
                                                :
                                            </Col>
                                            <Col className="subtitle" xs={12} sm={8}>
                                                {application.id_card_number}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="title" xs={12} sm={3}>
                                                <BiFile />
                                                <span>Tiket</span>
                                            </Col>
                                            <Col xs={12} sm={1} className="d-none d-sm-block d-md-block">
                                                :
                                            </Col>
                                            <Col className="subtitle" xs={12} sm={8}>
                                                {application.ticket}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="title" xs={12} sm={3}>
                                                <BiPhone />
                                                <span>Nomor Telepon</span>
                                            </Col>
                                            <Col xs={12} sm={1} className="d-none d-sm-block d-md-block">
                                                :
                                            </Col>
                                            <Col className="subtitle" xs={12} sm={8}>
                                                {application.phone}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="title" xs={12} sm={3}>
                                                <MdOutlineEmail />
                                                <span>Email</span>
                                            </Col>
                                            <Col xs={12} sm={1} className="d-none d-sm-block d-md-block">
                                                :
                                            </Col>
                                            <Col className="subtitle" xs={12} sm={8}>
                                                {application.email}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="title" xs={12} sm={3}>
                                                <BiTime />
                                                <span>Tanggal Pembuatan Permohonan</span>
                                            </Col>
                                            <Col xs={12} sm={1} className="d-none d-sm-block d-md-block">
                                                :
                                            </Col>
                                            <Col className="subtitle" xs={12} sm={8}>
                                                {
                                                    dateCreate + ','
                                                } <TimeAgo
                                                    date={dateCreated}
                                                    formatter={intlFormatter}
                                                ></TimeAgo>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="title" xs={12} sm={3}>
                                                <BiText />
                                                <span>Deskripsi Permohonan</span>
                                            </Col>
                                            <Col xs={12} sm={1} className="d-none d-sm-block d-md-block">
                                                :
                                            </Col>
                                            <Col className="subtitle" xs={12} sm={8}>
                                                {application.description}
                                            </Col>
                                        </Row>
                                        {application.problem && <Row>
                                            <Col className="title" xs={12} sm={3}>
                                                <BiText />
                                                <span>Deskripsi Permasalahan</span>
                                            </Col>
                                            <Col xs={12} sm={1} className="d-none d-sm-block d-md-block">
                                                :
                                            </Col>
                                            <Col className="subtitle" xs={12} sm={8}>
                                                {application.problem}
                                            </Col>
                                        </Row>}
                                    </div>

                                    <div className="sub-header">
                                        <BiHome size={25} />
                                        <span>Data Kepala Keluarga : </span>
                                    </div>
                                    <div className="content">
                                        <Row>
                                            <Col className="title" xs={12} sm={3}>
                                                <BiFace />
                                                <span>Nama Kepala Keluarga</span>
                                            </Col>
                                            <Col xs={12} sm={1} className="d-none d-sm-block d-md-block">
                                                :
                                            </Col>
                                            <Col className="subtitle" xs={12} sm={8}>
                                                {application.family_head_name}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="title" xs={12} sm={3}>
                                                <BiFile />
                                                <span>Nomor Kartu Keluarga</span>
                                            </Col>
                                            <Col xs={12} sm={1} className="d-none d-sm-block d-md-block">
                                                :
                                            </Col>
                                            <Col className="subtitle" xs={12} sm={8}>
                                                {application.family_card_number}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="title" xs={12} sm={3}>
                                                <BiMapAlt />
                                                <span>Desa</span>
                                            </Col>
                                            <Col xs={12} sm={1} className="d-none d-sm-block d-md-block">
                                                :
                                            </Col>
                                            <Col className="subtitle" xs={12} sm={8}>
                                                {application.ward}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="title" xs={12} sm={3}>
                                                <BiMap />
                                                <span>Kecamatan</span>
                                            </Col>
                                            <Col xs={12} sm={1} className="d-none d-sm-block d-md-block">
                                                :
                                            </Col>
                                            <Col className="subtitle" xs={12} sm={8}>
                                                {application.district}
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="sub-header">
                                        <BiFile size={25} />
                                        <span>Lampiran Permohonan : </span>
                                    </div>
                                    <div className="table">
                                        <Table striped bordered hover size="sm">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Nama Lampiran</th>
                                                    <th>Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    application.filess && application.filess.map((e, i) => (
                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{e.name}</td>
                                                            <td>
                                                                {
                                                                    checkFile(e.name, e.id, application.filess) !== undefined ?
                                                                        <Button
                                                                            className='btn btn-sm btn-info'
                                                                            onClick={(ee) => {
                                                                                ee.preventDefault()
                                                                                return handleView(checkFile(e.name, e.id, application.filess)!)
                                                                            }}
                                                                        >
                                                                            <HiEye className='mr-2' />
                                                                            Lihat
                                                                        </Button>
                                                                        : <p className='text-red-400'>Tidak diupload</p>
                                                                }
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </Table>
                                    </div>

                                    <div className="sub-header">
                                        <BiFile size={25} />
                                        <span>Lampiran Pendukung : </span>
                                    </div>
                                    <div className="table">
                                        <Table striped bordered hover size="sm">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Nama Lampiran</th>
                                                    <th>Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    application.supports && application.supports.map((e, i) => (
                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{e.name}</td>
                                                            <td>
                                                                {
                                                                    checkFile(e.name, e.id, application.supports) !== undefined ?
                                                                        <Button
                                                                            className='btn btn-sm btn-info'
                                                                            onClick={(ee) => {
                                                                                ee.preventDefault()
                                                                                return handleView(checkFile(e.name, e.id, application.supports)!)
                                                                            }}
                                                                        >
                                                                            <HiEye className='mr-2' />
                                                                            Lihat
                                                                        </Button>
                                                                        : <p className='text-red-400'>Tidak diupload</p>
                                                                }
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="ng-star-inserted">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <div className="card chat-app">
                                <div className="chat">
                                    <div className="chat-header clearfix">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <Link href="#" data-target="#view_info" data-toggle="modal">
                                                    <img alt="avatar" src={`../../storage/images/${application.images}`} />
                                                </Link>
                                                <div className="chat-about">
                                                    <h6 className="m-b-0">Pemohon : {application.name}</h6>
                                                    <small>{getStatus(application.status ?? '')}</small>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 hidden-sm text-right">
                                                <div className="row">
                                                    {(application.status == 'VERIFIED') &&
                                                        <div className="col">
                                                            <Button
                                                                onClick={async () => {
                                                                    try {
                                                                        await axios.put(route('bpjs.update', application.id), {
                                                                            status: 'COMPLETED',
                                                                            status_description: 'SELESAI'
                                                                        })
                                                                        window.location.reload()
                                                                    } catch (error) {
                                                                        setError(`${error}`)
                                                                        open()
                                                                    }
                                                                }}
                                                                className="btn btn-sm btn-success"
                                                            >
                                                                <GiTick className="mr-2 h-4 w-4" />
                                                                Selesai
                                                            </Button>
                                                        </div>
                                                    }
                                                    {(application.status == 'PENDING' || application.status == 'REVISED') &&
                                                        <div className="col-xs-2">
                                                            <Button
                                                                className="btn btn-sm btn-secondary"
                                                                onClick={async e => {
                                                                    e.preventDefault()
                                                                    await axios.put(route('bpjs.update', application.id), {
                                                                        'status': 'DEFFICIENT',
                                                                        'status_description': 'Revisi Berkas'
                                                                    })
                                                                    window.location.reload()
                                                                }}
                                                            >
                                                                <BiRevision className="mr-2 h-4 w-4" />
                                                                {application.status === 'REVISED' ? 'Revisi Ulang' : 'Revisi Berkas'}
                                                            </Button>
                                                        </div>
                                                    }
                                                    {(application.status == 'PENDING' || application.status == 'REVISED') &&
                                                        <div className="col">
                                                            <Button
                                                                onClick={onVerified}
                                                                className="btn btn-sm btn-primary"
                                                            >
                                                                <GoVerified className="mr-2 h-4 w-4" />
                                                                Verifikasi
                                                            </Button>
                                                        </div>
                                                    }
                                                    {(application.status == 'PENDING') &&
                                                        <div className="col">
                                                            <Button
                                                                color={'red'}
                                                                onClick={() => onTolak()}
                                                                className="btn btn-sm btn-danger"
                                                            >
                                                                <BiRevision className="mr-2 h-4 w-4" />
                                                                Tolak
                                                            </Button>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="chat-history" ref={listRef}>
                                        <ul className="m-b-0">
                                            {comments.map((e, i) => {
                                                const dateCreated = Date.parse(e.created_at ?? '')
                                                const dateCreate = Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }).format(dateCreated)
                                                const intlFormatter = makeIntlFormatter({
                                                    locale: "id-ID", // string
                                                });
                                                console.log(application.images);

                                                return (
                                                    <li className="clearfix" key={i}>
                                                        <div className={`message-data ${e.user_id !== null ? "" : "text-right"}`}>
                                                            <span className="message-data-time">{e.user_id !== null ? 'OPERATOR' : 'PEMOHON'} {dateCreate} <TimeAgo date={e.created_at} formatter={intlFormatter} /></span>
                                                            {e.user_id !== null && <img alt="avatar" src={`../../storage/images/${application.images}`} />}
                                                        </div>
                                                        <div className={`message ${e.user_id !== null ? "my-message" : "other-message float-right"}`}>
                                                            {e.content}
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                    <div className="chat-message clearfix">
                                        <div className="input-group mb-0">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" style={{ height: "35px" }}>
                                                    <button
                                                        className="text-link"
                                                        onClick={() => document.getElementById('file-input')?.click()}
                                                    >
                                                        <i className="icon-paper-clip"></i>
                                                    </button>
                                                    <input
                                                        id="file-input"
                                                        type="file"
                                                        style={{ display: 'none' }}
                                                        onChange={handleFileChange}
                                                    />
                                                </span>

                                            </div>
                                            <input
                                                value={content}
                                                className="form-control"
                                                placeholder="Enter text here..."
                                                type="text"
                                                onChange={e => setContent(e.target.value)}
                                            />
                                            <div className="input-group-append">
                                                <span className="input-group-text" style={{ height: "35px" }}>
                                                    <button onClick={async (e) => {
                                                        e.preventDefault()
                                                        const formData = new FormData()
                                                        if (file !== null) {
                                                            formData.append('file', file)
                                                        }
                                                        if (application.ward !== null && application.ward !== undefined && application.ward !== '') {
                                                            formData.append('ward', application.ward)
                                                        }
                                                        formData.append('content', content)
                                                        formData.append('user_id', String(user.id))
                                                        formData.append('application_id', String(application?.id))
                                                        formData.append('guest_email', String(application?.email))
                                                        formData.append('category', String(application?.category))

                                                        try {
                                                            const response = await axios.post('/comment', formData, {
                                                                headers: {
                                                                    'Content-Type': 'multipart/form-data',
                                                                },
                                                            });
                                                            setComment([
                                                                ...comments,
                                                                {
                                                                    content: response.data.content,
                                                                    user_id: user.id,
                                                                    created_at: response.data.created_at
                                                                }
                                                            ])
                                                            console.log('Upload sukses:', response.data);
                                                        } catch (error) {
                                                            console.error('Upload gagal:', error);
                                                        }

                                                        setContent('');
                                                        setFile(null);
                                                        if (file !== null) {
                                                            (document.getElementById('file-input') as HTMLInputElement).value = '';
                                                        }
                                                    }} className="text-link">
                                                        <i className="icon-paper-plane"></i>
                                                    </button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
