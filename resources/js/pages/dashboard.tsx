import PageHeader from '@/components/page-header';
import { useIsMobile } from '@/hooks/use-mobile';
import Admin from '@/layouts/admin';
import { District, FlashProps, Hamlet, User, Ward } from '@/types';
import { usePage } from '@inertiajs/react';
import { PageProps } from "@inertiajs/core";

import axios from 'axios';
import React from 'react';
import { Button } from 'react-bootstrap';
import { HiRefresh, HiSearch } from 'react-icons/hi';
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import useCustomModal from '@/hooks/use-modal';
import CustomModal from '@/components/custom-modal';
import * as echarts from "echarts"
import { getStatus } from '@/hooks/functions';

interface StatusSummary {
    status: string
    total: number
    category: {
        name: string
        total: number
    }[]
}

interface CategorySummary {
    category: string;
    total: number;
}

interface Props extends PageProps {
    status: StatusSummary[]
    category: CategorySummary[]
    districts: District[]
    hamlets: Hamlet[]
    flash: FlashProps
}

export default function Dashboard(props: Props) {
    const { user } = usePage().props.auth as { user: User }
    const isMobile = useIsMobile()
    const [kecamatan, setKecamatan] = React.useState<District | null>()
    const [desa, setDesa] = React.useState<Ward | null>()
    const [dusun, setDusun] = React.useState<Hamlet | null>()
    const [tahun, setTahun] = React.useState<number | null>()
    const [years, setYears] = React.useState<number[]>()
    const [summary, setSummary] = React.useState<CategorySummary[]>(props.category)
    const modalError = useCustomModal()

    const color = ['#fac091', '#a092b0', '#92cddc', '#95b3d7', '#f79647'];
    const itemColor = ['#f79647', '#604a7b', '#4aacc5', '#4f81bc', '#f79647'];




    React.useEffect(() => {
        const fetchTahun = async () => {
            const url = user.role === 'desa' ? '/desa-years' : '/years'
            const response = await axios.get(url)
            console.log(response.data);

            setYears(response.data);
        }
        fetchTahun()
        props.status.forEach((_, i) => {
            chartPlace({ index: i })
        });
    }, [])


    React.useEffect(() => {
        if ((props.flash?.message !== undefined && props.flash?.message !== null && props.flash?.message !== '')) {
            modalError.open()
        }
    }, [props.flash, modalError])


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
            hamlet_id: dusun?.id,
            tahun: tahun
        }))
        console.log(response.data)

        setSummary(response.data.summary)
    }

    const chartPlace = ({ index }: { index: number }) => {
        const chartDom = document.getElementById("main" + index);
        const myChart = echarts.init(chartDom);
        const option = {
            tooltip: {
                trigger: "axis",
                // formatter: function (value) {
                //     return value[0].data;
                // },
            },
            grid: {
                left: 0,
                bottom: 0,
                top: 5,
                right: 0,
            },
            xAxis: [
                {
                    type: "category",
                    boundaryGap: false,
                    axisLine: {
                        show: false,
                    },
                    animation: {
                        duration: 300,
                        easing: "cubicOut",
                    },
                    data: props.status[index].category.map(e => e.name),
                },
            ],
            yAxis: [
                {
                    type: "value",
                    splitLine: { show: false },
                    axisLine: {
                        show: false,
                    },
                    axisLabel: {
                        show: false,
                    },
                    data: [0, 2, 4, 6, 8, 10],
                },
            ],
            series: [
                {
                    type: "line",
                    data: props.status[index].category.map(e => e.total),
                    areaStyle: {
                        color: itemColor[index],
                    },
                    itemStyle: {
                        color: color[index],
                    },
                    symbolSize: 1,
                },
            ],
        }
        myChart.setOption(option)
    }

    return (

        <Admin>
            <div className='container-fluid'>
                <PageHeader
                    HeaderText="Dashboard"
                    Breadcrumb={[{ name: "Dashboard" }]}
                />
                <CustomModal
                    show={modalError.isOpen}
                    onHide={modalError.close}
                    title='Pemberitahuan'
                    footer={
                        <Button className='btn btn-sm btn-primary' onClick={modalError.close}>Tutup</Button>
                    }>
                    {
                        props.flash?.message
                    }
                </CustomModal>
                <div className="row clearfix">
                    {props.status.map((e, i) => (
                        <div className="col" key={i}>
                            <div className="card number-chart">
                                <div className="body">
                                    <div className="number">
                                        <h6>{getStatus(e.status)}</h6>
                                        <span>{e.total}</span>
                                    </div>
                                </div>
                                <div
                                    id={"main" + i}
                                    className="sparkline"
                                    style={{ width: "100%", height: 55 }}
                                ></div>
                            </div>
                            {/* <div className="card overflowhidden number-chart pending">
                            <div className="body">
                                <div className="number">
                                    <h6>Pending</h6>
                                    <span>{props.status.find(e => e.status === 'PENDING')?.total ?? 0}</span>
                                </div>
                            </div>
                        </div> */}
                        </div>
                    ))}
                    {/* <div className="col">
                        <div className="card overflowhidden number-chart revisi">
                            <div className="body">
                                <div className="number">
                                    <h6>Revisi</h6>
                                    <span>{props.status.find(e => e.status === 'DEFFICIENT' || e.status === 'REVISED')?.total ?? 0}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card overflowhidden number-chart completed">
                            <div className="body">
                                <div className="number">
                                    <h6>Disetujui</h6>
                                    <span>{props.status.find(e => e.status === 'COMPLETED')?.total ?? 0}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card overflowhidden number-chart cancel">
                            <div className="body">
                                <div className="number">
                                    <h6>Ditolak</h6>
                                    <span>{props.status.find(e => e.status === 'CANCEL')?.total ?? 0}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card overflowhidden number-chart total">
                            <div className="body">
                                <div className="number">
                                    <h6>Total</h6>
                                    <span>{props.status.reduce((e, n) => e + n.total, 0)}</span>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className="row clearfix">
                    <div className="col-lg-12 col-md-12">
                        <div className="card planned_task">
                            <div className="header">
                                <h2>Statistik Permohonan</h2>
                            </div>
                            <div className="body">
                                <div className='form-row'>
                                    {user.role !== 'desa' && <div className="col mb-3">
                                        <select className="custom-select" id="inputGroupSelect01"
                                            value={kecamatan?.id}
                                            onChange={(e) => {
                                                e.preventDefault();
                                                setKecamatan(props.districts.findLast(ee => ee.id === Number.parseInt(e.target.value)));
                                            }}
                                        >
                                            <option value={-1}>Kecamatan</option>
                                            {
                                                props.districts.map((item) => (
                                                    <option key={item.id} value={item.id}>{item.name}</option>
                                                ))
                                            }
                                        </select>

                                    </div>}
                                    {user.role !== 'desa' && <div className="col mb-3">
                                        <select className="custom-select" id="inputGroupSelect01"
                                            value={desa?.id}
                                            onChange={(e) => {
                                                e.preventDefault();
                                                setDesa(kecamatan?.wards?.findLast(ee => ee.id == Number.parseInt(e.target.value)));
                                            }}
                                        >
                                            <option value={-1}>Desa</option>
                                            {
                                                kecamatan?.wards?.map((item) => (
                                                    <option key={item.id} value={item.id}>{item.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>}
                                    <div className="col mb-3">

                                        <select className="custom-select" id="inputGroupSelect01"
                                            value={dusun?.id}
                                            onChange={(e) => {
                                                e.preventDefault();
                                                if (user.role === 'desa') {
                                                    setDusun(props.hamlets.findLast(ee => ee.id == Number.parseInt(e.target.value)));
                                                } else {
                                                    setDusun(desa?.hamlets.findLast(ee => ee.id == Number.parseInt(e.target.value)));
                                                }

                                            }}
                                        >
                                            <option value={-1}>Dusun</option>
                                            {
                                                user.role === 'desa' ? props.hamlets.map((item) => (
                                                    <option key={item.id} value={item.id}>{item.name}</option>
                                                )) : desa?.hamlets.map((item) => (
                                                    <option key={item.id} value={item.id}>{item.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="col mb-3">

                                        <select className="custom-select" id="inputGroupSelect01"
                                            onChange={e => setTahun(Number.parseInt(e.target.value))}
                                        >
                                            <option value={-1}>Tahun</option>
                                            {years?.map((e) => (
                                                <option key={e} value={e}>{e}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className=''>
                                    <div className='d-flex justify-content-end'>
                                        <Button
                                            className='btn btn-primary btn-sm mr-2'
                                            onClick={cari}
                                        // disabled={loading}
                                        >
                                            <HiSearch className="mr-2 h-5 w-5" />
                                            Cari
                                        </Button>
                                        <Button
                                            onClick={reset}
                                            // size={"xs"}
                                            className='btn btn-danger btn-sm'
                                        >
                                            <HiRefresh className="mr-2 h-5 w-5" />

                                            Reset
                                        </Button>
                                    </div>
                                </div>
                                <div className='vh-100' style={{ width: '100%' }}>
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
                                            {/* <Legend /> */}
                                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                            <Bar dataKey="total" fill="#38bdf8" barSize={30}>
                                                <LabelList fontSize={isMobile ? 8 : 12} angle={isMobile ? -90 : 0} dataKey={"total"} position={'top'} fill='black' />
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Admin >
    );
}
