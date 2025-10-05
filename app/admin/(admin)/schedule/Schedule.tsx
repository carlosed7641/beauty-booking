'use client'

import { Calendar, SlotInfo, View } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useModal, useService } from '@/store'
import { isGreaterOrEqualThanToday, generateMonthDatesArray, getMessagesES, localizer, format24 } from '@/helpers'
import { useEffect, useState } from 'react'
import { Modal, ModalHeader } from '@/components'
import { ScheduleMonths, ScheduleYears, UpdateCustomer } from '../components'
import { BookingServiceModal, Emotion } from '@/(beauty)/components'
import { professionals as fakeProfessionals } from '@/util/fake-data'
import { format } from 'date-fns'
import { formatDate } from '@/helpers'
import { format12 } from '../../../helpers/generate-hours-array';
import Link from 'next/link'
import { FaWhatsapp } from 'react-icons/fa'
import { formatNumber } from '../../../helpers/format-number';
import { RiEmotionHappyLine, RiEmotionNormalLine, RiEmotionUnhappyLine } from 'react-icons/ri'
import { CustomDays, ScheduleButton, ScheduleAssign } from '../components'


interface Props {
    events: EventDate[]
    foundationYear: number
    professionals: ProfessionalData[]
}

export const Schedule = ({ events, foundationYear, professionals }: Props) => {

    const { openModal, setOpenModal } = useModal()
    const [selectedEvent, setSelectedEvent] = useState<EventDate | null>(null)
    const [date, setDate] = useState(new Date())
    const [isAvailableDay, setIsAvailableDay] = useState(true)
    const [view, setView] = useState<View>('day')

    const [step, setStep] = useState(1)
    const [isUpdatingReview, setIsUpdatingReview] = useState(false)
    const { serviceState, setServiceState } = useService()

    const onSelect = (event: EventDate) => {
        setOpenModal(Schedule.name)
        setSelectedEvent(event)
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
        if (!openModal) {
            setStep(1)
            setIsUpdatingReview(false)
        }
    }, [openModal])



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

    const onChangeDate = (value: number, type: 'month' | 'year') => {
        setDate(prev => {
            const newDate = new Date(prev)
            type === 'year' ? newDate.setFullYear(value) : newDate.setMonth(value)
            return newDate
        })

        setOpenModal(null)
    }


    return (
        <>
            <CustomDays date={date} setDate={setDate} />
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
            {isAvailableDay && <ScheduleButton />}
            {openModal === 'ScheduleAssing' && <ScheduleAssign selectedDate={date} />}
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
            {
                openModal === Schedule.name &&
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
            {openModal === 'ScheduleMonths' && <ScheduleMonths date={date} onChangeDate={onChangeDate} />}
            {openModal === 'ScheduleYears' &&
                <ScheduleYears
                    date={date}
                    foundationYear={foundationYear}
                    onChangeDate={onChangeDate}
                />
            }
        </>
    )
}