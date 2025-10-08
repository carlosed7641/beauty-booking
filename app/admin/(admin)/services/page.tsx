'use client'

import { useState } from 'react'
import { FaArrowCircleUp, FaTrashRestore } from 'react-icons/fa'
import clsx from 'clsx'
import { serviceList } from '@/util/fake-data'
import { RxCaretDown } from 'react-icons/rx'
import { formatNumber } from '@/helpers'
import { MdEdit } from 'react-icons/md'

const entityId = '422'

export default function ServicesPage() {

    // TODO: Component my page my reservations
    const [currentTab, setCurrentTab] = useState<'active' | 'archived'>('active')
    // TODO: Api
    const services = serviceList.filter(service => service.entityId === entityId)

    return (
        <>
            <h1 className="text-lg text-green-700 mb-3 font-bold">Servicios</h1>
            <div className="flex flex-col gap-6">
                <div className="bg-white w-full rounded-md p-7 relative">
                    <div className="flex justify-center gap-6">
                        <div onClick={() => setCurrentTab('active')} role="tab"
                            className={
                                clsx(
                                    "px-10 border-b-4 cursor-pointer border-zinc-300 flex gap-2 items-center pb-2",
                                    {
                                        "border-green-700! text-green-700": currentTab === 'active'
                                    }
                                )
                            }>
                            <FaArrowCircleUp />
                            Activos
                        </div>
                        <div onClick={() => setCurrentTab('archived')} role="tab"
                            className={
                                clsx(
                                    "px-10 border-b-4 cursor-pointer border-zinc-300 flex gap-2 items-center pb-2",
                                    {
                                        "border-green-700! text-green-700": currentTab === 'archived'
                                    }
                                )
                            }>
                            <FaTrashRestore />
                            Archivados
                        </div>
                    </div>
                    {
                        currentTab === 'active' ?
                            <>
                                {
                                    services.map((service, idx)  => {
                                        const allArchived = service.services.every(s => s.archived)
                                        if (!allArchived) {
                                            return (
                                                <div key={idx} className="border-b border-b-zinc-200 pb-3">
                                                    <div className="flex items-center gap-1.5 text-green-700 py-2 cursor-pointer font-bold">
                                                        <RxCaretDown className="text-2xl transition-all duration-500" />
                                                        {service.category}
                                                    </div>
                                                    <ul className="pl-3 flex flex-col gap-3">
                                                        {
                                                            service.services.map(s => {
                                                                if (s.archived) return
                                                                return (
                                                                    <li key={s.serviceId} className="p-4 border border-zinc-200 flex flex-col rounded-sm">
                                                                        <div className="flex flex-col text-sm md:text-base">
                                                                            <span className="font-bold text-green-700">{s.name}</span>
                                                                            ${formatNumber(s.price.toString())}
                                                                            <span className="text-zinc-500">Duración:
                                                                                {s.duration.hours > 0 ? ` ${s.duration.hours} ${s.duration.hours === 1 ? 'hr' : 'hrs'} ${s.duration.minutes > 0 ? 'y ' + s.duration.minutes + ' min' : ''}` : ` ${s.duration.minutes} min`}
                                                                            </span>
                                                                        </div>
                                                                        <div className="text-sm flex gap-3 self-end">
                                                                            <button className="flex flex-col text-green-700 gap-1 items-center cursor-pointer">
                                                                                <MdEdit />
                                                                                Editar
                                                                            </button>
                                                                            <button  className="flex flex-col text-zinc-500 gap-1 items-center cursor-pointer">
                                                                                <FaTrashRestore />
                                                                                Archivar
                                                                            </button>
                                                                        </div>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </>
                            :
                            <>
                                {
                                    services.map((service, idx) => {
                                        const someArchived = service.services.some(s => s.archived)
                                        if (someArchived) {
                                            return (
                                                <div key={idx}>
                                                    <p>{service.category}</p>
                                                    <ul>
                                                        {
                                                            service.services.map(s => {
                                                                if (s.archived) {
                                                                    return <li key={s.serviceId} className="pl-2">{s.name}</li>
                                                                }
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </>
                    }
                </div>
            </div>
        </>
    )
}