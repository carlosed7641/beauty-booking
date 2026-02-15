'use client'

import { useShallow } from 'zustand/shallow'
import { useMemo, useState } from 'react'
import { useModal } from '@/store'
import { Field, Modal, ModalHeader } from '@/components'
import { useServiceFormData } from '../store'
import { formatNumber } from '@/helpers'
import { createService, updateService } from '@/actions'

export const ServiceForm = ({ categories, entityId }: { categories: string[], entityId: string }) => {

    const [status, setStatus] = useState({ isLoading: false, error: false })

    const {
        formData,
        setFormData,
        touched,
        setTouched,
        errors,
        setErrors
    } = useServiceFormData(
        useShallow(state => ({
            formData: state.serviceFormData,
            setFormData: state.setServiceFormData,
            touched: state.touched,
            setTouched: state.setTouched,
            errors: state.errors,
            setErrors: state.setErrors
        }))
    )
    const setOpenModal = useModal(state => state.setOpenModal)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!isFormValid) return

        const { price, hours, minutes, ...values } = formData

        const data = {
            ...values,
            basePrice: Number(price),
            baseDurationHours: hours,
            baseDurationMinutes: minutes,
        }

        for (const [key, value] of Object.entries(data)) {

            (data as any)[key] = typeof value === 'string' && value.trim() === ''
                ? null
                : value
        }

        try {
            setStatus({ isLoading: true, error: false })

            if (formData.serviceId) {
                await updateService(data)
            } else {
                const { serviceId, ...values } = data
                await createService({entityId, ...values})
            }

            setStatus({ isLoading: false, error: false })
            setOpenModal(null)
        } catch {
            setStatus({ isLoading: false, error: true })
        }

    }

    const handleChangeField = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const name = e.target.name as keyof typeof formData
        const value = name === 'price' ? e.target.value.replace(/\D/g, '') : e.target.value
        const numericFields = ['hours', 'minutes']
        const isNumericField = numericFields.includes(name)

        setFormData({
            ...formData,
            [name]: isNumericField ? Number(value) : value
        })

        if (touched[name] || isNumericField) {
            validateField(isNumericField ? 'duration' : name, value)
        }
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setTouched({ ...touched, [name]: true })
        validateField(name as keyof typeof formData, value)
    }

    const validateField = (field: keyof typeof formData | 'duration', value: string) => {
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

        setErrors({ ...errors, [field]: error })
    }

    const isFormValid = useMemo(() => {
        const { name, category, gender, hours, minutes, price } = formData
        const totalMinutes = hours * 60 + minutes
        return Boolean(name.trim() && category && gender && totalMinutes > 0 && price.trim())
    }, [formData])

    return (
        <Modal className="md:w-162.5!">
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
                        {categories.map(category => <option key={category} value={category}>{category}</option>)}
                    </select>
                    {errors.category && <span className="text-red-500">{errors.category}</span>}
                </Field>
                <Field label="Género destinado *" hint="¿Para cuál género está destinado este servicio?" colorLabel={`${errors.gender ? '#fb2c36' : '#008236'}`}>
                    <select onChange={handleChangeField} name="gender" value={formData.gender ?? ''} className={`mt-2 p-1.5 border rounded-md focus:outline-0 ${errors.gender ? 'border-red-500' : 'border-green-700'}`}>
                        <option value="" disabled>Elige una género</option>
                        <option value="men">Masculino</option>
                        <option value="women">Femenino</option>
                        <option value="other">Unisex</option>
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
                        <input onChange={handleChangeField} onBlur={handleBlur} value={formatNumber(formData.price)} name="price" className={`border w-full p-1 rounded-md focus:outline-0 ${errors.price ? 'border-red-500' : 'border-green-700'}`} type="text" />
                    </div>
                    {errors.price && <span className="text-red-500">{errors.price}</span>}
                </Field>
                { status.error && <span className="text-red-500">Ocurrió un error al guardar, inténtelo más tarde.</span> }
                <button disabled={!isFormValid || status.isLoading} type="submit" className="btn-primary rounded-full md:self-end px-4! py-2! w-full md:w-fit">
                   { status.isLoading ? 'Guardando...' : ' Guardar cambios' }
                </button>
            </form>
        </Modal>
    )
}
