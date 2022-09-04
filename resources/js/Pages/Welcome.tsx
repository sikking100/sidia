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
            src={'../../assets/ktp.png'}
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
                  href={route('form', 'KTP-Pemula')}
                >
                  KTP Pemula
                </Dropdown.Link>
                <Dropdown.Link
                  href={route('form', 'KTP-Rusak')}
                >
                  KTP Rusak
                </Dropdown.Link>
                <Dropdown.Link
                  href={route('form', 'KTP-Hilang')}
                >
                  KTP Hilang
                </Dropdown.Link>
                <Dropdown.Link
                  href={route('form', 'KTP-Perubahan')}
                >
                  KTP Perubahan Data
                </Dropdown.Link>
                <Dropdown.Link
                  href={route('form', 'KTP-Disabilitas')}
                >
                  Perekaman Disabilitas
                </Dropdown.Link>
              </Dropdown.Content>
            </Dropdown>
          </div>
        </div>

        <div className={'shadow w-[18rem] bg-gray-200'}>
          <img
            src={'../../assets/kk.png'}
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
                  href={route('form', 'KK-Baru')}
                >
                  KK Baru
                </Dropdown.Link>
                <Dropdown.Link
                  href={route('form', 'KK-Rusak')}
                >
                  KK Rusak
                </Dropdown.Link>
                <Dropdown.Link
                  href={route('form', 'KK-Hilang')}
                >
                  KK Hilang
                </Dropdown.Link>
                <Dropdown.Link
                  href={route('form', 'KK-Perubahan-Data')}
                >
                  KK Perubahan Data
                </Dropdown.Link>
              </Dropdown.Content>
            </Dropdown>
          </div>
        </div>
        <div className={'shadow w-[18rem] bg-gray-200'}>
          <img
            src={'../../assets/kia.png'}
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
                  href={route('form', 'KIA-Baru')}
                >
                  KIA Baru
                </Dropdown.Link>
                <Dropdown.Link
                  href={route('form', 'KIA-Rusak')}
                >
                  KIA Rusak
                </Dropdown.Link>
                <Dropdown.Link
                  href={route('form', 'KIA-Hilang')}
                >
                  KIA Hilang
                </Dropdown.Link>
                <Dropdown.Link
                  href={route('form', 'KIA-Perubahan-Data')}
                >
                  KIA Perubahan Data
                </Dropdown.Link>
              </Dropdown.Content>
            </Dropdown>
          </div>
        </div>
        <div className={'shadow w-[18rem] bg-gray-200'}>
          <img
            src={'../../assets/skpwni.png'}
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
                  href={route('form', 'SKPWNI-Pindah-Keluar')}
                >
                  Pindah Keluar
                </Dropdown.Link>
              </Dropdown.Content>
            </Dropdown>
          </div>
        </div>
        <div className={'shadow w-[18rem] bg-gray-200'}>
          <img
            src={'../../assets/akta.png'}
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
                  href={route('form', 'Akta-Kelahiran-Baru')}
                >
                  Akta Lahir Baru
                </Dropdown.Link>
                <Dropdown.Link
                  href={route('form', 'Akta-Kelahiran-Rusak')}
                >
                  Akta Lahir Rusak
                </Dropdown.Link>
                <Dropdown.Link
                  href={route('form', 'Akta-Kelahiran-Hilang')}
                >
                  Akta Lahir Hilang
                </Dropdown.Link>
                <Dropdown.Link
                  href={route('form', 'Akta-Kelahiran-Perubahan')}
                >
                  Akta Lahir Perubahan Data
                </Dropdown.Link>
              </Dropdown.Content>
            </Dropdown>
          </div>
        </div>
        <div className={'shadow w-[18rem] bg-gray-200'}>
          <img
            src={'../../assets/perkawinan.png'}
            className={'rounded-t-sm'}
          />
          <div
            className={'p-6 w-full mx-auto w-full'}
          >
            <span className={'block pb-4'}>Perkawinan</span>
            <Link
              className={'rounded bg-kemenag text-white py-2 px-4'}
              href={route('form', 'Perkawinan')}
            >
              Layanan
            </Link>
          </div>
        </div>
        <div className={'shadow w-[18rem] bg-gray-200'}>
          <img
            src={'../../assets/cerai.png'}
            className={'rounded-t-sm'}
          />
          <div
            className={'p-6 w-full mx-auto w-full'}
          >
            <span className={'block pb-4'}>Perceraian</span>
            <Link
              className={'rounded bg-kemenag text-white py-2 px-4'}
              href={route('form', 'Perceraian')}
            >
              Layanan
            </Link>
          </div>
        </div>
        <div className={'shadow w-[18rem] bg-gray-200'}>
          <img
            src={'../../assets/kematian.png'}
            className={'rounded-t-sm'}
          />
          <div
            className={'p-6 w-full mx-auto w-full'}
          >
            <span className={'block pb-4'}>Kematian</span>
            <Link
              className={'rounded bg-kemenag text-white py-2 px-4'}
              href={route('form', 'Kematian')}
            >
              Layanan
            </Link>
          </div>
        </div>
        <div className={'shadow w-[18rem] bg-gray-200'}>
          <img
            src={'../../assets/nikmasalah.png'}
            className={'rounded-t-sm'}
          />
          <div
            className={'p-6 w-full mx-auto w-full'}
          >
            <span className={'block pb-2'}>Data NIK bermasalah (BPJS, BANK, NPWP DLL)</span>
            <Dropdown>
              <Dropdown.Trigger>
                <button className={'rounded bg-kemenag text-white py-2 px-4'}>Layanan</button>
              </Dropdown.Trigger>
              <Dropdown.Content
                align={'left'}
              >
                <Dropdown.Link
                  href={route('form', 'Pengaduan-Data-Kependudukan')}
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
