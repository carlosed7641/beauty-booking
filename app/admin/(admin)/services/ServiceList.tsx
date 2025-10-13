import { useState } from 'react'
import clsx from 'clsx'
import { RxCaretDown } from 'react-icons/rx'
import { ServiceItem } from './ServiceItem'

interface Props {
    services: Service[]
    currentTab: string
    categories: string[]
}

export const ServiceList = ({
    services,
    currentTab,
    categories,
}: Props) => {

    const [openCategories, setOpenCategories] = useState<string[]>(categories)

    const handleToggleCategory = (category: string) => {
        setOpenCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        )
    }

    return (
        services.map(service => {
            const filteredServices =
                currentTab === 'active'
                    ? service.services.filter(s => !s.archived)
                    : service.services.filter(s => s.archived)

            if (!filteredServices.length) return null

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
                            filteredServices.map(s =>
                                <ServiceItem
                                    key={s.serviceId}
                                    serviceItem={s}
                                    category={service.category}
                                />
                            )
                        }
                    </ul>
                </div>
            )
        })
    )
}
