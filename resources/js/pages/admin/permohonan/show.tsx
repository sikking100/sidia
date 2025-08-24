import PageHeader from "@/components/page-header";
import { checkFile, getFileType, getStatus, } from "@/hooks/functions";
import Admin from "@/layouts/admin";
import { Applicant, Filess, FlashProps, Hamlet } from "@/types";
import { PageProps } from "node_modules/@inertiajs/core/types/types";
import React from "react";
import { Button, Col, Form, FormControl, Image, Row, Table } from "react-bootstrap";
import { BiFace, BiFile, BiHome, BiIdCard, BiMap, BiMapAlt, BiPhone, BiPrinter, BiRevision, BiSolidDownload, BiText, BiTime, BiUserCircle } from "react-icons/bi";
import { GiCancel, GiTick } from "react-icons/gi";
import { GoVerified } from "react-icons/go";
import { HiEye } from "react-icons/hi";
import { MdClose, MdOutlineEmail, MdPending, MdVerified } from "react-icons/md";
import TimeAgo from "react-timeago";
import { makeIntlFormatter } from "react-timeago/defaultFormatter";
import { useForm } from "@inertiajs/react";
import useCustomModal from "@/hooks/use-modal";
import CustomModal from "@/components/custom-modal";
import axios from "axios";

interface Props extends PageProps {
    flash: FlashProps
    application: Applicant
    hamlet?: Hamlet

}


interface FileTicket {
    TypeName: string
    FilePath: string
    FileName: string
}

interface FormUpdateStatus {
    status: string
    status_description: string
}

