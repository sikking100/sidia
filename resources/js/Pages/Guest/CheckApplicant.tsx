import React, {useState} from 'react'
import {Head} from '@inertiajs/inertia-react'
import Form from '@/Pages/Guest/Form'
import Guest from '@/Layouts/Guest'
import Input from '@/Components/Input'
import Label from '@/Components/Label'
import axios from 'axios'
import {Applicant} from '@/Interface/Interface'
import Button from '@/Components/Button'
import { useForm } from '@inertiajs/inertia-react'


interface Props {
    applicant: Applicant
}

interface FormProps {
    nik: string
}
export default function CheckApplicant() {
    const [applicant, setStateApplicant] = useState<Applicant>()
    const { data, setData, progress } = useForm<FormProps>(
        {
            nik: ''
        }
    )
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setData('nik', e.target.value)
        return
    }

    function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        console.log(data.nik)
        axios.get(`/applicant/${data.nik}`).then(res => {
            if (res.data != null) {
                const da = res.data as Applicant
                console.log(da)

                setStateApplicant(da)
            }

            return
        }).catch(e => console.log(e))
        return
    }
    const process = progress && progress.percentage > 0 || false

    return (
        <Guest
            title='Cek Permohonan'>
            <Head title={'Cek Permohonan'} />
            <form onSubmit={onSubmit}>
                <Label forInput={'name'} value={'Nama pemohon'} className={'pt-6 pb-2'} />
                <Input
                    name={'nik'}
                    handleChange={handleChange}
                    className={'w-full'}
                />
                <Button className={'mt-6'} processing={process}>Cari</Button>
            </form>
            {applicant && <div className={'mt-6'}>
                <span>{applicant.name}</span>
            </div>}
        </Guest>
    )
}
