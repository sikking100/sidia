import React from 'react';
import { Link, InertiaLink, usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import route from 'ziggy-js'
import axios from 'axios'
import { User } from '@/Interface/Interface';
import { Button } from 'flowbite-react';


interface Props {
  header: React.ReactNode
}

export default function Authenticated({ children, header }: React.PropsWithChildren<Props>) {
  const [countData, setCountData] = React.useState<number>()
  const { user } = usePage().props.auth as { user: User }

  React.useEffect(() => {
    updateState()
    return () => {
      setCountData(0)
    }
  }, [])

  const updateState = () => {
    setInterval(() => {
      axios.get(route('count')).then(res => {
        const maps = res.data.count
        setCountData(maps)
      })
    }, 30000)
  }

  function logout() {
    Inertia.post(route('logout'))
  }
  const { url } = usePage()

  return (
    <div className="min-h-screen min-w-screen">
      <nav>
        <div className="max-w-7xl mx-auto pt-4 px-4">
          <div className='w-full flex gap-x-2'>
            <Button
              pill
              href={route('application.index')}
              color={`${url === '/application' ? '' : 'light'}`}
              className={`${url === '/application' ? 'blue-gradient' : ''}`}
              // gradientMonochrome={`${url === '/application' ? 'info' : ''}`}
              type='button'
              size={"sm"}
            >
              Pemohon
            </Button>
            <Button
              pill
              href={route('user.index')}
              color={`${url === '/user' ? '' : 'light'}`}
              className={`${url === '/user' ? 'blue-gradient' : ''}`}
              // gradientMonochrome={`${url === '/user' ? 'info' : ''}`}
              size={"sm"}
            >
              Pengguna
            </Button>
            <Button
              pill
              href={route('district.index')}
              color={`${url === '/district' ? '' : 'light'}`}
              className={`${url === '/district' ? 'blue-gradient' : ''}`}
              // gradientMonochrome={`${url === '/district' ? 'info' : ''}`}
              size={"sm"}
            >
              Kecamatan
            </Button>
            <Button
              pill
              href={route('menu.index')}
              color={`${url === '/menu' ? '' : 'light'}`}
              className={`${url === '/menu' ? 'blue-gradient' : ''}`}
              // gradientMonochrome={`${url === '/menu' ? 'info' : ''}`}
              size={"sm"}
            >
              Persyaratan
            </Button>
            <div
              className='ml-auto'>
              <Button
                pill
                color={"light"}
                size={"sm"}
                as={Link}
                onClick={(e) => Inertia.post(route('logout'))}

              >
                Logout
              </Button>
            </div>
          </div>

        </div>
      </nav >
      <main className='p-6 m-6 bg-white shadow-md rounded-md'>{children}</main>
    </div >
  );
}
