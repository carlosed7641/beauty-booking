import { LuPhone } from 'react-icons/lu'
import { useModal } from '@/store'
import { formaDateShort, getDaysSince } from '@/helpers'

const hints: Record<string, string> = {
    'all': 'Próximos cumpleaños',
    'most-visits': 'Clientes con más visitas',
    'not-returned': 'Días que han pasado desde su última visita'
}

interface Props {
    customers: CustomerData[]
    activeTab: string
    setSelectedCustomer: React.Dispatch<React.SetStateAction<CustomerData | null>>
}

export const CustomerList = ({ customers, activeTab, setSelectedCustomer }: Props) => {

    const setOpenModal = useModal(state => state.setOpenModal)

    const showCustomerInfo = (c: CustomerData) => {
        setSelectedCustomer(c)
        setOpenModal('CustomerInfo')
    }

    const getValueByActiveTab = (c: CustomerData) => {
        switch (activeTab) {
            case 'all':
                return formaDateShort(c.birthDay as Date)
            case 'most-visits':
                return c.visits
            case 'not-returned':
                return c.lastVisit ? getDaysSince(c.lastVisit) : 'Aún no te visita'
        }
    }

    return (

        customers.length > 0 ?
            <ul className="flex flex-col gap-2 md:w-150 mt-4 md:mx-auto">
                <p className="self-end my-2 text-green-700">{hints[activeTab]}</p>
                {
                    customers.map(c => (
                        <li className="flex items-center justify-between" key={c.id}>
                            <div onClick={() => showCustomerInfo(c)} className="flex flex-col cursor-pointer">
                                <p className="underline">{c.name}</p>
                                <p className="text-sm text-zinc-500 flex items-center gap-1">
                                    <LuPhone className="text-green-700" />
                                    {c.phone.number}
                                </p>
                            </div>
                            <span>{getValueByActiveTab(c)}</span>
                        </li>
                    ))
                }
            </ul>
            :
            <div className="my-16 text-center">
                No hay clientes que coincidan con la búsqueda
            </div>

    )
}
