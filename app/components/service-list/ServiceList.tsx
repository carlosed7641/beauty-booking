'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import { RxCaretDown } from 'react-icons/rx'
import { useModal, useService } from '@/store'
import { formatDisplayNumber } from '@/helpers'

export const ServiceList = ({ serviceList, isAuthenticated, entityNumberId }: {
    serviceList: Service[]
    isAuthenticated?: boolean
    entityNumberId?: number
}) => {

    const [currentOpenCategory, setCurrentOpenCategory] = useState<string | null>(null)
    const serviceState = useService(state => state.serviceState)
    const setServiceState = useService(state => state.setServiceState)
    const setOpenModal = useModal(state => state.setOpenModal)
    const router = useRouter()


    const handleSelectService = (serviceItem: ServiceItem) => {
        setServiceState({
            ...serviceState,
            selectedService: serviceItem
        })

        setOpenModal('ServiceList')
    }

    return (
        <>
            {
                serviceList.map(s => (
                    <div className="border-zinc-300 border-b" key={s.category}>
                        <div className="font-bold text-green-700 py-3 cursor-pointer flex items-center gap-2"
                            onClick={() => setCurrentOpenCategory(prev => (prev === s.category ? '' : s.category))}>
                            <RxCaretDown className={
                                clsx(
                                    "text-2xl transition-all duration-500",
                                    {
                                        "rotate-180": s.category === currentOpenCategory
                                    }
                                )
                            } />
                            {s.category}
                        </div>
                        <ul className={
                            clsx(
                                "px-3 transition-all duration-300",
                                {
                                    'max-h-0 opacity-0 overflow-hidden': s.category !== currentOpenCategory,
                                    'opacity-100 max-h-screen': s.category === currentOpenCategory
                                }
                            )
                        }>
                            {s.services.map(service => (
                                <li className="flex justify-between items-center py-3 text-sm border-zinc-300 border-t" key={service.name}>
                                    <div className="flex flex-col gap-2">
                                        <p className="flex gap-2 items-center">
                                            {service.name}
                                        </p>
                                        {service.description && <p className="text-zinc-500">{service.description}</p>}
                                        <p className="text-green-700 font-bold">${formatDisplayNumber(service.price)}</p>
                                    </div>
                                    <button onClick={() =>
                                        isAuthenticated
                                            ? handleSelectService({ ...service, category: s.category })
                                            : router.push(`/auth/login?redirectTo=/entity/${entityNumberId}`)
                                    }
                                        className="btn-primary font-bold rounded-md">Agendar</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            }
        </>
    )
}