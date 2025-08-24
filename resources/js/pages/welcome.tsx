import Guest from '@/layouts/guest';
import { Head, Link } from '@inertiajs/react';
import { Col, Container, Dropdown, Image, Row } from 'react-bootstrap';

export default function Welcome() {

    return (
        <>
            <Head title="Welcome">
            </Head>
            <Guest title='Selamat Datang'>
                <Container fluid className='pt-2'>
                    <Row>
                        <Col xs={12} md={3} lg={3} xl={2} sm={2}>
                            <div className='card'>
                                <Image src='../../assets/2.webp' rounded className='img-fluid' />
                                <Container>
                                    <div className="header">
                                        <Dropdown as="ul" className="header-dropdown">
                                            <Dropdown.Toggle
                                                variant="success"
                                                as="li"
                                                id="dropdown-basic"
                                                className='d-flex align-items-center'
                                            >
                                                <h2 className='pe-2'>KTP - el</h2>
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
                                                    <li>
                                                        <Link href={route('guest.create', 'KTP-Perubahan')}>KTP Perubahan Data</Link>
                                                    </li>
                                                    <li>
                                                        <Link href={route('guest.create', 'KTP-Disabilitas')}>Perekamana Disabilitas</Link>
                                                    </li>
                                                </Dropdown.Menu>
                                            </Dropdown.Toggle>
                                        </Dropdown>
                                    </div>
                                </Container>
                            </div>
                        </Col>
                        <Col xs={12} md={3} lg={3} xl={2} sm={2}>
                            <div className='card'>
                                <Image src='../../assets/1.webp' rounded className='img-fluid' />
                                <Container>
                                    <div className="header">
                                        <Dropdown as="ul" className="header-dropdown">
                                            <Dropdown.Toggle
                                                variant="success"
                                                as="li"
                                                id="dropdown-basic"
                                                className='d-flex align-items-center'
                                            >
                                                <h2 className='pe-2'>Kartu Keluarga</h2>
                                                <Dropdown.Menu
                                                    as="ul"
                                                    className="dropdown-menu dropdown-menu-right"
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
                                                    <li>
                                                        <Link href={route('guest.create', 'KK-Perubahan-Data')}>KK Perubahan Data</Link>
                                                    </li>
                                                </Dropdown.Menu>
                                            </Dropdown.Toggle>

                                        </Dropdown>
                                    </div>
                                </Container>
                            </div>
                        </Col>
                        <Col xs={12} md={3} lg={3} xl={2} sm={2}>
                            <div className='card'>
                                <Image src='../../assets/3.webp' rounded className='img-fluid' />
                                <Container>
                                    <div className="header">
                                        <Dropdown as="ul" className="header-dropdown">
                                            <Dropdown.Toggle
                                                variant="success"
                                                as="li"
                                                id="dropdown-basic"
                                                className='d-flex align-items-center'
                                            >
                                                <h2 className='pe-2'>KIA</h2>
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
                                                    <li>
                                                        <Link href={route('guest.create', 'KIA-Perubahan-Data')}>KIA Perubahan Data</Link>
                                                    </li>
                                                </Dropdown.Menu>
                                            </Dropdown.Toggle>

                                        </Dropdown>
                                    </div>
                                </Container>
                            </div>
                        </Col>
                        <Col xs={12} md={3} lg={3} xl={2} sm={2}>
                            <div className='card'>
                                <Image src='../../assets/8.webp' rounded className='img-fluid' />
                                <Container>
                                    <div className="header">
                                        <Dropdown as="ul" className="header-dropdown">
                                            <Dropdown.Toggle
                                                variant="success"
                                                as="li"
                                                id="dropdown-basic"
                                                className='d-flex align-items-center'
                                            >
                                                <h2 className='pe-2'>SKPWNI</h2>
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
                                </Container>
                            </div>
                        </Col>
                        <Col xs={12} md={3} lg={3} xl={2} sm={2}>
                            <div className='card'>
                                <Image src='../../assets/4.webp' rounded className='img-fluid' />
                                <Container>
                                    <div className="header">
                                        <Dropdown as="ul" className="header-dropdown">
                                            <Dropdown.Toggle
                                                variant="success"
                                                as="li"
                                                id="dropdown-basic"
                                                className='d-flex align-items-center'
                                            >
                                                <h2 className='pe-2'>Kelahiran</h2>
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
                                                </Dropdown.Menu>
                                            </Dropdown.Toggle>

                                        </Dropdown>
                                    </div>
                                </Container>
                            </div>
                        </Col>
                        <Col xs={12} md={3} lg={3} xl={2} sm={2}>
                            <div className='card'>
                                <Image src='../../assets/5.webp' rounded className='img-fluid' />
                                <Container>
                                    <div className="header">
                                        <a href={route('guest.create', 'PERKAWINAN')}>
                                            <h2 className='pe-2'>Perkawinan</h2>
                                        </a>
                                    </div>
                                </Container>
                            </div>
                        </Col>
                        <Col xs={12} md={3} lg={3} xl={2} sm={2}>
                            <div className='card'>
                                <Image src='../../assets/6.webp' rounded className='img-fluid' />
                                <Container>
                                    <div className="header">
                                        <a href={route('guest.create', 'PERCERAIAN')}>
                                            <h2 className='pe-2'>Perceraian</h2>
                                        </a>
                                    </div>
                                </Container>
                            </div>
                        </Col>
                        <Col xs={12} md={3} lg={3} xl={2} sm={2}>
                            <div className='card'>
                                <Image src='../../assets/7.webp' rounded className='img-fluid' />
                                <Container>
                                    <div className="header">
                                        <a href={route('guest.create', 'KEMATIAN')}>
                                            <h2 className='pe-2'>Kematian</h2>
                                        </a>
                                    </div>
                                </Container>
                            </div>
                        </Col>
                        <Col xs={12} md={3} lg={3} xl={2} sm={2}>
                            <div className='card'>
                                <Image src='../../assets/9.webp' rounded className='img-fluid' />
                                <Container>
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
                                </Container>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Guest >
        </>
    );
}
