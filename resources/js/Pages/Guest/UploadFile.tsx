import React from 'react'
import { Requirement } from '@/Interface/Interface'
import Guest from '@/Layouts/Guest'
import { Head, usePage, useForm } from '@inertiajs/inertia-react'
import Alert from '@/Components/Alert'
import Container from '@/Components/Container'
import Label from '@/Components/Label'
import Input from '@/Components/Input'
import route from 'ziggy-js'
import Button from '@/Components/Button'

interface Props {
    id: number
    requirements: Array<Requirement>
    category: string
}

export default function UploadFile({ id, requirements, category }: Props) {
    const [showAlert, setShowAlert] = React.useState(true)
    const { flash } = usePage().props
    const f = flash as { message: string }


    const { post, setData, processing, data } = useForm()

    function onSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log(data)
        post(route('upload.action', { 'id': id, 'category': category }))
        return
    }
    return (
        <Guest
            title={category}>
            <Head title={category} />
            <Alert
                message={f.message}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
            />
            <Container>
                <div
                    className={'bg-white rounded mb-6'}
                >
                    <h5 className={'block text-lg font-bold'}>Persyaratan</h5>
                    <div className={'bg-green-200 p-6 rounded mt-4 text-green-800 font-bold'}>
                        {requirements.map((e, i) => <p key={i}>{e.name}</p>)}
                    </div>
                </div>
                <h5 className={'text-lg font-bold'}>
                    Formulir Persyaratan
                </h5>
                <span className={'text-sm font-thin text-gray-500'}>
                    Upload File
                </span>
                <form onSubmit={onSubmit} className={'pt-6 pb-6'}>
                    {requirements.map((v, k) => {
                        console.log(v.name)
                        const n = v.name.split(' ');
                        const name = `${n[0]}_${n[1]}`
                        console.log(name);

                        return <div key={k}>
                            <Label forInput={v.name} className={'w-full'} value={v.name} />
                            <Input
                                className={'files'}
                                type={'file'}
                                handleChange={e => {
                                    const files = e.target.files
                                    if (files != null) {
                                        setData(name, files[0])
                                    }
                                }}
                                name={name}
                            />
                        </div>
                    })}
                    <Button processing={processing}>Simpan</Button>
                </form>
            </Container>
        </Guest>
    )
}
