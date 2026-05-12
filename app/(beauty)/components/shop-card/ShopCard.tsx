'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import { FaStar } from 'react-icons/fa6'
import { useService } from '@/store'

interface Props {
    cardWidth?: number,
    href: string,
    imageSrc: string | null
    ratingPotins?: number
    ratingCount?: number
    shopName: string
    serviceName?: string
    ctaData?: any
    ctaText?: string
}

export const ShopCard = ({
    cardWidth = 208,
    href,
    imageSrc,
    ratingPotins,
    ratingCount,
    shopName,
    serviceName,
    ctaData,
    ctaText = 'Agendar'
}: Props) => {

    const title = serviceName ? serviceName : shopName
    const serviceState = useService(state => state.serviceState)
    const setServiceState = useService(state => state.setServiceState)

    const router = useRouter()

    const handleClickCta = () => {
        setServiceState({
            ...serviceState,
            selectedService: ctaData
        })

        router.push(href)
    }

    return (
        <li className={`bg-[#e8f7ea] rounded-b-md md:w-auto! shrink-0`} style={{ width: cardWidth }}>
            <Link title={title} href={href} className="flex flex-col">
                <div className="relative bg-white">
                    <Image className="rounded-t-md object-cover aspect-square w-full" alt={title} width={180} height={180} src={imageSrc ?? '/images/placeholder.jpg'} />
                    <div className="bg-white round-md flex gap-2 text-sm items-center absolute bottom-3 left-3 px-2 rounded-md border border-zinc-500">
                        <FaStar className="text-amber-300" />
                        {ratingPotins ? `${ratingPotins.toFixed(1)} (${ratingCount})` : 'No hay reseñas'}
                    </div>
                </div>
                <div className="flex flex-col gap-2 p-5">
                    {serviceName && <span className="font-bold">{serviceName}</span>}
                    <span className={clsx({ "font-bold": !serviceName })
                    }>{shopName}</span>
                    {
                        ctaData &&
                        <button onClick={handleClickCta} className="btn-primary font-bold rounded-md">
                            {ctaText}
                        </button>
                    }
                </div>
            </Link>
        </li>
    )
}