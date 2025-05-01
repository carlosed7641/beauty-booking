import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { FaStar } from 'react-icons/fa6'

interface Props {
    cardWidth?: number,
    href: string,
    imageSrc: string
    imageWidth: number,
    imageHeight: number,
    ratingPotins?: number
    ratingCount?: number
    shopName: string
    serviceName?: string
    ctaUrl?: string
    ctaText?: string
}

export const ShopCard = ({ 
    cardWidth = 208, 
    href,
    imageSrc,
    imageWidth,
    imageHeight,
    ratingPotins,
    ratingCount,
    shopName,
    serviceName,
    ctaUrl,
    ctaText = 'Agendar'
} : Props) => {

    const title = serviceName ? serviceName : shopName

    return (
        <li className={`bg-[#e8f7ea] rounded-b-md md:w-auto! shrink-0`}  style={{ width: cardWidth }}>
            <Link title={title} href={href} className="flex flex-col">
                <div className="relative">
                    <Image className="rounded-t-md" alt={title} width={imageWidth} height={imageHeight} src={imageSrc} />
                    <div className="bg-white round-md flex gap-2 text-sm items-center absolute bottom-3 left-3 px-2 rounded-md border border-zinc-500">
                        <FaStar className="text-amber-300" />
                        { ratingPotins ? `${ratingPotins} (${ratingCount})` : 'No hay reseñas'}
                    </div>
                </div>
                <div className="flex flex-col gap-2 p-5">
                    { serviceName && <span className="font-bold">{serviceName}</span> } 
                    <span className={clsx({ "font-bold": !serviceName })
                    }>{shopName}</span>
                    {
                        ctaUrl &&
                        <button className="bg-green-700 rounded-md py-1 text-white font-bold hover:bg-green-900 cursor-pointer transition-all">
                            {ctaText}
                        </button>
                    }
                </div>
            </Link>
        </li>
    )
}
