import { checkFile, defImage, getFileType, getStatus } from "@/hooks/functions";
import Guest from "@/layouts/guest";
import { Applicant, CustomComment, Filess, FlashProps, User } from "@/types";
import { PageProps } from "@inertiajs/core";
import React, { useState } from "react";
import { Button, Card, Col, Container, Image, Row, Table } from "react-bootstrap";
import { IoIosArrowDropleftCircle } from 'react-icons/io'
import { MdClose, MdOutlineEmail, MdPending, MdVerified, } from "react-icons/md";
import { BiFace, BiFile, BiHome, BiIdCard, BiMap, BiMapAlt, BiPhone, BiRevision, BiSolidDownload, BiText, BiTime, BiUserCircle } from "react-icons/bi";
import { makeIntlFormatter } from 'react-timeago/defaultFormatter'
import TimeAgo from 'react-timeago'
import { HiEye } from "react-icons/hi";
import useCustomModal from "@/hooks/use-modal";
import CustomModal from "@/components/custom-modal";
import { GiCancel } from "react-icons/gi";
import { Link, usePage } from "@inertiajs/react";
import axios from "axios";

interface Props extends PageProps {
    flash: FlashProps
    application: Applicant
}

export default function Detail({ application, flash }: Props) {
    const errorModal = useCustomModal()
    const lihatModal = useCustomModal()
    const [selectedFile, setSelectedFile] = useState<Filess | null>(null);
    const dateCreated = Date.parse(application.created_at ?? '')
    const dateCreate = Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }).format(dateCreated)
    const intlFormatter = makeIntlFormatter({
        locale: "id-ID",
    });

    const [file, setFile] = React.useState<File | null>(null);
    const [comments, setComment] = React.useState<CustomComment[]>([])
    const [content, setContent] = React.useState('')
    const { user } = usePage().props.auth as { user: User }

    const handleView = (file: Filess) => {
        console.log('e');
        setSelectedFile(file);
        lihatModal.open()

    };

    React.useEffect(() => {
        const fetchComment = async () => {
            const response = await axios.get(`/comment/${application.id}`)
            setComment(response.data);
        }
        fetchComment()
        return
    }, [])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            setFile(file)
            setContent(file.name)
        }
    };

    return (

        <Guest title={`Detail Pemohon ${application.id_card_number}`}>

            <CustomModal
                show={errorModal.isOpen}
                onHide={errorModal.close}
                size="sm"
                title="Pemberitahun"
            >
                {flash.message}
            </CustomModal>

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
            <Container className="mt-2" fluid>

                <Card>
                    <Button
                        // as={Link}
                        href={route('check')}
                        className='xs'
                        color={'dark'}
                    >
                        <IoIosArrowDropleftCircle
                            size={35} />
                    </Button>
                    <div className="application">
                        <h3>{application.category}</h3>
                        <div>
                            <Image src={`../../storage/images/${application.images}`} roundedCircle style={{ width: '20vh' }} />
                        </div>
                        <div className="status">
                            {application.status === 'COMPLETED' && <MdVerified className='mr-1' size={'30'} />}
                            {application.status === 'DEFFICIENT' || application.status === 'REVISED' && <MdClose className='mr-1' size={'30'} />}
                            {application.status === 'PENDING' && <MdPending className='mr-1' size={'30'} color="orange" />}
                            <div>
                                <h3 className={`${application.status === 'COMPLETED' ? 'text-danger' : application.status === 'CANCEL' ? 'text-success' : 'text-warning'} mt-2`}>
                                    {getStatus(application.status ?? '')}
                                </h3>
                            </div>
                        </div>
                        <div>
                            <h5>{application.status_description}</h5>
                        </div>
                        {(application.status == 'DEFFICIENT') && <div className='mt-3'>
                            < Button
                                className="btn btn-warning"
                                href={route('guest.create', {
                                    'category': application.category,
                                    'id': application.id
                                })}
                            >
                                <BiRevision className="me-2 h-4 w-4" />
                                Revisi Berkas
                            </Button>
                        </div>}
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
                            <span>Komentar : </span>
                        </div>

                    </div>
                </Card>
            </Container>
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
                                                    <img alt="avatar" src={defImage} />
                                                </Link>
                                                <div className="chat-about">
                                                    <h6 className="m-b-0">Pemohon : {application.name}</h6>
                                                    <small>{getStatus(application.status ?? '')}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="chat-history">
                                        <ul className="m-b-0">
                                            {/* <li className="clearfix">
                                                            <div className="message-data text-right">
                                                                <span className="message-data-time">PEMOHON 10:10 AM, Today</span>
                                                            </div>
                                                            <div className="message other-message float-right">
                                                                {" "}
                                                                Hi Aiden, how are you? How is the project coming along?{" "}
                                                            </div>
                                                        </li>
                                                        <li className="clearfix">
                                                            <div className="message-data">
                                                                <span className="message-data-time">OPERATOR 10:12 AM, Today</span>
                                                            </div>
                                                            <div className="message my-message">
                                                                Are we meeting today?
                                                            </div>
                                                        </li> */}
                                            {comments.map((e, i) => {
                                                const dateCreated = Date.parse(e.created_at ?? '')
                                                const dateCreate = Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }).format(dateCreated)
                                                const intlFormatter = makeIntlFormatter({
                                                    locale: "id-ID", // string
                                                });
                                                return (
                                                    <li className="clearfix" key={i}>
                                                        <div className={`message-data ${e.user_id !== null ? "" : "text-right"}`}>
                                                            <span className="message-data-time">{e.user_id !== null ? 'OPERATOR' : 'PEMOHON'} {dateCreate} <TimeAgo date={e.created_at} formatter={intlFormatter} /></span>
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
                                                            formData.append('id', String(application.id))
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
                                                                    guest_email: application?.email,
                                                                    guest_name: application?.name,
                                                                    created_at: response.data.created_at
                                                                }
                                                            ])
                                                            console.log('Upload sukses:', response.data);
                                                        } catch (error) {
                                                            console.error('Upload gagal:', error);
                                                        }

                                                        setContent('');
                                                        setFile(null);
                                                        (document.getElementById('file-input') as HTMLInputElement).value = '';
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
        </Guest >
    )
}
