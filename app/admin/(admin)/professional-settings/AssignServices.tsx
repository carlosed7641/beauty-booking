'use client'

import { Fragment, SetStateAction, useEffect, useState, useTransition } from 'react'
import clsx from 'clsx'
import { RxCaretDown } from 'react-icons/rx'
import { useModal } from '@/store'
import { SelectHour, SelectPrice } from '../components'
import { formatDisplayNumber, formatNumber, getRawNumber } from '@/helpers'
import { upsertProfessionalService } from '@/actions'

interface Props {
    title: string
    hint: string
    serviceList?: { [key: string]: ServiceConfig[] }
    selectedProfessional: ProfessionalSettings
    setSelectedProfessional: React.Dispatch<SetStateAction<ProfessionalSettings>>
    type?: 'duration' | 'price'
}

export const AssignServices = ({ title, hint, selectedProfessional, setSelectedProfessional, type }: Props) => {

    const [closedServices, setClosedServices] = useState<string[]>([])
    const [selectedService, setSelectedService] = useState({ key: '', id: '', name: '', hours: 0, minutes: 0, price: 0 })
    const [error, setError] = useState('')
    const openModal = useModal(state => state.openModal)
    const setOpenModal = useModal(state => state.setOpenModal)
    const [isPending, startTransition] = useTransition()

    const handleToggleService = (serviceName: string) => {
        setClosedServices(prev =>
            prev.includes(serviceName)
                ? prev.filter(s => s !== serviceName)
                : [...prev, serviceName]
        )
    }

    const handleSelectService = (key: string, serviceId: string) => {

        const currentServices = selectedProfessional.services?.[key] ?? []

        const service = currentServices.find(s => s.serviceId === serviceId)

        if (!service) return

        const updatedServices = currentServices.map(service => {
            if (service.serviceId === serviceId) {
                return { ...service, enabled: !service.enabled }
            }

            return service
        })

        const newValue = {
            ...selectedProfessional,
            services: { ...selectedProfessional.services, [key]: updatedServices }
        }

        setSelectedProfessional(newValue)

        startTransition(async () => {
            const services = 
                Object.values(newValue.services)
                .flat()
                .map(service => ({
                    serviceId: service.serviceId!,
                    enabled: service.enabled!,
                    price: service.price,
                    durationHours: service.duration.hours,
                    durationMinutes: service.duration.minutes
                }))

            try {
                await upsertProfessionalService(selectedProfessional.id, services)
            } catch (error) {   
                setSelectedProfessional(prev => {
                    return {
                        ...prev,
                         services: {
                            ...prev.services,
                            [key]: (prev?.services?.[key] ?? []).map(s =>
                                s.serviceId === serviceId ? service : s
                            )
                         }
                    }
                })
            }
        })
    }

    const handleOpenService = (key: string, value: ServiceConfig) => {
        const { name, id, duration: { hours, minutes }, price } = value
        setSelectedService({ key, id, name, hours, minutes, price })
        setOpenModal(AssignServices.name + type)
    }

    const handleChangeService = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target

        setSelectedService(prev => ({
            ...prev,
            [name]: Number(getRawNumber(value))
        }))
    }

    const updateService = (field: 'duration' | 'price') => {
        const { key, id, hours, minutes, price } = selectedService

        if (field === 'duration' && hours + minutes === 0) {
            return setError('La duración no puede ser cero')
        }
        if (field === 'price' && !price) {
            return setError('Debe ingresar un precio')
        }

        const value = field === 'duration'
            ? { hours, minutes }
            : price

        setSelectedProfessional(prev => ({
            ...prev,
            services: {
                ...prev.services,
                [key]: prev.services?.[key].map(service =>
                    service.id === id ? { ...service, [field]: value } : service
                ) ?? []
            }
        }))

        setOpenModal(null)
        //TODO: Save To DB here
    }


    useEffect(() => {
        setError('')
    }, [openModal])

    useEffect(() => {

    }, [selectedProfessional])

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-green-700">{title}</h2>
                <span className="text-center">{hint}</span>
            </div>
            {
                Object.entries(selectedProfessional.services ?? []).map(([key, values], index) => (
                    <Fragment key={key}>
                        <div onClick={() => handleToggleService(key)} className=" border-b border-zinc-300 p-2 flex items-center gap-1 list-none cursor-pointer text-green-700 font-bold">
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
                                    <Fragment key={key + value.id}>
                                        {
                                            type ?
                                                <div className="flex items-center justify-between">
                                                    <span className="py-1 text-zinc-600">{value.name}</span>
                                                    {
                                                        type === "duration" && value.duration &&
                                                        <span onClick={() => handleOpenService(key, value)} className="text-green-700 underline font-bold cursor-pointer">
                                                            {value.duration.hours > 0 ? `${value.duration.hours} ${value.duration.hours === 1 ? 'hr' : 'hrs'} ${value.duration.minutes > 0 ? 'y ' + value.duration.minutes + ' min' : ''}` : `${value.duration.minutes} min`}
                                                        </span>
                                                    }
                                                    {
                                                        type === "price" && value.price &&
                                                        <span onClick={() => handleOpenService(key, value)} className="text-green-700 underline font-bold cursor-pointer">
                                                            ${formatDisplayNumber(value.price)}
                                                        </span>
                                                    }
                                                </div>
                                                :
                                                <label className="cursor-pointer flex gap-1  py-1 text-zinc-600 items-center">
                                                    <input
                                                        checked={value.enabled}
                                                        onChange={() => handleSelectService(key, value.serviceId ?? '')} className="cursor-pointer h-4 w-4 md:h-3.5 md:w-3.5 accent-green-700" type="checkbox"
                                                        disabled={isPending}
                                                    />
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
            {
                openModal === AssignServices.name + 'duration' &&
                <SelectHour
                    serviceName={selectedService.name}
                    hours={selectedService.hours}
                    minutes={selectedService.minutes}
                    error={error}
                    handleChange={handleChangeService}
                    handleSave={() => updateService('duration')}
                />
            }
            {
                openModal === AssignServices.name + 'price' &&
                <SelectPrice
                    serviceName={selectedService.name}
                    price={selectedService.price}
                    error={error}
                    handleChange={handleChangeService}
                    handleSave={() => updateService('price')}
                />
            }
        </>
    )
}
