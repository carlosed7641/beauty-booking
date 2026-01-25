'use client'

import { useOptimistic, useTransition } from 'react'
import { updateUser } from '@/actions'
import { FaToggleOff, FaToggleOn } from 'react-icons/fa'

export const ProfileVisibility = ({ isPublic }: { isPublic: boolean }) => {

    const [isPending, startTransition] = useTransition()
    const [optimisticVisibility, setOptimisticVisibility] =
        useOptimistic<boolean, boolean>(isPublic,
            (_, newVisibility) => newVisibility
        )


    const handleToggleVisibility = async () => {

        const nextValue = !optimisticVisibility

        startTransition(async () => {

            setOptimisticVisibility(nextValue)
            
            try {
                await updateUser({ isPublicProfile: nextValue })
            } catch {
                setOptimisticVisibility(!nextValue)
            }
        })

    }

    return (
        <button
            disabled={isPending}
            className="flex items-center gap-1 cursor-pointer"
            onClick={handleToggleVisibility}
        >
            {
                optimisticVisibility ?
                    <FaToggleOn className="text-green-700 text-xl" /> :
                    <FaToggleOff className="text-green-700 text-xl" />
            }
            <span>¿Perfil público?</span>
        </button>

    )
}
