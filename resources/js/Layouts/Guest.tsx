import React from 'react';
import { Link } from '@inertiajs/inertia-react'
import moment from 'moment'
import route from 'ziggy-js'

interface Props {
  title?: string
}

export default function Guest({ children, title = 'Selamat Datang' }: React.PropsWithChildren<Props>) {
  return (
    <div className="items-top min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0 py-6 px-10">
      <div
        className={'w-full flex justify-between py-6 items-center'}
      ><Link
        href={'/'}
      >
          <div className={'flex items-center'}>

            <img src={'../../assets/logo.png'} className={'h-10'} />
            <p className={'pl-2'}>Sidia</p>
          </div>
        </Link>

        <div>
          <Link
            className={'p-4 link'}
            href={route('check')}
          >
            Cek Permohonan
          </Link>
          <Link
            className={'py-4 link'}
            href={'/login'}
          >
            Admin
          </Link>
        </div>

      </div>
      <div className={'w-full flex justify-between pb-6'}>
        <img src={'../../assets/banner.png'} />
      </div>
      <div className={'w-full flex justify-between pb-6'}>
        <h5>{title}</h5>
        <p>{moment(Date.now()).format('dddd, DD MMMM yyyy')}</p>
      </div>
      {children}
    </div>
  );
}
