import { Tabs } from "@/components"
import Image from "next/image"
import Link from "next/link"
import { FaStar, FaWhatsapp } from "react-icons/fa"
import { FiMapPin } from "react-icons/fi"
import { GoShareAndroid } from "react-icons/go"

const data = {
    imageSrc: 'https://picsum.photos/200/200',
    name: 'Acicalate Vip',
    address: {
        street: 'Cra 30 #24-32',
        city: 'Soledad',
        state: 'Atlántico',
        country: 'Colombia',
        reference: 'Arriba del TA DA'
    },
    reviews: {
        points: 4.5,
        counts: 233
    },
    followers: 38,
    scheduling: 104,
    contactUrl: 'https://www.whatsapp.com/channel/0029Va4PN8hFCCoO00odQi0v'
}

export default function EntityPage() {

    return (
        <>
            <div className="flex gap-5">
                <div className="flex flex-col">
                    <Image className="rounded-full self-start md:mb-8" width={200} height={200} src={data.imageSrc} alt={data.name} />
                    <Social className="hidden md:flex" />
                </div>
                <div className='flex flex-col py-2 md:py-6'>
                    <p className="text-base md:text-3xl text-green-700 font-bold mb-2">{data.name}</p>
                    <p className="text-md md:text-lg text-zinc-500">
                        {data.address.street}, {data.address.city}, {data.address.state}, {data.address.country}
                    </p>
                    <p className="text-md md:text-lg text-zinc-500">
                        {data.address.reference}
                    </p>
                    <Link href='/map' className="flex gap-1 items-center underline text-green-700">
                        <FiMapPin />
                        Ver en el mapa
                    </Link>
                    <ShopInfo className="hidden md:flex" />
                </div>
            </div>
            <ShopInfo className="md:hidden justify-around" />
            <Social className="md:hidden mt-6" />
            <Tabs />
        </>
    )
}

const ShopInfo = ({ className = '' }: { className?: string }) => {
    return (

        <div className={`${className} flex my-2 gap-10`}>
            <button className="flex flex-col items-center cursor-pointer">
                <div className="flex gap-1 items-center">
                    <FaStar className="text-amber-300" />
                    {data.reviews.points}
                </div>
                <p className="text-zinc-500 underline">({data.reviews.counts}) Ver</p>
            </button>
            <button className="flex flex-col items-center cursor-pointer">
                <p className="text-green-700 font-bold">+ Seguir</p>
                <p className="text-zinc-500">{data.followers} seguidores</p>
            </button>
            <div className="flex flex-col items-center">
                <p className="text-zinc-800 font-bold">{data.scheduling}</p>
                <p className="text-zinc-500">Agendamientos</p>
            </div>
        </div>
    )
}

const Social = ({ className = '' }: { className?: string }) => {
    return (
        <div className={`${className} flex justify-around`}>
            <div className="flex flex-col gap-1 items-center text-zinc-500">
                <GoShareAndroid className="text-green-700 text-2xl md:text-3xl" />
                Compartir
            </div>
            <Link href={data.contactUrl} target="_blank" className="flex flex-col gap-1 items-center text-zinc-500">
                <FaWhatsapp className="text-green-700 text-2xl md:text-3xl" />
                Chatear
            </Link>
        </div>
    )
}
