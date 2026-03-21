'use client'

import { useState, useTransition } from 'react'
import { useModal } from '@/store'
import { Modal } from '@/components'
import { blockUser } from '@/actions'


interface Props {
    users: UserInfo[]
    entityId: string
}

export const Followers = ({ users, entityId }: Props) => {

    const openModal = useModal(state => state.openModal)
    const setOpenModal = useModal(state => state.setOpenModal)
    const [currentId, setCurrentId] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    const handleClick = (id: string) => {
        setCurrentId(id)
        setOpenModal('BlockFollower')
    }

    const handleBlock = () => {
        if (!currentId) return
        startTransition(async () => {
            console.log(currentId, entityId)
            await blockUser(currentId, entityId)
            setOpenModal(null)
        })
    }

    return (
        <>
            <ul className="flex flex-col gap-3">
                {
                    users.map(user => (
                        <li key={user.id} className="flex justify-between py-4 border-b border-zinc-200">
                            <p>{user.name}</p>
                            <button onClick={() => handleClick(user.id)} className="text-red-500 font-bold cursor-pointer">
                                Bloquear
                            </button>
                        </li>
                    ))
                }
            </ul>
            {
                openModal === 'BlockFollower' &&
                <Modal className="overflow-y-hidden! md:w-auto!">
                    <div className="pt-5 flex flex-col gap-3">
                        <span>¿Estás seguro que deseas bloquear a este usuario?</span>
                        {
                            isPending ?
                                'Procesando...'
                                :
                                <div className="flex gap-3">
                                    <button onClick={() => setOpenModal(null)} className="border border-bg-green-700 cursor-pointer rounded-full text-green-700 font-bold focus:outline-0 px-5 py-1 text-sm w-1/2">Cancelar</button>
                                    <button onClick={handleBlock} className="bg-red-500 hover:bg-red-600 cursor-pointer rounded-full text-white font-bold focus:outline-0 px-5 py-1 text-sm w-1/2">Bloquear</button>
                                </div>
                        }
                    </div>
                </Modal>
            }
        </>
    )
}
