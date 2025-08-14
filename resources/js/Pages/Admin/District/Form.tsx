import React from 'react'
import { District } from '@/Interface/Interface'
import { useForm } from '@inertiajs/inertia-react'
import { BackButton } from '@/Components/Button'
import route from 'ziggy-js'
import { HiSave } from 'react-icons/hi'
import { Button } from 'flowbite-react'

interface Props {
  district?: District
}

export default function DistrictForm({ district }: Props) {
  const { data, setData, post, put, errors } = useForm({
    'name': district?.name ?? ''
  })

  const title = district == null ? 'Simpan' : 'Ubah'

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (district == null) {
      post(route('district.store'))
    } else {
      put(route('district.update', district?.id))
    }
  }
  return (
    <form className="w-full px-6" onSubmit={onSubmit}>
      <BackButton
        route={'district'}
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
