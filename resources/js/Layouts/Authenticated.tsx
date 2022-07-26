import React from 'react';
import { Link } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import route from 'ziggy-js'

interface Props {
  header: React.ReactNode
}

export default function Authenticated({ children, header }: React.PropsWithChildren<Props>) {

  function logout() {
    Inertia.post(route('logout'))
  }
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
                className={'px-6'}
                href={route('application.index')}>
                Pemohon
              </Link>
              <Link
                className={'px-6'}
                href={route('district.index')}>
                Kecamatan
              </Link>
            </div>
            <div className="flex">
              <div className="shrink-0 flex items-center">
                <Link
                  as={'button'}
                  onClick={logout}
                  href="#">
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {header && (
        <header >
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
        </header>
      )}
      <main>{children}</main>
    </div>
  );
}
