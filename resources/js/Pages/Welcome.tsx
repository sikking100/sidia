import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import route from 'ziggy-js'
import Dropdown from '@/Components/Dropdown'
import Guest from '@/Layouts/Guest'

export default function Welcome(props: any) {
  console.log(props)
  return (
    <Guest>
      <Head title="Welcome" />

      <div className={'flex flex-row flex-wrap gap-11'}>
        <div className={'shadow w-[18rem] bg-gray-200'}>
          <img
            src={'https://layanan-online.dukcapil.metrokota.go.id/asset/src/assets/images/big/aset_pelayanan/KTP.jpg'}
            className={'rounded-t-sm'}
          />
          <div
            className={'p-6 w-full mx-auto w-full'}
          >
            <span className={'block pb-2'}>KTP-el</span>
            <Dropdown>
              <Dropdown.Trigger>
                <button className={'rounded bg-kemenag text-white py-2 px-4'}>Layanan</button>
              </Dropdown.Trigger>
              <Dropdown.Content
                align={'left'}
              >
                <Dropdown.Link
                  href={route('pemula')}
                >
                  KTP Pemula
                </Dropdown.Link>
                <Dropdown.Link
                  href={'/'}
                >
                  KTP Rusak
                </Dropdown.Link>
                <Dropdown.Link
                  href={'/'}
                >
                  KTP Hilang
                </Dropdown.Link>
                <Dropdown.Link
                  href={'/'}
                >
                  KTP Perubahan Data
                </Dropdown.Link>
                <Dropdown.Link
                  href={'/'}
                >
                  Perekaman Disabilitas
                </Dropdown.Link>
              </Dropdown.Content>
            </Dropdown>
          </div>
        </div>

        <div className={'shadow w-[18rem] bg-gray-200'}>
          <img
            src={'https://layanan-online.dukcapil.metrokota.go.id/asset/src/assets/images/big/aset_pelayanan/KK.jpg'}
            className={'rounded-t-sm'}
          />
          <div
            className={'p-6 w-full mx-auto w-full'}
          >
            <span className={'block pb-2'}>Kartu Keluarga</span>
            <Dropdown>
              <Dropdown.Trigger>
                <button className={'rounded bg-kemenag text-white py-2 px-4'}>Layanan</button>
              </Dropdown.Trigger>
              <Dropdown.Content
                align={'left'}
              >
                <Dropdown.Link
                  href={'/'}
                >
                  KK Baru
                </Dropdown.Link>
                <Dropdown.Link
                  href={'/'}
                >
                  KK Rusak
                </Dropdown.Link>
                <Dropdown.Link
                  href={'/'}
                >
                  KK Hilang
                </Dropdown.Link>
                <Dropdown.Link
                  href={'/'}
                >
                  KK Perubahan Data
                </Dropdown.Link>
              </Dropdown.Content>
            </Dropdown>
          </div>
        </div>
        <div className={'shadow w-[18rem] bg-gray-200'}>
          <img
            src={'https://layanan-online.dukcapil.metrokota.go.id/asset/src/assets/images/big/aset_pelayanan/KIA.jpg'}
            className={'rounded-t-sm'}
          />
          <div
            className={'p-6 w-full mx-auto w-full'}
          >
            <span className={'block pb-2'}>KIA</span>
            <Dropdown>
              <Dropdown.Trigger>
                <button className={'rounded bg-kemenag text-white py-2 px-4'}>Layanan</button>
              </Dropdown.Trigger>
              <Dropdown.Content
                align={'left'}
              >
                <Dropdown.Link
                  href={'/'}
                >
                  KIA Baru
                </Dropdown.Link>
                <Dropdown.Link
                  href={'/'}
                >
                  KIA Rusak
                </Dropdown.Link>
                <Dropdown.Link
                  href={'/'}
                >
                  KIA Hilang
                </Dropdown.Link>
                <Dropdown.Link
                  href={'/'}
                >
                  KIA Perubahan Data
                </Dropdown.Link>
              </Dropdown.Content>
            </Dropdown>
          </div>
        </div>
        <div className={'shadow w-[18rem] bg-gray-200'}>
          <img
            src={'https://layanan-online.dukcapil.metrokota.go.id/asset/src/assets/images/big/aset_pelayanan/SKPWNI.jpg'}
            className={'rounded-t-sm'}
          />
          <div
            className={'p-6 w-full mx-auto w-full'}
          >
            <span className={'block pb-2'}>SKPWNI</span>
            <Dropdown>
              <Dropdown.Trigger>
                <button className={'rounded bg-kemenag text-white py-2 px-4'}>Layanan</button>
              </Dropdown.Trigger>
              <Dropdown.Content
                align={'left'}
              >
                <Dropdown.Link
                  href={'/'}
                >
                  Pindah Keluar
                </Dropdown.Link>
              </Dropdown.Content>
            </Dropdown>
          </div>
        </div>
        <div className={'shadow w-[18rem] bg-gray-200'}>
          <img
            src={'https://layanan-online.dukcapil.metrokota.go.id/asset/src/assets/images/big/aset_pelayanan/AKTA_KELAHIRAN.jpg'}
            className={'rounded-t-sm'}
          />
          <div
            className={'p-6 w-full mx-auto w-full'}
          >
            <span className={'block pb-2'}>Kelahiran</span>
            <Dropdown>
              <Dropdown.Trigger>
                <button className={'rounded bg-kemenag text-white py-2 px-4'}>Layanan</button>
              </Dropdown.Trigger>
              <Dropdown.Content
                align={'left'}
              >
                <Dropdown.Link
                  href={'/'}
                >
                  Akta Lahir Baru
                </Dropdown.Link>
                <Dropdown.Link
                  href={'/'}
                >
                  Akta Lahir Rusak
                </Dropdown.Link>
                <Dropdown.Link
                  href={'/'}
                >
                  Akta Lahir Hilang
                </Dropdown.Link>
                <Dropdown.Link
                  href={'/'}
                >
                  Akta Lahir Perubahan Data
                </Dropdown.Link>
              </Dropdown.Content>
            </Dropdown>
          </div>
        </div>
        <div className={'shadow w-[18rem] bg-gray-200'}>
          <img
            src={'https://layanan-online.dukcapil.metrokota.go.id/asset/src/assets/images/big/aset_pelayanan/AKTA_PERKAWINAN.jpg'}
            className={'rounded-t-sm'}
          />
          <div
            className={'p-6 w-full mx-auto w-full'}
          >
            <span className={'block pb-4'}>Perkawinan</span>
            <Link
              className={'rounded bg-kemenag text-white py-2 px-4'}
              href={'/'}
            >
              Layanan
            </Link>
          </div>
        </div>
        <div className={'shadow w-[18rem] bg-gray-200'}>
          <img
            src={'https://layanan-online.dukcapil.metrokota.go.id/asset/src/assets/images/big/aset_pelayanan/AKTA_PERCERAIAN.jpg'}
            className={'rounded-t-sm'}
          />
          <div
            className={'p-6 w-full mx-auto w-full'}
          >
            <span className={'block pb-4'}>Perceraian</span>
            <Link
              className={'rounded bg-kemenag text-white py-2 px-4'}
              href={'/'}
            >
              Layanan
            </Link>
          </div>
        </div>
        <div className={'shadow w-[18rem] bg-gray-200'}>
          <img
            src={'https://layanan-online.dukcapil.metrokota.go.id/asset/src/assets/images/big/aset_pelayanan/AKTA_KEMATIAN.jpg'}
            className={'rounded-t-sm'}
          />
          <div
            className={'p-6 w-full mx-auto w-full'}
          >
            <span className={'block pb-4'}>Kematian</span>
            <Link
              className={'rounded bg-kemenag text-white py-2 px-4'}
              href={'/'}
            >
              Layanan
            </Link>
          </div>
        </div>
        <div className={'shadow w-[18rem] bg-gray-200'}>
          <img
            src={'https://layanan-online.dukcapil.metrokota.go.id/asset/src/assets/images/big/pelayanan/piak_p.jpg'}
            className={'rounded-t-sm'}
          />
          <div
            className={'p-6 w-full mx-auto w-full'}
          >
            <span className={'block pb-2'}>Data NIK bermasalah (BPJS,BANK dll)</span>
            <Dropdown>
              <Dropdown.Trigger>
                <button className={'rounded bg-kemenag text-white py-2 px-4'}>Layanan</button>
              </Dropdown.Trigger>
              <Dropdown.Content
                align={'left'}
              >
                <Dropdown.Link
                  href={'/'}
                >
                  Pengaduan Data Kependudukan (NIK)
                </Dropdown.Link>
              </Dropdown.Content>
            </Dropdown>
          </div>
        </div>
      </div>
    </Guest>
  );
}
