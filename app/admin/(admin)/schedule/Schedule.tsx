'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { Calendar, Formats, SlotInfo, View } from 'react-big-calendar'
import { format } from 'date-fns'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useEvents, useModal, useService } from '@/store'
import { BookingServiceModal } from '@/(beauty)/components'
import { useSchedule } from '../store'
import { EventSummary, ScheduleSelect, UpdateCustomer, CustomDays, ScheduleButton, ScheduleAssign, SelectProfessional, EventList, CancelEvent } from '../components'
import { isGreaterOrEqualThanToday, generateMonthDatesArray, getMessagesES, localizer, format24, compareDates } from '@/helpers'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { CALENDAR_VIEWS } from '@/util/const'
import { getEventsByMonth } from '@/actions'
import { ImSpinner8 } from 'react-icons/im'
import { TbReload } from 'react-icons/tb'

interface Props {
    foundationYear: number
    professionals: ProfessionalSchedule[]
    customers: CustomerInfo[]
    entityId: string
    services: Service[]
    workdays: number[]
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

export const Schedule = ({ foundationYear, professionals, customers, entityId, services, workdays }: Props) => {

    const openModal = useModal(state => state.openModal)
    const setOpenModal = useModal(state => state.setOpenModal)
    const serviceState = useService(state => state.serviceState)
    const setServiceState = useService(state => state.setServiceState)

    const schedule = useSchedule(state => state.schedule)
    const setSchedule = useSchedule(state => state.setSchedule)
    const { date, view } = useSchedule(state => state.schedule)
    const events = useEvents(state => state.events)
    const setEvents = useEvents(state => state.setEvents)

    const [step, setStep] = useState(1)
    const [profEvents, setProfEvents] = useState<EventDate[]>([])
    const [selectedProfessional, setSelectedProfessional] = useState<ProfessionalData | null>(null)
    const [isLoadingEvents, setIsLoadingEvents] = useState(true)
    const [lastReload, setLastReload] = useState(new Date())

    const onSelectEvent = (event: EventDate) => {   
        setOpenModal('ScheduleEvent')
        setSchedule({ ...schedule, selectedEvent: event })
    }

    const onSelectSlot = (e: SlotInfo) => {
        const date = e.start
        const isAvailable = isGreaterOrEqualThanToday(date) && workdays.includes(((date.getDay() + 6) % 7) + 1)
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
            p?.id === professional.id ?
                null :
                professional
        ))
    }

    useEffect(() => {
        if (!openModal) {
            setStep(1)
        }
    }, [openModal])

    useEffect(() => {
        setIsLoadingEvents(true)
        const fetchEvents = async () => {
            const dbEvents = await getEventsByMonth(date, entityId)
            setEvents(dbEvents)
            setIsLoadingEvents(false)
        }

        fetchEvents()

    }, [date.getMonth(), date.getFullYear(), lastReload])

    useEffect(() => {
        const currentEvents = events.filter(e =>
            e.selectedProfessional.id === selectedProfessional?.id
            && compareDates(date, e.start)
        ).sort((a, b) => a.start.getTime() - b.start.getTime())

        setProfEvents(currentEvents)
    }, [events, date, selectedProfessional])

    const professionalsByService = professionals.filter(({ services }) =>
        services.some(s => s.id === serviceState.selectedService?.serviceId)
    )

    const isValidDate = useMemo(() => {
        return isGreaterOrEqualThanToday(date) && workdays.includes(((date.getDay() + 6) % 7) + 1)
    }, [date])

    const filteredEvents = events.filter(ev => ev.status !== 'cancelled')

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
                    <button onClick={()=> setLastReload(new Date())} disabled={isLoadingEvents} 
                        className="flex ml-auto w-fit text-green-700 text-3xl mb-1.5 cursor-pointer disabled:opacity-65 disabled:pointer-events-none md:mb-0" >
                        <TbReload />
                    </button>
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
                        isLoadingEvents ?
                            <div className="h-screen! md:h-125! flex justify-center items-center">
                                <div className="flex flex-col items-center justify-center gap-2.5">
                                    <ImSpinner8 className="text-4xl text-green-700 animate-spin" />
                                    Cargando agendas...
                                </div>
                            </div>
                            :
                            selectedProfessional?.id ?
                                profEvents.length > 0 ?
                                    <EventList
                                        events={profEvents}
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
                                    events={filteredEvents}
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
            {openModal === 'ScheduleAssing' && (
                <ScheduleAssign
                    serviceList={services}
                    customers={customers}
                />
            )}
            {openModal === 'UpdateCustomer' && <UpdateCustomer entityId={entityId} />}
            {openModal === 'ServiceList' && serviceState.selectedService &&
                <BookingServiceModal
                    setStep={setStep}
                    step={step}
                    initialYear={foundationYear}
                    dates={generateMonthDatesArray(date)}
                    professionals={professionalsByService}
                    entityId={entityId}
                    isAdmin
                />
            }
            {openModal === 'ScheduleEvent' && <EventSummary entityId={entityId} />}
            {openModal === 'CancelEvent' && <CancelEvent />}
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