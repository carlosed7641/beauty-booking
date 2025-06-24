'use client'

import { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { useService } from '@/store'
import { Title } from '@/components'
import { BookingServiceModal, BookingCancelModal, ServiceIcon } from '..'
import { SERVICE_INITIAL_STATE } from '@/util/const'

const currentReservations = [
    {
        id: 'abc',
        selectedService: {
            serviceId: "001",
            entityName: 'Acicalate Vip', //TODO
            category: 'Cortes', //TODO
            name: "Rayitos platinados",
            description: "Los mejores rayitos",
            duration: "4h",
            price: 30000
        },
        selectedProfessional: "Carlos Castro",
        selectedDate: "16 de junio de 2025",
        selectedHour: "2:00 PM",
        isCompleted: true
    }
]

export const NextReservations = () => {

    // const currentReservations = reservations.filter(r => r.status === 'pending').slice(0, 2)
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
            <section>
                <Title title="Tus próximas citas" />
                <ul className="flex md:flex-wrap gap-3 mb-5 overflow-x-scroll scroll-none -mr-2 last:pr-2">
                    {
                        currentReservations.map(r => (
                            <li key={r.id} className="flex bg-[#e8f7ea] gap-3 shrink-0 items-center md:w-fit py-2 px-4 text-sm rounded-md">
                                <div className="text-green-700">
                                    <ServiceIcon category={r.selectedService.category.toLocaleLowerCase()} className="text-6xl" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-green-700 text-base">{r.selectedService.name}</p>
                                    <div className="flex items-center gap-1">
                                        <span className="text-green-700">Lugar:</span>
                                        <p>{r.selectedService.entityName}</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-green-700">Fecha:</span>
                                        <p>{r.selectedDate}</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-green-700">Hora:</span>
                                        <p>{r.selectedHour}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col flex-1 items-end ml-4 gap-5">
                                    <FaEdit onClick={() => handleUpdate(r)} className="text-green-600 cursor-pointer" size={17} />
                                    <IoCloseCircleOutline onClick={() => handleCancel(r.id)} className="text-zinc-500 cursor-pointer" size={20} />
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </section>
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
    )
}
