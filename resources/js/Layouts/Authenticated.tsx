import React from 'react';
import { Link, InertiaLink, usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import route from 'ziggy-js'
import axios from 'axios'


interface Props {
  header: React.ReactNode
}

export default function Authenticated({ children, header }: React.PropsWithChildren<Props>) {
  const [countData, setCountData] = React.useState<number>()
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
    <div className="min-h-screen min-w-screen bg-gray-100">
      <nav className={'bg-white border-b border-gray-100'}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="shrink-0 flex items-center">
                <Link href="/">
                  Dashboard
                </Link>
              </div>
            </div>
            <div className={'flex mx-auto items-center'}>
              <Link
                className={`px-6 ${url === '/application' ? 'active' : ''}`}
                href={route('application.index')}>
                <div className={'inline-flex items-center'}>
                  Pemohon
                  {countData && countData > 0 ? <span className="inline-flex justify-center items-center ml-2 p-2 text-xs font-semibold text-white bg-red-500 rounded-full">
                    {countData}
                  </span> : <div></div>}
                </div>
              </Link>
              <Link
                className={`px-6 ${url === '/district' ? 'active' : ''}`}
                href={route('district.index')}>
                Kecamatan
              </Link>
              <Link
                className={`px-6 ${url.startsWith('/menu') ? 'active' : ''}`}
                href={route('menu.index')}>
                Persyaratan
              </Link>
            </div>
            <div className="flex">
              <div className="shrink-0 flex items-center">
                <InertiaLink
                  method='post'
                  as={'button'}
                  href={route('logout')}
                >
                  Logout
                </InertiaLink>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className='py-6'>{children}</main>
    </div>
  );
}
