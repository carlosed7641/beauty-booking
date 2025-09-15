'use client'

import { Calendar, Event, View } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useModal } from '@/store'
import { generateMonthDatesArray, getMessagesES, localizer } from '@/helpers'
import { useEffect, useState } from 'react'
import { DateList, Modal, ModalHeader } from '@/components'
import { LiaExchangeAltSolid } from 'react-icons/lia'
import { DATE_OPTIONS, MONTHS_OF_YEAR } from '@/util/const'
import clsx from 'clsx'

const events = [
    {
        title: 'Corte hombre',
        start: new Date(2025, 8, 14, 10, 0, 0), // 10 de septiembre 2025, 10:00
        end: new Date(2025, 8, 14, 12, 0, 0),   // 10 de septiembre 2025, 12:00
        allDay: false
    }
]

const INITIAL_YEAR = 2020
const INITIAL_DAYS_OF_MONTH = generateMonthDatesArray(new Date())
const years = new Date().getFullYear() - INITIAL_YEAR + 1

export default function SchedulePage() {

    const { openModal, setOpenModal } = useModal()
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
    const [daysOfCurrentMonth, setDaysOfCurrentMonth] = useState(INITIAL_DAYS_OF_MONTH)
    const [date, setDate] = useState(new Date())
    const [view, setView] = useState<View>('day')

    const onSelect = (event: Event) => {
        setOpenModal(SchedulePage.name)
        setSelectedEvent(event)
    }

    const onChangeDate = (value: number, type: 'month' | 'year') => {
        setDate(prev => {
            const newDate = new Date(prev)
            type === 'year' ? newDate.setFullYear(value) : newDate.setMonth(value)
            return newDate
        })

        setOpenModal(null)
    }

    useEffect(() => {
        const mobileMediaQuery = window.matchMedia('(max-width: 768px)')
        const callback = (event: MediaQueryListEvent) => event.matches && setView('day')

        mobileMediaQuery.addEventListener('change', callback)
        return () => mobileMediaQuery.removeEventListener('change', callback)
    }, [])

    useEffect(() => {
        const newDays = generateMonthDatesArray(date)
        setDaysOfCurrentMonth(newDays)
    }, [date.getMonth(), date.getFullYear()])

    return (
        <>
            <h1 className="text-lg text-green-700 mb-3 font-bold">Agenda</h1>
            <div className="flex flex-col gap-6">
                <div className="bg-white w-full rounded-md p-7">
                    <div className="flex md:hidden gap-3 justify-center">
                        <button onClick={() => setOpenModal(SchedulePage.name + 'year')} className="bg-green-700 py-0.5 px-3 rounded-full text-white flex gap-2 items-center">
                            <LiaExchangeAltSolid />
                            {date.getFullYear()}
                        </button>
                        <button onClick={() => setOpenModal(SchedulePage.name + 'month')} className="bg-green-700 py-0.5 px-3 rounded-full text-white flex gap-2 items-center">
                            <LiaExchangeAltSolid />
                            {MONTHS_OF_YEAR[date.getMonth()]}
                        </button>
                    </div>
                    <div className="flex md:hidden overflow-x-scroll md:overflow-auto scroll-none gap-2">
                        <DateList
                            datesList={daysOfCurrentMonth}
                            selectedDate={date.toLocaleDateString('es-ES', DATE_OPTIONS)}
                            onClick={(dayItem) => setDate(dayItem.date)}
                        />
                    </div>
                    <Calendar
                        culture='es'
                        selectable
                        onSelectSlot={(e) => console.log(e)}
                        messages={getMessagesES()}
                        views={['month', 'week', 'day']}
                        onView={setView}
                        view={view as View}
                        date={date}
                        onNavigate={setDate}
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        eventPropGetter={() => ({
                            style: {
                                backgroundColor: '#008236',
                                color: '#ffffff'
                            }
                        })}
                        onSelectEvent={onSelect}
                        className="h-screen! md:h-[500px]!"
                    />
                </div>
            </div>
            {
                openModal === SchedulePage.name &&
                <Modal className="overflow-hidden!">
                    <ModalHeader>
                        <h1 className="text-green-700 font-bolsd">{selectedEvent?.title}</h1>
                    </ModalHeader>
                </Modal>
            }
            {
                openModal === SchedulePage.name + 'year' &&
                <Modal className="overflow-hidden!">
                    <ModalHeader>
                        <h1 className="text-green-700 font-bold">Selecciona un año</h1>
                    </ModalHeader>
                    <ul className="flex flex-col gap-2">
                        {
                            Array.from({ length: years }, (_, idx) => {
                                const year = INITIAL_YEAR + idx
                                return (
                                    <li onClick={() => onChangeDate(year, 'year')} key={idx} className={
                                        clsx(
                                            "w-full text-white rounded-md px-3 py-2",
                                            {
                                                "bg-zinc-400": year !== date.getFullYear(),
                                                "bg-green-700": year === date.getFullYear()
                                            }
                                        )
                                    }>{year}</li>
                                )
                            })
                        }
                    </ul>
                </Modal >
            }
            {
                openModal === SchedulePage.name + 'month' &&
                <Modal className="overflow-hidden!">
                    <ModalHeader>
                        <h1 className="text-green-700 font-bold">Selecciona un mes</h1>
                    </ModalHeader>
                    <ul className="flex flex-col gap-2">
                        {MONTHS_OF_YEAR.map((month, idx) => (
                            <li onClick={() => onChangeDate(idx, 'month')} key={idx} className={
                                clsx(
                                    "w-full text-white rounded-md px-3 py-2",
                                    {
                                        "bg-zinc-400": idx !== date.getMonth(),
                                        "bg-green-700": idx === date.getMonth()
                                    }
                                )
                            }>
                                {month}
                            </li>
                        ))}
                    </ul>
                </Modal>
            }
        </>
    )
}