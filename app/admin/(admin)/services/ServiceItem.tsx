import { FaArrowCircleUp, FaTrashRestore } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import { useModal } from '@/store'
import { useServiceFormData } from '../store'
import { formatNumber } from '@/helpers'

interface Props {
    serviceItem: ServiceItem
    category: string
}

export const ServiceItem = ({
    serviceItem,
    category
}: Props) => {

    const { setOpenModal } = useModal()
    const { setServiceFormData } = useServiceFormData()

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

    const handleToggleActive = (service: ServiceItem) => {
        // TODO: [PUT] || server action
        const newData = {
            ...service,
            archived: !!service.archived
        }

        // save(new Data)
        // revalidatePath()
    }

    return (
        <li key={serviceItem.serviceId} className="p-4 border border-zinc-200 flex flex-col rounded-sm">
            <div className="flex flex-col text-sm md:text-base">
                <span className="font-bold text-green-700">{serviceItem.name}</span>
                ${formatNumber(serviceItem.price.toString())}
                <span className="text-zinc-500">Duración:
                    {serviceItem.duration.hours > 0 ? ` ${serviceItem.duration.hours} ${serviceItem.duration.hours === 1 ? 'hr' : 'hrs'} ${serviceItem.duration.minutes > 0 ? 'y ' + serviceItem.duration.minutes + ' min' : ''}` : ` ${serviceItem.duration.minutes} min`}
                </span>
            </div>
            <div className="text-sm flex gap-3 self-end">
                <button onClick={() => handleUpdate({ ...serviceItem, category })} className="flex flex-col text-green-700 gap-1 items-center cursor-pointer">
                    <MdEdit />
                    Editar
                </button>
                <button onClick={() => handleToggleActive(serviceItem)} className="flex flex-col text-zinc-500 gap-1 items-center cursor-pointer">
                    {
                        serviceItem.archived ?
                            <>
                                <FaArrowCircleUp />
                                Activar
                            </>
                            :
                            <>
                                <FaTrashRestore />
                                Archivar
                            </>
                    }
                </button>
            </div>
        </li>
    )
}
