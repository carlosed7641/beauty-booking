'use client'

import { StarQuantity, ServiceIcon } from '..'
import { formatDisplayNumber } from '@/helpers'
import { useService } from '@/store'
import { useRouter } from 'next/navigation'

interface Props {
    services: ServiceResult[]
}

export const ServiceResultList = ({ services }: Props) => {

    const serviceState = useService(state => state.serviceState)
    const setServiceState = useService(state => state.setServiceState)

    const router = useRouter()

    const handleClickCta = (service: ServiceResult) => {
        setServiceState({
            ...serviceState,
            selectedService: {
                serviceId: service.id,
                price: service.price,
                name: service.name,
                duration: {
                    hours: service.duration?.hours,
                    minutes: service.duration?.minutes
                }
            }
        })

        router.push(`/entity/${service.entity.numberId}`)
    }

    return (
        <ul className="flex flex-col gap-3">
            {services.map((s) => (
                <li
                    key={s.entity.id + s.name}
                    className="bg-[#e8f7ea] px-3 md:px-5 py-4 md:py-3 flex gap-3 items-center rounded-md"
                >
                    <div className="text-green-700">
                        <ServiceIcon category={s.category.toLocaleLowerCase()} className="text-6xl" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <p className="text-green-700  font-bold text-lg">{s.name}</p>
                        <p className="text-green-700">{s.entity.name}</p>
                        {
                            s.entity.reviews.counts > 0 &&
                            <StarQuantity points={s.entity.reviews.points} />
                        }
                        <p className="text-zinc-500 mt-1.5">
                            {s.entity.reviews.counts > 0 ? `${s.entity.reviews.counts} reseñas` : 'Sin reseñas'}
                        </p>
                    </div>
                    <div className="ml-auto flex flex-col items-center gap-2">
                        <span>${formatDisplayNumber(s.price)}</span>
                        <button
                            title="Agendar"
                            onClick={() => handleClickCta(s)}
                            className="bg-green-700 text-white hover:bg-green-800 px-4 py-1 rounded-md cursor-pointer"
                        >
                            Agendar
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    )
}