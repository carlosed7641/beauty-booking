'use client'

import { toggleFollower } from '@/actions'
import clsx from 'clsx'
import { useState } from 'react'

interface Props {
    initialValue: number
    entityId: string
    userId?: string
    alternativeStyles?: boolean
    isFollowing: boolean
}


export const FollowButton = ({ initialValue, entityId, userId, alternativeStyles, isFollowing }: Props) => {

    const [followers, setFollowers] = useState(initialValue)
    const [following, setFollowing] = useState(isFollowing)
    const [isLoading, setIsLoading] = useState(false)

    const toggleFollow = async () => {

        setIsLoading(true)

        try {
            setFollowers(prev => following ? prev - 1 : prev + 1)
            setFollowing(prev => !prev)
            await toggleFollower(entityId, userId ?? '', following)
        } catch {
            setFollowers(initialValue)
            setFollowing(isFollowing)
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <button className={
            clsx(
                "flex flex-col cursor-pointer",
                {
                    "items-end": alternativeStyles,
                    "items-center": !alternativeStyles,
                    "opacity-40 pointer-events-none": isLoading
                }
            )
        }
        onClick={toggleFollow} 
        >
            <p className="text-green-700 font-bold">
                {
                    following ?
                        '- Dejar de seguir'
                        :
                        '+ Seguir'
                }
            </p>
            <p className={
                clsx(
                    "text-zinc-500",
                    {
                        "text-sm": alternativeStyles,
                        "text-base": !alternativeStyles
                    }
                )
            }>
                {followers === 0 ? 'Sin seguidores'
                    : followers === 1 ? '1 seguidor' :
                        `${followers} seguidores `
                }
            </p>
        </button>
    )
}
