import { defImage } from "@/hooks/functions";
import React, { useEffect, useState } from "react";
import { Dropdown, Nav } from "react-bootstrap";
import { Link, usePage } from "@inertiajs/react";
import { User } from "@/types";
import LOGO from "../../../assets/images/logoduk.png"


export default function AdminNav() {
    const [menu, setMenu] = useState(true)
    const [themeColor, setThemeColor] = useState('theme-cyan')
    const [black, setBlack] = useState(false)
    const { url } = usePage()
    const { user } = usePage().props.auth as { user: User }

    useEffect(() => {
        setBlack(document.body.classList.contains("full-dark"))
    }, [black])

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
                        <a href={route('dashboard')}>
                            <img
                                src={LOGO}
                                alt="LOGO"
                                className="img-responsive logo mr-2"
                                style={{ height: 35, width: 25 }}
                            />
                        </a>
                        <span>SI-DiA 2.0</span>

                    </div>
                    <div id="navbar-menu">
                        <ul className="nav navbar-nav">
                            <li>
                                <Link href={route('logout')} method="post" className="icon-menu text-link">
                                    <i className="icon-power"></i>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div id="left-sidebar" className="sidebar" style={{ zIndex: 9 }}>
                <div className="sidebar-scroll">
                    <div className="user-account">
                        <img
                            src={defImage}
                            className="rounded-circle user-photo"
                            alt="User Profile"
                        />
                        <Dropdown>
                            <span>Welcome,</span>
                            <Dropdown.Toggle
                                variant="none"
                                as="a"
                                // onClick={e => e.preventDefault()}
                                id="dropdown-basic"
                                className="user-name"
                            >
                                <strong>{user.name}</strong>
                            </Dropdown.Toggle>
                            <Dropdown.Menu
                                as="ul"
                                className="dropdown-menu-right account">
                                <li><Link className="text-link" href={route('logout')} method="post"><i className="icon-power"></i> Logout</Link></li>
                                {user.role !== 'superadmin' && <li><Link className="text-link" href={route('user.show', user.id)} method="get"><i className="icon-user"></i> Profil</Link></li>}
                            </Dropdown.Menu>
                        </Dropdown>
                        <hr />

                    </div>
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a
                                href="#"
                                className={menu ? "nav-link active" : "nav-link"}
                                data-toggle="tab"
                                onClick={() => {
                                    setMenu(true)
                                }}
                            >
                                Menu
                            </a>
                        </li>

                        <li className="nav-item">
                            <a
                                href="#"
                                className={!menu ? "nav-link active" : "nav-link"}
                                data-toggle="tab"
                                onClick={() => {
                                    setMenu(false)

                                }}
                            >
                                <i className="icon-settings"></i>
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content p-l-0 p-r-0">
                        <div
                            className={menu ? "tab-pane active show" : "tab-pane"}
                            id="menu"
                        >
                            <Nav id="left-sidebar-nav" className="sidebar-nav">
                                <ul id="main-menu" className="metismenu">
                                    <li className={url.toLowerCase().includes('/dashboard') ? 'active' : ''} id="dashboradContainer">
                                        <a
                                            href={route('dashboard')}

                                        >
                                            <i className="icon-home"></i> <span>Dashboard</span>
                                        </a>
                                    </li>
                                    {
                                        user.role === 'desa' ? <MenuDesa url={url} /> : <MenuAdmin url={url} />
                                    }
                                </ul>

                            </Nav>
                        </div>
                        <div
                            className={
                                !menu
                                    ? "tab-pane p-l-15 p-r-15 show active"
                                    : "tab-pane p-l-15 p-r-15"
                            }
                            id="setting"
                        >
                            <h6>Choose Mode</h6>
                            <ul className="choose-skin list-unstyled">
                                <li
                                    data-theme="white"
                                    className={
                                        black
                                            ? ""
                                            : "active"
                                    }
                                    onClick={() => {
                                        document.body.classList.remove("full-dark");
                                        setBlack(false)
                                    }}
                                >
                                    <div className="white"></div>
                                    <span>Light</span>
                                </li>
                                <li
                                    data-theme="black"
                                    className={
                                        black
                                            ? "active"
                                            : ""
                                    }
                                    onClick={() => {
                                        document.body.classList.add("full-dark");
                                        setBlack(true)

                                    }}
                                >
                                    <div className="black"></div>
                                    <span>Dark</span>
                                </li>
                            </ul>
                            <hr />
                            <h6>Choose Skin</h6>
                            <ul className="choose-skin list-unstyled">
                                <li
                                    data-theme="purple"
                                    className={themeColor === "theme-purple" ? "active" : ""}
                                >
                                    <div
                                        className="purple"
                                        onClick={() => {
                                            if (themeColor !== "theme-purple") {
                                                document.body.classList.remove(themeColor);
                                            }
                                            setThemeColor("theme-purple");
                                        }}
                                    ></div>
                                    <span>Purple</span>
                                </li>
                                <li
                                    data-theme="blue"
                                    className={themeColor === "theme-blue" ? "active" : ""}
                                >
                                    <div
                                        className="blue"
                                        onClick={() => {
                                            if (themeColor !== "theme-blue") {
                                                document.body.classList.remove(themeColor);
                                            }
                                            setThemeColor("theme-blue");
                                        }}
                                    ></div>
                                    <span>Blue</span>
                                </li>
                                <li
                                    data-theme="cyan"
                                    className={themeColor === "theme-cyan" ? "active" : ""}
                                >
                                    <div
                                        className="cyan"
                                        onClick={() => {
                                            if (themeColor !== "theme-cyan") {
                                                document.body.classList.remove(themeColor);
                                            }
                                            setThemeColor("theme-cyan");
                                        }}
                                    ></div>
                                    <span>Cyan</span>
                                </li>
                                <li
                                    data-theme="green"
                                    className={themeColor === "theme-green" ? "active" : ""}
                                >
                                    <div
                                        className="green"
                                        onClick={() => {
                                            if (themeColor !== "theme-green") {
                                                document.body.classList.remove(themeColor);
                                            }
                                            setThemeColor("theme-green");
                                        }}
                                    ></div>
                                    <span>Green</span>
                                </li>
                                <li
                                    data-theme="orange"
                                    className={themeColor === "theme-orange" ? "active" : ""}
                                >
                                    <div
                                        className="orange"
                                        onClick={() => {
                                            if (themeColor !== "theme-orange") {
                                                document.body.classList.remove(themeColor);
                                            }
                                            setThemeColor("theme-orange");
                                        }}
                                    ></div>
                                    <span>Orange</span>
                                </li>
                                <li
                                    data-theme="blush"
                                    className={themeColor === "theme-blush" ? "active" : ""}
                                >
                                    <div
                                        className="blush"
                                        onClick={() => {
                                            if (themeColor !== "theme-blush") {
                                                document.body.classList.remove(themeColor);
                                            }
                                            setThemeColor("theme-blush");
                                        }}
                                    ></div>
                                    <span>Blush</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}


