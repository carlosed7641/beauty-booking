import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { FaStar } from 'react-icons/fa'
import { Tabs } from '@/components'
import {  
    entities,
    workSamples as allWorkSamples, 
    serviceList as allServiceList, 
    professionals as allProfessionals, 
     } from '@/util/fake-data'
import { Tab } from '@/interfaces/tab.interface'
import { ServiceListTab, WorkSamplesTab } from '@/components/ui/tabs'

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

    const tabs: Tab[] = [
        {
            id: 'services-list',
            label: 'Lista de servicios',
            tab: <ServiceListTab serviceList={serviceList} professionalId={id} />
        },
        {
            id: 'work-samples',
            label: 'Muestras de trabajo',
            tab: <WorkSamplesTab workSamples={workSamples} />
        }
    ]


    return (
        <>
            <div className="flex gap-5">
                <div className="flex flex-col">
                    <Image className="rounded-full self-start md:mb-8" width={200} height={200} src={professional.photo} alt={professional.name} />
                </div>
                <div className="flex flex-col py-2 md:py-6 w-4/5 md:w-auto justify-center md:justify-start">
                    <p className="text-base md:text-3xl text-green-700 font-bold mb-2">{professional.name}</p>
                    <div className="flex flex-col mb-2">
                        {
                            professional.reviews.count > 0 &&
                            <div className="flex my-1">
                                {Array.from({ length: Math.round(professional.reviews.points) }, (_, i) => (
                                    <FaStar key={i} className="text-amber-300" />
                                ))}
                            </div>
                        }
                        <span className="text-zinc-500 underline">{professional.reviews.count > 0 ? `(${professional.reviews.count}) Ver reseñas` : 'No hay reseñas'}</span>
                    </div>
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