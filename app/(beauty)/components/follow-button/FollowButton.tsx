'use client'

import { useState } from 'react'
import clsx from 'clsx'
import { toggleFollower } from '@/actions'
import { LoginForm, Modal } from '@/components'
import { useModal } from '@/store'

interface Props {
    initialValue: number
    entityId: string
    userId?: string
    alternativeStyles?: boolean
    isFollowing: boolean
    isAuthenticated: boolean
}


export const FollowButton = ({ initialValue, entityId, userId, alternativeStyles, isFollowing, isAuthenticated }: Props) => {

    const [followers, setFollowers] = useState(initialValue)
    const [following, setFollowing] = useState(isFollowing)
    const [isLoading, setIsLoading] = useState(false)
    const openModal = useModal(state => state.openModal)
    const setOpenModal = useModal(state => state.setOpenModal)
    
    const toggleFollow = async (receivedUserId?: string, receivedFollowing?: string[]) => {
        setIsLoading(true)

        try {
            setFollowing(prev => !prev)
            if (receivedFollowing?.includes(entityId)) return
            setFollowers(prev => following ? prev - 1 : prev + 1)
            await toggleFollower(entityId, receivedUserId ?? userId ?? '', following)
        } catch {
            setFollowers(initialValue)
            setFollowing(isFollowing)
        } finally {
            setIsLoading(false)
        }
    }

        return (
            <>
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
                    onClick={() => {
                        isAuthenticated ? 
                            toggleFollow() : 
                            setOpenModal(entityId)
                    }}
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
                {
                    openModal === entityId &&
                    <Modal className="sm:w-112.5! overflow-hidden!">
                        <div className="pt-6">
                            <LoginForm callback={toggleFollow} />
                        </div>
                    </Modal>
                }
            </>
    )
}
