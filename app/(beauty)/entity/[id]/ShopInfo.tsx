'use client'

import { useState } from 'react'
import { ReviewsModal } from '../../components'

export const ShopInfo = ({ data, reviews, className = '' }: {
    data: {
        name: string
        logo?: string
        followers: number
        scheduling: number
    },
    reviews: ReviewList[],
    className?: string
}) => {
    const [followers ,setFollowers] = useState(data.followers)
    
    return (

        <div className={`${className} flex my-2 gap-10 items-center flex-wrap`}>
            <ReviewsModal
                name={data.name}
                photo={data.logo}
                // counts={data.reviews.counts}
                // points={data.reviews.points}
                reviews={reviews}
            />
            <button className="flex flex-col items-center cursor-pointer">
                <p onClick={() => setFollowers(prev => prev + 1)} className="text-green-700 font-bold">+ Seguir</p>
                <p className="text-zinc-500">
                    {followers === 0  ? 'Sin seguidores' 
                    : followers === 1 ? '1 seguidor' : 
                    `${followers} seguidores `
                    }
                </p>
            </button>
            <div className="flex flex-col items-center">
                <p className="text-zinc-800 font-bold">{data.scheduling}</p>
                <p className="text-zinc-500">Agendamientos</p>
            </div>
        </div>
    )
}
