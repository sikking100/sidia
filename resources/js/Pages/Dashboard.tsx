

import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, usePage } from '@inertiajs/inertia-react';
import { Button, Card, Select, TextInput, Tooltip } from 'flowbite-react';
import { CgClose, CgCloseO, CgLock } from 'react-icons/cg';
import { BsClock, BsStack } from 'react-icons/bs';
import { HiRefresh, HiSearch } from 'react-icons/hi';
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Legend } from '@headlessui/react';
import { BiCheck, BiCheckCircle, BiRevision } from 'react-icons/bi';
import { useIsMobile } from '@/Functions/functions';
import { District, Hamlet, Ward } from '@/Interface/Interface';
import axios from 'axios';
import route from 'ziggy-js';
import { ModalAlert } from '@/Components/Alert';

interface StatusSummary {
  status: string;
  total: number;
}

interface CategorySummary {
  status: string;
  total: number;
}

interface Props {
  status: StatusSummary[]
  category: CategorySummary[]
  districts: District[]
  role: string
  hamlets: Hamlet[]
}

export default function Dashboard(props: Props) {
  console.log(usePage().props);

  const isMobile = useIsMobile()
  const [kecamatan, setKecamatan] = React.useState<District | null>()
  const [desa, setDesa] = React.useState<Ward | null>()
  const [dusun, setDusun] = React.useState<Hamlet | null>()
  const [tahun, setTahun] = React.useState<number | null>()
  const [years, setYears] = React.useState<number[]>()
  const [summary, setSummary] = React.useState<CategorySummary[]>(props.category)
  const [showAlert, setShowAlert] = React.useState(false)


  const { flash } = usePage().props
  const f = flash as { message: string }

  React.useEffect(() => {
    const fetchTahun = async () => {
      const response = await axios.get('/years')
      setYears(response.data);
    }
    fetchTahun()
  }, [])

  React.useEffect(() => {
    if ((f.message !== null && f.message !== '')) {
      setShowAlert(true)
    }
  }, [f])


  const reset = () => {
    setTahun(-1)
    setDesa(null)
    setKecamatan(null)
    setDusun(null)
  }

  const cari = async () => {
    const response = await axios.get(route('dashboard.statistic', {
      kecamatan: kecamatan?.name,
      desa: desa?.name,
      dusun: dusun?.name,
      tahun: tahun
    }))
    setSummary(response.data.summary)
  }

  return (
    <Authenticated
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
    >
      <Head title="Dashboard" />
      <ModalAlert
        show={showAlert} close={() => setShowAlert(false)}
        content={f.message}
      />
      <div className='gap-6 grid grid-flow-row sm:grid-flow-col'>
        <div className="bg-white p-2 rounded-md shadow-md">
          <div className='grid grid-cols-2'>
            <div className='bg-yellow-300 rounded-full p-6 max-w-fit self-center'>
              <BsClock color='white' />
            </div>
            <div className='self-center justify-items-end'>
              <p className='font-extrabold text-xl'>{props.status.find(e => e.status === 'PENDING')?.total ?? 0}</p>
              <p className='text-xs text-gray-500'>Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-2 rounded-md shadow-md">
          <div className='grid grid-cols-2'>
            <div className='bg-orange-300 rounded-full p-6 max-w-fit self-center'>
              <BiRevision color='white' />
            </div>
            <div className='self-center justify-items-end'>
              <p className='font-extrabold text-xl'>{props.status.find(e => e.status === 'DEFFICIENT' || e.status === 'REVISED')?.total ?? 0}</p>
              <p className='text-xs text-gray-500'>Revisi</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-2 rounded-md shadow-md">
          <div className='grid grid-cols-2'>
            <div className='bg-cyan-300 rounded-full p-6 max-w-fit self-center'>
              <BiCheckCircle color='white' />
            </div>
            <div className='self-center justify-items-end'>
              <p className='font-extrabold text-xl'>{props.status.find(e => e.status === 'COMPLETED')?.total ?? 0}</p>
              <p className='text-xs text-gray-500'>Disetujui</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-2 rounded-md shadow-md">
          <div className='grid grid-cols-2'>
            <div className='bg-red-300 rounded-full p-6 max-w-fit self-center'>
              <CgCloseO color='white' />
            </div>
            <div className='self-center justify-items-end'>
              <p className='font-extrabold text-xl'>{props.status.find(e => e.status === 'CANCEL')?.total ?? 0}</p>
              <p className='text-xs text-gray-500'>Ditolak</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-2 rounded-md shadow-md">
          <div className='grid grid-cols-2'>
            <div className='bg-green-300 rounded-full p-6 max-w-fit self-center'>
              <BsStack color='white' />
            </div>
            <div className='self-center justify-items-end'>
              <p className='font-extrabold text-xl'>{props.status.reduce((e, n) => e + n.total, 0)}</p>
              <p className='text-xs text-gray-500'>Total</p>
            </div>
          </div>
        </div>


      </div>
      <div className='mt-6 p-6 bg-white shadow-md rounded-md'>
        {/* <Alert
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          message={f.message}
        /> */}

        <p className='header'>Statistik Permohonan</p>
        <div className='flex flex-col sm:flex-row gap-4 mt-6'>
          {props.role !== 'desa' && <Select id="kecamatan"
            className='w-full'

            value={kecamatan?.id}
            onChange={(e) => {
              e.preventDefault();
              setKecamatan(props.districts.findLast(ee => ee.id === Number.parseInt(e.target.value)));
            }}
          >
            <option key={-1} value={-1}>Kecamatan</option>
            {
              props.districts.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))
            }
          </Select>}
          {props.role !== 'desa' && <Select id="desa"
            className='w-full'
            value={desa?.id}
            onChange={(e) => {
              e.preventDefault();
              setDesa(kecamatan?.wards?.findLast(ee => ee.id == Number.parseInt(e.target.value)));
            }}
          >
            <option key={-1} value={-1}>Desa</option>
            {
              kecamatan?.wards?.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))
            }
          </Select>}
          <Select id="dusun"
            className='w-full'

            value={dusun?.id}
            onChange={(e) => {
              e.preventDefault();
              setDusun(desa?.hamlets.findLast(ee => ee.id == Number.parseInt(e.target.value)));
            }}
          >
            <option key={-1} value={-1}>Dusun</option>
            {
              props.role === 'desa' ? props.hamlets.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              )) : desa?.hamlets.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))
            }
          </Select>
          <Select id="tahun"
            className='w-full'

            value={tahun ?? 0}
            onChange={(e) => setTahun(Number.parseInt(e.target.value))}
          >
            <option value={0}>Tahun</option>
            {years?.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </Select>
        </div>
        <div className='mt-4 mb-6 gap-x-4 w-full justify-items-end'>
          <div className='flex gap-2'>
            <Button
              onClick={cari}
              color={"cyan"}
              size={"xs"}
            // disabled={loading}
            >
              <HiSearch className="mr-2 h-5 w-5" />
              Cari
            </Button>
            <Button
              onClick={reset}
              color={"red"}
              size={"xs"}
            >
              <HiRefresh className="mr-2 h-5 w-5" />

              Reset
            </Button>
          </div>
        </div>
        <div className='min-w-max h-screen'>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={summary}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" stroke="#000000"
                angle={-45}
                textAnchor="end"         // supaya ujung teks rata dengan tick
                interval={0}
                height={150}
                fontSize={isMobile ? 8 : 12}
                fontSizeAdjust={10}
              />
              {<YAxis fontSizeAdjust={20} stroke='#000000' fontSize={isMobile ? 8 : 12} width={isMobile ? 20 : 50} label={{ value: 'jumlah permohonan', angle: -90, position: "insideLeft", fill: "#0000000", style: { textAnchor: "middle" } }} />}
              <Tooltip content='category' />
              {/* <Legend /> */}
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Bar dataKey="total" fill="#38bdf8" barSize={30}>
                <LabelList fontSize={isMobile ? 8 : 12} angle={isMobile ? -90 : 0} dataKey={"total"} position={'top'} fill='black' />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Authenticated>
  );
}
