'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useModal } from '@/store'
import { Modal } from '@/components'

export const BlockedUsers = ({ users }: { users: UserInfo[] }) => {

    const { openModal, setOpenModal } = useModal()
    const [currentId, setCurrentId] = useState<string | null>(null)

    const handleClick = (id: string) => {
        setCurrentId(id)
        setOpenModal(BlockedUsers.name)
    }

    useEffect(()=> {
        if (openModal !== BlockedUsers.name) setCurrentId(null)
    }, [openModal])

    return (
        <>
            <ul className="flex flex-col gap-3">
                {
                    users.map(user => (
                        <li key={user.id} className="flex flex-wrap gap-2 items-center border-b border-zinc-200 pb-3">
                            <div className="flex items-center gap-3">
                                {
                                    user.photo ? <Image src={user.photo} alt={user.name} width={56} height={56} className="object-cover h-14 w-14 rounded-full" />
                                        : <div className="h-14 w-14 flex items-center justify-center text-3xl rounded-full bg-green-950 text-white">{user.name[0]}</div>
                                }
                                <p>{user.name}</p>
                            </div>
                            <button onClick={()=> handleClick(user.id)} title="Desbloquear" className="bg-green-700 hover:bg-green-800 cursor-pointer rounded-full text-white font-bold focus:outline-0 px-5 py-1 text-sm ml-auto">
                                Desbloquear
                            </button>
                        </li>
                    ))
                }
            </ul>
            {
                openModal === BlockedUsers.name &&
                <Modal className="overflow-y-hidden! md:w-auto!">
                    <div className="pt-5 flex flex-col gap-3">
                        <span>¿Estás seguro que deseas desbloquear a este usuario?</span>
                        <div className="flex gap-3">
                            <button onClick={() => setOpenModal(null)} className="border border-bg-green-700 cursor-pointer rounded-full text-green-700 font-bold focus:outline-0 px-5 py-1 text-sm w-1/2">Cancelar</button>
                            <button onClick={() => { console.log(currentId) }} className="bg-green-700 hover:bg-green-800 cursor-pointer rounded-full text-white font-bold focus:outline-0 px-5 py-1 text-sm w-1/2">Desbloquear</button>
                        </div>
                    </div>
                </Modal>
            }
        </>
    )
}
