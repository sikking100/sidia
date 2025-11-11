import PageHeader from "@/components/page-header";
import Admin from "@/layouts/admin";
import { Link } from "@inertiajs/react";
import { Col, Dropdown, Image } from "react-bootstrap";

export default function DesaApplicationBuat() {
    return (
        <Admin>
            <div className="container-fluid">
                <PageHeader
                    HeaderText="Ajukan Permohonan"
                    Breadcrumb={[{ name: "Ajukan Permohonan" }]}
                />
                <div className="row clearfix">
                    <div className="col-md-12 col-lg-12">
                        <div className="card">
                            <div className="header">
                                <h2>Pilih Formulir</h2>
                            </div>
                            <div className="body">
                                <div className='form-row'>
                                    <Col xs={12} md={4} lg={4} xl={3} sm={3}>
                                        <div className='card'>
                                            <Image src='../../assets/2.webp' rounded className='img-fluid' />
                                            <div className=''>
                                                <div className="header">
                                                    <Dropdown as="ul" className="header-dropdown">
                                                        <Dropdown.Toggle
                                                            variant="success"
                                                            as="li"
                                                            id="dropdown-basic"
                                                            className='d-flex align-items-center'
                                                        >
                                                            <h2>KTP - el</h2>
                                                            <Dropdown.Menu
                                                                as="ul"
                                                                className="dropdown-menu"
                                                            >
                                                                <li>
                                                                    <Link href={route('desa.create', 'KTP-Pemula')}>KTP Pemula</Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={route('desa.create', 'KTP-Rusak')}>KTP Rusak</Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={route('desa.create', 'KTP-Hilang')}>KTP Hilang</Link>
                                                                </li>
                                                                {/* <li>
                                                        <Link href={route('desa.create', 'KTP-Perubahan')}>KTP Perubahan Data</Link>
                                                    </li> */}
                                                                {/* <li>
                                                        <Link href={route('desa.create', 'KTP-Disabilitas')}>Perekamana Disabilitas</Link>
                                                    </li> */}
                                                            </Dropdown.Menu>
                                                        </Dropdown.Toggle>
                                                    </Dropdown>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={4} lg={4} xl={3} sm={3}>
                                        <div className='card'>
                                            <Image src='../../assets/1.webp' rounded className='img-fluid' />
                                            <div className=''>
                                                <div className="header">
                                                    <Dropdown as="ul" className="header-dropdown">
                                                        <Dropdown.Toggle
                                                            variant="success"
                                                            as="li"
                                                            id="dropdown-basic"
                                                            className='d-flex align-items-center'
                                                        >
                                                            <h2>Kartu Keluarga</h2>
                                                            <Dropdown.Menu
                                                                as="ul"
                                                                className="dropdown-menu"
                                                            >
                                                                <li>
                                                                    <Link href={route('desa.create', 'KK-Baru')}>KK Baru</Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={route('desa.create', 'KK-Rusak')}>KK Rusak</Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={route('desa.create', 'KK-Hilang')}>KK Hilang</Link>
                                                                </li>
                                                                {/* <li>
                                                        <Link href={route('desa.create', 'KTP-Perubahan')}>KTP Perubahan Data</Link>
                                                    </li> */}
                                                                {/* <li>
                                                        <Link href={route('desa.create', 'KTP-Disabilitas')}>Perekamana Disabilitas</Link>
                                                    </li> */}
                                                            </Dropdown.Menu>
                                                        </Dropdown.Toggle>
                                                    </Dropdown>
                                                </div>
                                            </div>

                                        </div>
                                    </Col>
                                    <Col xs={12} md={4} lg={4} xl={3} sm={3}>
                                        <div className='card'>
                                            <Image src='../../assets/3.webp' rounded className='img-fluid' />
                                            <div>
                                                <div className="header">
                                                    <Dropdown as="ul" className="header-dropdown">
                                                        <Dropdown.Toggle
                                                            variant="success"
                                                            as="li"
                                                            id="dropdown-basic"
                                                            className='d-flex align-items-center'
                                                        >
                                                            <h2>KIA</h2>
                                                            <Dropdown.Menu
                                                                as="ul"
                                                                className="dropdown-menu dropdown-menu-botto"
                                                            >
                                                                <li>
                                                                    <Link href={route('desa.create', 'KIA-Baru')}>KIA Baru</Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={route('desa.create', 'KIA-Rusak')}>KIA Rusak</Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={route('desa.create', 'KIA-Hilang')}>KIA Hilang</Link>
                                                                </li>
                                                                {/* <li>
                                                        <Link href={route('desa.create', 'KIA-Perubahan-Data')}>KIA Perubahan Data</Link>
                                                    </li> */}
                                                            </Dropdown.Menu>
                                                        </Dropdown.Toggle>

                                                    </Dropdown>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={4} lg={4} xl={3} sm={3}>
                                        <div className='card'>
                                            <Image src='../../assets/8.webp' rounded className='img-fluid' />
                                            <div>
                                                <div className="header">
                                                    <Dropdown as="ul" className="header-dropdown">
                                                        <Dropdown.Toggle
                                                            variant="success"
                                                            as="li"
                                                            id="dropdown-basic"
                                                            className='d-flex align-items-center'
                                                        >
                                                            <h2>SKPWNI</h2>
                                                            <Dropdown.Menu
                                                                as="ul"
                                                                className="dropdown-menu dropdown-menu-right"
                                                            >
                                                                <li>
                                                                    <Link href={route('desa.create', 'SKPWNI-Pindah-Keluar')}>Pindah Keluar</Link>
                                                                </li>

                                                            </Dropdown.Menu>
                                                        </Dropdown.Toggle>

                                                    </Dropdown>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={4} lg={4} xl={3} sm={3}>
                                        <div className='card'>
                                            <Image src='../../assets/10.webp' rounded className='img-fluid' />
                                            <div>
                                                <div className="header">
                                                    <a href={route('desa.create', 'Surat-Keterangan-Pindah-Luar-Negeri')}>
                                                        <h2>Surat Keterangan Pindah Luar Negeri</h2>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={4} lg={4} xl={3} sm={3}>
                                        <div className='card'>
                                            <Image src='../../assets/4.webp' rounded className='img-fluid' />
                                            <div>
                                                <div className="header">
                                                    <Dropdown as="ul" className="header-dropdown">
                                                        <Dropdown.Toggle
                                                            variant="success"
                                                            as="li"
                                                            id="dropdown-basic"
                                                            className='d-flex align-items-center'
                                                        >
                                                            <h2>Kelahiran</h2>
                                                            <Dropdown.Menu
                                                                as="ul"
                                                                className="dropdown-menu dropdown-menu-right"
                                                            >
                                                                <li>
                                                                    <Link href={route('desa.create', 'Akta-Kelahiran-Baru')}>Akta Lahir Baru</Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={route('desa.create', 'Akta-Kelahiran-Rusak')}>Akta Lahir Rusak</Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={route('desa.create', 'Akta-Kelahiran-Hilang')}>Akta Lahir Hilang</Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={route('desa.create', 'Akta-Kelahiran-Perubahan')}>Akta Lahir Perubahan Data</Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={route('desa.create', 'Akta-Kelahiran-Tidak-Tahu')}>Akta Kelahiran Bagi Anak Yang Tidak Diketahui Asal-usulnya/Keberadaan Orang Tuanya</Link>
                                                                </li>
                                                            </Dropdown.Menu>
                                                        </Dropdown.Toggle>
                                                    </Dropdown>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>

                                    <Col xs={12} md={4} lg={4} xl={3} sm={3}>
                                        <div className='card'>
                                            <Image src='../../assets/5.webp' rounded className='img-fluid' />
                                            <div>
                                                <div className="header">
                                                    <a href={route('desa.create', 'PERKAWINAN')}>
                                                        <h2>Perkawinan</h2>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={4} lg={4} xl={3} sm={3}>
                                        <div className='card'>
                                            <Image src='../../assets/6.webp' rounded className='img-fluid' />
                                            <div>
                                                <div className="header">
                                                    <a href={route('desa.create', 'PERCERAIAN')}>
                                                        <h2>Perceraian</h2>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={4} lg={4} xl={3} sm={3}>
                                        <div className='card'>
                                            <Image src='../../assets/12.webp' rounded className='img-fluid' />
                                            <div>
                                                <div className="header">
                                                    <Dropdown as="ul" className="header-dropdown">
                                                        <Dropdown.Toggle
                                                            variant="success"
                                                            as="li"
                                                            id="dropdown-basic"
                                                            className='d-flex align-items-center'
                                                        >
                                                            <h2 className='text-wrap'>Akta Pengakuan, Pengesahan & Pengangkatan Anak</h2>
                                                            <Dropdown.Menu
                                                                as="ul"
                                                                className="dropdown-menu dropdown-menu-right"
                                                            >
                                                                <li>
                                                                    <Link href={route('desa.create', 'Akta-Pengakuan-Anak')}>Akta Pengakuan Anak</Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={route('desa.create', 'Akta-Pengesahan-Anak')}>Akta Pengesahan Anak</Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={route('desa.create', 'Surat-Keterangan-Pengangkatan-Anak')}>Surat Keterangan Pengangkatan Anak</Link>
                                                                </li>
                                                            </Dropdown.Menu>
                                                        </Dropdown.Toggle>
                                                    </Dropdown>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={4} lg={4} xl={3} sm={3}>
                                        <div className='card'>
                                            <Image src='../../assets/13.webp' rounded className='img-fluid' />
                                            <div>
                                                <div className="header">
                                                    <Dropdown as="ul" className="header-dropdown">
                                                        <Dropdown.Toggle
                                                            variant="success"
                                                            as="li"
                                                            id="dropdown-basic"
                                                            className='d-flex align-items-center overflow-clip'
                                                        >
                                                            <h2 className='text-wrap'>Surat Keterangan Pembatalan Perkawinan / Perceraian</h2>
                                                            <Dropdown.Menu
                                                                as="ul"
                                                                className="dropdown-menu dropdown-menu-right"
                                                            >
                                                                <li>
                                                                    <Link href={route('desa.create', 'Surat-Keterangan-Pembatalan-Perkawinan')}>Surat Keterangan Pembatalan Perkawinan</Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={route('desa.create', 'Surat-Keterangan-Pembatalan-Perceraian')}>Surat Keterangan Pembatalan Perceraian</Link>
                                                                </li>
                                                            </Dropdown.Menu>
                                                        </Dropdown.Toggle>
                                                    </Dropdown>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>

                                    <Col xs={12} md={4} lg={4} xl={3} sm={3}>
                                        <div className='card'>
                                            <Image src='../../assets/9.webp' rounded className='img-fluid' />
                                            <div>
                                                <div className="header">
                                                    <Dropdown as="ul" className="header-dropdown">
                                                        <Dropdown.Toggle
                                                            variant="success"
                                                            as="li"
                                                            id="dropdown-basic"
                                                            className='d-flex align-items-center'
                                                        >
                                                            <h2 className='text-wrap'>Data NIK bermasalah (BPJS, BANK, NPWP DLL)</h2>
                                                            <Dropdown.Menu
                                                                as="ul"
                                                                className="dropdown-menu dropdown-menu-right"
                                                            >
                                                                <li>
                                                                    <Link href={route('desa.create', 'PENGADUAN')}>Pengaduan Data Kependudukan (NIK)</Link>
                                                                </li>
                                                            </Dropdown.Menu>
                                                        </Dropdown.Toggle>

                                                    </Dropdown>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={4} lg={4} xl={3} sm={3}>
                                        <div className='card'>
                                            <Image src='../../assets/7.webp' rounded className='img-fluid' />
                                            <div>
                                                <div className="header">
                                                    <Dropdown as="ul" className="header-dropdown">
                                                        <Dropdown.Toggle
                                                            variant="success"
                                                            as="li"
                                                            id="dropdown-basic"
                                                            className='d-flex align-items-center'
                                                        >
                                                            <h2>Kematian</h2>
                                                            <Dropdown.Menu
                                                                as="ul"
                                                                className="dropdown-menu dropdown-menu-right"
                                                            >
                                                                <li>
                                                                    <Link href={route('desa.create', 'KEMATIAN')}>Akta Kematian</Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={route('desa.create', 'Surat-Keterangan-Lahir-Mati')}>Surat Keterangan Lahir Mati</Link>
                                                                </li>
                                                            </Dropdown.Menu>
                                                        </Dropdown.Toggle>
                                                    </Dropdown>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={4} lg={4} xl={3} sm={3}>
                                        <div className='card'>
                                            <Image src='../../assets/14.webp' rounded className='img-fluid' />
                                            <div>
                                                <div className="header">
                                                    <a href={route('desa.create', 'Klaim-JKM')}>
                                                        <h2>Klaim JKM</h2>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Admin>
    )
}
