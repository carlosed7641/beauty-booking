'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaArrowCircleUp, FaTrashRestore } from 'react-icons/fa'
import { IoMdAddCircleOutline, IoMdArrowRoundBack } from 'react-icons/io'
import { useModal } from '@/store'
import { SimpleTabs } from '@/components'
import { useServiceFormData } from '../store'
import { ServiceList } from './ServiceList'
import { SERVICE_INITIAL_DATA } from '@/util/const'
import { ServiceForm } from './ServiceForm'

interface Props {
    services: Service[]
    categories: string[]
}

const tabs = [
    { id: 'active', label: 'Activos', icon: FaArrowCircleUp },
    { id: 'archived', label: 'Archivados', icon: FaTrashRestore }
]

export const Services = ({
    services,
    categories
}: Props) => {

    const [currentTab, setCurrentTab] = useState('active')
    const { setServiceFormData: setFormData, setErrors, setTouched } = useServiceFormData()
    const { openModal, setOpenModal } = useModal()

    useEffect(() => {
        if (!openModal) {
            setFormData(SERVICE_INITIAL_DATA)
            setErrors({})
            setTouched({})
        }
    }, [openModal])

    return (
        <>
            
            <div className="flex items-center gap-2 mb-3">
                <Link href="/admin" title="Volver">
                     <IoMdArrowRoundBack className="cursor-pointer text-xl text-green-700" />
                </Link>
                <h1 className="text-lg text-green-700 font-bold">Servicios</h1>
            </div>
            <div className="flex flex-col gap-6">
                <div className="bg-white w-full rounded-md p-7 relative">
                    <SimpleTabs
                        tabs={tabs}
                        activeTab={currentTab}
                        setActiveTab={setCurrentTab}
                    />
                    <ServiceList
                        categories={categories}
                        services={services}
                        currentTab={currentTab}
                    />
                    <button onClick={() => setOpenModal('ServiceForm')} className="fixed bottom-10 right-10 xl:right-[calc(50%-600px+40px)] flex items-center gap-2 px-3 py-2 bg-green-700 rounded-full cursor-pointer hover:bg-green-800 text-white">
                        <IoMdAddCircleOutline className="text-xl" />
                        Crear servicio
                    </button>
                </div>
            </div >
            {openModal === 'ServiceForm' && <ServiceForm categories={categories} />}
        </>
    )
}
