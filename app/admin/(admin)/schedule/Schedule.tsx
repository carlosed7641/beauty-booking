'use client'

import { useEffect, useMemo, useState } from 'react'
import { Calendar, Formats, SlotInfo, View } from 'react-big-calendar'
import { format } from 'date-fns'
import { useModal, useService } from '@/store'
import { BookingServiceModal } from '@/(beauty)/components'
import { useSchedule } from '../store'
import { EventSummary, ScheduleMonths, ScheduleYears, UpdateCustomer, CustomDays, ScheduleButton, ScheduleAssign } from '../components'
import { isGreaterOrEqualThanToday, generateMonthDatesArray, getMessagesES, localizer, format24 } from '@/helpers'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { CALENDAR_VIEWS } from '@/util/const'

interface Props {
    events: EventDate[]
    foundationYear: number
    professionals: ProfessionalData[]
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

export const Schedule = ({ events, foundationYear, professionals }: Props) => {

    const { openModal, setOpenModal } = useModal()
    const { serviceState, setServiceState } = useService()
    const { schedule, setSchedule } = useSchedule()
    const { date, view } = useSchedule(state => state.schedule)
    const [step, setStep] = useState(1)

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

    useEffect(() => {
        const mobileMediaQuery = window.matchMedia('(max-width: 768px)')
        const callback = (event: MediaQueryListEvent) => event.matches && setSchedule({ ...schedule, view: 'day' })
        mobileMediaQuery.addEventListener('change', callback)
        return () => mobileMediaQuery.removeEventListener('change', callback)
    }, [])

    useEffect(() => {
        if (!openModal) {
            setStep(1)
            setSchedule({ ...schedule, isUpdatingReview: false })
        }
    }, [openModal])

    const isValidDate = useMemo(() => isGreaterOrEqualThanToday(date), [date])

    return (
        <>
            <h1 className="text-lg text-green-700 mb-3 font-bold">Agenda</h1>
            <div className="flex flex-col gap-6">
                <div className="bg-white w-full rounded-md p-7 relative">
                    <CustomDays />
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
                        components={{ event: ({ event }) => <Event event={event} /> }}
                        eventPropGetter={eventPropGetter}
                        onSelectEvent={onSelectEvent}
                        formats={formats}
                        className="h-screen! md:h-[500px]!"
                    />
                    {isValidDate && <ScheduleButton />}
                </div>
            </div>
            {openModal === 'ScheduleAssing' && <ScheduleAssign />}
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
            {openModal === 'ScheduleMonths' && <ScheduleMonths onChangeDate={onChangeDate} />}
            {openModal === 'ScheduleYears' &&
                <ScheduleYears
                    foundationYear={foundationYear}
                    onChangeDate={onChangeDate}
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