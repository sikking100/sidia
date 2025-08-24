import { checkFile, getFileType, getStatus, getStatusBerkas } from "@/hooks/functions";
import Guest from "@/layouts/guest";
import { Applicant, Filess, FlashProps } from "@/types";
import { PageProps } from "@inertiajs/core";
import { useState } from "react";
import { Button, Card, Col, Container, Image, Row, Table } from "react-bootstrap";
import { IoIosArrowDropleftCircle } from 'react-icons/io'
import { MdClose, MdOutlineEmail, MdPending, MdVerified, } from "react-icons/md";
import { BiFace, BiFile, BiHome, BiIdCard, BiMap, BiMapAlt, BiPhone, BiRevision, BiText, BiTime, BiUserCircle } from "react-icons/bi";
import { makeIntlFormatter } from 'react-timeago/defaultFormatter'
import TimeAgo from 'react-timeago'
import { HiEye } from "react-icons/hi";
import UIModalComponent, { UIModalError, UIModalTitle } from "@/components/modal";

interface Props extends PageProps {
    flash: FlashProps
    application: Applicant
}

export default function Detail({ application, flash }: Props) {
    const [showAlert, setShowAlert] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedFile, setSelectedFile] = useState<Filess | null>(null);
    const dateCreated = Date.parse(application.created_at ?? '')
    const dateCreate = Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }).format(dateCreated)
    const intlFormatter = makeIntlFormatter({
        locale: "id-ID",
    });

    const handleView = (file: Filess) => {
        console.log('e');
        setSelectedFile(file);
        setIsModalOpen(true);

    };

    return (

        <Guest title={`Detail Pemohon ${application.id_card_number}`}>
            {
                showAlert && <UIModalError
                    size="sm"
                    title={<UIModalTitle title="Oops" />}
                    body={flash.message}
                    show={showAlert}
                    onClose={() => setShowAlert(false)}
                />
            }
            {isModalOpen &&
                <UIModalComponent
                    size="xl"
                    show={isModalOpen}
                    title={`Pratinjau File ${getStatusBerkas(selectedFile?.status ?? 0)}`}
                    body=<>
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
                                className="max-w-full max-h-[600px] mx-auto"
                            />
                        )}
                        {
                            selectedFile?.comment !== '' && <p>{selectedFile?.comment}</p>
                        }</>

                    onClose={() => setIsModalOpen(false)}
                    onSave={route('file.download', { place: selectedFile?.place })}
                />
            }
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
                    </div>
                </Card>
            </Container>
        </Guest >
    )
}
