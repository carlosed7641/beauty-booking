'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { Calendar, Formats, SlotInfo, View } from 'react-big-calendar'
import { format } from 'date-fns'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useModal, useService } from '@/store'
import { BookingServiceModal } from '@/(beauty)/components'
import { useSchedule } from '../store'
import { EventSummary, ScheduleSelect, UpdateCustomer, CustomDays, ScheduleButton, ScheduleAssign, SelectProfessional, EventList } from '../components'
import { isGreaterOrEqualThanToday, generateMonthDatesArray, getMessagesES, localizer, format24, compareDates } from '@/helpers'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { CALENDAR_VIEWS, DEFAULT_PROFESSIONAL } from '@/util/const'

interface Props {
    foundationYear: number
    professionals: ProfessionalData[]
    customers: CustomerInfo[]
}

const eventPropGetter = () => ({
    style: {
        backgroundColor: '#008236',
        color: '#ffffff'
    }
})

const formats: Formats = {
    timeGutterFormat: "h:mm a",
    eventTimeRangeFormat: ({ start, end }) =>
        `${format(start, 'h:mm a')} - ${format(end, 'h:mm a')}`,
    dayRangeHeaderFormat: ({ start, end }) =>
        `${format(start, "MMM d")} - ${format(end, "MMM d")}`,
}

