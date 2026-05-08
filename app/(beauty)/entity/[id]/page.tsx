import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { FiMapPin } from 'react-icons/fi'
import { Tabs, ServiceListTab, Professionals, ReviewsModal } from '../../components'
import { WorkSamples } from '@/components'
import { getEntityById } from '@/actions'
import { Social } from './Social'
import { ShopInfo } from './ShopInfo'
import { getServiceList, minutesToTime, toMinutes } from '@/helpers'
import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'

interface Props {
    params: Promise<{ id: string }>
}

export default async function EntityPage({ params }: Props) {

    const { id } = await params
    const session = await auth()
    const data = await getEntityById(Number(id))

    if (!data) {
        notFound()
    }

    const filteredServices = data?.services.filter(s => !s.archived) ?? []
    const services = getServiceList(filteredServices)

    const professionals = data.users.map(({ id, name, entityId, photo, workDays, serviceOverrides, professionalEvents }) =>
    ({
        id,
        name: name ?? '',
        entityId: entityId ?? '',
        photo,
        services:
            serviceOverrides.length > 0
                ? serviceOverrides
                    .filter(s => s.enabled)
                    .map(s => ({
                        id: s.serviceId,
                        duration: {
                            hours: s.durationHours,
                            minutes: s.durationMinutes
                        },
                        price: s.price
                    }))
                : data?.services
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
            workDays.length > 0
                ?
                workDays
                    .map((w, idx) => ({
                        ...w,
                        from: minutesToTime(
                            Math.max(
                                toMinutes(w.from),
                                toMinutes(data!.workdays[idx].from)
                            )
                        ),
                        to: minutesToTime(
                            Math.min(
                                toMinutes(w.to),
                                toMinutes(data!.workdays[idx].to)
                            )
                        )
                    }))
                    .filter((w, idx) => !data?.workdays[idx].disabled && !w.disabled)
                :
                data?.workdays.filter(w => !w.disabled) ?? [],
        reviews: {
            points:
                professionalEvents
                    .filter(ev => ev.customerRating)
                    .map(ev => ({
                        id: ev.id,
                        points: ev.customerRating!
                    }))
                    .reduce((acc, current) => acc + current.points, 0) / professionalEvents.filter(ev => ev.customerRating).length,
            count: professionalEvents.filter(ev => ev.customerRating).length
        }
    })) ?? []


    const samples =
        data.samples
            .map(({ author, ...rest }) =>
            ({
                ...rest,
                authorName: author.name ?? ''
            }))

    const tabs: Tab[] = [
        {
            id: 'services-list',
            label: 'Lista de servicios',
            tab: <ServiceListTab
                serviceList={services}
                professionals={professionals}
                entity={{ id: data.id, numberId: data.numberId }}
                userId={session?.user?.id}
            />,
            visible: services?.length > 0
        },
        {
            id: 'work-samples',
            label: 'Muestras de trabajo',
            tab: <WorkSamples workSamples={samples} showName />,
            visible: samples?.length > 0
        },
        {
            id: 'professionals',
            label: 'Profesionales',
            tab: <Professionals professionals={professionals} />,
            visible: professionals?.length > 0
        }
    ].filter(tab => tab.visible)


    const reviews = data.events
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

    let isFollowing = false

    if (session) {
        const userFollowing = await prisma.user.findFirst({
            where: { id: session?.user?.id },
            select: {
                followers: {
                    select: {
                        entityId: true
                    }
                }
            }
        })

        isFollowing = userFollowing?.followers?.some(({ entityId }) => entityId === data.id) ?? false
    }

    const shopInfo = {
        id: data.id,
        userId: session?.user?.id,
        followers: data.followers?.length ?? 0,
        scheduling: data.events?.length ?? 0,
        name: data.name ?? '',
        logo: data.logo ?? undefined,
        points: reviews.reduce((acc, current) => acc + current.points, 0) / reviews.length,
        counts: reviews.length,
        isFollowing
    }

    return (
        <>
            <div className="flex gap-5">
                <div className="flex flex-col">
                    <Image className="rounded-full aspect-square self-start md:mb-8"
                        width={200}
                        height={200}
                        src={data.logo ?? '/images/placeholder.jpg'}
                        alt={data.name ?? ''}
                    />
                    <Social
                        contactUrl={data.contactUrl}
                        name={data.name ?? ''}
                        numberId={data.numberId}
                        className="hidden md:flex"
                    />
                </div>
                <div className="flex flex-col py-2 md:py-6 w-4/5 md:w-auto justify-center md:justify-start">
                    <p className="text-base md:text-3xl text-green-700 font-bold mb-2">{data.name}</p>
                    <p className="text-md md:text-lg text-zinc-500">
                        {data.address}
                    </p>
                    <p className="text-md md:text-lg text-zinc-500">
                        {data.addressReference}
                    </p>
                    <Link href='/map' className="flex gap-1 items-center underline text-green-700">
                        <FiMapPin />
                        Ver en el mapa
                    </Link>
                    <ShopInfo
                        reviews={reviews}
                        data={shopInfo}
                        isAuthenticated={!!session}
                        className="hidden md:flex"
                    />
                </div>
            </div>
            <ShopInfo
                reviews={reviews}
                data={shopInfo}
                isAuthenticated={!!session}
                className="md:hidden justify-around"
            />
            <Social
                contactUrl={data.contactUrl}
                name={data.name ?? ''}
                numberId={data.numberId}
                className="md:hidden mt-6"
            />
            <Tabs tabs={tabs} />
        </>
    )
}


