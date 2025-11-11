import { Nav } from "react-bootstrap";
// const isDark = document.body.classList.contains("full-dark")
export function GuestNavbar() {
    const checkPermohonan = route('check')
    const sidia = route('home')
    const admin = route('login', 'superadmin')
    const desa = route('login', 'desa')
    return (
        <div>
            <nav className="navbar navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-btn">
                        <button
                            className="btn-toggle-offcanvas"
                            onClick={() => {
                                const toggle = !document.body.classList.contains('offcanvas-active')
                                if (toggle) {
                                    document.body.classList.add("offcanvas-active");
                                } else {
                                    document.body.classList.remove("offcanvas-active");
                                }
                            }}
                        >
                            <i className="lnr lnr-menu fa fa-bars"></i>
                        </button>
                    </div>

                    <div className="navbar-brand">
                        <a href={sidia} className="d-flex">
                            <img
                                src="../../assets/logo.webp"
                                alt="Logo Dukcapil"
                                style={{ height: 25, width: 25 }}
                                className="img-responsive logo pr-2"
                            />
                            <div className="align-self-center">SI-DiA 2.0</div>
                        </a>
                    </div>

                    <div className="navbar-right">
                        <div id="navbar-menu">
                            <ul className="nav navbar-nav metismenu">
                                <li>
                                    <a
                                        href="https://dukcapil.morowaliutarakab.go.id"
                                        className="icon-menu d-none d-lg-flex d-sm-flex d-md-none"
                                    >
                                        <i className="icon-home"></i> <div>DUKCAPIL</div>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={sidia}
                                        className="icon-menu d-none d-lg-flex d-sm-flex d-md-none"
                                    >
                                        <i className="icon-pencil"></i> <span>SIDIA</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={checkPermohonan}
                                        className="icon-menu d-none d-lg-flex d-sm-flex d-md-none"
                                    >
                                        <i className="icon-magnifier"></i> <span>PERMOHONAN</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={admin}
                                        className="icon-menu d-none d-lg-flex d-sm-flex d-md-none"
                                    >
                                        <i className="icon-user"></i> <span>ADMIN</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={desa}
                                        className="icon-menu d-none d-lg-flex d-sm-flex d-md-none"
                                    >
                                        <i className="icon-folder"></i> <span>JEMPUT BOLA</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <div id="left-sidebar-guest" className="sidebar" style={{ zIndex: 9 }}>
                <div className="sidebar-scroll">
                    {/* <div className="user-account">
                        <img
                            src={UserImage}
                            className="rounded-circle user-photo"
                            alt="User Profile"
                        />
                        <Dropdown>
                            <span>Welcome,</span>
                            <Dropdown.Toggle
                                variant="none"
                                as="a"
                                id="dropdown-basic"
                                className="user-name"
                            >
                                <strong>Alizee Thomas</strong>
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="dropdown-menu-right account">
                                <Dropdown.Item href="profilev2page">
                                    <i className="icon-user"></i>My Profile
                                </Dropdown.Item>
                                <li className="divider"></li>
                                <Dropdown.Item href="login">
                                    {" "}
                                    <i className="icon-power"></i>Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div> */}
                    <div className="tab-content p-l-0 p-r-0">
                        <Nav id="left-sidebar-nav" className="sidebar-nav">
                            <ul id="main-menu" className="metismenu">
                                <li className="" id="dashboradContainer">
                                    <a
                                        href="#!"
                                        className=""
                                        onClick={(e) => {
                                            e.preventDefault();
                                            // this.activeMenutabContainer("dashboradContainer");
                                        }}
                                    >
                                        <i className="icon-home"></i> <span>DUKCAPIL</span>
                                    </a>
                                </li>
                                <li id="AppContainer" className="">
                                    <a
                                        href={sidia}
                                        className=""
                                    >
                                        <i className="icon-pencil"></i> <span>SIDIA</span>
                                    </a>

                                </li>
                                <li id="AppContainer" className="">
                                    <a
                                        href={checkPermohonan}
                                        className=""

                                    >
                                        <i className="icon-magnifier"></i> <span>PERMOHONAN</span>
                                    </a>

                                </li>
                                <li id="AppContainer" className="">
                                    <a
                                        href={admin}
                                        className=""
                                    >
                                        <i className="icon-user"></i> <span>ADMIN</span>
                                    </a>

                                </li>
                                <li id="AppContainer" className="">
                                    <a
                                        href={desa}
                                        className=""

                                    >
                                        <i className="icon-folder"></i> <span>JEMPUT BOLA</span>
                                    </a>

                                </li>
                            </ul>
                        </Nav>
                    </div>
                </div>
            </div>
        </div>
    )
}
