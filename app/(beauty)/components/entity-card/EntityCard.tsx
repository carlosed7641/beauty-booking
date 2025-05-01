import Image from 'next/image'
import Link from 'next/link'
import { FaStar } from 'react-icons/fa'

interface Props {
    entity: Entity
}

export const EntityCard = ({ entity }: Props) => {
    return (
        <div>
            <div className="relative">
                <Image src={entity.imageSrc} width={600} height={200} alt={entity.name} />
                <div className="bg-white round-md flex gap-2 items-center absolute bottom-3 left-3 px-2 rounded-md border border-zinc-500">
                    <FaStar className="text-amber-300" />
                    {entity.reviews.points ? `${entity.reviews.points} (${entity.reviews.counts})` : 'No hay reseñas'}
                </div>
            </div>
            <div className="grid grid-cols-2 p-1.5">
                <div>
                    <p>{entity.name}</p>
                    <p className="text-sm text-zinc-500 line-clamp-2">
                        {entity.address.street}, {entity.address.city}, {entity.address.state}, {entity.address.country}
                    </p>
                    <Link className="text-sm text-green-700" href={`/entity/${entity.id}`}>
                        Ver más
                    </Link>
                </div>
                <div className="flex flex-col items-end">
                    <div className="font-bold text-green-700">+ Seguir</div>
                    <p className="text-sm text-green-700">{entity.followers} seguidores</p>
                    <p className="text-sm text-zinc-500">{entity.scheduling} agendamientos</p>
                    <Link className="bg-green-700 px-2 text-sm text-white rounded-md py-0.5 mt-1" href={`/entity/${entity.id}`}>
                        Agendar
                    </Link>
                </div>
            </div>
        </div>
    )
}
