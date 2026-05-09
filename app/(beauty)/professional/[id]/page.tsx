import Link from 'next/link'
import Image from 'next/image'
import { notFound, redirect } from 'next/navigation'
import { Tabs, ReviewsModal, ServiceListTab } from '../../components'
import { WorkSamples } from '@/components'
import { auth } from '@/auth.config'
import { getServiceByEntityId, getUserById, getWorkDaysByEntityId } from '@/actions'
import { getServiceList, minutesToTime, toMinutes } from '@/helpers'

interface Props {
    params: Promise<{ id: string }>
}

export default async function ProfessionalPage({ params }: Props) {

    const { id } = await params
    const session = await auth()
    const data = await getUserById(id)
    const entityServices = await getServiceByEntityId(data?.entityId ?? '')
    const entityWorkDays = await getWorkDaysByEntityId(data?.entityId ?? '')

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
                                    toMinutes(entityWorkDays[idx].from)
                                )
                            ),
                            to: minutesToTime(
                                Math.min(
                                    toMinutes(w.to),
                                    toMinutes(entityWorkDays[idx].to)
                                )
                            )
                        }))
                        .filter((w, idx) => !entityWorkDays[idx].disabled && !w.disabled)
                    :
                    entityWorkDays.filter(w => !w.disabled) ?? []
        }]

    const samples =
        data.samples
            .map(sample =>
            ({
                ...sample,
                authorName: data.name ?? ''
            }))


    const tabs: Tab[] = [
        {
            id: 'services-list',
            label: 'Lista de servicios',
            tab: <ServiceListTab
                serviceList={services}
                entity={{ id: data.entity!.id, numberId: data.entity!.numberId }}
                professionalData={{ id: data.id, name: data.name ?? '', photo: data.photo ?? undefined }}
                userId={session?.user?.id}
                professionals={professionals}
            />,
            visible: true,
        },
        {
            id: 'work-samples',
            label: 'Muestras de trabajo',
            tab: <WorkSamples workSamples={samples} />,
            visible: samples?.length > 0

        }
    ].filter(tab => tab.visible)

    const reviews = data.professionalEvents
        .filter(ev => ev.customerRating)
        .map(ev => ({
            id: ev.id,
            title: ev.title,
            date: ev.customerRatedAt,
            user: {
                id: ev.customer.user?.id ?? '',
                name: ev.customer.user?.name ?? '',
                photo: ev.customer.user?.photo
            },
            points: ev.customerRating!
        }))

    return (
        <>
            <div className="flex gap-5">
                <div className="flex flex-col">
                    {data.photo ? <Image className="rounded-full self-start md:mb-8 aspect-square" width={200} height={200} src={data.photo} alt={data.name ?? ''} />
                        :
                        <div className="flex items-center h-35 w-35 md:w-50 md:h-50 aspect-square justify-center text-8xl rounded-full bg-green-700 text-white">
                            {data?.name?.[0]}
                        </div>
                    }
                </div>
                <div className="flex flex-col py-2 md:py-6 w-4/5 md:w-auto justify-center md:justify-start">
                    <p className="text-base md:text-3xl text-green-700 font-bold mb-2">{data.name}</p>
                    <ReviewsModal
                        alternativeStyle
                        name={data.name ?? ''}
                        photo={data.photo ?? undefined}
                        counts={reviews.length}
                        points={reviews.reduce((acc, current) => acc + current.points, 0) / reviews.length}
                        reviews={reviews}
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