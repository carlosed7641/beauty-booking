'use client'

import { useEffect, useMemo, useState } from 'react'
import { FaArrowCircleUp, FaTrashRestore } from 'react-icons/fa'
import clsx from 'clsx'
import { serviceList } from '@/util/fake-data'
import { RxCaretDown } from 'react-icons/rx'
import { formatNumber, getRawNumber } from '@/helpers'
import { MdEdit } from 'react-icons/md'
import { useModal } from '@/store'
import { Field, Modal, ModalHeader } from '@/components'
import { SHOP_TYPES } from '@/util/const'

const entityId = '422'

const INITIAL_STATE = {
    id: '',
    name: '',
    category: '',
    gender: '',
    description: '',
    hours: 0,
    minutes: 30,
    price: ''
}

export default function ServicesPage() {

    // TODO: Component my page my reservations
    const [currentTab, setCurrentTab] = useState<'active' | 'archived'>('active')
    const [formState, setFomrState] = useState(INITIAL_STATE)
    // TODO: Api
    const services = serviceList.filter(service => service.entityId === entityId)
    const categories = services.map(s => s.category)
    const [openCategories, setOpenCategories] = useState<string[]>(categories)
    const { openModal, setOpenModal } = useModal()
    const isFormValid = useMemo(() => {
        const { name, category, gender, description, hours, minutes, price } = formState 
        const totalMinutes = Number(hours) * 60 + Number(minutes)
        return Boolean(name && category && gender && totalMinutes > 0 && price)
    }, [formState])

    const handleToggleCategory = (category: string) => {
        setOpenCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        )
    }

    const handleChangeField = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const name = e.target.name
        const value = e.target.value
        const numericFields = ['hours', 'minutes']

        setFomrState(prev => ({
            ...prev,
            [name]: numericFields.includes(name) ? Number(value) : value
        }))
    }


    const handleSubmit = (e:  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!isFormValid) return

        // console.log(Number(getRawNumber(formState.price)))
       
        if (formState.id) {
            // TODO: [PUT]
        } else {
            // TODO: [POST]
        }

        setFomrState(INITIAL_STATE)
        setOpenModal(null)
    }

    useEffect(() => {
        setFomrState(INITIAL_STATE)
    }, [openModal])

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
                                    services.map(service => {
                                        const allArchived = service.services.every(s => s.archived)
                                        if (!allArchived) {
                                            return (
                                                <div key={service.category} className="border-b border-b-zinc-200">
                                                    <div onClick={() => handleToggleCategory(service.category)} className="flex items-center gap-1.5 text-green-700 py-2 cursor-pointer font-bold">
                                                        <RxCaretDown className="text-2xl transition-all duration-500" />
                                                        {service.category}
                                                    </div>
                                                    <ul className={
                                                        clsx(
                                                            "flex flex-col gap-3 transition-all duration-500",
                                                            {
                                                                "max-h-0 opacity-0 overflow-hidden p-0 invisible": !openCategories.includes(service.category),
                                                                "p-3 pt-0 opacity-100 visible": openCategories.includes(service.category),
                                                            }
                                                        )
                                                    }>
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
                                                                            <button onClick={() => setOpenModal('UpdateService')} className="flex flex-col text-green-700 gap-1 items-center cursor-pointer">
                                                                                <MdEdit />
                                                                                Editar
                                                                            </button>
                                                                            <button className="flex flex-col text-zinc-500 gap-1 items-center cursor-pointer">
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
            {
                openModal === 'UpdateService' &&
                <Modal className="md:w-[650px]!">
                    <ModalHeader>
                        <h2 className="font-bold text-green-700">Editor de servicios</h2>
                    </ModalHeader>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <Field label="Nombre *" colorLabel="#008236">
                            <input onChange={handleChangeField} name="name" autoComplete="off" value={formState.name} className="mt-2 border border-green-700 p-1 rounded-md focus:outline-0" type="text" placeholder="Ej. Corte con barba" />
                        </Field>
                        <Field label="Categoría *" colorLabel="#008236">
                            <select onChange={handleChangeField} name="category" value={formState.category} className="mt-2 p-1.5 border border-green-700 rounded-md focus:outline-0 focus:border-green-700">
                                <option value="" disabled>Elige una categoría</option>
                                {
                                    SHOP_TYPES.map(category => <option key={category} value={category}>{category}</option>)
                                }
                            </select>
                        </Field>
                        <Field label="Género destinado *" hint="¿Para cuál género está destinado este servicio?" colorLabel="#008236">
                            <select onChange={handleChangeField} name="gender" value={formState.gender} className="mt-2 p-1.5 border border-green-700 rounded-md focus:outline-0 focus:border-green-700">
                                <option value="" disabled>Elige una género</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Unisex">Unisex</option>
                            </select>
                        </Field>
                        <Field label="Descripción" colorLabel="#008236">
                            <textarea onChange={handleChangeField} name="description" value={formState.description}  className="mt-2 border border-green-700 p-1 rounded-md focus:outline-0" placeholder="Escribe detalles sobre el servicio" />
                        </Field>
                        <div className="flex flex-col gap-2">
                            <span className="text-green-700">Duración del servicio *</span>
                            <div className="flex gap-2 items-center">
                                <Field className="w-1/2" label="Horas" colorLabel="#008236">
                                    <select onChange={handleChangeField} name="hours" value={formState.hours} className="border p-1 border-green-700 rounded-md focus:outline-0">
                                        {Array.from({ length: 13 }).map((_, idx) => (
                                            <option key={idx} value={idx}>{idx}</option>
                                        ))}
                                    </select>
                                </Field>
                                <Field className="w-1/2" label="Minutos" colorLabel="#008236">
                                    <select onChange={handleChangeField} name="minutes" value={formState.minutes} className="border p-1 border-green-700 rounded-md focus:outline-0">
                                        {Array.from({ length: 12 }).map((_, idx) => (
                                            <option key={idx * 5} value={idx * 5}>{idx * 5}</option>
                                        ))}
                                    </select>
                                </Field>
                            </div>
                            <span>Duración: {formState.hours > 0 ? `${formState.hours} ${formState.hours === 1 ? 'hr' : 'hrs'} ${formState.minutes > 0 ? 'y ' + formState.minutes + ' min' : ''}` : `${formState.minutes} min`}</span>
                        </div>
                        <Field label="Precio *" colorLabel="#008236">
                            <div className="flex items-center gap-1.5 mt-2">
                                <span className="text-green-700">$</span>
                                <input onChange={handleChangeField} value={formatNumber(formState.price.toString())} name="price" className="border w-full border-green-700 p-1 rounded-md focus:outline-0" type="text" />
                            </div>
                        </Field>
                        <button type="submit" className="bg-green-700 rounded-full focus:outline-0 hover:bg-green-800 text-white md:self-end px-4 py-2 w-full md:w-fit cursor-pointer">
                            Guardar cambios
                        </button>
                    </form>
                </Modal>
            }
        </>
    )
}