import React, { useEffect, useState } from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Link, usePage } from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import { Inertia } from '@inertiajs/inertia'
import Alert from '@/Components/Alert'
import { User } from '@/Interface/Interface'
import { Button, Modal } from 'flowbite-react'
import axios from 'axios'


interface Props {
  users?: Array<User>
}

export default function UserIndex(props: Props) {
  const { flash } = usePage().props
  const f = flash as { message: string }
  const [showAlert, setShowAlert] = React.useState(true);
  const [openModal, setOpenModal] = React.useState(false);
  const [newPass, setNewPass] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [index, setIndex] = useState(0)

  useEffect(() => {
  if (newPass) {
    const timer = setTimeout(() => {
      setNewPass('');
      setError('Password telah dihapus dari memori');
    }, 30000); // 30 detik
    
    return () => clearTimeout(timer);
  }
}, [newPass]);

  const handleRegeneratePassword = async (userId: number, index: number) => {
    try {
      setIndex(index)
      setLoading(true)
      const response = await axios.put(route('regen', userId));
      setNewPass(response.data.password)
      setOpenModal(true)
      return;
    } catch (error) {
      setError(`${error}`);
      setOpenModal(true)
    } finally {
      setLoading(false)
    }
  }


  const list: any = []
  props.users?.forEach((e, i) => {
    list.push(
      <tr key={i}>
        <td className={'p-4 border border-slate-700'}><p className={'flex justify-center'}>{i + 1}</p></td>
        <td className={'p-4 border border-slate-700'}>{e.ddesa.name}</td>
        <td className={'p-4 border border-slate-700'}>{e.name}</td>
        <td className={'p-4 border border-slate-700'}>{e.email}</td>
        <td className='p-4 border border-slate-700'>
          <div className="flex flex-row gap-2">
            <Link
              href={route('user.edit', e.id)}
              className={'bg-kemenag hover:bg-kemenag-dark text-white font-bold py-2 px-4 rounded'}>
              Edit
            </Link>
            <Button 
        onClick={() => handleRegeneratePassword(e.id, i)}
        disabled={loading}
        color="warning"
      >
        {loading && index === i ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : 'Regenerate Password'}
      </Button>
          </div>
        </td>
      </tr>
    )
  })
  return (
    <Authenticated
      header={<h2>User</h2>}
    >
      <div className={'mx-6'}>
        <div>
          <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Body>
            <div className="space-y-4">
              <p>{error}</p>
              {newPass && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Password Baru:</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="text"
                      readOnly
                      value={newPass}
                      className="block w-full pr-10 border-gray-300 bg-gray-50 rounded-md"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(newPass);
                        setError('Password telah disalin ke clipboard!');
                      }}
                      className="absolute inset-y-0 right-0 px-3 flex items-center bg-blue-100 hover:bg-blue-200 rounded-r-md"
                    >
                      Salin
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-red-500">
                    Harap catat password ini karena hanya ditampilkan sekali!
                  </p>
                </div>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setOpenModal(false)}>Tutup</Button>
          </Modal.Footer>
        </Modal>
        </div>
        <Alert
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          message={f.message}
        />
        <div className='mb-6'>
          <Link className={'btn bg-green-600 text-white'} href={route('user.create')}>
            Tambah Data
          </Link>
        </div>
        {
          props.users?.length == 0 ? <p>Tidak ada data</p>
            :
            <table
              className={'w-full'}
            >
              <thead>
                <tr>
                  <th className='p-4 border border-slate-600'>No</th>
                  <th className='p-4 border border-slate-600'>Kel/Desa</th>
                  <th className='p-4 border border-slate-600'>Nama</th>
                  <th className='p-4 border border-slate-600'>Email</th>
                  <th className='p-4 border border-slate-600'>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {list}
              </tbody>
            </table>
        }
      </div>
    </Authenticated>
  )
}
