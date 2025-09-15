import Guest from '@/layouts/guest';
import { Head, Link } from '@inertiajs/react';
import { Col, Container, Dropdown, Image } from 'react-bootstrap';

export default function Welcome() {

    return (
        <>
            <Head title="Selamat Datang">
            </Head>
            <Guest title='Selamat Datang'>
                <Container fluid className='pt-2'>
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
                                                        <Link href={route('guest.create', 'KTP-Pemula')}>KTP Pemula</Link>
                                                    </li>
                                                    <li>
                                                        <Link href={route('guest.create', 'KTP-Rusak')}>KTP Rusak</Link>
                                                    </li>
                                                    <li>
                                                        <Link href={route('guest.create', 'KTP-Hilang')}>KTP Hilang</Link>
                                                    </li>
                                                    {/* <li>
                                                        <Link href={route('guest.create', 'KTP-Perubahan')}>KTP Perubahan Data</Link>
                                                    </li> */}
                                                    {/* <li>
                                                        <Link href={route('guest.create', 'KTP-Disabilitas')}>Perekamana Disabilitas</Link>
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
                                                        <Link href={route('guest.create', 'KK-Baru')}>KK Baru</Link>
                                                    </li>
                                                    <li>
                                                        <Link href={route('guest.create', 'KK-Rusak')}>KK Rusak</Link>
                                                    </li>
                                                    <li>
                                                        <Link href={route('guest.create', 'KK-Hilang')}>KK Hilang</Link>
                                                    </li>
                                                    {/* <li>
                                                        <Link href={route('guest.create', 'KTP-Perubahan')}>KTP Perubahan Data</Link>
                                                    </li> */}
                                                    {/* <li>
                                                        <Link href={route('guest.create', 'KTP-Disabilitas')}>Perekamana Disabilitas</Link>
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
                                                        <Link href={route('guest.create', 'KIA-Baru')}>KIA Baru</Link>
                                                    </li>
                                                    <li>
                                                        <Link href={route('guest.create', 'KIA-Rusak')}>KIA Rusak</Link>
                                                    </li>
                                                    <li>
                                                        <Link href={route('guest.create', 'KIA-Hilang')}>KIA Hilang</Link>
                                                    </li>
                                                    {/* <li>
                                                        <Link href={route('guest.create', 'KIA-Perubahan-Data')}>KIA Perubahan Data</Link>
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
                                                        <Link href={route('guest.create', 'SKPWNI-Pindah-Keluar')}>Pindah Keluar</Link>
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
                                <Image src='../../assets/10.png' rounded className='img-fluid' />
                                <div>
                                    <div className="header">
                                        <a href={route('guest.create', 'Surat-Keterangan-Pindah-Luar-Negeri')}>
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
                                                        <Link href={route('guest.create', 'Akta-Kelahiran-Baru')}>Akta Lahir Baru</Link>
                                                    </li>
                                                    <li>
                                                        <Link href={route('guest.create', 'Akta-Kelahiran-Rusak')}>Akta Lahir Rusak</Link>
                                                    </li>
                                                    <li>
                                                        <Link href={route('guest.create', 'Akta-Kelahiran-Hilang')}>Akta Lahir Hilang</Link>
                                                    </li>
                                                    <li>
                                                        <Link href={route('guest.create', 'Akta-Kelahiran-Perubahan')}>Akta Lahir Perubahan Data</Link>
                                                    </li>
                                                    <li>
                                                        <Link href={route('guest.create', 'Akta-Kelahiran-Tidak-Tahu')}>Akta Kelahiran Bagi Anak Yang Tidak Diketahui Asal-usulnya/Keberadaan Orang Tuanya</Link>
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
                                        <a href={route('guest.create', 'PERKAWINAN')}>
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
                                        <a href={route('guest.create', 'PERCERAIAN')}>
                                            <h2>Perceraian</h2>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} md={4} lg={4} xl={3} sm={3}>
                            <div className='card'>
                                <Image src='../../assets/12.png' rounded className='img-fluid' />
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
                                                        <Link href={route('guest.create', 'Akta-Pengakuan-Anak')}>Akta Pengakuan Anak</Link>
                                                    </li>
                                                    <li>
                                                        <Link href={route('guest.create', 'Akta-Pengesahan-Anak')}>Akta Pengesahan Anak</Link>
                                                    </li>
                                                    <li>
                                                        <Link href={route('guest.create', 'Surat-Keterangan-Pengangkatan-Anak')}>Surat Keterangan Pengangkatan Anak</Link>
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
                                <Image src='../../assets/13.png' rounded className='img-fluid' />
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
                                                        <Link href={route('guest.create', 'Surat-Keterangan-Pembatalan-Perkawinan')}>Surat Keterangan Pembatalan Perkawinan</Link>
                                                    </li>
                                                    <li>
                                                        <Link href={route('guest.create', 'Surat-Keterangan-Pembatalan-Perceraian')}>Surat Keterangan Pembatalan Perceraian</Link>
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
                                                        <Link href={route('guest.create', 'PENGADUAN')}>Pengaduan Data Kependudukan (NIK)</Link>
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
                                                        <Link href={route('guest.create', 'KEMATIAN')}>Akta Kematian</Link>
                                                    </li>
                                                    <li>
                                                        <Link href={route('guest.create', 'Surat-Keterangan-Lahir-Mati')}>Surat Keterangan Lahir Mati</Link>
                                                    </li>
                                                </Dropdown.Menu>
                                            </Dropdown.Toggle>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </div>
                </Container>
            </Guest >
        </>
    );
}
