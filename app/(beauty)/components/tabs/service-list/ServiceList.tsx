'use client'

import clsx from 'clsx'
import { useState } from 'react'
import { RxCaretDown } from 'react-icons/rx'
import { useModal, useService } from '@/store'

export const ServiceList = ({ serviceList }: {
    serviceList: Service[]
}) => {

    const [currentOpenCategory, setCurrentOpenCategory] = useState<string | null>(null)
    const { serviceState, setServiceState } = useService()
    const { setOpenModal } = useModal()

    const handleSelectService = (serviceItem: ServiceItemExtended) => {
        setServiceState({
            ...serviceState,
            selectedService: serviceItem
        })

        setOpenModal('ServiceList')
    }

    //TODO: Serivce list by professional

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
                                        <p className="text-zinc-500">{service.description}</p>
                                        <p className="text-green-700 font-bold">${service.price}</p>
                                    </div>
                                    <button onClick={() => handleSelectService({ ...service, entityName: s.entityName, category: s.category })} className="rounded-md py-2 px-5 cursor-pointer text-white bg-green-700 hover:bg-green-900">Agendar</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            }
        </>
    )
}