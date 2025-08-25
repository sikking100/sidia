import { getStatus } from "@/hooks/functions";
import { useIsMobile } from "@/hooks/use-mobile";
import Guest from "@/layouts/guest";
import { Applicant } from "@/types";
import axios from "axios";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

export default function Check() {
    const [applications, setApplications] = useState<Applicant[]>([])
    const [query, setQuery] = useState('')
    const isMobile = useIsMobile()

    const handleButton = async () => {
        const response = await axios.get(route('search', {
            param: {
                q: query
            }
        }))
        if (response.status == 200) {
            setApplications(response.data.applications)
        }
    }

    return (

        <Guest title="Cek Permohonan">
            <Container fluid className="mt-2">
                <Row className="justify-content-center">
                    <Col sm={4} xs={12} className="">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <button className="btn btn-outline-secondary" type="button" onClick={handleButton}>
                                    <i className="icon-magnifier" />
                                </button>
                            </div>
                            <input
                                aria-describedby="basic-addon1"
                                aria-label=""
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                className="form-control"
                                placeholder="Masukkan Nama atau NIK Anda"
                                type="text"
                            />
                        </div>
                    </Col>
                </Row>
                {applications && applications.length != 0 && <Row className="mt-4">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="header">
                                <h2>
                                    Ini adalah hasil pencarian Anda
                                    {/* <small>
                                        Add <code>.table-bordered</code> for borders on all sides of the
                                        table and cells.
                                    </small> */}
                                </h2>
                            </div>
                            <div className="body table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        {
                                            isMobile ? <tr>
                                                <th>#</th>
                                                <th>Tanggal Pengajuan</th>
                                                <th>Status</th>
                                                <th>NIK</th>
                                                <th>Pemohon</th>
                                            </tr> : <tr>
                                                <th>#</th>
                                                <th>Tanggal Pengajuan</th>
                                                <th>Status</th>
                                                <th>Kategori</th>
                                                <th>NIK</th>
                                                <th>Pemohon</th>
                                                <th>Aksi</th>
                                            </tr>
                                        }
                                    </thead>
                                    <tbody>
                                        {
                                            applications !== undefined && applications.length > 0 && applications.map((v, i) => {
                                                const date = new Date(v.created_at ?? '')
                                                const formattedDate = new Intl.DateTimeFormat('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                }).format(date)
                                                return (
                                                    isMobile ?
                                                        <tr key={i}>
                                                            <th scope="row">{i + 1}</th>
                                                            <th>{formattedDate}</th>
                                                            <td>{getStatus(v.status ?? '')}</td>
                                                            <td>{v.id_card_number}</td>
                                                            <td>{v.name}</td>
                                                        </tr>
                                                        : <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{formattedDate}</td>
                                                            <td>{getStatus(v.status ?? '')}</td>
                                                            <td>{v.category}</td>
                                                            <td>{v.id_card_number}</td>
                                                            <td>{v.name}</td>
                                                            <td>
                                                                {v.status !== 'COMPLETED-FILE' && <span></span>}
                                                                <a type="button" className="btn btn-outline-primary btn-sm" href={route('detail', v.id)}>
                                                                    <i className="fa fa-info-circle pe-2"> <span>Detail</span></i>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Row>}
            </Container>
        </Guest >
    )
}
