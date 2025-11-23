'use client'

import { FaEdit } from 'react-icons/fa'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { Title } from '@/components'
import { ServiceIcon, ReservationOptions } from '..'
import { useReservationOptions } from '@/hooks'
import { format12, formatDate } from '@/helpers'

const currentReservations: EventDate[] = [
    {
        id: 'abc',
        title: 'Rayitos platinados',
        customer: {
            id: '888',
            name: 'Juancho',
            phone: {
                indicator: '57',
                number: '300949494'
            },
            birthDay: new Date(),
            gender: 'Masculino',
            reviewPointsAverage: 4.5
        },
        selectedService: {
            serviceId: "001",
            // entityName: 'Acicalate Vip', //TODO
            category: 'Cortes', //TODO
            name: "Rayitos platinados",
            description: "Los mejores rayitos",
            duration: { hours: 1, minutes: 0 },
            price: 30000
        },
        selectedProfessional: {
            id: "123",
            name: "Carlos Castro"
        },
        start: new Date(),
        end: new Date(),
        isAdminBooking: false,
        customerReview: null,
        status: 'pending',
        allDay: false
    }
]

export const NextReservations = () => {

    // const currentReservations = reservations.filter(r => r.status === 'pending').slice(0, 2)
    const { handleCancel, handleUpdate } = useReservationOptions()

    return (
        <>
            <section>
                <Title title="Tus próximas citas" />
                <ul className="flex md:flex-wrap gap-3 mb-5 overflow-x-scroll scroll-none -mr-2 last:pr-2">
                    {
                        currentReservations.map(r => (
                            <li key={r.id} className="flex bg-[#e8f7ea] gap-3 shrink-0 items-center md:w-fit py-2 px-4 text-sm rounded-md">
                                <div className="text-green-700">
                                    <ServiceIcon category={r.selectedService?.category?.toLocaleLowerCase() as string} className="text-6xl" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-green-700 text-base">{r.selectedService?.name}</p>
                                    <div className="flex items-center gap-1">
                                        <span className="text-green-700">Lugar:</span>
                                        {/* <p>{r.selectedService?.entityName }</p> */}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-green-700">Fecha:</span>
                                        <p>{formatDate({date: r.start, weekday: 'short', month: 'short'})}</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-green-700">Hora:</span>
                                        <p>{format12(r.start)}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col flex-1 items-end ml-4 gap-5">
                                    <FaEdit onClick={() => handleUpdate(r)} className="text-green-600 cursor-pointer" size={17} />
                                    <IoCloseCircleOutline onClick={() => handleCancel(r.id as string)} className="text-zinc-500 cursor-pointer" size={20} />
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </section>
            <ReservationOptions />
        </>
    )
}
