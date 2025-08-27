import { useForm } from '@inertiajs/react';
import React, { FormEventHandler } from 'react';


export default function ForgotPassword({ status, role }: { status?: string, role: string }) {
    const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault()
        post(route('pass.reset'))
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
                            backgroundImage: "url('/assets/bgbola.png')",
                            backgroundSize: "93%",
                            backgroundRepeat: "no-repeat",
                            // top: -10,
                            // right: 0,
                            backgroundPosition: "right"
                        } : {
                            backgroundColor: "#052f73",
                            backgroundImage: "url('/assets/bglogin.png')",
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
                                    <p className="lead">Lupa Password</p>
                                </div>
                                <div className="body">
                                    Silakan masukkan email untuk menerima password baru
                                    {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
                                    <form className="form-auth-small ng-untouched ng-pristine ng-valid" onSubmit={submit}>
                                        <div className="form-group">
                                            <input value={data.email} onChange={e => setData('email', e.target.value)} className="form-control" placeholder="email" type="text" />
                                            {errors.email && <div className="invalid-feedback">
                                                {errors.email}
                                            </div>}
                                        </div>
                                        <button disabled={processing} className="btn btn-primary btn-lg btn-block" type="submit">
                                            KIRIM PASSWORD
                                        </button>
                                        <div className="bottom">
                                            <span className="helper-text">Atau kembali ke <a href={route('login', role)} style={{ color: 'blue' }}>Login</a></span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {<p id='text-mobile'> SIDIA DUKCAPIL 2.0</p>}
                    </div>
                </div>
            </div>
        </div >
    )
}
