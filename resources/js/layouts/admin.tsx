import AdminNav from "./admin/nav"


export default function Admin({ children }: React.PropsWithChildren) {
    return (
        <div id="wrapper">
            <>
                <AdminNav />
                <div id="main-content">
                    {children}
                </div>
            </>
        </div>
    )
}
