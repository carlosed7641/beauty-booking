'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaCheckCircle, FaEdit } from 'react-icons/fa'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { Modal, ModalHeader, Title } from '@/components'
import { ServiceIcon, ReservationOptions } from '..'
import { useReservationOptions } from '@/hooks'
import { format12, formatDate, formatDisplayNumber, formatTextHour } from '@/helpers'
import { useModal, useService } from '@/store'

export const NextReservations = ({ events, professionals, userId }: {
    events?: EventDate[],
    professionals: ProfessionalSchedule[],
    userId: string
}) => {

    const [activeEvent, setActiveEvent] = useState<EventDate | null>(null)
    const { handleCancel, handleUpdate } = useReservationOptions()
    const openModal = useModal(state => state.openModal)
    const setOpenModal = useModal(state => state.setOpenModal)
    const serviceState = useService(state => state.serviceState)

    const shouldDisable = (date: Date, minutes: number) => {
        const diffMs = new Date(date).getTime() - Date.now()
        return diffMs <= minutes * 60 * 1000
    }

    return (
        <>
            <section className="mb-4">
                <Title title="Tus próximas citas" />
                <ul className="flex md:flex-wrap gap-3 mb-5 overflow-x-scroll scroll-none -mr-2 last:pr-2">
                    {
                        events!.map(r => {

                            const disabled = shouldDisable(r.start, r.entity?.cancelDateTime ?? 0)

                            return (
                                <li onClick={() => {
                                    setActiveEvent(r)
                                    setOpenModal('CurrentReservation')
                                }} key={r.id} className="flex bg-[#e8f7ea] gap-3 shrink-0 items-center md:w-fit py-2 px-4 text-sm rounded-md">
                                    <div className="text-green-700">
                                        <ServiceIcon category={r.selectedService?.category?.toLocaleLowerCase() as string} className="text-6xl" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-green-700 text-base">{r.selectedService?.name}</p>
                                        <div className="flex items-center gap-1">
                                            <span className="text-green-700">Lugar:</span>
                                            <p>{r?.entity?.name}</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-green-700">Fecha:</span>
                                            <p>{formatDate({ date: r.start, weekday: 'short', month: 'short' })}</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-green-700">Hora:</span>
                                            <p>{format12(r.start)}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-1 items-end ml-4 gap-5">
                                        <button title={disabled ? 'No puedes editar este evento porque está muy cercano a la hora de inicio' : ''} className="disabled:opacity-55 cursor-pointer disabled:cursor-not-allowed" disabled={disabled}>
                                            <FaEdit
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleUpdate(r, userId)
                                                }}
                                                className="text-green-600" size={17}
                                            />
                                        </button>
                                        <button title={disabled ? 'No puedes cancelar este evento porque está muy cercano a la hora de inicio' : ''} className="disabled:opacity-55 cursor-pointer disabled:cursor-not-allowed" disabled={disabled}>
                                            <IoCloseCircleOutline
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleCancel(r.id, r.selectedProfessional.id)
                                                }}
                                                className="text-zinc-500" size={20}
                                            />
                                        </button>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <Link className="underline text-green-700" href="/my-reservations">Ver todas</Link>
            </section>
            <ReservationOptions professionals={professionals} />
            {
                openModal === 'SuccessBooking' && (
                    <Modal className="md:max-w-120 overflow-hidden!">
                        <ModalHeader>
                            <div className="flex gap-2 text-xl items-center text-green-700">
                                <FaCheckCircle className="text-green-500" />
                                Actualización exitosa
                            </div>
                        </ModalHeader>
                        <div>
                            La reserva se actualizó para
                            el {formatDate({ date: serviceState.selectedDate!, weekday: 'long' }).toLocaleLowerCase()} a las
                            <span className="text-green-700 font-bold"> {formatTextHour(serviceState.selectedHour!)}</span>
                        </div>
                    </Modal>
                )
            }
            {
                openModal === 'CurrentReservation' && activeEvent && (
                    <Modal className="md:max-w-120 overflow-hidden!">
                        <ModalHeader>
                            Resumen del evento
                        </ModalHeader>
                        <div className="flex flex-col">
                            <div className="flex gap-5">
                                <p className="text-green-700 w-25">Servicio</p>
                                <span>{activeEvent.title}</span>
                            </div>
                            <div className="flex gap-5">
                                <p className="text-green-700 w-25">Valor</p>
                                <span>${formatDisplayNumber(activeEvent.selectedService.price)}</span>
                            </div>
                            <div className="flex gap-5">
                                <p className="text-green-700 w-25">Duración</p>
                                {activeEvent.selectedService?.duration &&
                                    <span>{activeEvent.selectedService.duration.hours > 0 ? `${activeEvent.selectedService.duration.hours} ${activeEvent.selectedService.duration.hours === 1 ? 'hr' : 'hrs'} ${activeEvent.selectedService.duration.minutes > 0 ? 'y ' + activeEvent.selectedService.duration.minutes + ' min' : ''}` : `${activeEvent.selectedService.duration.minutes} min`} aprox</span>}
                            </div>
                            <div className="flex gap-5">
                                <p className="text-green-700 w-25">Fecha</p>
                                <span>{formatDate({ date: activeEvent.start })}</span>
                            </div>
                            <div className="flex gap-5">
                                <p className="text-green-700 w-25">Hora</p>
                                <span>{format12(activeEvent.start)}</span>
                            </div>
                            <div className="flex gap-5">
                                <p className="text-green-700 w-25">Profesional</p>
                                <span>{activeEvent.selectedProfessional?.name}</span>
                            </div>
                            <div className="flex gap-5">
                                <p className="text-green-700 w-25">Lugar</p>
                                <span>{activeEvent.entity?.name}</span>
                            </div>
                        </div>
                    </Modal>
                )
            }
        </>
    )
}
