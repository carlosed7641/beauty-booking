import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { Tabs, ReviewsModal, ServiceListTab } from '../../components'
import { WorkSamples } from '@/components'
import {
    entities,
    workSamples as allWorkSamples,
    serviceList as allServiceList,
    professionals as allProfessionals,
    reviews as apiReviews,
} from '@/util/fake-data'

interface Props {
    params: Promise<{ id: string }>
}

export default async function ProfessionalPage({ params }: Props) {

    const { id } = await params
    const professional = allProfessionals.find(p => p.id === id)

    if (!professional) {
        redirect('/')
    }

    const entity = entities.find(e => e.id === professional.entityId)
    const serviceList = allServiceList.filter(sl => sl.entityId === professional.entityId) // TODO: by professional
    const workSamples = allWorkSamples.filter(ws => ws.authorId === id)
    const reviews = apiReviews.filter(r => r.professional.id === id)

    const tabs: Tab[] = [
        {
            id: 'services-list',
            label: 'Lista de servicios',
            tab: <ServiceListTab serviceList={serviceList} professionalId={id} />
        },
        {
            id: 'work-samples',
            label: 'Muestras de trabajo',
            tab: <WorkSamples workSamples={workSamples} hideName />
        }
    ]

    return (
        <>
            <div className="flex gap-5">
                <div className="flex flex-col">
                    <Image className="rounded-full self-start md:mb-8" width={200} height={200} src={professional.photo ?? ''} alt={professional.name} />
                </div>
                <div className="flex flex-col py-2 md:py-6 w-4/5 md:w-auto justify-center md:justify-start">
                    <p className="text-base md:text-3xl text-green-700 font-bold mb-2">{professional.name}</p>
                    <ReviewsModal
                        alternativeStyle
                        name={professional.name}
                        photo={professional.photo}
                        counts={professional.reviews.count}
                        points={professional.reviews.points}
                        reviews={reviews}
                    />
                    <p className="text-md md:text-lg mb-2 hidden md:block">
                        {professional.resume}
                    </p>
                    <p className="text-md md:text-lg text-zinc-500 hidden md:block">
                        Trabaja en <Link className="text-green-700" href={`/entity/${entity?.id}`}>{entity?.name}</Link>
                    </p>
                    <p className="text-md md:text-lg text-zinc-500 hidden md:block">
                        {entity?.address.street}, {entity?.address.city}, {entity?.address.state}, {entity?.address.country}
                    </p>
                </div>
            </div>
            <div className="p-2">
                <p className="text-md md:text-lg mb-2 block md:hidden">
                    {professional.resume}
                </p>
                <p className="text-md md:text-lg text-zinc-500 block md:hidden">
                    Trabaja en <Link className="text-green-700" href={`/entity/${entity?.id}`}>{entity?.name}</Link>
                </p>
                <p className="text-md md:text-lg text-zinc-500 block md:hidden">
                    {entity?.address.street}, {entity?.address.city}, {entity?.address.state}, {entity?.address.country}
                </p>
            </div>
            <Tabs tabs={tabs} />
        </>
    )
}