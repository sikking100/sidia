import { useForm } from '@inertiajs/react';
import React from 'react';
import { FormControl } from 'react-bootstrap';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    role: string
}

export default function Login({ role }: LoginProps) {
    const [error, setError] = React.useState('')
    const { data, setData, processing, errors, post } = useForm({
        email: '',
        password: '',
        token: '',
        role: role,
    })

    // React.useEffect(() => {
    //     return () => {
    //         reset('password');
    //     };
    // })

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('login', { role: role }), {
            onError: e => {
                console.log(e);

                return setError(e.message);
            }
        });
    };


    return (
        <div className="theme-cyan">

            <div className="page-loader-wrapper" style={{ display: 'none' }}>
                <div className="loader">
                    <div className="spinner-border text-secondary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
            <div className="hide-border">
                <div className="vertical-align-wrap">
                    <div className="vertical-align-middle auth-main" style={
                        role == 'desa' ? {
                            backgroundColor: "#0f65ad",
                            backgroundImage: "url('/assets/bgbola.webp')",
                            backgroundSize: "93%",
                            backgroundRepeat: "no-repeat",
                            // top: -10,
                            // right: 0,
                            backgroundPosition: "right"
                        } : {
                            backgroundColor: "#052f73",
                            backgroundImage: "url('/assets/bglogin.webp')",
                            backgroundSize: "93%",
                            backgroundRepeat: "no-repeat",
                            // top: -10,
                            // right: 0,
                            backgroundPosition: "right"
                        }
                    }>
                        <a id='home' href={route('home')}>
                            <i className='icon-home'></i>
                        </a>
                        <div className="auth-box">

                            <div className="card">
                                <div className="header">
                                    <p className="lead">Masuk ke akun Anda</p>
                                </div>
                                <form onSubmit={submit}>
                                    <div className="body">
                                        <div className="form-auth-small">
                                            <div className="form-group">
                                                <label className="control-label sr-only">Email</label>
                                                <FormControl
                                                    className="form-control"
                                                    id="signin-email"
                                                    placeholder="Email"
                                                    type="email"
                                                    value={data.email}
                                                    onChange={val => {
                                                        setData('email', val.target.value)
                                                    }}
                                                    isInvalid={errors.email != null}

                                                />
                                                {errors.email && <div className="invalid-feedback">
                                                    {errors.email}
                                                </div>}
                                            </div>
                                            <div className="form-group mt-2">
                                                <label className="control-label sr-only">
                                                    Password
                                                </label>
                                                <FormControl
                                                    className="form-control"
                                                    id="signin-password"
                                                    placeholder="Password"
                                                    type="password"
                                                    /* value={password} */
                                                    value={data.password}
                                                    onChange={val => {
                                                        setData('password', val.target.value)
                                                    }}
                                                    isInvalid={errors.password != null}
                                                />
                                                {errors.password && <div className="invalid-feedback">
                                                    {errors.password}
                                                </div>}
                                            </div>
                                            <button
                                                type='submit'
                                                className={`btn btn-primary btn-lg btn-block ${processing ? 'btn-disabled' : ''}`}
                                            >
                                                {
                                                    processing ? <><i className="fa fa-spinner fa-spin"></i>{" "}
                                                        <span>Loading...</span>
                                                    </> : 'Login'
                                                }
                                            </button>
                                            <div className="bottom">
                                                <span className="helper-text m-b-10">
                                                    <i className="fa fa-lock"></i>{" "}
                                                    <a href={route('password.request', role)}
                                                    >
                                                        Lupa password?
                                                    </a>
                                                </span>
                                            </div>
                                            {error !== '' && <span>{error}</span>}
                                            {/* <div className="bottom">
                                                <span className="helper-text m-b-10">
                                                    <i className="fa fa-lock"></i>{" "}
                                                    <a href={`forgotpassword`}
                                                    >
                                                        Lupa password?
                                                    </a>
                                                </span>
                                            </div> */}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {<p id='text-mobile'> SIDIA DUKCAPIL 2.0</p>}
                    </div>
                </div>
            </div>
        </div >
    )
}
