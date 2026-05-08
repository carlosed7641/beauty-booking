'use client'

import { FollowButton, ReviewsModal } from '../../components'

export const ShopInfo = ({ data, reviews, isAuthenticated, className = '', }: {
    data: {
        id: string
        userId?: string
        name: string
        logo?: string
        followers: number
        scheduling: number
        counts: number
        points: number
        isFollowing: boolean
    },
    reviews: ReviewList[],
    isAuthenticated?: boolean
    className?: string
}) => {
    
    return (

        <div className={`${className} flex my-2 gap-10 items-center flex-wrap`}>
            <ReviewsModal
                name={data.name}
                photo={data.logo}
                counts={data.counts}
                points={data.points}
                reviews={reviews}
            />
            <FollowButton
                initialValue={data.followers}
                entityId={data.id}
                userId={data.userId}
                isFollowing={data.isFollowing}
                isAuthenticated={isAuthenticated ?? false}
            />
            <div className="flex flex-col items-center">
                <p className="text-zinc-800 font-bold">{data.scheduling}</p>
                <p className="text-zinc-500">Agendamientos</p>
            </div>
        </div>
    )
}
