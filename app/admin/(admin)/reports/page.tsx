'use client'

import { SimpleTabs } from '@/components'
import { formatDate, formatMinutes, formatNumber, isGreaterOrEqualThanToday, isLessOrEqualThan, isLessOrEqualThanToday } from '@/helpers'
import { MONTHS_OF_YEAR } from '@/util/const'
import clsx from 'clsx'
import { useEffect, useMemo, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { SelectProfessional } from '../components'
import { professionals } from '@/util/fake-data'
import Image from 'next/image'


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

const foundationDate = new Date(2024, 9, 15)

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
            name: "Rayitos",
            duration: { hours: 0, minutes: 45 },
            price: 30_000
        },
        selectedProfessional: {
            id: 'bcf',
            name: "Carlos Castro"
        },
        isAdminBooking: true,
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
        id: 'f445460',
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
type Selling = {  name: string, count: number }
interface DataSummary {
    totalSales: number
    averageServiceTime: number
    completedServices: number
    averageServiceValue: number
    bills: number
    bestSellingProfessional: Selling
    bestSellingService: Selling
    manualScheduling: number
    adminScheduling: number
    abortedRate: number
    cancellationRate: number
    totalCustomers: number
}


export default function ReportPage() {

    const [activeOption, setActiveOption] = useState<TimeOptionItem>(timeOptions[0])
    const [dateRange, setDateRange] = useState<Date[]>(INITIAL_DATES)
    const [activeTab, setActiveTab] = useState(tabs[0].id)
    const [selectedProfessional, setSelectedProfessional] = useState(defaultValue)
    const [dataSummary, setDataSummary] = useState<DataSummary>()

    const shiftMonthToEnd = (date: Date, offset: number) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        return new Date(year, month + 1 + offset, 0)
    }

    const handleChangeDate = (value: number) => { //TODO: Fortnight 16
        setDateRange(prev => {
            const newDates = prev.map((date, index) => {
                let newDate = new Date(date)
                switch (activeOption.id) {
                    case 'day':
                        newDate.setDate(newDate.getDate() + value)
                        break
                    case 'week':
                        newDate.setDate(newDate.getDate() + 7 * value)
                        break
                    case 'fortnight': {
                        const year = newDate.getFullYear()
                        const monthIndex = newDate.getMonth()
                        const isFirstHalf = newDate.getDate() <= 15

                        if (isFirstHalf) {
                            const month = value === 1 ? monthIndex : monthIndex + value
                            newDate = new Date(year, index === 0 ? month : month + 1, index === 0 ? 16 : 0)
                        } else {
                            const month = value === -1 ? monthIndex : monthIndex + value
                            newDate = new Date(year, month, index === 0 ? 1 : 15)
                        }
                        break
                    }

                    case 'month':
                        newDate = index === 0
                            ? new Date(newDate.getFullYear(), newDate.getMonth() + value, newDate.getDate())
                            : shiftMonthToEnd(newDate, value)
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

    const getDayLabel = () => formatDate({ date: dateRange[0], weekday: true }).toLocaleLowerCase()

    const getShortDateLabel = () => {
        const start = formatDate({ date: dateRange[0], month: '2-digit', year: '2-digit' })
        const end = formatDate({ date: dateRange[1], month: '2-digit', year: '2-digit' })
        return `${start} al ${end}`
    }

    const getMonthLabel = () => {
        return `${MONTHS_OF_YEAR[dateRange[0].getMonth()]} ${dateRange[0].getFullYear()}`
    }

    const getYearLabel = () => dateRange[0].getFullYear().toString()

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

    const showDates = useMemo(() => getDateLabel(), [activeOption, dateRange])
    const greaterOrEqualThanToday = useMemo(() => isGreaterOrEqualThanToday(dateRange[1]), [dateRange])
    const lessOrEqualThanFoundationDate = useMemo(() => isLessOrEqualThan(dateRange[0], foundationDate), [dateRange])

    useEffect(() => {
        const onChangeOption = () => {
            switch (activeOption.id) {
                case 'day':
                    setDateRange(INITIAL_DATES)
                    break
                case 'week':
                    const startDate = new Date()
                    startDate.setDate(startDate.getDate() - startDate.getDay() + 1)
                    const endDate = new Date(startDate)
                    endDate.setDate(endDate.getDate() + 6)
                    setDateRange([startDate, endDate])
                    break
                case 'fortnight': {
                    const startDate = new Date()
                    const endDate = new Date()
                    const isSecondHalf = startDate.getDate() > 15

                    startDate.setDate(isSecondHalf ? 16 : 1)
                    const lastDay = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0).getDate()
                    endDate.setDate(isSecondHalf ? lastDay : 15)
                    setDateRange([startDate, endDate])
                    break
                }
                case 'month': {
                    const startDate = new Date()
                    const endDate = new Date()
                    startDate.setDate(1)
                    const lastDay = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0).getDate()
                    endDate.setDate(lastDay)
                    setDateRange([startDate, endDate])
                    break
                }
                case 'year': {
                    const currentYear = new Date().getFullYear()
                    const startDate = new Date(currentYear, 0, 1)
                    const endDate = new Date(currentYear, 11, 31)
                    setDateRange([startDate, endDate])
                    break
                }
            }
        }

        onChangeOption()

    }, [activeOption])

    useEffect(() => {
        // TODO: This will be created on the server side (backend)
        const getData = (dateRange: Date[], professionalId: string) => {
            const [start, end] = dateRange.map(date => new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime())
            const filteredData = events.filter(event => {
                const eventDate = new Date(event.start.getFullYear(), event.start.getMonth(), event.start.getDate()).getTime()
                const condition = professionalId ? event.selectedProfessional.id === professionalId && eventDate >= start && eventDate <= end : eventDate >= start && eventDate <= end
                return condition
            })

            let totalServiceTime = 0
            let abortedEvents = 0
            let cancelledEvents = 0
            const servicesCount: { [key: string]: number } = {}
            const professionalTotalSelling: { [key: string]: number } = {}
            const customerList = new Set()

            const dataSummary = filteredData.reduce((acc, event) => {
                const { selectedService, selectedProfessional: { id: professionalId, name: professionalName }, status, isAdminBooking, customer } = event
                const { serviceId } = selectedService

                if (status === 'completed') {
                    totalServiceTime += (selectedService.duration.hours * 60 + selectedService.duration.minutes)
                    acc.totalSales += selectedService.price
                    acc.completedServices += 1
                    acc.averageServiceTime = Math.round(totalServiceTime / acc.completedServices)
                    acc.averageServiceValue = Math.round(acc.totalSales / acc.completedServices)

                    // all professionals selected
                    if (!selectedProfessional.id) {
                        professionalTotalSelling[professionalId] = (professionalTotalSelling[professionalId] || 0) + selectedService.price

                        if (professionalTotalSelling[professionalId] > acc.bestSellingProfessional.count) {
                            acc.bestSellingProfessional.count = professionalTotalSelling[professionalId]
                            acc.bestSellingProfessional.name = professionalName
                        }
                    }

                    if (customer.id && !customerList.has(customer.id)) {
                        acc.totalCustomers += 1
                        customerList.add(customer.id)
                    }

                    servicesCount[serviceId] = (servicesCount[serviceId] || 0) + 1

                    if (servicesCount[serviceId] > acc.bestSellingService.count) {
                        acc.bestSellingService.count = servicesCount[serviceId]
                        acc.bestSellingService.name = selectedService.name
                    }
                }
                if (status === 'aborted') {
                    abortedEvents += 1
                    acc.abortedRate = parseFloat(((abortedEvents / filteredData.length) * 100).toFixed(1))
                }

                if (status === 'cancelled') {
                    cancelledEvents += 1
                    acc.cancellationRate = parseFloat(((cancelledEvents / filteredData.length) * 100).toFixed(1))
                }

                isAdminBooking ? acc.adminScheduling += 1 : acc.manualScheduling += 1

                return acc
            },
                {
                    totalSales: 0,
                    averageServiceTime: 0,
                    completedServices: 0,
                    averageServiceValue: 0,
                    bills: 0,
                    bestSellingProfessional: {
                        name: '',
                        count: 0
                    },
                    bestSellingService: {
                        name: '',
                        count: 0
                    },
                    manualScheduling: 0,
                    adminScheduling: 0,
                    abortedRate: 0,
                    cancellationRate: 0,
                    totalCustomers: 0
                }
            )

            return dataSummary
        }

        const data = getData(dateRange, selectedProfessional.id)
        setDataSummary(data)
    }, [dateRange, selectedProfessional])


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
                        <button disabled={lessOrEqualThanFoundationDate} onClick={() => handleChangeDate(-1)} className="text-2xl text-green-700 cursor-pointer disabled:pointer-events-none disabled:opacity-50">
                            <IoIosArrowBack />
                        </button>
                        <span className="flex-1 md:max-w-[400px] text-center">{activeOption.label}: {showDates}</span>
                        <button disabled={greaterOrEqualThanToday} onClick={() => handleChangeDate(1)} className="text-2xl text-green-700 cursor-pointer disabled:pointer-events-none disabled:opacity-50">
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
                        <>
                            <ul className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <li className="flex flex-col gap-1 items-center h-32 justify-center p-3 border border-zinc-200 rounded-md text-center col-span-2 transition-all">
                                    Ventas generales
                                    <span className="text-green-700 font-bold">
                                        ${formatNumber(dataSummary?.totalSales.toString() ?? '')}
                                    </span>
                                </li>
                                <li className="flex flex-col gap-1 items-center h-32 justify-center p-3 border border-zinc-200 rounded-md text-center transition-all">
                                    Tiempo promedio de los servicios
                                    <span className="text-green-700 font-bold">
                                        {formatMinutes(dataSummary?.averageServiceTime ?? 0)}
                                    </span>
                                </li>
                                <li className="flex flex-col gap-1 items-center h-32 justify-center p-3 border border-zinc-200 rounded-md text-center transition-all">
                                    Servicios completados
                                    <span className="text-green-700 font-bold">
                                        {dataSummary?.completedServices}
                                    </span>
                                </li>
                                <li className="flex flex-col gap-1 items-center h-32 justify-center p-3 border border-zinc-200 rounded-md text-center transition-all">
                                    Valor promedio de servicios completados
                                    <span className="text-green-700 font-bold">
                                        ${formatNumber(dataSummary?.averageServiceValue.toString() ?? '')}
                                    </span>
                                </li>
                                <li className="flex flex-col gap-1 items-center h-32 justify-center p-3 border border-zinc-200 rounded-md text-center transition-all">
                                    Gastos
                                    <span className="text-green-700 font-bold">
                                         ${formatNumber(dataSummary?.bills.toString() ?? '')}
                                    </span>
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
                                                <span className="text-green-700 font-bold">
                                                    {dataSummary?.bestSellingProfessional.name}
                                                </span>
                                            </div>
                                            <span className="text-green-700 font-bold">
                                               ${formatNumber(dataSummary?.bestSellingProfessional.count.toString() ?? '')}
                                            </span>
                                        </div>
                                    </li>
                                }
                                <li className="flex flex-col gap-1 items-center h-32 justify-center p-3 border border-zinc-200 rounded-md text-center col-span-2">
                                    Servicio más vendido
                                    <span className="text-green-700 font-bold">
                                        {dataSummary?.bestSellingService.name}
                                    </span>
                                </li>
                                <li className="flex flex-col gap-1 items-center h-32 justify-center p-3 border border-zinc-200 rounded-md text-center">
                                    Agendamientos manuales
                                    <span className="text-green-700 font-bold">
                                        {dataSummary?.manualScheduling}
                                    </span>
                                </li>
                                <li className="flex flex-col gap-1 items-center h-32 justify-center p-3 border border-zinc-200 rounded-md text-center">
                                    Agendamientos Beauty Booking
                                    <span className="text-green-700 font-bold">
                                        {dataSummary?.adminScheduling}
                                    </span>
                                </li>
                                <li className="flex flex-col gap-1 items-center h-32 justify-center p-3 border border-zinc-200 rounded-md text-center">
                                    Tasa de abandono de citas
                                    <span className="text-green-700 font-bold">
                                        {dataSummary?.abortedRate ?? 0}%
                                    </span>
                                </li>
                                <li className="flex flex-col gap-1 items-center h-32 justify-center p-3 border border-zinc-200 rounded-md text-center">
                                    Tasa de cancelación de citas
                                    <span className="text-green-700 font-bold">
                                        {dataSummary?.cancellationRate ?? 0}%
                                    </span>
                                </li>
                                <li className={
                                    clsx(
                                        "flex flex-col gap-1 items-center h-32 justify-center p-3 border border-zinc-200 rounded-md text-center col-span-2",
                                        { "md:col-span-4": selectedProfessional.id }
                                    )
                                }>
                                    Total clientes atendidos
                                    <span className="text-green-700 font-bold">{dataSummary?.totalCustomers}</span>
                                </li>
                            </ul>
                        </>
                    }
                </div>
            </div>
        </>
    )
}