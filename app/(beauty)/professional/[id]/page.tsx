import Link from 'next/link'
import Image from 'next/image'
import { notFound, redirect } from 'next/navigation'
import { Tabs, ReviewsModal, ServiceListTab } from '../../components'
import { WorkSamples } from '@/components'
import { auth } from '@/auth.config'
import { getServiceByEntityId, getUserById } from '@/actions'
import { getServiceList, minutesToTime, toMinutes } from '@/helpers'

interface Props {
    params: Promise<{ id: string }>
}

export default async function ProfessionalPage({ params }: Props) {

    const { id } = await params
    const session = await auth()
    const data = await getUserById(id)
    const entityServices = await getServiceByEntityId(data?.entityId ?? '')

    if (!data) {
        notFound()
    }
    

    const filteredServices = 
        data?.serviceOverrides ? 
            data.serviceOverrides
            .filter(s => !s.service.archived && s.enabled)
            .map(s => ({
                ...s.service,
                baseDurationHours: s.durationHours,
                baseDurationMinutes: s.durationMinutes,
                basePrice: s.price
            })) ?? []
        :
        entityServices.filter(s => !s.archived) ?? []

    const services = getServiceList(filteredServices)

    const professionals = [
        {
            id,
            name: data.name ?? '',
            entityId: data.entityId ?? '',
            photo: data.photo,
            services:
                data.serviceOverrides.length > 0
                    ? data.serviceOverrides
                        .filter(s => s.enabled)
                        .map(s => ({
                            id: s.serviceId,
                            duration: {
                                hours: s.durationHours,
                                minutes: s.durationMinutes
                            },
                            price: s.price
                        }))
                    : entityServices
                        .filter(s => !s.archived)
                        .map(s => ({
                            id: s.id,
                            duration: {
                                hours: s.baseDurationHours,
                                minutes: s.baseDurationMinutes
                            },
                            price: s.basePrice
                        })) ?? [],
            workdays:
                data.workDays.length > 0
                    ?
                    data.workDays
                        .map((w, idx) => ({
                            ...w,
                            from: minutesToTime(
                                Math.max(
                                    toMinutes(w.from),
                                    toMinutes(workdays[idx].from)
                                )
                            ),
                            to: minutesToTime(
                                Math.min(
                                    toMinutes(w.to),
                                    toMinutes(workdays[idx].to)
                                )
                            )
                        }))
                        .filter((w, idx) => workdays[idx].disabled && !w.disabled)
                    :
                    workdays.filter(w => !w.disabled) ?? []
        }]


    const tabs: Tab[] = [
        {
            id: 'services-list',
            label: 'Lista de servicios',
            tab: <ServiceListTab
                serviceList={services}
                entity={{ id: data.entity!.id, numberId: data.entity!.numberId }}
                professionalData={{ id: data.id, name: data.name ?? '' }}
                isAuthenticated={!!session}
            />
        },
        // {
        //     id: 'work-samples',
        //     label: 'Muestras de trabajo',
        //     tab: <WorkSamples workSamples={workSamples} hideName />
        // }
    ]

    return (
        <>
            <div className="flex gap-5">
                <div className="flex flex-col">
                    <Image className="rounded-full self-start md:mb-8 aspect-square" width={200} height={200} src={data.photo ?? ''} alt={data.name ?? ''} />
                </div>
                <div className="flex flex-col py-2 md:py-6 w-4/5 md:w-auto justify-center md:justify-start">
                    <p className="text-base md:text-3xl text-green-700 font-bold mb-2">{data.name}</p>
                    <ReviewsModal
                        alternativeStyle
                        name={data.name ?? ''}
                        photo={data.photo ?? undefined}
                        // counts={professional.reviews.count}
                        // points={professional.reviews.points}
                        reviews={[]}
                    />
                    {data.description && <p className="text-md md:text-lg mb-2 hidden md:block">
                        {data.description}
                    </p>}
                    <p className="text-md md:text-lg text-zinc-500 hidden md:block">
                        Trabaja en <Link className="text-green-700" href={`/entity/${data.entity?.numberId}`}>{data.entity?.name}</Link>
                    </p>
                    <p className="text-md md:text-lg text-zinc-500 hidden md:block">
                        {data.entity?.address}
                    </p>
                </div>
            </div>
            <div className="p-2">
                {data.description &&
                    <p className="text-md md:text-lg mb-2 block md:hidden">
                        {data.description}
                    </p>
                }
                <p className="text-md md:text-lg text-zinc-500 block md:hidden">
                    Trabaja en <Link className="text-green-700" href={`/entity/${data.entity?.numberId}`}>{data.entity?.name}</Link>
                </p>
                <p className="text-md md:text-lg text-zinc-500 block md:hidden">
                    {data.entity?.address}
                </p>
            </div>
            <Tabs tabs={tabs} />
        </>
    )
}