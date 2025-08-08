import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { FaWhatsapp } from 'react-icons/fa'
import { FiMapPin } from 'react-icons/fi'
import { GoShareAndroid } from 'react-icons/go'
import { Tabs, ServiceListTab, Professionals, ReviewsModal } from '../../components'
import { WorkSamplesTab } from '@/components'
import {
    entities,
    workSamples as allWorkSamples,
    serviceList as allServiceList,
    professionals as allProfessionals,
    reviews as apiReviews
} from '@/util/fake-data'

interface Props {
    params: Promise<{ id: string }>
}

export default async function EntityPage({ params }: Props) {

    const { id } = await params
    const data = entities.find(e => e.id === id)

    if (!data) {
        notFound()
    }

    const serviceList = allServiceList.filter(sl => sl.entityId === id)
    const workSamples = allWorkSamples.filter(ws => ws.entityId === id)
    const professionals = allProfessionals.filter(p => p.entityId === id)
    const reviews = apiReviews.filter(r => r.entityId === id)

    const tabs: Tab[] = [
        {
            id: 'services-list',
            label: 'Lista de servicios',
            tab: <ServiceListTab serviceList={serviceList} professionals={professionals} />
        },
        {
            id: 'work-samples',
            label: 'Muestras de trabajo',
            tab: <WorkSamplesTab workSamples={workSamples} />
        },
        {
            id: 'professionals',
            label: 'Profesionales',
            tab: <Professionals professionals={professionals} />
        }
    ]

    return (
        <>
            <div className="flex gap-5">
                <div className="flex flex-col">
                    <Image className="rounded-full self-start md:mb-8" width={200} height={200} src={data.imageSrc} alt={data.name} />
                    <Social data={data} className="hidden md:flex" />
                </div>
                <div className="flex flex-col py-2 md:py-6 w-4/5 md:w-auto justify-center md:justify-start">
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
                    <ShopInfo reviews={reviews} data={data} className="hidden md:flex" />
                </div>
            </div>
            <ShopInfo reviews={reviews} data={data} className="md:hidden justify-around" />
            <Social data={data} className="md:hidden mt-6" />
            <Tabs tabs={tabs} />
        </>
    )
}

const ShopInfo = ({ data, reviews, className = '' }: { data: Entity, reviews: ReviewList[], className?: string }) => {
    return (

        <div className={`${className} flex my-2 gap-10 items-center`}>
            <ReviewsModal
                name={data.name}
                photo={data.imageSrc}
                counts={data.reviews.counts}
                points={data.reviews.points}
                reviews={reviews}
            />
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

const Social = ({ data, className = '' }: { data: Entity, className?: string }) => {
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
