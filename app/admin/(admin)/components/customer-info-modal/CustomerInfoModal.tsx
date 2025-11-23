'use client'

import Link from 'next/link'
import { AiOutlineDollarCircle } from 'react-icons/ai'
import { BiSolidEdit } from 'react-icons/bi'
import { BsCalendar2Check } from 'react-icons/bs'
import { FaWhatsapp } from 'react-icons/fa'
import { LiaBirthdayCakeSolid } from 'react-icons/lia'
import { PiHairDryerLight } from 'react-icons/pi'
import { TbGenderMale } from 'react-icons/tb'
import { useModal } from '@/store'
import { Emotion, Modal, ModalHeader } from '@/components'
import { formatDate, formatNumber, getDaysSince } from '@/helpers'

interface Props {
    selectedCustomer: CustomerData
}

export const CustomerInfoModal = ({ selectedCustomer }: Props) => {

    const { setOpenModal } = useModal()
    const {
        name,
        gender,
        phone,
        birthDay,
        visits,
        lastVisit,
        reviewPointsAverage,
        total,
        services
    } = selectedCustomer

    return (
        <Modal className="md:overflow-hidden max-w-[700px]">
            <ModalHeader>
                <span className="text-green-700 font-bold text-xl">Cliente</span>
            </ModalHeader>
            <div className="flex flex-col gap-2 pb-3 border-b border-zinc-300">
                <h3 className="text-2xl text-green-700 font-bold flex items-center justify-between md:justify-start md:gap-2">
                    {name}
                    <BiSolidEdit className="cursor-pointer" onClick={()=> setOpenModal('CustomerUpdate')} />
                </h3>
                <div className="flex">
                    <div className="flex flex-col pr-5 border-r border-zinc-300">
                        <span className="flex gap-1 items-center">
                            <TbGenderMale className="text-green-700 text-lg" />
                            {gender}
                        </span>
                        <Link href={`https://wa.me/${phone.number}`} target="_blank" className="flex gap-1 items-center">
                            <FaWhatsapp className="text-green-500" />
                            <span className="underline">{phone.number}</span>
                        </Link>
                        <span className="flex gap-1 items-center">
                            <LiaBirthdayCakeSolid className="text-green-700" />
                            {formatDate({ date: birthDay, month: 'short' })}
                        </span>
                    </div>
                    <div className="flex flex-col gap-3 pl-5 justify-center">
                        <div className="flex items-center gap-1">
                            <Emotion averagePoints={reviewPointsAverage} />
                            <div className="flex flex-col text-sm">
                                <span className="font-bold">Reputación</span>
                                <span>{reviewPointsAverage >= 2.5
                                    ? 'Buena' : reviewPointsAverage >= 1.5
                                        ? 'Regular' : 'Mala'
                                }</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-3 mt-3">
                <ul>
                    <p className="text-green-700 font-bold flex items-center gap-1 mb-2">
                        <BsCalendar2Check />
                        Visitas
                    </p>
                    <li>Te ha visitado {visits} {visits === 1 ? 'vez' : 'veces'}</li>
                    <li>
                        {
                            (() => {
                                const days = getDaysSince(lastVisit)
                                return `La última vez que te visitó fue ${days === 0 ? 'hoy' : days === 1 ? `hace ${days} día` : `hace ${days} días`}`
                            })()
                        }
                    </li>
                </ul>
                <ul>
                    <p className="text-green-700 flex items-center gap-1 font-bold mb-2">
                        <AiOutlineDollarCircle className="text-lg" />
                        Ganancias
                    </p>
                    <li>Te ha comprado ${formatNumber(total)}</li>
                </ul>
                <ul>
                    <p className="text-green-700 flex items-center gap-1 font-bold mb-2">
                        <PiHairDryerLight className="text-lg" />
                        Servicios utilizados
                    </p>
                    {services.map(s => <li className="list-disc list-inside pl-3" key={s.id}>{s.name}</li>)}
                </ul>
            </div>
        </Modal>
    )
}
