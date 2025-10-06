'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { IoAddCircleOutline } from 'react-icons/io5'
import { Modal, ModalHeader } from '@/components'
import { useModal, useService } from '@/store'
import { ServiceList } from '@/(beauty)/components'
import { useSchedule } from '../../store'
import { SERVICE_INITIAL_STATE } from '@/util/const'
import { serviceList as fakeServiceList } from '@/util/fake-data'

const _customers: Session[] = [
    {
        id: '123',
        name: 'Pedro Perez',
        birthDay: '2000-04-26',
        gender: 'male',
        phone: '3004365676',
        country: 'CO',
        indicator: '+57'
    },
    {
        id: '124',
        name: 'Juan Carlos',
        birthDay: '2000-04-26',
        gender: 'male',
        photo: 'https://picsum.photos/50/50',
        country: 'CO'
    },
    {
        id: '125',
        name: 'David Ortiz',
        birthDay: '2000-04-26',
        gender: 'male',
        phone: '3009097876',
        photo: 'https://picsum.photos/50/50',
        country: 'CO',
        indicator: '+57'
    }
]

export const ScheduleAssign = () => {

    const { setOpenModal } = useModal()
    const { serviceState, setServiceState } = useService()
    const { date: selectedDate } = useSchedule(state => state.schedule)
    const [step, setStep] = useState(1)
    const [customers, setCustomers] = useState<Session[]>([])
    const [searchTerm, setSearchTerm] = useState("")

    // TODO: Api call
    const serviceList = fakeServiceList.filter(sl => sl.entityId === '422')

    useEffect(() => {
        // TODO: Api call
        setCustomers(_customers)
    }, [])

    const filteredCustomers = useMemo(() => {
        const term = searchTerm.toLowerCase().trim()
        if (!term) return customers

        return customers.filter(
            customer =>
                customer.name.toLowerCase().includes(term) ||
                customer.phone?.includes(term)
        )
    }, [customers, searchTerm])

    const handleBack = () => {
        setStep(step => step - 1)
        setServiceState(SERVICE_INITIAL_STATE)
    }

    const handleSelectCustomer = (customer: { id: string, name: string }) => {
        setStep(step => step + 1)
        setServiceState({ ...serviceState, selectedDate, customer })
    }

    return (
        <Modal>
            <ModalHeader>
                <h1 className="text-green-700 font-bold flex items-center gap-2">
                    {
                        step > 1 &&
                        <IoMdArrowRoundBack className="cursor-pointer text-xl" onClick={handleBack} />
                    }
                    Editor de reservas
                </h1>
            </ModalHeader>
            {step === 1 && (
                <>
                    <div className="flex gap-2 items-center mb-6">
                        <input onChange={(e) => setSearchTerm(e.target.value)} className="w-full h-fit px-3 py-1 border border-zinc-300 rounded-md focus:border-green-700 focus:outline-0" type="text" placeholder="Buscar por nombre o celular" />
                        <IoAddCircleOutline onClick={() => setOpenModal('UpdateCustomer')} title="Crear cliente" className="text-3xl text-green-700 cursor-pointer" />
                    </div>
                    {
                        customers.length > 0 ?
                            <ul className="flex flex-col">
                                {
                                    filteredCustomers.length > 0 ?
                                        filteredCustomers.map(({ id, photo, name, indicator, phone }) => (
                                            <li key={id} onClick={() => handleSelectCustomer({ id, name })}
                                                className="flex gap-2 border-b border-zinc-300 px-0.5 py-1.5 hover:bg-zinc-100 cursor-pointer">
                                                {
                                                    photo ? <Image className="object-cover h-10 w-10 rounded-full" src={photo} alt={name} width={40} height={40} />
                                                        : <div className="bg-green-800 text-white rounded-full flex items-center justify-center  h-10 w-10">{name[0]}</div>
                                                }
                                                <div className="flex flex-col gap-0.5">
                                                    <p className="text-sm">{name}</p>
                                                    <span className="text-xs text-zinc-500">{phone ? indicator! + ' ' + phone : 'N/A'}</span>
                                                </div>
                                            </li>
                                        ))
                                        :
                                        <h2 className="text-center">No hay clientes que coincidan con la búsqueda</h2>
                                }
                            </ul>
                            : <h2 className="text-center">Aún no hay clientes para mostrar</h2>
                    }
                </>
            )
            }
            {step === 2 && (
                <div>
                    <h3 className="text-green-700 mb-6">Elige el sevicio</h3>
                    <ServiceList serviceList={serviceList} />
                </div>
            )
            }
        </Modal>
    )
}