const bdEvents: EventDate[] = [
    {
        id: 'f445465',
        title: 'Cepillado',
        start: new Date(2025, 9, 6, 17, 45, 0),
        end: new Date(2025, 9, 6, 18, 30, 0),
        customer: {
            id: "125",
            name: "David Ortiz",
            phone: { indicator: '57', number: '3004394704' },
            birthDay: new Date(),
            gender: 'men',
            reviewPointsAverage: 5
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
        allDay: false
    },
    {
        id: 'f445466',
        title: 'Cepillado',
        start: new Date(2025, 10, 6, 17, 45, 0),
        end: new Date(2025, 10, 6, 18, 30, 0),
        customer: {
            id: "125",
            name: "David Ortiz",
            phone: { indicator: '57', number: '3004394704' },
            birthDay: new Date(),
            gender: 'men',
            reviewPointsAverage: 5
        },
        selectedService: {
            serviceId: "006",
            name: "Cepillado",
            duration: { hours: 0, minutes: 45 },
            price: 30_000
        },
        selectedProfessional: {
            id: 'abc',
            name: "Gregorio Carrena"
        },
        isAdminBooking: false,
        customerReview: 2,
        allDay: false
    }
] // TODO: Get from Api

export const Schedule = ({ foundationYear, professionals,  customers }: Props) => {

    const { openModal, setOpenModal } = useModal()
    const { serviceState, setServiceState } = useService()
    const { schedule, setSchedule } = useSchedule()
    const { date, view } = useSchedule(state => state.schedule)
    const [step, setStep] = useState(1)
    const [events, setEvents] = useState<EventDate[]>([])
    const [profEvents, setProfEvents] = useState<EventDate[]>([])
    const [selectedProfessional, setSelectedProfessional] = useState(DEFAULT_PROFESSIONAL)

    const onSelectEvent = (event: EventDate) => {
        setOpenModal('ScheduleEvent')
        setSchedule({ ...schedule, selectedEvent: event })
    }

    const onSelectSlot = (e: SlotInfo) => {
        const date = e.start
        const isAvailable = isGreaterOrEqualThanToday(date)
        if (!isAvailable) return
        setServiceState({
            ...serviceState,
            selectedHour: format24(date)
        })
        setSchedule({ ...schedule, date })
        setOpenModal('ScheduleAssing')
    }

    const onChangeDate = (value: number, type: 'month' | 'year') => {
        const newDate = new Date(date)
        type === 'year' ? newDate.setFullYear(value) : newDate.setMonth(value)

        setSchedule({ ...schedule, date: newDate })
        setOpenModal(null)
    }

    const onSelectProfessional = (professional: ProfessionalData) => {
        setSelectedProfessional(p => (
            p.id === professional.id ?
                DEFAULT_PROFESSIONAL :
                professional
        ))
    }

    const setCustomerReview = (reviewPoints: number) => {
        //TODO: Api patch
        // event.customerReview
    }

    useEffect(() => {
        if (!openModal) {
            setStep(1)
            setSchedule({ ...schedule, isUpdatingReview: false })
        }
    }, [openModal])

    useEffect(() => {
        const fetchEvents = async () => {
            const month = date.getMonth()
            const year = date.getFullYear()

            // TODO: reemplazar por llamada real al backend
            // Ejemplo:
            // const res = await api.get(`/events?month=${month + 1}&year=${year}`)
            // setEvents(res.data)

            const simulated = bdEvents.filter(ev =>
                ev.start.getMonth() === month &&
                ev.start.getFullYear() === year
            )

            setEvents(simulated)
        }

        fetchEvents()

    }, [date.getMonth(), date.getFullYear()])

    useEffect(() => {
        const currentEvents = events.filter(e =>
            e.selectedProfessional.id === selectedProfessional.id
            && compareDates(date, e.start)
        )
        setProfEvents(currentEvents)
    }, [events, date, selectedProfessional])

    const isValidDate = useMemo(() => isGreaterOrEqualThanToday(date), [date])

    return (
        <>
            <div className="flex items-center gap-2 mb-3">
                <Link href="/admin" title="Volver">
                    <IoMdArrowRoundBack className="cursor-pointer text-xl text-green-700" />
                </Link>
                <h1 className="text-lg text-green-700 font-bold">Agenda</h1>
            </div>
            <div className="flex flex-col gap-6">
                <div className="bg-white w-full rounded-md p-7 relative">
                    <CustomDays
                        onClick={(dayItem) => setSchedule({ ...schedule, date: dayItem.date })}
                        date={schedule.date}
                        disabledDays="none"
                    />
                    <SelectProfessional
                        professionals={professionals}
                        selectedProfessional={selectedProfessional}
                        setSelectedProfessional={onSelectProfessional as () => void}
                    />
                    {
                        selectedProfessional.id ?
                            profEvents.length > 0 ?
                                <EventList
                                    events={profEvents}
                                    setCustomerReview={setCustomerReview}
                                />
                                :
                                <h2 className="text-center text-zinc-600 py-10">
                                    No se encontraron agendas para este día
                                </h2>
                            :
                            <Calendar
                                culture='es'
                                selectable
                                onSelectSlot={onSelectSlot}
                                messages={getMessagesES()}
                                views={CALENDAR_VIEWS}
                                onView={view => setSchedule({ ...schedule, view })}
                                view={view as View}
                                date={date}
                                onNavigate={date => setSchedule({ ...schedule, date })}
                                localizer={localizer}
                                events={events}
                                startAccessor="start"
                                endAccessor="end"
                                components={{
                                    event: ({ event }) => <Event event={event} />,
                                    toolbar: () => null
                                }}
                                eventPropGetter={eventPropGetter}
                                onSelectEvent={onSelectEvent}
                                formats={formats}
                                className="h-screen! md:h-125!"
                            />
                    }
                    {isValidDate && <ScheduleButton />}
                </div>
            </div>
            {openModal === 'ScheduleAssing' && <ScheduleAssign customers={customers} />}
            {openModal === 'UpdateCustomer' && <UpdateCustomer />}
            {openModal === 'ServiceList' && serviceState.selectedService &&
                <BookingServiceModal
                    setStep={setStep}
                    step={step}
                    dates={generateMonthDatesArray(date)}
                    professionals={professionals}
                    isAdmin
                />
            }
            {openModal === 'ScheduleEvent' && <EventSummary />}
            {openModal === 'ScheduleMonths' &&
                <ScheduleSelect
                    type="month"
                    date={date}
                    onChangeDate={onChangeDate}
                />
            }
            {openModal === 'ScheduleYears' &&
                <ScheduleSelect
                    type="year"
                    date={date}
                    onChangeDate={onChangeDate}
                    yearLimit={foundationYear}
                />
            }
        </>
    )
}

const Event = ({ event }: { event: EventDate }) => {
    return (
        <>
            <p className="font-bold mb-1">{event.customer.name}</p>
            <p className="text-[80%]">{event.title}</p>
        </>
    )
}