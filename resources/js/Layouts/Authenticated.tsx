import React from 'react';
import { Link, InertiaLink, usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import route from 'ziggy-js'
import axios from 'axios'
import { User } from '@/Interface/Interface';
import { Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react';
import { useIsMobile } from '@/Functions/functions';
import { HiDocument, HiHome, HiLogout, HiOfficeBuilding, HiTicket, HiUser } from 'react-icons/hi';
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

  const logout = async () => {
    try {
      await axios.post(route('logout'));
      // Inertia.post(route('logout'))
      // redirect manual ke halaman login / beranda
      window.location.href = "/";
    } catch (error) {
      console.error("Logout gagal:", error);
    }
  };
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
          {user.role === 'desa' &&
            <div className='mr-4'>
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar color='red' placeholderInitials={`${user.name[0]}${user.name[1]}`} rounded bordered />
                }
              >
                <DropdownHeader>
                  <span className="block text-sm">{user.name}</span>
                  <span className="block truncate text-sm font-medium">{user.email}</span>
                </DropdownHeader>
                <DropdownItem href={route('user.show', user.id)}>Profil</DropdownItem>
                <DropdownDivider />
                <DropdownItem
                  // as={Link}
                  onClick={() => logout()}>Keluar</DropdownItem>
              </Dropdown>
            </div>
          }
          <NavbarCollapse>
            {user.role === 'desa' ? <>
              <NavbarLink href={route('buat')}>
                <HiTicket className={'mr-2'} />
                Buat Permohonan
              </NavbarLink>
              <NavbarLink href={route('desa.index')}>
                <HiUser className={'mr-2'} />
                Pemohon
              </NavbarLink>
              <NavbarLink href={route('hamlet.index')}>
                <HiOfficeBuilding className={'mr-2'} />
                Dusun</NavbarLink>
            </> : <>
              <NavbarLink href={route('application.index')}>
                <HiTicket className={'mr-2'} />
                Pemohon
              </NavbarLink>
              <NavbarLink href={route('user.index')}>
                <HiUser className={'mr-2'} />
                Pengguna
              </NavbarLink>
              <NavbarLink href={route('district.index')}>
                <HiOfficeBuilding className={'mr-2'} />
                Kecamatan</NavbarLink>
              <NavbarLink href={route('menu.index')}>
                <HiDocument className={'mr-2'} />
                Persyaratan</NavbarLink></>}
            <NavbarLink onClick={(e) => logout()}>
              <HiLogout className={'mr-2'} />
              Keluar</NavbarLink>
          </NavbarCollapse>
        </Navbar> :
        <nav>
          <div className="w-full mx-auto pt-6 px-6">

            <div className='w-full flex gap-x-2'>
              {user.role === 'desa' ?
                <MenuDesa url={url} user={user} logout={logout} /> : <MenuSuperAdmin url={url} logout={logout} />}
            </div>

          </div>
        </nav >
      }
      <main className='m-6'>{children}</main>
    </div >
  );
}

const MenuDesa = ({ url, user, logout }: { url: string, user: User, logout: () => void }) => {
  return (
    <>

      <Button
        pill
        href={route('dashboard')}
        color={`${url.toLowerCase().includes('/dashboard') ? '' : 'light'}`}
        className={`${url.toLowerCase().includes('/dashboard') ? 'blue-gradient' : ''}`}
        // gradientMonochrome={`${url === '/user' ? 'info' : ''}`}
        size={"sm"}
      >
        <HiHome className={'mr-2'} />
        Dashboard
      </Button>
      <Button
        pill
        href={route('buat')}
        color={`${url.toLowerCase().includes('/buat') ? '' : 'light'}`}
        className={`${url.toLowerCase().includes('/buat') ? 'blue-gradient' : ''}`}
        // gradientMonochrome={`${url === '/user' ? 'info' : ''}`}
        size={"sm"}
      >
        <HiUser className={'mr-2'} />

        Buat Permohonan
      </Button>
      <Button
        pill
        href={route('desa.index')}
        color={`${url === ('/desa') ? '' : 'light'}`}
        className={`${url === ('/desa') ? 'blue-gradient' : ''}`}
        // gradientMonochrome={`${url === '/application' ? 'info' : ''}`}
        type='button'
        size={"sm"}
      >
        <HiTicket className={'mr-2'} />
        Pemohon
      </Button>
      <Button
        pill
        href={route('hamlet.index')}
        color={`${url.toLowerCase().includes('/hamlet') ? '' : 'light'}`}
        className={`${url.toLowerCase().includes('/hamlet') ? 'blue-gradient' : ''}`}
        // gradientMonochrome={`${url === '/district' ? 'info' : ''}`}
        size={"sm"}
      >
        <HiOfficeBuilding className={'mr-2'} />

        Dusun
      </Button>
      <div
        className='ml-auto'>
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar color='red' placeholderInitials={`${user.name[0]}${user.name[1]}`} rounded bordered />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">{user.name}</span>
            <span className="block truncate text-sm font-medium">{user.email}</span>
          </DropdownHeader>
          <DropdownItem href={route('user.show', user.id)}>Profil</DropdownItem>
          <DropdownDivider />
          <DropdownItem
            // as={Link}
            onClick={() => logout()}>Keluar</DropdownItem>
        </Dropdown>
        {/* <Button
          pill
          color={"light"}
          size={"sm"}
          // as={Link}
          onClick={(e) => Inertia.post(route('logout'))}

        >
          <HiLogout className={'mr-2'} />
          Logout
        </Button> */}
      </div>
    </>
  )
}

const MenuSuperAdmin = ({ url, logout }: { url: string, logout: () => void }) => {
  return (
    <>
      <Button
        pill
        href={route('dashboard')}
        color={`${url.toLowerCase().includes('/dashboard') ? '' : 'light'}`}
        className={`${url.toLowerCase().includes('/dashboard') ? 'blue-gradient' : ''}`}
        // gradientMonochrome={`${url === '/user' ? 'info' : ''}`}
        size={"sm"}
      >
        <HiHome className={'mr-2'} />
        Dashboard
      </Button>
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
          // as={Link}
          onClick={logout}
        >
          <HiLogout className={'mr-2'} />
          Keluar
        </Button>
      </div></>
  )
}
