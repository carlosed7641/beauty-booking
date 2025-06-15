'use client'

import { useEffect, useState } from 'react'
import { RxCaretDown } from 'react-icons/rx'
import clsx from 'clsx'
import { BookingCancelModal, BookingServiceModal } from '../booking-service'
import { useService } from '@/store'
import { SERVICE_INITIAL_STATE } from '@/util/const'

interface Props {
    reservations: Reservation[]
}

export const ReservationList = ({ reservations }: Props) => {

    // TODO: Re-use Next Reservations functions
    const [currentOpen, setCurrentOpen] = useState<string | number | null>(null)
    const [step, setStep] = useState(1)
    const { setServiceState } = useService()
    const [showModal, setShowModal] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)

    const handleUpdate = (reservation: ServiceState) => {
        setShowModal(true)
        setIsUpdating(true)
        console.log(reservation)
        setServiceState(reservation)
    }

    const handleCancel = (id: string) => {
        setShowModal(true)
        setIsUpdating(false)
    }

    useEffect(() => {
        if (!showModal) {
            setServiceState(SERVICE_INITIAL_STATE)
            setStep(1)
        }
        window.scrollTo(0, 0)
        document.body.classList.toggle('overflow-hidden', showModal)
    }, [showModal])


    return (
        <>
            {

                reservations.length ?
                    <>
                        {reservations.map(r => (
                            <div className="border-zinc-300 border-b" key={r.id}>
                                <div className="font-bold py-3 cursor-pointer flex items-center gap-2"
                                    onClick={() => setCurrentOpen(prev => (prev === r.id ? '' : r.id))}>
                                    <RxCaretDown className={
                                        clsx(
                                            "text-2xl transition-all duration-500 text-green-700",
                                            {
                                                "rotate-180": r.id === currentOpen
                                            }
                                        )
                                    } />
                                    <div className="flex items-center justify-between w-full">
                                        {r.selectedService.name}
                                        <p className="flex flex-col">
                                            {r.selectedDate.substring(0, 9)} - {r.selectedHour}
                                            {r.status === 'canceled' && <span className="text-red-500 text-right">Cita cancelada</span>}
                                        </p>
                                    </div>
                                </div>
                                <ul className={
                                    clsx(
                                        "transition-all duration-300",
                                        {
                                            'max-h-0 opacity-0 overflow-hidden': r.id !== currentOpen,
                                            'opacity-100 max-h-screen border-zinc-300 border-t pl-4 py-3': r.id === currentOpen
                                        }
                                    )
                                }>
                                    <li className="py-2 flex gap-3">
                                        <span className="w-28 text-green-700 font-bold">Servicio</span>
                                        <span>{r.selectedService.name}</span>
                                    </li>
                                    <li className="py-2 flex gap-3">
                                        <span className="w-28 text-green-700 font-bold">Valor</span>
                                        <span>Desde ${r.selectedService.price}</span>
                                    </li>
                                    <li className="py-2 flex gap-3">
                                        <span className="w-28 text-green-700 font-bold">Duración</span>
                                        <span>{r.selectedService.duration}</span>
                                    </li>
                                    <li className="py-2 flex gap-3">
                                        <span className="w-28 text-green-700 font-bold">Fecha</span>
                                        <span>{r.selectedDate}</span>
                                    </li>
                                    <li className="py-2 flex gap-3">
                                        <span className="w-28 text-green-700 font-bold">Hora</span>
                                        <span>{r.selectedHour}</span>
                                    </li>
                                    <li className="py-2 flex gap-3">
                                        <span className="w-28 text-green-700 font-bold">Profesional</span>
                                        <span>{r.selectedProfessional}</span>
                                    </li>
                                    <li className="py-2 flex gap-3">
                                        <span className="w-28 text-green-700 font-bold">Lugar</span>
                                        <span>{r.selectedService.entityName}</span>
                                    </li>
                                    {
                                        r.status === 'pending' &&
                                        <li className="flex gap-2 mt-4">
                                            <button onClick={()=> handleUpdate(r)} className="px-5 py-1 bg-green-700 text-white rounded-full cursor-pointer hover:bg-green-800">Modificar cita</button>
                                            <button onClick={()=> handleCancel(r.id)} className="px-5 py-1 text-green-700 border-green-700 border rounded-full cursor-pointer">Cancelar cita</button>
                                        </li>
                                    }
                                </ul>

                            </div>
                        ))}
                        {showModal && (
                            isUpdating ?
                                <BookingServiceModal
                                    step={step}
                                    setStep={setStep}
                                    setShowModal={setShowModal}
                                />
                                :
                                <BookingCancelModal setShowModal={setShowModal} />
                        )}
                    </>
                    :
                    <div>No hay reservas</div>
            }
        </>
    )
}
