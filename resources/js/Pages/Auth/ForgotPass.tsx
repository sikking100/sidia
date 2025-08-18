// Components
import { useForm } from '@inertiajs/inertia-react';
import { Button, HelperText, Label, Spinner, TextInput } from 'flowbite-react';
import React from 'react';
import { FormEventHandler } from 'react';
import route from 'ziggy-js'


export default function ForgotPassword({ status, role }: { status?: string, role: string }) {
    const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault()
        post(route('pass.reset'))
    };

    const bg = role === 'desa' ? "bg-[url('/assets/bgbola.png')]" : "bg-[url('/assets/bglogin.png')]"
    const borders = role === 'desa' ? "border-blue-400" : "border-blue-600"
    return (
        <div className={`min-h-screen content-center ${bg}`}>
            <div className={`${borders} bg-white border-solid border-4 w-fit  md:flex md:flex-row rounded-md mx-auto min-h-fit items-center`}>

                <div className="space-y-6 p-6">
                    Silakan masukkan email untuk menerima link reset password
                    {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}

                    <form onSubmit={submit} className='mt-4'>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="off"
                                value={data.email}
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="email@example.com"
                            />

                            <HelperText>{errors.email}</HelperText>
                        </div>

                        <div className="my-6 flex items-center justify-start">
                            <Button type='submit' className="blue-gradient w-full" disabled={processing}>
                                {processing && <Spinner className="h-4 w-4 animate-spin mr-2 self-center" />}
                                Kirim
                            </Button>
                        </div>
                    </form>

                    <div className="space-x-1 text-center text-sm text-muted-foreground">
                        <span>Atau, Kembali ke</span>
                        <a className='link' href={route('login', { 'role': role })}>log in</a>
                    </div>
                </div>
            </div>

        </div>
    );
}
