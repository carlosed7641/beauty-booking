'use client'

import { FaCheckCircle, FaEdit } from 'react-icons/fa'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { Modal, ModalHeader, Title } from '@/components'
import { ServiceIcon, ReservationOptions } from '..'
import { useReservationOptions } from '@/hooks'
import { format12, formatDate, formatTextHour } from '@/helpers'
import Link from 'next/link'
import { useModal, useService } from '@/store'

export const NextReservations = ({ events, professionals, userId }: {
    events?: EventDate[],
    professionals: ProfessionalSchedule[],
    userId: string
}) => {

    const { handleCancel, handleUpdate } = useReservationOptions()
    const openModal = useModal(state => state.openModal)
    const serviceState = useService(state => state.serviceState)

    return (
        <>
            <section className="mb-4">
                <Title title="Tus próximas citas" />
                <ul className="flex md:flex-wrap gap-3 mb-5 overflow-x-scroll scroll-none -mr-2 last:pr-2">
                    {
                        events!.map(r => (
                            <li key={r.id} className="flex bg-[#e8f7ea] gap-3 shrink-0 items-center md:w-fit py-2 px-4 text-sm rounded-md">
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
                                    <FaEdit onClick={() => handleUpdate(r, userId)} className="text-green-600 cursor-pointer" size={17} />
                                    <IoCloseCircleOutline onClick={() => handleCancel(r.id, r.selectedProfessional.id)} className="text-zinc-500 cursor-pointer" size={20} />
                                </div>
                            </li>
                        ))
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
        </>
    )
}
