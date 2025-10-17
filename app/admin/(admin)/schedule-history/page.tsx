'use client'

import { useModal } from '@/store'
import { CustomDays, ScheduleMonths, ScheduleYears, SelectProfessional, CustomerReviewOptions } from '../components'
import { useEffect, useState } from 'react'
import { professionals } from '@/util/fake-data'
import { Emotion, SimpleTabs } from '@/components'
import { GoQuestion, GoCheck } from 'react-icons/go'
import { compareDates, formatDate, formatTextHour } from '@/helpers'

const foundationYear = 2020  // TODO: Api
const professionalsEmployees = [...professionals] // TODO: Api

const tabs = [
    { id: 'all', label: 'Todas' },
    { id: 'noRated', label: 'Reservas sin calificar', icon: GoQuestion },
    { id: 'rated', label: 'Reservas Efectivas', icon: GoCheck }
]

const events: EventDate[] = [ // 17/10 - 15/10 - 30/9
    {
        id: 'f445465',
        title: 'Corte hombre',
        start: new Date(2025, 9, 17, 10, 45, 0),
        end: new Date(2025, 9, 17, 11, 30, 0),
        customer: {
            id: "125",
            name: "David Ortiz",
            phone: '3004394704'
        },
        selectedService: {
            serviceId: "001",
            name: "Corte hombre",
            duration: "45m",
            price: 35_000
        },
        selectedProfessional: {
            id: 'bcf',
            name: "Carlos Castro"
        },
        isAdminBooking: true,
        customerReview: 3,
        allDay: false
    },
    {
        id: 'f445466',
        title: 'Corte niño',
        start: new Date(2025, 9, 15, 17, 45, 0),
        end: new Date(2025, 9, 15, 18, 30, 0),
        customer: {
            id: "125",
            name: "David Ortiz",
            phone: '3004394704'
        },
        selectedService: {
            serviceId: "016",
            name: "Corte niño",
            duration: "35m",
            price: 30_000
        },
        selectedProfessional: {
            id: 'abc',
            name: "Gregorio Carrena"
        },
        isAdminBooking: false,
        customerReview: 2,
        allDay: false
    },
    {
        id: 'f445467',
        title: 'Rayitos platinados',
        start: new Date(2025, 8, 30, 17, 45, 0),
        end: new Date(2025, 8, 30, 18, 30, 0),
        customer: {
            id: "125",
            name: "Gerard Piqué",
            phone: '3004398380'
        },
        selectedService: {
            serviceId: "006",
            name: "Rayitos platinados",
            duration: "45m",
            price: 20_000
        },
        selectedProfessional: {
            id: 'bcf',
            name: "Carlos Castro"
        },
        isAdminBooking: false,
        customerReview: 2,
        allDay: false
    }
] // TODO: Get from Api

export default function ScheduleHistoryPage() {

    const { openModal, setOpenModal } = useModal()
    const [date, setDate] = useState(new Date())
    const [selectedProfessional, setSelectedProfessional] = useState(professionalsEmployees[0])
    const [currentTab, setCurrentTab] = useState('all')
    const [currentEvents, setCurrentEvents] = useState<EventDate[]>([])
    const [isUpdatingReview, setIsUpdatingReview] = useState(false)


    const onChangeDate = (value: number, type: 'month' | 'year') => {
        setDate(prev => {
            const newDate = new Date(prev)
            type === 'year' ? newDate.setFullYear(value) : newDate.setMonth(value)
            return newDate
        })

        setOpenModal(null)
    }

    const setCustomerReview = (reviewPoints: number) => {
        //TODO: Api patch
        // event.customerReview
    }

    useEffect(() => {
        const getEvents = () => {
            // TODO: Api get Select events where selectedProfessional.id === event.selectedProfessional.id && date === event.start
            const filteredEvents = events.filter(event => {
                const isSameDay = compareDates(date, event.start)
                const isSameProfesional = selectedProfessional.id === event.selectedProfessional.id
                return isSameDay && isSameProfesional
            })

            return filteredEvents
        }

        const filteredEvents = getEvents()
        setCurrentEvents(filteredEvents)

    }, [date, selectedProfessional])

    return (
        <>
            <h1 className="text-lg text-green-700 mb-3 font-bold">Historial de agenda</h1>
            <div className="flex flex-col gap-6">
                <div className="bg-white w-full rounded-md p-7 relative flex flex-col gap-4">
                    <CustomDays
                        disabledDays="afterToday"
                        onClick={dateItem => setDate(dateItem.date)}
                        date={date}
                    />
                    <SelectProfessional
                        professionals={professionalsEmployees}
                        selectedProfessional={selectedProfessional}
                        setSelectedProfessional={setSelectedProfessional as React.Dispatch<React.SetStateAction<ProfessionalSettings | ProfessionalData>>}
                    />
                    <SimpleTabs
                        tabs={tabs}
                        activeTab={currentTab}
                        setActiveTab={setCurrentTab}
                    />
                    {
                        currentEvents.length > 0 ?
                            <ul>
                                {
                                    currentEvents.map(event => {
                                        const startHours = event.start.getHours()
                                        const startMinutes = event.start.getMinutes()
                                        const endHours = event.end.getHours()
                                        const endMinutes = event.end.getMinutes()
                                        const duration = `${formatTextHour(`${startHours}:${startMinutes}`)} a ${formatTextHour(`${endHours}:${endMinutes}`)}`
                                        return (
                                            <li key={event.id} className="flex flex-col p-2 border border-zinc-300">
                                                <span className="text-green-700">{event.customer.name}</span>
                                                <span>{event.selectedService.name}</span>
                                                <span>{formatDate(event.start)}</span>
                                                <p className="flex gap-2 items-center">
                                                    <span>De {duration}</span>
                                                    {
                                                        event.isAdminBooking && <span className="px-2 py-0.5 bg-green-700 text-white text-xs rounded-full">Beauty Booking</span>
                                                    }
                                                </p>
                                                {
                                                    event.customerReview && !isUpdatingReview ?
                                                        <div className="flex items-center gap-2">
                                                            <Emotion showLabel averagePoints={event.customerReview} />
                                                            <button onClick={() => setIsUpdatingReview(prev => !prev)} className="bg-green-700 text-sm text-white rounded-full px-5 py-1 hover:bg-green-800 cursor-pointer">Editar</button>
                                                        </div>
                                                        :
                                                        <CustomerReviewOptions setCustomerReview={setCustomerReview} />
                                                }
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            :
                            <h2 className="text-center">No se encontraron agendas para este día</h2>
                    }
                </div>
            </div>
            {openModal === 'ScheduleMonths' && <ScheduleMonths date={date} onChangeDate={onChangeDate} />}
            {openModal === 'ScheduleYears' &&
                <ScheduleYears
                    foundationYear={foundationYear}
                    date={date}
                    onChangeDate={onChangeDate}
                />
            }
        </>
    )
}