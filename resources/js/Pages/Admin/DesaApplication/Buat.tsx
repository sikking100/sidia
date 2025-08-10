import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import route from 'ziggy-js'
import Dropdown from '@/Components/Dropdown'
import Authenticated from '@/Layouts/Authenticated';

export default function Buat() {
    return (
        <Authenticated
            header={'Buat Permohonan'}>
            <div className=''>
                <div className={'flex flex-row flex-wrap gap-11 justify-center'}>
                    <div className={'shadow w-[18rem] bg-gray-200'}>
                        <img
                            src={'../../assets/ktp.png'}
                            className={'rounded-t-sm'}
                        />
                        <div
                            className={'p-6 w-full mx-auto'}
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
                                        href={route('desa.create', 'KTP-Pemula')}
                                    >
                                        KTP Pemula
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route('desa.create', 'KTP-Rusak')}
                                    >
                                        KTP Rusak
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route('desa.create', 'KTP-Hilang')}
                                    >
                                        KTP Hilang
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route('desa.create', 'KTP-Perubahan')}
                                    >
                                        KTP Perubahan Data
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route('desa.create', 'KTP-Disabilitas')}
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
                            className={'p-6 w-full mx-auto'}
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
                                        href={route('desa.create', 'KK-Baru')}
                                    >
                                        KK Baru
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route('desa.create', 'KK-Rusak')}
                                    >
                                        KK Rusak
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route('desa.create', 'KK-Hilang')}
                                    >
                                        KK Hilang
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route('desa.create', 'KK-Perubahan-Data')}
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
                            className={'p-6 w-full mx-auto'}
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
                                        href={route('desa.create', 'KIA-Baru')}
                                    >
                                        KIA Baru
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route('desa.create', 'KIA-Rusak')}
                                    >
                                        KIA Rusak
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route('desa.create', 'KIA-Hilang')}
                                    >
                                        KIA Hilang
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route('desa.create', 'KIA-Perubahan-Data')}
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
                            className={'p-6 w-full mx-auto'}
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
                                        href={route('desa.create', 'SKPWNI-Pindah-Keluar')}
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
                            className={'p-6 w-full mx-auto'}
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
                                        href={route('desa.create', 'Akta-Kelahiran-Baru')}
                                    >
                                        Akta Lahir Baru
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route('desa.create', 'Akta-Kelahiran-Rusak')}
                                    >
                                        Akta Lahir Rusak
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route('desa.create', 'Akta-Kelahiran-Hilang')}
                                    >
                                        Akta Lahir Hilang
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route('desa.create', 'Akta-Kelahiran-Perubahan')}
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
                            className={'p-6 w-full mx-auto'}
                        >
                            <span className={'block pb-4'}>Perkawinan</span>
                            <Link
                                className={'rounded bg-kemenag text-white py-2 px-4'}
                                href={route('desa.create', 'Perkawinan')}
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
                            className={'p-6 w-full mx-auto'}
                        >
                            <span className={'block pb-4'}>Perceraian</span>
                            <Link
                                className={'rounded bg-kemenag text-white py-2 px-4'}
                                href={route('desa.create', 'Perceraian')}
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
                            className={'p-6 w-full mx-auto'}
                        >
                            <span className={'block pb-4'}>Kematian</span>
                            <Link
                                className={'rounded bg-kemenag text-white py-2 px-4'}
                                href={route('desa.create', 'Kematian')}
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
                            className={'p-6 w-full mx-auto'}
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
                                        href={route('desa.create', 'Pengaduan-Data-Kependudukan')}
                                    >
                                        Pengaduan Data Kependudukan (NIK)
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>

        </Authenticated>
    )
}
