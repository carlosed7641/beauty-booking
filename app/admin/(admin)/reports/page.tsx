'use client'

import { SimpleTabs } from '@/components'
import { formatDate, isGreaterOrEqualThanToday, isLessOrEqualThanToday } from '@/helpers'
import { MONTHS_OF_YEAR } from '@/util/const'
import clsx from 'clsx'
import { useEffect, useMemo, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { SelectProfessional } from '../components'
import { professionals } from '@/util/fake-data'
import Image from 'next/image'
import { start } from 'repl'


type TimeOption = 'day' | 'week' | 'fortnight' | 'month' | 'year'
interface TimeOptionItem {
    id: TimeOption
    label: string
}

const timeOptions: TimeOptionItem[] = [
    {
        id: 'day',
        label: 'Día'
    },
    {
        id: 'week',
        label: 'Semana'
    },
    {
        id: 'fortnight',
        label: 'Quincena'
    },
    {
        id: 'month',
        label: 'Mes'
    },
    {
        id: 'year',
        label: 'Año'
    }
]

const tabs = [
    { id: 'general', label: 'Generales' },
    { id: 'sales', label: 'Ventas' }
]

const foundationDate = new Date(2020, 9, 15)

const defaultValue = {
    id: '',
    name: '',
    entityId: '',
    resume: '',
    reviews: {
        points: 0,
        count: 0
    }
}

const events: EventDate[] = [
    {
        id: 'f445465',
        title: 'Cepillado',
        start: new Date(2025, 9, 21, 17, 45, 0),
        end: new Date(2025, 9, 21, 18, 30, 0),
        customer: {
            id: "125",
            name: "David Ortiz",
            phone: '3004394704'
        },
        selectedService: {
            serviceId: "006",
            name: "Cepillado",
            duration: { hours: 0, minutes: 45 },
            price: 30_000
        },
        selectedProfessional: {
            id: 'bcf',
            name: "Carlos Castro"
        },
        isAdminBooking: false,
        customerReview: 2,
        allDay: false,
        status: 'completed'
    },
    {
        id: 'f445468',
        title: 'Corte hombre',
        start: new Date(2025, 9, 21, 17, 45, 0),
        end: new Date(2025, 9, 21, 18, 30, 0),
        customer: {
            id: "124",
            name: "David Ortiz",
            phone: '3004394704'
        },
        selectedService: {
            serviceId: "007",
            name: "Corte hombre",
            duration: { hours: 1, minutes: 30 },
            price: 40_000
        },
        selectedProfessional: {
            id: 'abc',
            name: "Gregorio Carrena"
        },
        isAdminBooking: true,
        customerReview: 1,
        allDay: false,
        status: 'aborted'
    },
    {
        id: 'f445467',
        title: 'Prueba',
        start: new Date(2025, 9, 21, 17, 45, 0),
        end: new Date(2025, 9, 21, 18, 30, 0),
        customer: {
            id: "125",
            name: "David Ortiz",
            phone: '3004394704'
        },
        selectedService: {
            serviceId: "016",
            name: "Prueba",
            duration: { hours: 0, minutes: 30 },
            price: 35_000
        },
        selectedProfessional: {
            id: 'bcf',
            name: "Carlos Castro"
        },
        isAdminBooking: true,
        customerReview: null,
        allDay: false,
        status: 'pending'
    },
    {
        id: 'f445475',
        title: 'Trenzas',
        start: new Date(2025, 9, 21, 17, 45, 0),
        end: new Date(2025, 9, 21, 18, 30, 0),
        customer: {
            id: "133",
            name: "David Ortiz",
            phone: '3004394704'
        },
        selectedService: {
            serviceId: "777",
            name: "Cepillado con trenzas",
            duration: { hours: 1, minutes: 0 },
            price: 20_000
        },
        selectedProfessional: {
            id: 'bcf',
            name: "Carlos Castro"
        },
        isAdminBooking: false,
        customerReview: 2,
        allDay: false,
        status: 'cancelled'
    },
    {
        id: 'f445465',
        title: 'Rayitos',
        start: new Date(2025, 9, 21, 17, 45, 0),
        end: new Date(2025, 9, 21, 18, 30, 0),
        customer: {
            id: "105",
            name: "David Ortiz",
            phone: '3004394704'
        },
        selectedService: {
            serviceId: "006",
            name: "Rayitos",
            duration: { hours: 0, minutes: 45 },
            price: 25_000
        },
        selectedProfessional: {
            id: 'abc',
            name: 'Gregorio Carrena'
        },
        isAdminBooking: false,
        customerReview: 3,
        allDay: false,
        status: 'completed'
    },
    {
        id: 'f445465',
        title: 'Aminoacidos',
        start: new Date(2025, 9, 21, 17, 45, 0),
        end: new Date(2025, 9, 21, 18, 30, 0),
        customer: {
            id: "678",
            name: "David Ortiz",
            phone: '3004394704'
        },
        selectedService: {
            serviceId: "789",
            name: "Aminoacidos",
            duration: { hours: 2, minutes: 45 },
            price: 70_000
        },
        selectedProfessional: {
            id: 'bcf',
            name: "Carlos Castro"
        },
        isAdminBooking: false,
        customerReview: 2,
        allDay: false,
        status: 'completed'
    }
] // TODO: Get from Api

const INITIAL_DATES = [new Date(), new Date()]

export default function ReportPage() {

    const [activeOption, setActiveOption] = useState<TimeOptionItem>(timeOptions[0])
    const [dateLimits, setDateLimits] = useState<Date[]>(INITIAL_DATES)
    const [activeTab, setActiveTab] = useState(tabs[0].id)
    const [selectedProfessional, setSelectedProfessional] = useState(defaultValue)


    const handleChangeDate = (value: number) => { //TODO: Fortnight & month 16/31 days
        setDateLimits(prev => {
            const newDates = prev.map(date => {
                const newDate = new Date(date)
                switch (activeOption.id) {
                    case 'day':
                        newDate.setDate(newDate.getDate() + value)
                        break
                    case 'week':
                        newDate.setDate(newDate.getDate() + 7 * value)
                        break
                    case 'fortnight':
                        newDate.setDate(newDate.getDate() + 15 * value)
                        break
                    case 'month':
                        newDate.setMonth(newDate.getMonth() + value)
                        break
                    case 'year':
                        newDate.setFullYear(newDate.getFullYear() + value)
                        break
                    default:
                        break
                }
                return newDate
            })

            return newDates
        })
    }

    const getDayLabel = () => formatDate({ date: dateLimits[0], weekday: true }).toLocaleLowerCase()

    const getShortDateLabel = () => {
        const start = formatDate({ date: dateLimits[0], month: '2-digit', year: '2-digit' })
        const end = formatDate({ date: dateLimits[1], month: '2-digit', year: '2-digit' })
        return `${start} al ${end}`
    }

    const getMonthLabel = () => {
        return `${MONTHS_OF_YEAR[dateLimits[0].getMonth()]} ${dateLimits[0].getFullYear()}`
    }

    const getYearLabel = () => dateLimits[0].getFullYear().toString()

    const getDateLabel = () => {
        switch (activeOption.id) {
            case 'day': return getDayLabel()
            case 'week': return getShortDateLabel()
            case 'fortnight': return getShortDateLabel()
            case 'month': return getMonthLabel()
            case 'year': return getYearLabel()
            default: return ''
        }
    }

    const showDates = useMemo(() => getDateLabel(), [activeOption, dateLimits])
    // const greaterOrEqualThanToday = useMemo(() => isGreaterOrEqualThanToday(currentDate), [currentDate])
    // const lessOrEqualThanFoundationYear = useMemo(() => currentDate.getFullYear() <= foundationDate.getFullYear(), [currentDate])

    useEffect(() => {
        const onChangeOption = () => {
            switch (activeOption.id) {
                case 'day':
                    setDateLimits(INITIAL_DATES)
                    break
                case 'week':
                    const startDate = new Date()
                    startDate.setDate(startDate.getDate() - startDate.getDay() + 1)
                    const endDate = new Date(startDate)
                    endDate.setDate(endDate.getDate() + 6)
                    setDateLimits([startDate, endDate])
                    break
                case 'fortnight': {
                    const startDate = new Date()
                    const endDate = new Date()
                    const isSecondHalf = startDate.getDate() > 15

                    startDate.setDate(isSecondHalf ? 16 : 1)
                    const lastDay = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0).getDate()
                    endDate.setDate(isSecondHalf ? lastDay : 15)
                    setDateLimits([startDate, endDate])
                    break
                }
                case 'month': {
                    const startDate = new Date()
                    const endDate = new Date()
                    startDate.setDate(1)
                    const lastDay = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0).getDate()
                    endDate.setDate(lastDay)
                    setDateLimits([startDate, endDate])
                    break
                }
                case 'year': {
                    const currentYear = new Date().getFullYear()
                    const startDate = new Date(currentYear, 0, 1)
                    const endDate = new Date(currentYear, 11, 31)
                    setDateLimits([startDate, endDate])
                    break
                }
            }
        }

        onChangeOption()

    }, [activeOption])

    useEffect(()=> {
        console.log(dateLimits)
    }, [dateLimits])

    return (
        <>
            <h1 className="text-lg text-green-700 mb-3 font-bold">Informes</h1>
            <div className="flex flex-col gap-6">
                <div className="bg-white w-full rounded-md p-7 relative flex flex-col gap-6">
                    <ul className="flex overflow-scroll md:overflow-auto md:flex-wrap md:justify-center gap-2 scroll-none">
                        {
                            timeOptions.map(option => (
                                <li title={option.label} onClick={() => setActiveOption(option)} key={option.id}
                                    className={
                                        clsx(
                                            "flex items-center px-4 py-1 border rounded-full border-green-700 text-green-700 hover:bg-green-700 hover:text-white text-sm cursor-pointer",
                                            { "bg-green-700 text-white": activeOption.id === option.id }
                                        )
                                    }>{option.label}</li>
                            ))
                        }
                    </ul>
                    <div className="flex items-center gap-3 justify-center py-3">
                        <button onClick={() => handleChangeDate(-1)} className="text-2xl text-green-700 cursor-pointer disabled:pointer-events-none disabled:opacity-50">
                            <IoIosArrowBack />
                        </button>
                        <span className="flex-1 md:max-w-[400px] text-center">{activeOption.label}: {showDates}</span>
                        <button onClick={() => handleChangeDate(1)} className="text-2xl text-green-700 cursor-pointer disabled:pointer-events-none disabled:opacity-50">
                            <IoIosArrowForward />
                        </button>
                    </div>
                    <SimpleTabs
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        tabs={tabs}
                    />
                    <SelectProfessional
                        professionals={professionals}
                        selectedProfessional={selectedProfessional}
                        setSelectedProfessional={setSelectedProfessional as React.Dispatch<React.SetStateAction<ProfessionalSettings | ProfessionalData>>}
                        allOption
                    />
                    {
                        activeTab === 'general' &&
                        <ul className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <li className="flex flex-col gap-1 items-center h-32 justify-center p-3 border border-zinc-200 rounded-md text-center col-span-2 transition-all">
                                Ventas generales
                                <span className="text-green-700 font-bold">$80.000</span>
                            </li>
                            <li className="flex flex-col gap-1 items-center h-32 justify-center p-3 border border-zinc-200 rounded-md text-center transition-all">
                                Tiempo promedio de los servicios
                                <span className="text-green-700 font-bold">40 min</span>
                            </li>
                            <li className="flex flex-col gap-1 items-center h-32 justify-center p-3 border border-zinc-200 rounded-md text-center transition-all">
                                Servicios completados
                                <span className="text-green-700 font-bold">3</span>
                            </li>
                            <li className="flex flex-col gap-1 items-center h-32 justify-center p-3 border border-zinc-200 rounded-md text-center transition-all">
                                Valor promedio de servicios completados
                                <span className="text-green-700 font-bold">$25.000</span>
                            </li>
                            <li className="flex flex-col gap-1 items-center h-32 justify-center p-3 border border-zinc-200 rounded-md text-center transition-all">
                                Gastos
                                <span className="text-green-700 font-bold">$0</span>
                            </li>
                            {
                                !selectedProfessional.id &&
                                <li className="flex flex-col gap-1 items-center h-32 justify-center p-3 border border-zinc-200 rounded-md text-center col-span-2 transition-all">
                                    Profesional con más ventas
                                    <div className="grid grid-cols-2 items-center">
                                        <div className="flex items-center gap-3 pr-4 border-r border-zinc-200">
                                            {true ?
                                                <Image
                                                    src="https://picsum.photos/64/64"
                                                    width={64}
                                                    height={64}
                                                    alt="Image"
                                                    className="rounded-full h-16 w-16 object-cover"
                                                /> : <></>}
                                            <span className="text-green-700 font-bold">Carlos Castro</span>
                                        </div>
                                        <span className="text-green-700 font-bold">$90.000</span>
                                    </div>
                                </li>
                            }
                            <li className="flex flex-col gap-1 items-center h-32 justify-center p-3 border border-zinc-200 rounded-md text-center col-span-2">
                                Servicio más vendido
                                <span className="text-green-700 font-bold">Corte hombre</span>
                            </li>
                            <li className="flex flex-col gap-1 items-center h-32 justify-center p-3 border border-zinc-200 rounded-md text-center">
                                Agendamientos manuales
                                <span className="text-green-700 font-bold">2</span>
                            </li>
                            <li className="flex flex-col gap-1 items-center h-32 justify-center p-3 border border-zinc-200 rounded-md text-center">
                                Agendamientos Beauty Booking
                                <span className="text-green-700 font-bold">3</span>
                            </li>
                            <li className="flex flex-col gap-1 items-center h-32 justify-center p-3 border border-zinc-200 rounded-md text-center">
                                Tasa de abandono de citas
                                <span className="text-green-700 font-bold">0%</span>
                            </li>
                            <li className="flex flex-col gap-1 items-center h-32 justify-center p-3 border border-zinc-200 rounded-md text-center">
                                Tasa de cancelación de citas
                                <span className="text-green-700 font-bold">2.5%</span>
                            </li>
                            <li className={
                                clsx(
                                    "flex flex-col gap-1 items-center h-32 justify-center p-3 border border-zinc-200 rounded-md text-center col-span-2",
                                    { "md:col-span-4": selectedProfessional.id }
                                )
                            }>
                                Total clientes atendidos
                                <span className="text-green-700 font-bold">5</span>
                            </li>
                        </ul>
                    }
                </div>
            </div>
        </>
    )
}