export default function PermohonanDetail({ application, flash }: Props) {
    const [selectedFile, setSelectedFile] = React.useState<Filess | null>(null);

    const [error, setError] = React.useState<string>('');


    const { setData, put } = useForm<FormUpdateStatus>({
        status: '',
        status_description: ''
    })

    function onClick() {
        window.open(route('application.edit', application.id))
    }

    function onTolak() {
        setData('status', 'CANCEL')
        tolakModal.open()
    }

    const onVerified = async () => {
        const check = application.filess.filter(e => e.status != 1)
        if (check.length > 0) {
            setError('Berkas belum diverifikasi, silahkan verifikasi semua berkas terlebih dahulu')
            errorModal.open()
            return
        }
        try {
            await axios.put(route('status', application.id), {
                status: "VERIFIED",
                status_description: "Berkas sudah diverifikasi"
            })
            window.location.reload()
        } catch (error) {
            setError(`${error}`)
            errorModal.open()
        }
        return
    }

    const onVerifiedBerkas = async () => {
        try {
            await axios.put(route('files.update', selectedFile?.id), {
                status: '1',
                status_description: 'Berkas terverifikasi'
            })
            window.location.reload()
        } catch (error) {
            setError(`${error}`)
            errorModal.open()
        }
        return
    }




    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (selectedFile !== null && selectedFile !== undefined) {
            put(route('files.update', selectedFile?.id), {
                onError: (e) => {
                    errorModal.open()
                    setError(e.message)
                }
            })
        } else {
            put(route('status', application.id), {
                onError: (e) => {
                    errorModal.open()
                    setError(e.message)
                }
            })
        }
        return
    }

    function handleClick(name: string) {
        window.open(route('photo', name))
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
    const errorModal = useCustomModal()
    const lihatModal = useCustomModal()
    const revisiModal = useCustomModal()

    React.useEffect(() => {
        if (flash?.message !== undefined && flash?.message !== null && flash?.message !== '') {
            errorModal.open()
        }

    }, [flash?.message, errorModal])



    return (
        <Admin>

            {/* Modal revisi */}
            <CustomModal
                show={revisiModal.isOpen}
                onHide={revisiModal.close}
                title="Revisi Berkas"
                size="lg"
            >
                <form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>
                            Sertakan alasan
                        </Form.Label>

                        <FormControl
                            onChange={(e) => { setData('status_description', e.target.value) }}
                            onClick={() => setData('status', '2')}
                            as={'textarea'}
                            rows={5}
                        />
                    </Form.Group>
                    <div className="d-flex">
                        <Button type="reset" onClick={revisiModal.close} className="btn btn-sm btn-outline-primary mr-2">
                            <GiCancel className="mr-1" />
                            Batal</Button>
                        <Button type="submit" className="btn btn-sm btn-danger">
                            <BiRevision className="mr-1 h-4 w-4" />
                            Revisi
                        </Button>
                    </div>
                </form>
            </CustomModal>

            {/* modal lihat file */}
            <CustomModal
                show={lihatModal.isOpen}
                onHide={lihatModal.close}
                title="Detail Berkas"
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
                            (selectedFile?.status == 0 || selectedFile?.status == 2) &&
                            <Button className={"btn btn-sm btn-outline-warning mr-2"} onClick={revisiModal.open}>
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
                show={errorModal.isOpen}
                onHide={errorModal.close}
                title="Kesalahan"
                size="sm"
                footer={
                    <Button type="reset" onClick={errorModal.close} className="btn btn-sm btn-outline-primary mr-2">
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


            <div className="container-fluid">
                <PageHeader
                    HeaderText={`Permohonan NIK ${application.id_card_number}`}
                    Breadcrumb={[{ name: "Permohonan", navigate: 'application.index' }, { name: "Detail" }]}
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
                                        {application.status === 'COMPLETED' && <MdVerified className='text-success mr-1' size={'30'} />}
                                        {application.status === 'DEFFICIENT' || application.status === 'REVISED' && <MdClose className='mr-1' size={'30'} />}
                                        {application.status === 'PENDING' && <MdPending className='mr-1' size={'30'} color="orange" />}
                                        <div>
                                            <h3 className={`${application.status === 'COMPLETED' ? 'text-success' : application.status === 'CANCEL' ? 'text-success' : 'text-warning'} mt-2`}>
                                                {getStatus(application.status ?? '')}
                                            </h3>
                                        </div>
                                    </div>
                                    <div>
                                        <h5>{application.status_description}</h5>
                                    </div>

                                    <div className='form-row mt-3'>
                                        {(application.status == 'VERIFIED' || application.status == 'COMPLETED') &&
                                            <div className="col-xs-2">
                                                <Button
                                                    onClick={onClick}
                                                    className="btn btn-sm btn-outline-primary"
                                                >
                                                    <BiPrinter className="mr-2 h-4 w-4" />
                                                    Print PDF
                                                </Button>
                                            </div>
                                        }
                                        {(application.status == 'VERIFIED') &&
                                            <div className="col">
                                                <Button
                                                    onClick={async () => {
                                                        try {
                                                            await axios.put(route('status', application.id), {
                                                                status: 'COMPLETED',
                                                                status_description: 'SELESAI'
                                                            })
                                                            window.location.reload()
                                                        } catch (error) {
                                                            setError(`${error}`)
                                                            errorModal.open()
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
                                                    onClick={revisiModal.open}
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
                                                    application.ticket !== null && application.ticket !== '' && application.ticket !== '-' ?
                                                        application.files !== null && application.files !== '' ? (JSON.parse(application.files!) as Array<FileTicket>).map((v, k) => {
                                                            return (
                                                                <tr key={k}>
                                                                    <td>{k + 1}</td>
                                                                    <td>{v.TypeName}</td>
                                                                    <td>{ }</td>
                                                                    <td>
                                                                        <Button
                                                                            className='btn btn-info'
                                                                            onClick={() => handleClick(v.FileName)}
                                                                        >
                                                                            <HiEye className='mr-2' />
                                                                            Lihat
                                                                        </Button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }) : <tr>
                                                            <td colSpan={3} className='text-center'>Berkas tidak lengkap</td>
                                                        </tr> :
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Admin >
    )
}
