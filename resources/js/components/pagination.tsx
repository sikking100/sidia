import { PaginationLink } from "@/types";
import { Link } from "@inertiajs/react";
import { GrNext, GrPrevious } from "react-icons/gr";

interface Props {
    pagination: PaginationLink[]
}

const Nav = (props: Props) => (
    <nav>
        <ul className="pagination justify-content-center">

            {
                props.pagination.map((link, i) => {
                    let content;

                    if (link.label === 'pagination.previous' || link.label === '&laquo; Previous') {
                        content = <GrPrevious />; // Bootstrap Icon
                    } else if (link.label === 'pagination.next' || link.label === 'Next &raquo;') {
                        content = <GrNext />;
                    } else {
                        content = link.label; // angka halaman biasa
                    }
                    return (
                        <li
                            key={i}
                            className={`page-item ${link.active ? 'active' : ''} ${!link.url ? 'disabled' : ''}`}
                        >
                            {link?.url ? (
                                <Link
                                    href={link.url}
                                    className="page-link"
                                    preserveState
                                    preserveScroll
                                >{content}</Link>
                            ) : (
                                <span
                                    className="page-link"
                                >{content}</span>
                            )}
                        </li>
                    );
                })
            }

        </ul>
    </nav>
)
export default Nav
