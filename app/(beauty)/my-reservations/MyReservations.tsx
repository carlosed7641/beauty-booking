'use client'

import { useEffect, useState } from 'react'
import { TfiAgenda } from 'react-icons/tfi'
import { Modal, ModalHeader, SimpleTabs } from '@/components'
import { ReservationList } from '../components'
import { useModal, useService } from '@/store'
import { FaCheckCircle } from 'react-icons/fa'
import { formatDate, formatTextHour } from '@/helpers'
import Image from 'next/image'
import { MdStar, MdStarOutline } from 'react-icons/md'
import { updateEventUserRate } from '@/actions'
import { useRouter } from 'next/navigation'


interface Props {
    events: EventDate[]
    professionals: ProfessionalSchedule[]
    userId: string
}

const tabs = [
    {
        id: 'current',
        label: 'Actuales'
    },
    {
        id: 'history',
        label: 'Historial'
    }
]

export const MyReservations = ({ events, professionals, userId }: Props) => {

    const [currentTab, setCurrentTab] = useState('current')

    const openModal = useModal(state => state.openModal)
    const setOpenModal = useModal(state => state.setOpenModal)

    const serviceState = useService(state => state.serviceState)

    const currentReservations = events.filter(r => r.status === 'pending' && r.start.getTime() >= new Date().getTime())
    const oldReservations = events.filter(r => r.status !== 'pending' || r.start.getTime() < new Date().getTime())

    const [hovered, setHovered] = useState(0)
    const [rating, setRating] = useState(0)
    const [isRatingLoading, setIsRatingLoading] = useState(false)
    const router = useRouter()


    const displayValue = hovered || rating

    const handleRate = async () => {
        if (!serviceState.id) return
        setIsRatingLoading(true)
        await updateEventUserRate({ id: serviceState.id, customerRating: rating })
        setOpenModal(null)
        router.refresh()
    }

    useEffect(() => {
        setHovered(0)
        setRating(0)
        setIsRatingLoading(false)
    }, [openModal])

    return (
        <>
            <h1 className="text-2xl text-green-700 my-4 flex gap-2 items-center">
                <TfiAgenda />
                Mis reservas
            </h1>
            {
                events.length > 0 ? (
                    <>
                        <SimpleTabs
                            tabs={tabs}
                            activeTab={currentTab}
                            setActiveTab={setCurrentTab}
                        />
                        {
                            currentTab === 'current' ?
                                <ReservationList
                                    reservations={currentReservations}
                                    professionals={professionals}
                                    userId={userId}
                                />
                                :
                                <ReservationList
                                    reservations={oldReservations}
                                    professionals={professionals}
                                    userId={userId}
                                />
                        }
                    </>
                )
                :
                <p>No hay reservas</p>
            }

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
                openModal === 'RateExperience' && (
                    <Modal className="md:max-w-130! overflow-hidden!">
                        <ModalHeader>
                            <div className="flex gap-2 text-xl items-center text-green-700">
                                ¡Califica tu experiencia!
                            </div>
                        </ModalHeader>
                        <div className="flex flex-col">
                            <div className="bg-green-50 p-2 rounded-md flex gap-2">
                                {
                                    serviceState.selectedProfessional?.photo ?
                                        <Image
                                            src={serviceState.selectedProfessional.photo}
                                            alt="Imagen profesional"
                                            width={80}
                                            height={80}
                                            className="object-cover h-20 w-20 rounded-full"
                                        />
                                        :
                                        <div className="flex items-center h-20 w-20 rounded-full bg-green-700 text-white text-2xl">
                                            {serviceState.selectedProfessional?.name[0] ?? ''}
                                        </div>
                                }
                                <div className="flex flex-col text-sm">
                                    <p className="text-green-700">{serviceState.selectedProfessional?.name}</p>
                                    <p>{serviceState.selectedService?.name}</p>
                                    <p>{formatDate({ date: serviceState.selectedDate!, weekday: 'short', month: 'short' })} {formatTextHour(serviceState.selectedHour!)}</p>
                                </div>
                            </div>
                            <ul className="flex justify-center my-2">
                                {
                                    Array.from({ length: 5 }, (_, index) => (
                                        <li
                                            key={index}
                                            className="p-1"
                                            onClick={() => setRating(index + 1)}
                                            onMouseEnter={() => setHovered(index + 1)}
                                            onMouseLeave={() => setHovered(0)}
                                        >

                                            {
                                                index + 1 <= displayValue ?
                                                    <MdStar
                                                        size={35}
                                                        className="text-amber-300 cursor-pointer"
                                                    />
                                                    :
                                                    <MdStarOutline
                                                        size={35}
                                                        className="text-amber-300 cursor-pointer"
                                                    />
                                            }
                                        </li>

                                    ))
                                }
                            </ul>
                            <button onClick={handleRate} disabled={rating === 0 || isRatingLoading} className="btn-primary rounded-full font-bold mb-2">
                                {isRatingLoading ? 'Procesando...' : 'Enviar'}
                            </button>
                            <button onClick={() => setOpenModal(null)} className="text-green-700 cursor-pointer hover:underline">
                                Calificar más tarde
                            </button>
                        </div>
                    </Modal>
                )
            }
        </>
    )
}
