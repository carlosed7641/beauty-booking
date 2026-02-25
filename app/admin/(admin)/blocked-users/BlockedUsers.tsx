'use client'

import { useEffect, useState, useTransition } from 'react'
import Image from 'next/image'
import { useModal } from '@/store'
import { Modal } from '@/components'
import { deleteBlockedUser } from '@/actions'

export const BlockedUsers = ({ users, entityId }: { users: UserInfo[], entityId: string }) => {

    const { openModal, setOpenModal } = useModal()
    const [currentUserId, setCurrentUserId] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    const handleClick = (id: string) => {
        setCurrentUserId(id)
        setOpenModal(BlockedUsers.name)
    }

    const handleUnlockUser = () => {
        startTransition(async () => {
            if (currentUserId) {
                await deleteBlockedUser(currentUserId, entityId)
                setOpenModal(null)
            }
        })
    }

    useEffect(() => {
        if (openModal !== BlockedUsers.name) setCurrentUserId(null)
    }, [openModal])

    return (
        <>
            <ul className="flex flex-col gap-3">
                {
                    users.map(user => (
                        <li key={user.id} className="flex flex-wrap gap-2 items-center border-b border-zinc-200 pb-3">
                            <div className="flex items-center gap-3">
                                {
                                    user.photo ? <Image src={user.photo} alt={user?.name ?? ''} width={56} height={56} className="object-cover h-14 w-14 rounded-full" />
                                        : <div className="h-14 w-14 flex items-center justify-center text-3xl rounded-full bg-green-950 text-white">{user?.name?.[0]}</div>
                                }
                                <p>{user.name}</p>
                            </div>
                            <button onClick={() => handleClick(user.id)} title="Desbloquear" className="btn-primary rounded-full font-bold text-sm ml-auto">
                                Desbloquear
                            </button>
                        </li>
                    ))
                }
            </ul>
            {
                openModal === BlockedUsers.name && currentUserId &&
                <Modal className="overflow-y-hidden! md:w-auto!">
                    <div className="pt-5 flex flex-col gap-3">
                        <span>¿Estás seguro que deseas desbloquear a este usuario?</span>
                        <div className="flex gap-3 justify-end">
                            {
                                isPending ?
                                    <span>Procesando...</span>
                                    :
                                    <>
                                        <button onClick={() => setOpenModal(null)} className="btn-secondary rounded-full font-bold text-sm w-1/2">Cancelar</button>
                                        <button onClick={handleUnlockUser} className="btn-primary rounded-full font-bold text-sm w-1/2">Desbloquear</button>
                                    </>
                            }
                        </div>
                    </div>
                </Modal>
            }
        </>
    )
}
