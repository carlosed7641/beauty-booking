'use client'

import { Fragment, useState } from 'react'
import { RxCaretDown } from 'react-icons/rx'
import clsx from 'clsx'
import { formatNumber } from '@/helpers'

interface Props {
    serviceList?: { [key: string]: ServiceConfigAlt[] }
    selectedProfessional: ProfessionalSettings
    type?: 'duration' | 'price'
}

export const AssignServices = ({ serviceList, selectedProfessional, type }: Props) => {

    const [closedServices, setClosedServices] = useState<string[]>([])

    const handleClickService = (serviceName: string) => {
        setClosedServices(prev =>
            prev.includes(serviceName)
                ? prev.filter(s => s !== serviceName)
                : [...prev, serviceName]
        )
    }

    return (
        <>
            <>
                {
                    Object.entries(serviceList ? serviceList : selectedProfessional.services).map(([key, values]) => (
                        <Fragment key={key}>
                            <div onClick={() => handleClickService(key)} className=" border-b border-zinc-300 p-2 flex items-center gap-1 list-none cursor-pointer text-green-700 font-bold">
                                <RxCaretDown className="text-2xl" />
                                {key}
                            </div>
                            <div className={
                                clsx(
                                    "flex flex-col px-8 transition-all duration-300",
                                    {
                                        "max-h-screen opacity-100": !closedServices.includes(key),
                                        "max-h-0 overflow-hidden opacity-0": closedServices.includes(key)
                                    }
                                )
                            }>
                                {
                                    values.map(value => (
                                        <Fragment key={key + value}>
                                            {
                                                type ?
                                                    <div className="flex items-center justify-between">
                                                        <span className="py-1 text-zinc-600">{value.name}</span>
                                                        {
                                                            type === "duration" && value.duration &&
                                                            <span className="underline">
                                                                {value.duration.hours > 0 ? `${value.duration.hours} ${value.duration.hours === 1 ? 'hr' : 'hrs'} ${value.duration.minutes > 0 ? 'y ' + value.duration.minutes + ' min' : ''}` : `${value.duration.minutes} min`}
                                                            </span>
                                                        }
                                                        {
                                                            type === "price" && value.price &&
                                                            <span className="underline">
                                                                ${formatNumber(value.price.toString())}
                                                            </span>
                                                        }
                                                    </div>
                                                    :
                                                    <label className="cursor-pointer flex gap-1  py-1 text-zinc-600 items-center">
                                                        <input checked={selectedProfessional.services[key]?.some(service => service.name === value.name)
                                                        } onChange={() => { }} className="cursor-pointer h-4 w-4 md:h-3.5 md:w-3.5 accent-green-700" type="checkbox" />
                                                        {value.name}
                                                    </label>
                                            }
                                        </Fragment>
                                    ))
                                }
                            </div>
                        </Fragment>
                    ))
                }
            </>
        </>
    )
}
