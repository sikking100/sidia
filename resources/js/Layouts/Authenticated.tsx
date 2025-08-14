import React from 'react';
import { Link, InertiaLink, usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import route from 'ziggy-js'
import axios from 'axios'
import { User } from '@/Interface/Interface';
import { Button, Navbar, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react';
import { useIsMobile } from '@/Functions/functions';
import { HiDocument, HiLogout, HiOfficeBuilding, HiTicket, HiUser } from 'react-icons/hi';
import { HiBuildingOffice } from 'react-icons/hi2';


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

  const isMobile = useIsMobile()

  return (
    <div className="min-h-screen min-w-screen">
      {isMobile ?
        <Navbar fluid rounded theme={{
          toggle: {
            base: "ml-4"
          },
          link: {
            base: 'flex items-center'
          }
        }}>
          <NavbarToggle />
          <NavbarCollapse>
            <NavbarLink href="#">
              <HiTicket className={'mr-2'} />
              Pemohon
            </NavbarLink>
            <NavbarLink href="#">
              <HiUser className={'mr-2'} />
              Pengguna
            </NavbarLink>
            <NavbarLink href="#">
              <HiOfficeBuilding className={'mr-2'} />
              Kecamatan</NavbarLink>
            <NavbarLink href="#">
              <HiDocument className={'mr-2'} />
              Persyaratan</NavbarLink>
            <NavbarLink onClick={(e) => Inertia.post(route('logout'))} as={Link}>
              <HiLogout className={'mr-2'} />
              Logout</NavbarLink>
          </NavbarCollapse>
        </Navbar> :
        <nav>
          <div className="w-full mx-auto pt-6 px-6">
            <div className='w-full flex gap-x-2'>
              <Button
                pill
                href={route('application.index')}
                color={`${url.toLowerCase().includes('/application') ? '' : 'light'}`}
                className={`${url.toLowerCase().includes('/application') ? 'blue-gradient' : ''}`}
                // gradientMonochrome={`${url === '/application' ? 'info' : ''}`}
                type='button'
                size={"sm"}
              >
                <HiTicket className={'mr-2'} />
                Pemohon
              </Button>
              <Button
                pill
                href={route('user.index')}
                color={`${url.toLowerCase().includes('/user') ? '' : 'light'}`}
                className={`${url.toLowerCase().includes('/user') ? 'blue-gradient' : ''}`}
                // gradientMonochrome={`${url === '/user' ? 'info' : ''}`}
                size={"sm"}
              >
                <HiUser className={'mr-2'} />

                Pengguna
              </Button>
              <Button
                pill
                href={route('district.index')}
                color={`${url.toLowerCase().includes('/district') ? '' : 'light'}`}
                className={`${url.toLowerCase().includes('/district') ? 'blue-gradient' : ''}`}
                // gradientMonochrome={`${url === '/district' ? 'info' : ''}`}
                size={"sm"}
              >
                <HiOfficeBuilding className={'mr-2'} />

                Kecamatan
              </Button>
              <Button
                pill
                href={route('menu.index')}
                color={`${url.toLowerCase().includes('/menu') ? '' : 'light'}`}
                className={`${url.toLowerCase().includes('/menu') ? 'blue-gradient' : ''}`}
                // gradientMonochrome={`${url === '/menu' ? 'info' : ''}`}
                size={"sm"}
              >
                <HiDocument className={'mr-2'} />

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
                  <HiLogout className={'mr-2'} />
                  Logout
                </Button>
              </div>
            </div>

          </div>
        </nav >
      }
      <main className='p-6 m-6 bg-white shadow-md rounded-md'>{children}</main>
    </div >
  );
}


// {user.role === 'desa' ? <div className='flex justify-between h-16'>
//             <div className={'flex mx-auto items-center'}>
//               <Link
//                 className={`px-6 ${url === '/desa/buat' ? 'active' : ''}`}
//                 href={route('buat')}>
//                 Buat Permohonan
//               </Link>
//               <Link
//                 className={`px-6 ${url === '/desa' ? 'active' : ''}`}
//                 href={route('desa.index')}>
//                 <div className={'inline-flex items-center'}>
//                   Pemohon
//                   {/* {countData && countData > 0 ? <span className="inline-flex justify-center items-center ml-2 p-2 text-xs font-semibold text-white bg-red-500 rounded-full">
//                     {countData}
//                   </span> : <div></div>} */}
//                 </div>
//               </Link>
//               <Link
//                 className={`px-6 ${url === '/hamlet' ? 'active' : ''}`}
//                 href={route('hamlet.index')}>
//                 Dusun
//               </Link>
//             </div>
//             <div className="flex">
//               <div className="shrink-0 flex items-center">
//                 <InertiaLink
//                   method='post'
//                   as={'button'}
//                   href={route('logout')}
//                 >
//                   Logout
//                 </InertiaLink>
//                 {/* <Button>
//                   {user.name}
//                 </Button> */}
//               </div>
//             </div>
//           </div> : <div className="flex justify-between h-16">
//             <div className="flex">
//               <div className="shrink-0 flex items-center">
//                 <Link href="/">
//                   Dashboard
//                 </Link>
//               </div>
//             </div>
//             <div className={'flex mx-auto items-center'}>
//               <Link
//                 className={`px-6 ${url === '/user' ? 'active' : ''}`}
//                 href={route('user.index')}>
//                 <div className={'inline-flex items-center'}>
//                   User
//                 </div>
//               </Link>
//               <Link
//                 className={`px-6 ${url === '/application' ? 'active' : ''}`}
//                 href={route('application.index')}>
//                 <div className={'inline-flex items-center'}>
//                   Pemohon
//                   {countData && countData > 0 ? <span className="inline-flex justify-center items-center ml-2 p-2 text-xs font-semibold text-white bg-red-500 rounded-full">
//                     {countData}
//                   </span> : <div></div>}
//                 </div>
//               </Link>
//               <Link
//                 className={`px-6 ${url === '/district' ? 'active' : ''}`}
//                 href={route('district.index')}>
//                 Kecamatan
//               </Link>
//               <Link
//                 className={`px-6 ${url.startsWith('/menu') ? 'active' : ''}`}
//                 href={route('menu.index')}>
//                 Persyaratan
//               </Link>
//             </div>
//             <div className="flex">
//               <div className="shrink-0 flex items-center">
//                 <InertiaLink
//                   method='post'
//                   as={'button'}
//                   href={route('logout')}
//                 >
//                   Logout
//                 </InertiaLink>
//               </div>
//             </div>
//           </div>}
