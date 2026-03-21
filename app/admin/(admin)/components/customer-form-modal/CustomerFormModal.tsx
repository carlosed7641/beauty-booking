'use client'

import { useState, useTransition } from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import { useModal } from '@/store'
import { Modal, ModalHeader } from '@/components'
import { updateCustomer } from '@/actions'

interface Props {
    selectedCustomer: CustomerData
    countries: Country[]
    entityId: string
}

export const CustomerFormModal = ({ selectedCustomer, countries, entityId }: Props) => {

    const { id, name, phone: { indicator, number } } = selectedCustomer

    const setOpenModal = useModal(state => state.setOpenModal)
    const [formData, setFormData] = useState({ id, name, indicator, phone: number })
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState(false)

    const handleChangeField = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(false)

        startTransition(async () => {
            try {
                await updateCustomer({ ...formData, entityId })
                setOpenModal(null)
            } catch {
                setError(true)
            }
        })
    }

    const isValid = formData.name.trim() && formData.indicator && formData.phone.trim()

    return (
        <Modal className="md:overflow-hidden max-w-175">
            <ModalHeader>
                <div className="flex items-center gap-2 text-green-700 font-bold text-xl">
                    <IoArrowBackOutline className="cursor-pointer" onClick={() => setOpenModal('CustomerInfo')} />
                    Editor de clientes
                </div>
            </ModalHeader>
            <form onSubmit={onSubmitForm} className="flex flex-col gap-4">
                <label>
                    <span className="text-green-700">Nombre *</span>
                    <input onChange={handleChangeField} type="text" value={formData.name} name="name" className="w-full border border-green-700 px-3 py-1 rounded-md disabled:bg-zinc-100 focus:outline-0" />
                </label>
                <div>
                    <label className="text-green-700" htmlFor="number">Número de contacto</label>
                    <div className="flex gap-2">
                        <select onChange={handleChangeField} value={formData.indicator} className="w-25 border border-green-700 px-3 py-1 rounded-md focus:outline-0" name="indicator">
                            {countries.map(country => <option key={country.indicator} value={country.indicator}>+{country.indicator}</option>)}
                        </select>
                        <input onChange={handleChangeField} className="w-full border border-green-700 px-3 py-1 rounded-md focus:outline-0" type="tel" name="phone" id="phone" value={formData.phone} />
                    </div>
                </div>
                {error && <span className="text-red-500">Ocurrió un error, inténtelo más tarde</span>}
                <input disabled={!isValid || isPending} type="submit" className="bg-green-700 font-bold mt-2 py-1.5 px-2 rounded justify-center flex self-end text-white cursor-pointer hover:bg-green-800 w-full md:w-36 disabled:opacity-60 disabled:pointer-events-none" value="Guardar" />
            </form>
        </Modal>
    )
}
