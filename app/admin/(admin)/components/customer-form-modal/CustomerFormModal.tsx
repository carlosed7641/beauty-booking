'use client'

import { useState } from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import { useModal } from '@/store'
import { Modal, ModalHeader } from '@/components'
import { COUNTRIES } from '@/util/const'

interface Props {
    selectedCustomer: CustomerData
}

export const CustomerFormModal = ({ selectedCustomer }: Props) => {

    const { id, name, phone: { indicator, number } } = selectedCustomer

    const { setOpenModal } = useModal()
    const [formData, setFormData] = useState({ id, name, indicator, number })

    const handleChangeField = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // TODO: Save TO BD
        console.log(formData)
        setOpenModal(null)
    }

    return (
        <Modal className="md:overflow-hidden max-w-[700px]">
            <ModalHeader>
                <div className="flex items-center gap-2 text-green-700 font-bold text-xl">
                    <IoArrowBackOutline className="cursor-pointer" onClick={() => setOpenModal('CustomerInfo')} />
                    Editor de clientes
                </div>
            </ModalHeader>
            <form onSubmit={onSubmitForm} className="flex flex-col gap-4">
                <label>
                    <span className="text-green-700">Nombre *</span>
                    <input onChange={handleChangeField} type="text" disabled value={formData.name} name="name" className="w-full border border-green-700 px-3 py-1 rounded-md disabled:bg-zinc-100 focus:outline-0" />
                </label>
                <div>
                    <label className="text-green-700" htmlFor="number">Número de contacto</label>
                    <div className="flex gap-2">
                        <select onChange={handleChangeField} value={formData.indicator} className="w-[100px] border border-green-700 px-3 py-1 rounded-md focus:outline-0" name="indicator">
                            {COUNTRIES.map(country => <option key={country.indicator} value={country.indicator}>+{country.indicator}</option>)}
                        </select>
                        <input onChange={handleChangeField} className="w-full border border-green-700 px-3 py-1 rounded-md focus:outline-0" type="tel" name="number" id="number" value={formData.number} />
                    </div>
                </div>
                <input type="submit" className="bg-green-700 font-bold mt-2 py-1.5 px-2 rounded justify-center flex self-end text-white cursor-pointer hover:bg-green-800 w-full md:w-36" value="Guardar" />
            </form>
        </Modal>
    )
}
