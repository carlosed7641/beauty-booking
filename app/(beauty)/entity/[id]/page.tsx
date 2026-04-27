import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { FaWhatsapp } from 'react-icons/fa'
import { FiMapPin } from 'react-icons/fi'
import { GoShareAndroid } from 'react-icons/go'
import { Tabs, ServiceListTab, Professionals, ReviewsModal } from '../../components'
import { WorkSamples } from '@/components'
import {
    entities,
    workSamples as allWorkSamples,
    serviceList as allServiceList,
    professionals as allProfessionals,
    reviews as apiReviews
} from '@/util/fake-data'
import { getEntityById } from '@/actions'
import { Social } from './Social'
import { useState } from 'react'
import { ShopInfo } from './ShopInfo'
import { getServiceList, minutesToTime, toMinutes } from '@/helpers'
import { auth } from '@/auth.config'

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

    const professionals = data.users.map(({ id, name, entityId, photo, workDays, serviceOverrides }) =>
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
                data?.workdays.filter(w => !w.disabled) ?? []
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

    const shopInfo = {
        followers: data.followers?.length ?? 0,
        scheduling: data.events?.length ?? 0,
        name: data.name ?? '',
        logo: data.logo ?? undefined
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
                        reviews={[]}
                        data={shopInfo}
                        className="hidden md:flex"
                    />
                </div>
            </div>
            <ShopInfo
                reviews={[]}
                data={shopInfo}
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


