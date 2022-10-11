import React from 'react';
import { Link } from '@inertiajs/inertia-react'
import moment from 'moment'
import route from 'ziggy-js'

interface Props {
  title?: string
}

export default function Guest({ children, title = 'Selamat Datang' }: React.PropsWithChildren<Props>) {

  const onClick = () => {
    const url = 'https://dukcapil.morowaliutarakab.go.id/'
    window.open(url, '_blank', 'noopener,noreferrer')
    return
  }

  return (
    <div className="items-top min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0 py-6 px-10">
      <div className={'w-full flex py-6 items-center'}>

        <Link href={'#'} as={'button'} onClick={onClick}>
          <div className={'inline-flex mr-2 rounded-full bg-kemenag py-2 px-4'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            <span className={'pl-2 text-white'}>DUKCAPIL</span>
          </div>
        </Link>

        <Link href={'/'}>

          <div className={'inline-flex mr-2 rounded-full bg-kemenag py-2 px-4'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            <span className={'pl-2 text-white'}>SIDIA</span>
          </div>
        </Link>


        <Link href={route('check')}>
          <div className={'inline-flex mr-2 rounded-full bg-kemenag py-2 px-4'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <span className={'pl-2 text-white'}>PERMOHONAN</span>
          </div>
        </Link>

        <Link href={route('dashboard')}>

          <div className={'inline-flex mr-2 rounded-full bg-kemenag py-2 px-4'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <span className={'pl-2 text-white'}>ADMIN</span>
          </div>
        </Link>


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
