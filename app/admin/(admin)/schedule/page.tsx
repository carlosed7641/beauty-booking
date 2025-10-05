'use client'

import { Calendar, Event, SlotInfo, View } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useModal, useService } from '@/store'
import { isGreaterOrEqualThanToday, generateMonthDatesArray, getMessagesES, localizer, format24 } from '@/helpers'
import { useEffect, useState } from 'react'
import { DateList, Modal, ModalHeader, ProfileForm } from '@/components'
import { LiaExchangeAltSolid } from 'react-icons/lia'
import { MONTHS_OF_YEAR } from '@/util/const'
import clsx from 'clsx'
import { FiCalendar } from 'react-icons/fi'
import { ScheduleAssing } from './ScheduleAssing'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { BookingServiceModal, Emotion } from '@/(beauty)/components'
import { professionals as fakeProfessionals } from '@/util/fake-data'
import { format } from 'date-fns'
import { formatDate } from '@/helpers'
import { format12 } from '../../../helpers/generate-hours-array';
import Link from 'next/link'
import { FaWhatsapp } from 'react-icons/fa'
import { formatNumber } from '../../../helpers/format-number';
import { RiEmotionHappyLine, RiEmotionNormalLine, RiEmotionUnhappyLine } from 'react-icons/ri'

const events: EventDate[] = [
    {
        id: 'f445465',
        title: 'Cepillado',
        start: new Date(2025, 9, 5, 17, 45, 0),
        end: new Date(2025, 9, 5, 18, 30, 0),
        customer: {
            id: "125",
            name: "David Ortiz",
            phone: '3004394704'
        },
        selectedService: {
            serviceId: "006",
            name: "Cepillado",
            duration: "45m",
            price: 30_000
        },
        selectedProfessional: {
            id: 'bcf',
            name: "Carlos Castro"
        },
        isAdminBooking: false,
        customerReview: 2,
        allDay: false
    }
]

const INITIAL_YEAR = 2020
const INITIAL_DAYS_OF_MONTH = generateMonthDatesArray(new Date())
const years = new Date().getFullYear() - INITIAL_YEAR + 1

