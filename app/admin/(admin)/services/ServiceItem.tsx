import { FaArrowCircleUp, FaTrashRestore } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import { useModal } from '@/store'
import { useServiceFormData } from '../store'
import { formatDisplayNumber, formatNumber } from '@/helpers'
import { updateService } from '@/actions'
import { useState } from 'react'

interface Props {
    serviceItem: ServiceItem
    category: string
}

export const ServiceItem = ({
    serviceItem,
    category
}: Props) => {

    const setOpenModal = useModal(state => state.setOpenModal)
    const setServiceFormData = useServiceFormData(state => state.setServiceFormData)
    const [isLoading, setIsLoading] = useState(false)

    const handleUpdate = ({
        description, price, duration: { hours, minutes }, ...rest
    }: ServiceItem & { category: string }) => {
        setServiceFormData({
            ...rest,
            description: description ?? '',
            price: price.toString(),
            hours: hours,
            minutes: minutes
        })
        setOpenModal('ServiceForm')
    }

    const handleToggleActive = async (serviceId: string, archived: boolean) => {
        setIsLoading(true)
        await updateService({ serviceId, archived })
        setIsLoading(false)
    }

    const isArchived = serviceItem.archived
    const Icon = isArchived ? FaArrowCircleUp : FaTrashRestore
    const label = isArchived ? 'Activar' : 'Archivar'

    return (
        <li key={serviceItem.serviceId} className="p-4 border border-zinc-200 flex flex-col rounded-sm">
            <div className="flex flex-col text-sm md:text-base">
                <span className="font-bold text-green-700">{serviceItem.name}</span>
                ${formatDisplayNumber(serviceItem.price)}
                <span className="text-zinc-500">Duración:
                    {serviceItem.duration.hours > 0 ? ` ${serviceItem.duration.hours} ${serviceItem.duration.hours === 1 ? 'hr' : 'hrs'} ${serviceItem.duration.minutes > 0 ? 'y ' + serviceItem.duration.minutes + ' min' : ''}` : ` ${serviceItem.duration.minutes} min`}
                </span>
            </div>
            {isLoading ?
                <p className="flex gap-3 self-end">Procesando...</p>
                :
                <div className="text-sm flex gap-3 self-end">
                    <button onClick={() => handleUpdate({ ...serviceItem, category })} className="flex flex-col text-green-700 gap-1 items-center cursor-pointer">
                        <MdEdit />
                        Editar
                    </button>
                    <button onClick={() => handleToggleActive(serviceItem.serviceId, !serviceItem.archived)} className="flex flex-col text-zinc-500 gap-1 items-center cursor-pointer">
                        <Icon />
                        {label}
                    </button>
                </div>
            }
        </li>
    )
}
