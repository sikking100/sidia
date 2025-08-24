import React from "react"
import { GuestNavbar } from "./guest/nav"

interface Props {
    title: string
}

export default function Guest({ children, title = 'Selamat Datang' }: React.PropsWithChildren<Props>) {

    const formattedDate = new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(Date.now())
    return (
        <div id="wrapper">
            <GuestNavbar />
            <div className="min-vh-100" style={{ marginTop: '63px' }}>
                <div className={'container-fluid'}>
                    <img src={'../../assets/banner.webp'} className="img-fluid" />
                </div>
                <div className={'container-fluid d-flex pt-3 justify-content-between'}>
                    <h5>{title}</h5>
                    <h5>{formattedDate}</h5>
                </div>
                {children}
            </div>
        </div >
    )
}
