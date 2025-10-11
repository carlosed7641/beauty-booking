'use client'

import { useEffect, useMemo, useState } from 'react'
import { FaArrowCircleUp, FaTrashRestore } from 'react-icons/fa'
import clsx from 'clsx'
import { serviceList } from '@/util/fake-data'
import { RxCaretDown } from 'react-icons/rx'
import { formatNumber } from '@/helpers'
import { MdEdit } from 'react-icons/md'
import { useModal } from '@/store'
import { Field, Modal, ModalHeader } from '@/components'
import { CATEGORIES } from '@/util/const'
import { IoMdAddCircleOutline } from 'react-icons/io'

const entityId = '422'

const INITIAL_STATE = {
    serviceId: '',
    name: '',
    category: '',
    gender: '' as Gender,
    description: '',
    hours: 0,
    minutes: 30,
    price: ''
}

export default function ServicesPage() {

    // TODO: Component my page my reservations
    const [currentTab, setCurrentTab] = useState<'active' | 'archived'>('active')
    const [formData, setFormData] = useState(INITIAL_STATE)
    const [touched, setTouched] = useState<Partial<Record<keyof typeof formData, boolean>>>({})
    const [errors, setErrors] = useState<Partial<Record<keyof typeof formData | 'duration', string>>>({})
    // TODO: Api
    const services = serviceList.filter(service => service.entityId === entityId)
    const categories = services.map(s => s.category)
    const [openCategories, setOpenCategories] = useState<string[]>(categories)
    const { openModal, setOpenModal } = useModal()

    const isFormValid = useMemo(() => {
        const { name, category, gender, hours, minutes, price } = formData
        const totalMinutes = hours * 60 + minutes
        return Boolean(name && category && gender && totalMinutes > 0 && price)
    }, [formData])

    const handleToggleCategory = (category: string) => {
        setOpenCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        )
    }


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!isFormValid) return

        // console.log(Number(getRawNumber(formData.price)))

        if (formData.serviceId) {
            // TODO: [PUT] & revalidatePath()
        } else {
            // TODO: [POST] & revalidatePath()
        }

        setOpenModal(null)
    }

    const handleUpdate = ({
        description, price, duration: { hours, minutes }, ...rest
    }: ServiceItem & { category: string }) => {
        setFormData({
            ...rest,
            description: description ?? '',
            price: price.toString(),
            hours: hours,
            minutes: minutes
        })
        setOpenModal('ServiceForm')
    }

    const validate = (field: keyof typeof formData | 'duration', value: string) => {
        let error = ""

        if (field === 'duration') {
            if (
                Number(value) * 60 + formData.minutes === 0 ||
                formData.hours * 60 + Number(value) === 0
            ) {
                error = 'La duración no puede ser cero'
            }
        } else if (!value) {
            error = "El campo es obligatorio"
        }

        setErrors(prev => ({ ...prev, [field]: error }))
    }

    const handleChangeField = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const name = e.target.name as keyof typeof formData
        const value = e.target.value
        const numericFields = ['hours', 'minutes']
        const isNumericField = numericFields.includes(name)

        setFormData(prev => ({
            ...prev,
            [name]: isNumericField ? Number(value) : value
        }))

        if (touched[name] || isNumericField) {
            validate(isNumericField ? 'duration' : name, value)
        }
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setTouched(prev => ({ ...prev, [name]: true }))
        validate(name as keyof typeof formData, value)
    }

    const handleToggleActive = (service: ServiceItem) => {
        // TODO: [PUT]
        const newData = {
            ...service,
            archived: !!service.archived
        } 

        // save(new Data)
        // revalidatePath()
    }

    useEffect(() => {
        if (!openModal) {
            setFormData(INITIAL_STATE)
            setErrors({})
            setTouched({})
        }
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
                                                                            <button onClick={() => handleUpdate({ ...s, category: service.category })} className="flex flex-col text-green-700 gap-1 items-center cursor-pointer">
                                                                                <MdEdit />
                                                                                Editar
                                                                            </button>
                                                                            <button onClick={() => handleToggleActive(s)} className="flex flex-col text-zinc-500 gap-1 items-center cursor-pointer">
                                                                                <FaTrashRestore />
                                                                                Archivar
                                                                                {/* <FaArrowCircleUp />
                                                                                Activar */}
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
                    <div onClick={() => setOpenModal('ServiceForm')} className="fixed bottom-10 right-10 xl:right-[calc(50%-600px+40px)] flex items-center gap-2 px-3 py-2 bg-green-700 rounded-full cursor-pointer hover:bg-green-800 text-white">
                        <IoMdAddCircleOutline className="text-xl" />
                        Crear servicio
                    </div>
                </div>
            </div>
            {
                openModal === 'ServiceForm' &&
                <Modal className="md:w-[650px]!">
                    <ModalHeader>
                        <h2 className="font-bold text-green-700">Editor de servicios</h2>
                    </ModalHeader>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <Field label="Nombre *" colorLabel={`${errors.name ? '#fb2c36' : '#008236'}`}>
                            <input onChange={handleChangeField} onBlur={handleBlur} name="name" autoComplete="off" value={formData.name} className={`mt-2 border p-1 rounded-md focus:outline-0 mb-1 ${errors.name ? 'border-red-500' : 'border-green-700'}`} type="text" placeholder="Ej. Corte con barba" />
                            {errors.name && <span className="text-red-500">{errors.name}</span>}
                        </Field>
                        <Field label="Categoría *" colorLabel={`${errors.category ? '#fb2c36' : '#008236'}`}>
                            <select onChange={handleChangeField} name="category" value={formData.category} className={`mt-2 p-1.5 border rounded-md focus:outline-0 ${errors.category ? 'border-red-500' : 'border-green-700'}`}>
                                <option value="" disabled>Elige una categoría</option>
                                {CATEGORIES.map(category => <option key={category} value={category}>{category}</option>)}
                            </select>
                            {errors.category && <span className="text-red-500">{errors.category}</span>}
                        </Field>
                        <Field label="Género destinado *" hint="¿Para cuál género está destinado este servicio?" colorLabel={`${errors.gender ? '#fb2c36' : '#008236'}`}>
                            <select onChange={handleChangeField} name="gender" value={formData.gender} className={`mt-2 p-1.5 border rounded-md focus:outline-0 ${errors.gender ? 'border-red-500' : 'border-green-700'}`}>
                                <option value="" disabled>Elige una género</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Unisex">Unisex</option>
                            </select>
                            {errors.gender && <span className="text-red-500">{errors.gender}</span>}
                        </Field>
                        <Field label="Descripción" colorLabel="#008236">
                            <textarea onChange={handleChangeField} name="description" value={formData.description} className="mt-2 border border-green-700 p-1 rounded-md focus:outline-0" placeholder="Escribe detalles sobre el servicio" />
                        </Field>
                        <div className="flex flex-col gap-2">
                            <span className={`${errors.duration ? 'text-red-500' : 'text-green-700'}`}>Duración del servicio *</span>
                            <div className="flex gap-2 items-center">
                                <Field className="w-1/2" label="Horas" colorLabel={`${errors.duration ? '#fb2c36' : '#008236'}`}>
                                    <select onChange={handleChangeField} name="hours" value={formData.hours} className={`border p-1 rounded-md focus:outline-0 ${errors.duration ? 'border-red-500' : 'border-green-700'}`}>
                                        {Array.from({ length: 13 }).map((_, idx) => (
                                            <option key={idx} value={idx}>{idx}</option>
                                        ))}
                                    </select>
                                </Field>
                                <Field className="w-1/2" label="Minutos" colorLabel={`${errors.duration ? '#fb2c36' : '#008236'}`}>
                                    <select onChange={handleChangeField} name="minutes" value={formData.minutes} className={`border p-1 rounded-md focus:outline-0 ${errors.duration ? 'border-red-500' : 'border-green-700'}`}>
                                        {Array.from({ length: 12 }).map((_, idx) => (
                                            <option key={idx * 5} value={idx * 5}>{idx * 5}</option>
                                        ))}
                                    </select>
                                </Field>
                            </div>
                            {
                                errors.duration ?
                                    <span className="text-red-500">{errors.duration}</span> :
                                    <span>Duración: {formData.hours > 0 ? `${formData.hours} ${formData.hours === 1 ? 'hr' : 'hrs'} ${formData.minutes > 0 ? 'y ' + formData.minutes + ' min' : ''}` : `${formData.minutes} min`}</span>
                            }
                        </div>
                        <Field label="Precio *" colorLabel={`${errors.price ? '#fb2c36' : '#008236'}`}>
                            <div className="flex items-center gap-1.5 mt-2">
                                <span className={`${errors.price ? 'text-red-500' : 'text-green-700'}`}>$</span>
                                <input onChange={handleChangeField} onBlur={handleBlur} value={formatNumber(formData.price.toString())} name="price" className={`border w-full p-1 rounded-md focus:outline-0 ${errors.price ? 'border-red-500' : 'border-green-700'}`} type="text" />
                            </div>
                            {errors.price && <span className="text-red-500">{errors.price}</span>}
                        </Field>
                        <button disabled={!isFormValid} type="submit" className="bg-green-700 rounded-full focus:outline-0 hover:bg-green-800 text-white md:self-end px-4 py-2 w-full md:w-fit cursor-pointer disabled:opacity-65 disabled:pointer-events-none">
                            Guardar cambios
                        </button>
                    </form>
                </Modal>
            }
        </>
    )
}