export default function SchedulePage() {

    const { openModal, setOpenModal } = useModal()
    const [selectedEvent, setSelectedEvent] = useState<EventDate | null>(null)
    const [daysOfCurrentMonth, setDaysOfCurrentMonth] = useState(INITIAL_DAYS_OF_MONTH)
    const [date, setDate] = useState(new Date())
    const [isAvailableDay, setIsAvailableDay] = useState(true)
    const [view, setView] = useState<View>('day')

    const [step, setStep] = useState(1)
    const [isUpdatingReview, setIsUpdatingReview] = useState(false)
    const { serviceState, setServiceState } = useService()

    const onSelect = (event: EventDate) => {
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
        const isAvailable = isGreaterOrEqualThanToday(date)
        setIsAvailableDay(isAvailable)
    }, [date])

    useEffect(() => {
        const newDays = generateMonthDatesArray(date)
        setDaysOfCurrentMonth(newDays)
    }, [date.getMonth(), date.getFullYear()])

    useEffect(() => {
        if (!openModal) {
            setStep(1)
            setIsUpdatingReview(false)
        }
    }, [openModal])

    const onSubmitCustomer = (data: Omit<Session, "id" | "shareNumberPhone">) => {
        console.log(data)
        //TODO: Save To BD
        setOpenModal(SchedulePage.name + 'schedule')
    }

    const onSelectSlot = (e: SlotInfo) => {
        const date = e.start
        const isAvailable = isGreaterOrEqualThanToday(date)
        if (!isAvailable) return
        setServiceState({
            ...serviceState,
            selectedHour: format24(date)
        })
        setOpenModal('ScheduleAssing')
        setDate(date)
    }

    const setCustomerReview = (reviewPoints: number) => {
        //TODO: Api post
        if (!selectedEvent) return
        const { id, customerReview } = selectedEvent
        console.log(id, customerReview)
    }

    const handleCancelEvent = () => {
        //TODO: Remove event
        if (!selectedEvent) return
        // deleteEvent(selectedEvent.id)
    }

    const handleUpdateEvent = () => {
        if (!selectedEvent) return
        const { title, isAdminBooking, customerReview, allDay, start: selectedDate, end, ...rest } = selectedEvent
        const selectedHour = format24(selectedDate)
        console.log({ ...rest, selectedDate, selectedHour })
        setServiceState({ ...rest, selectedDate, selectedHour })
        setOpenModal('ServiceList')
    }

    // TODO: Api call
    const professionals = fakeProfessionals.filter(sl => sl.entityId === '422')

    return (
        <>
            <h1 className="text-lg text-green-700 mb-3 font-bold">Agenda</h1>
            <div className="flex flex-col gap-6">
                <div className="bg-white w-full rounded-md p-7 relative">
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
                            noDisabledDays
                            datesList={daysOfCurrentMonth}
                            selectedDate={date}
                            onClick={(dayItem) => setDate(dayItem.date)}
                        />
                    </div>
                    <Calendar
                        culture='es'
                        selectable
                        onSelectSlot={onSelectSlot}
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
                        components={{
                            event: ({ event }) => (
                                <div>
                                    <p className="font-bold mb-1">{event.customer.name}</p>
                                    <p className="text-[80%]">{event.title}</p>
                                </div>
                            )
                        }}
                        eventPropGetter={() => ({
                            style: {
                                backgroundColor: '#008236',
                                color: '#ffffff'
                            }
                        })}
                        onSelectEvent={onSelect}
                        formats={{
                            timeGutterFormat: "h:mm a",
                            eventTimeRangeFormat: ({ start, end }) =>
                                `${format(start, 'h:mm a')} - ${format(end, 'h:mm a')}`,
                            dayRangeHeaderFormat: ({ start, end }) =>
                                `${format(start, "MMM d")} - ${format(end, "MMM d")}`,
                        }}
                        className="h-screen! md:h-[500px]!"
                    />
                    {
                        isAvailableDay &&
                        <button onClick={() => setOpenModal('ScheduleAssing')} className="bg-green-700 text-white fixed md:absolute bottom-16 right-16 h-12 w-12 rounded-full shadow-md text-xl flex items-center justify-center hover:bg-green-800 cursor-pointer">
                            <FiCalendar />
                        </button>
                    }
                </div>
            </div>
            {openModal === 'ScheduleAssing' && <ScheduleAssing selectedDate={date} />}
            {
                openModal === 'UpdateCustomer' &&
                <Modal>
                    <ModalHeader>
                        <h1 className="text-green-700 font-bold flex items-center gap-2">
                            <IoMdArrowRoundBack className="cursor-pointer text-xl" onClick={() => setOpenModal(SchedulePage.name + 'schedule')} />
                            Editor de clientes
                        </h1>
                    </ModalHeader>
                    <ProfileForm onSubmit={onSubmitCustomer} />
                </Modal>
            }
            {
                openModal === 'ServiceList' && serviceState.selectedService &&
                <BookingServiceModal
                    setStep={setStep}
                    step={step}
                    dates={generateMonthDatesArray(date)}
                    professionals={professionals}
                    isAdmin
                />
            }
            {
                openModal === SchedulePage.name &&
                <Modal className="overflow-hidden!">
                    <ModalHeader>
                        <h1 className="text-green-700 font-bold">{selectedEvent?.title}</h1>
                    </ModalHeader>
                    <div className="flex flex-col text-sm">
                        <span>{formatDate(selectedEvent?.start!, true)}</span>
                        <div className="flex gap-1">
                            <span>{format12(selectedEvent?.start!)}</span>
                            <span>-</span>
                            <span>{format12(selectedEvent?.end!)}</span>
                        </div>
                        <span className="text-green-700 my-2">Cita con: <strong>{selectedEvent?.customer.name}</strong></span>
                        {selectedEvent?.customer.phone &&
                            <Link href={`https://wa.me/${selectedEvent.customer.phone}`} className="underline text-zinc-600 flex gap-1 mb-2" target="_blank">
                                <FaWhatsapp className="text-green-500" />
                                {selectedEvent.customer.phone}
                            </Link>}                  <span>Reservado por: <strong>{selectedEvent?.isAdminBooking ? 'Administración' : 'Cliente'}</strong></span>
                        <span>Duración: <strong>{selectedEvent?.selectedService.duration}</strong></span>
                        <span>Profesional: <strong>{selectedEvent?.selectedProfessional.name}</strong></span>
                        <span>Valor del servicio: <strong>${formatNumber(selectedEvent?.selectedService.price.toString()!)}</strong></span>
                        {
                            new Date().getTime() > selectedEvent?.end.getTime()! ?
                                <div className="mt-3">
                                    <span className="text-base font-bold">Indicanos si el cliente llegó a tiempo</span>
                                    {
                                        selectedEvent?.customerReview && !isUpdatingReview ?
                                            <div className="flex items-center gap-2">
                                                {/** Fix import */}
                                                <Emotion showLabel averagePoints={selectedEvent.customerReview} />
                                                <button onClick={() => setIsUpdatingReview(true)} className="bg-green-700 text-white rounded-full px-5 py-1 hover:bg-green-800 cursor-pointer">Editar</button>
                                            </div>
                                            :
                                            <div className="grid grid-cols-3 gap-2 md:w-fit py-2">
                                                <div onClick={() => setCustomerReview(1)} className="flex flex-col items-center text-green-500 cursor-pointer">
                                                    <RiEmotionHappyLine className="text-3xl" />
                                                    <span className="text-xs">Llegó a tiempo</span>
                                                </div>
                                                <div onClick={() => setCustomerReview(2)} className="flex flex-col items-center text-yellow-500 cursor-pointer">
                                                    <RiEmotionNormalLine className="text-3xl" />
                                                    <span className="text-xs">Llegó tarde</span>
                                                </div>
                                                <div onClick={() => setCustomerReview(3)} className="flex flex-col items-center text-red-500 cursor-pointer">
                                                    <RiEmotionUnhappyLine className="text-3xl" />
                                                    <span className="text-xs">No llegó</span>
                                                </div>
                                            </div>
                                    }

                                </div>
                                :
                                <div className="flex gap-2 mt-2">
                                    <button onClick={handleUpdateEvent} disabled={selectedEvent?.isAdminBooking} className="flex items-center py-0.5 px-3 border border-green-700 rounded-full cursor-pointer disabled:bg-zinc-400 disabled:border-0 disabled:cursor-not-allowed">Modificar cita</button>
                                    <button onClick={handleCancelEvent} className="flex items-center py-0.5 px-3 border border-red-500 rounded-full cursor-pointer">Cancelar cita</button>
                                </div>
                        }
                    </div>
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