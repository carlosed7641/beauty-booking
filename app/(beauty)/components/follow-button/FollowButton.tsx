'use client'

import clsx from 'clsx'
import { useState } from 'react'

interface Props {
    initialValue: number
    entityId: string
    userId?: string
    alternativeStyles?: boolean
}


export const FollowButton = ({ initialValue, entityId, userId, alternativeStyles }: Props) => {

    const [followers, setFollowers] = useState(initialValue)

    return (
        <button className={
            clsx(
                "flex flex-col cursor-pointer",
                {
                    "items-end": alternativeStyles,
                    "items-center": !alternativeStyles
                }
            )
        }>
            <p onClick={() => setFollowers(prev => prev + 1)} className="text-green-700 font-bold">+ Seguir</p>
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
