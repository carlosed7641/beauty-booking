'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa'
import { useState } from 'react'
import { FollowButton } from '../follow-button/FollowButton'

interface Props {
    entity: SimpleEntity
    isAuthenticated?: boolean
}

export const EntityCard = ({ entity, isAuthenticated }: Props) => {
    return (
        <div>
            <div className="relative">
                <Image src={entity.logo ?? '/images/placeholder.jpg'} className="aspect-square" width={500} height={500} alt={entity.name ?? ''} />
                <div className="bg-white round-md flex gap-2 items-center absolute bottom-3 left-3 px-2 rounded-md border border-zinc-500">
                    <FaStar className="text-amber-300" />
                    {entity.reviews?.points ? `${entity.reviews.points.toFixed(1)} (${entity.reviews.count})` : 'No hay reseñas'}
                </div>
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
                    <FollowButton 
                        entityId={entity.id}
                        initialValue={entity._count.followers}
                        userId={entity.userId}
                        isFollowing={entity.isFollowing ?? false}
                        isAuthenticated={isAuthenticated ?? false}
                        alternativeStyles
                    />
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
