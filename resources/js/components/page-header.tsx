import React from "react";
interface Props {
    role?: string
    HeaderText: string
    Breadcrumb: {
        name: string
        navigate?: string
        id?: number
    }[]
}


interface State {
    toggleMenu: boolean
}

class PageHeader extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            toggleMenu: false,
        };
    }

    onToggleMenu = () => {
        this.setState({
            toggleMenu: !this.state.toggleMenu,
        });
        const { toggleMenu } = this.state;
        if (toggleMenu) {
            document.body.classList.remove("layout-fullwidth");
        } else {
            document.body.classList.add("layout-fullwidth");
        }
    };

    render() {
        const { HeaderText, Breadcrumb, role } = this.props;
        return (
            <div className="block-header">
                <div className="row">
                    <div className="col-sm-12">
                        <h2>
                            <a
                                href="#!"
                                className="btn-toggle-fullwidth"
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.onToggleMenu();
                                }}
                            >
                                <i
                                    className={
                                        !this.state.toggleMenu
                                            ? `fa fa-arrow-left`
                                            : "fa fa-arrow-right"
                                    }
                                ></i>
                            </a>{" "}
                            {HeaderText}
                        </h2>
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href={role != null && role === 'bpjs' ? '#' : route('dashboard')}>
                                    <i className="icon-home"></i>
                                </a>
                            </li>
                            {Breadcrumb.map((item, index) => {
                                return (
                                    <li
                                        key={item.name + index}
                                        className="breadcrumb-item active"
                                    >
                                        <a href={item.navigate ? item.id !== null ? route(item.navigate, item.id) : route(item.navigate) : '#'}>
                                            {item.name}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default PageHeader;
