'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa'
import { useState } from 'react'

interface Props {
    entity: SimpleEntity
}

export const EntityCard = ({ entity }: Props) => {

    const [followers, setFollowers] = useState(entity._count.followers)

    const handleFollow = () => {
        setFollowers(prev => prev + 1)
    }

    return (
        <div>
            <div className="relative">
                <Image src={entity.logo ?? '/images/placeholder.jpg'} className="aspect-square" width={500} height={500} alt={entity.name ?? ''} />
                {/* <div className="bg-white round-md flex gap-2 items-center absolute bottom-3 left-3 px-2 rounded-md border border-zinc-500">
                    <FaStar className="text-amber-300" />
                    {entity.reviews.points ? `${entity.reviews.points} (${entity.reviews.counts})` : 'No hay reseñas'}
                </div> */}
            </div>
            <div className="grid grid-cols-2 p-1.5">
                <div>
                    <p>{entity.name}</p>
                    <p className="text-sm text-zinc-500 line-clamp-2">
                        {entity.address}
                    </p>
                    <Link className="text-sm text-green-700" href={`/entity/${entity.numberId}`}>
                        Ver más
                    </Link>
                </div>
                <div className="flex flex-col items-end">
                    <button onClick={handleFollow} className="font-bold text-green-700 cursor-pointer">+ Seguir</button>
                    <p className="text-sm text-green-700">
                        {followers === 0 ? 'Sin seguidores' : followers === 1 ?  '1 seguidor' : `${followers} seguidores`} 
                    </p>
                    <p className="text-sm text-zinc-500">
                        {entity._count.events === 0 ? 'Sin agendamientos' : entity._count.events === 1 ?  '1 agendamiento' : `${entity._count.events} agendamientos`}    
                    </p>
                    <Link className="bg-green-700 px-2 text-sm text-white rounded-md py-0.5 mt-1" href={`/entity/${entity.numberId}`}>
                        Agendar
                    </Link>
                </div>
            </div>
        </div>
    )
}
