import React from 'react'
import { District, User } from '@/Interface/Interface'
import { useForm } from '@inertiajs/inertia-react'
import { BackButton } from '@/Components/Button'
import route from 'ziggy-js'
import { Button } from 'flowbite-react'
import { HiSave } from 'react-icons/hi'

interface Props {
  user?: User
}

export default function UserForm({ user }: Props) {
  const { data, setData, post, put, errors } = useForm({
    'name': user?.name ?? '',
    'email': user?.email ?? '',
    'phone': user?.phone ?? '',
  })

  const title = user == null ? 'Simpan' : 'Ubah'

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {

    e.preventDefault()
    if (user == null) {
      post(route('user.store'))
    } else {
      console.log(user?.id);

      put(route('user.update', user?.id))
    }
  }
  return (
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
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Nama
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                type={'text'}
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
              />
              {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
            </div>
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Email
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight"
                type={'email'}
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
              />
              {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
            </div>
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Nomor Telpon
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight"
                type={'phone'}
                value={data.phone}
                onChange={(e) => setData('phone', e.target.value)}
              />
              {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone}</p>}
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
  )
}
