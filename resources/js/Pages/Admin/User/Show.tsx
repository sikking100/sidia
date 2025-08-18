import { ModalAlert } from "@/Components/Alert"
import { BackButton } from "@/Components/Button"
import { User } from "@/Interface/Interface"
import Authenticated from "@/Layouts/Authenticated"
import { useForm } from "@inertiajs/inertia-react"
import { Button, HelperText, Label, TextInput } from "flowbite-react"
import React from "react"
import { HiSave } from "react-icons/hi"
import route from "ziggy-js"

interface Props {
    user?: User
}

export default function UserShow({ user }: Props) {
    const { data, setData, post, put, errors } = useForm({
        'name': user?.name ?? '',
        'email': user?.email ?? '',
        'password': '',
    })
    const [error, setError] = React.useState('')

    const title = 'Ubah'

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (error !== '') return;
        put(route('user.updates', user?.id))
    }
    return (
        <Authenticated

            header={'User'}>
            <form className="w-full p-6 bg-white shadow-md rounded-md" onSubmit={onSubmit}>
                <div className='flex items-center gap-2'>
                    <BackButton
                        route={'user'}
                    />
                    <p className='header'>{user == null ? 'Tambah data pengguna' : 'Ubah data pengguna'}</p>
                </div>
                <div className='grid grid-rows-3 grid-flow-col gap-6 mt-6'>
                    <div className='row-span-3'>
                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full px-3">
                                <div className="mb-2 block">
                                    <Label
                                        color={errors.name ? 'failure' : ''}
                                    >Nama</Label>
                                </div>
                                <TextInput
                                    color={errors.name ? 'failure' : ''}
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                />
                                {errors.name && <HelperText>{errors.name}</HelperText>}
                            </div>
                            <div className="w-full px-3">
                                <div className="mb-2 block">
                                    <Label
                                        color={errors.name ? 'failure' : ''}
                                    >Email</Label>
                                </div>
                                <TextInput
                                    color={errors.email ? 'failure' : ''}
                                    value={data.email}
                                    type={"email"}
                                    onChange={e => setData('email', e.target.value)}
                                />
                                {errors.email && <HelperText>{errors.email}</HelperText>}
                            </div>
                            <div className="w-full px-3">
                                <div className="mb-2 block">
                                    <Label
                                        color={errors.password ? 'failure' : ''}
                                    >Password</Label>
                                </div>
                                <TextInput
                                    color={errors.password ? 'failure' : ''}
                                    value={data.password}
                                    type="password"
                                    onChange={e => setData('password', e.target.value)}
                                />
                                {errors.password && <HelperText>{errors.password}</HelperText>}
                            </div>
                            <div className="w-full px-3">
                                <div className="mb-2 block">
                                    <Label
                                        color={error ? 'failure' : ''}
                                    >Konfirmasi ulang Password</Label>
                                </div>
                                <TextInput
                                    color={error ? 'failure' : ''}
                                    type="password"
                                    onChange={e => {
                                        if (e.target.value !== data.password) {
                                            setError('Password tidak sama')
                                        } else {
                                            setError('')
                                        }
                                    }}
                                />
                                {error && <HelperText>{error}</HelperText>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:flex md:items-center">
                    <Button
                        type='submit'
                        size='sm'
                        color={'purple'}
                    >
                        <HiSave className={'mr-2'} />
                        {title}
                    </Button>
                </div>
            </form>
        </Authenticated>
    )
}