const MenuDesa = ({ url }: { url: string }) => {
    return (
        <>
            <li className={url.toLowerCase().includes('/buat') ? 'active' : ''} id="dashboradContainer">
                <a
                    href={route('buat')}
                >
                    <i className="icon-user-follow"></i> <span>Buat Permohonan</span>
                </a>
            </li>
            <li className={url.toLowerCase().includes('/desa') ? 'active' : ''} id="dashboradContainer">
                <a
                    href={route('desa.index')}
                >
                    <i className="icon-notebook"></i> <span>Daftar Permohonan</span>
                </a>
            </li>
            <li className={url.toLowerCase().includes('/hamlet') ? 'active' : ''} id="dashboradContainer">
                <a
                    href={route('hamlet.index')}
                >
                    <i className="icon-map"></i> <span>Dusun</span>
                </a>
            </li>
        </>
    )
}

const MenuAdmin = ({ url }: { url: string }) => {
    return (
        <>
            <li className={url.toLowerCase().includes('/application') ? 'active' : ''} id="dashboradContainer">
                <a
                    href={route('application.index')}
                >
                    <i className="icon-docs"></i> <span>Daftar Permohonan</span>
                </a>
            </li>
            <li className={url.toLowerCase().includes('/user') ? 'active' : ''} id="dashboradContainer">
                <a
                    href={route('user.index')}

                >
                    <i className="icon-users"></i> <span>Pengguna</span>
                </a>
            </li>
            <li className={url.toLowerCase().includes('/district') ? 'active' : ''} id="dashboradContainer">
                <a
                    href={route('district.index')}

                >
                    <i className="icon-map"></i> <span>Kecamatan</span>
                </a>
            </li>
            <li className={url.toLowerCase().includes('/menu') ? 'active' : ''} id="dashboradContainer">
                <a
                    href={route('menu.index')}
                >
                    <i className="icon-list"></i> <span>Persyaratan</span>
                </a>
            </li>
        </>
    )
}
