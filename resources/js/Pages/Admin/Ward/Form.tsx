import React from 'react'
import { useForm } from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import { Ward } from '@/Pages/Admin/Ward/Index'
import { BackButton } from '@/Components/Button'
import { Button } from 'flowbite-react'
import { HiSave } from 'react-icons/hi'

interface Props {
  ward?: Ward
  district_id: number
}

export default function WardForm({ ward, district_id }: Props) {
  const { data, setData, post, put, errors } = useForm({
    'name': ward?.name ?? '',
    'district_id': district_id
  })

  const title = ward == null ? 'Simpan' : 'Ubah'

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (ward == null) {
      post(route('ward.store'))
    } else {
      put(route('ward.update', ward?.id))
    }
  }
  return (
    <form className="p-6 bg-white shadow-md rounded-md w-full" onSubmit={onSubmit}>
      <BackButton
        route=''
        id={district_id}
        routess={'district.show'}
      />
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
