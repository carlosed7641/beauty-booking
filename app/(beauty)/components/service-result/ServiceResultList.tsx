import Link from 'next/link'
import { StarQuantity, ServiceIcon } from '..'
import { formatNumber } from '@/helpers'

interface Props {
    services: ServiceResult[]
}

export const ServiceResultList = ({ services }: Props) => {
    return (
        <ul className="flex flex-col gap-3">
            {services.map((s) => (
                <li
                    key={s.entity.id + s.name}
                    className="bg-[#e8f7ea] px-3 md:px-5 py-4 md:py-3 flex gap-3 items-center rounded-md"
                >
                    <div className="text-green-700">
                        <ServiceIcon category={s.category} className="text-7xl" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <p className="text-green-700  font-bold text-lg">{s.name}</p>
                        <p className="text-green-700">{s.entity.name}</p>
                        <StarQuantity points={s.entity.reviews.points} />
                        <p className="text-zinc-500 mt-1.5">
                            ({s.entity.reviews.counts}) Ver reseñas
                        </p>
                        <p>A 0.77 km de ti</p> {/** TODO **/}
                    </div>
                    <div className="ml-auto flex flex-col items-center gap-2">
                        <span>${formatNumber(s.price)}</span>
                        <Link
                            title="Agendar"
                            href={`/entity/${s.entity.id}`}
                            className="bg-green-700 text-white hover:bg-green-800 px-4 py-1 rounded-md"
                        >
                            Agendar
                        </Link>
                    </div>
                </li>
            ))}
        </ul>
    )
}