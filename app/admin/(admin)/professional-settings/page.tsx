
import Link from 'next/link'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { ProfessionalSettings } from './ProfessionalSettings'
import { auth } from '@/auth.config'
import { getEntityById, getUserById } from '@/actions'
import { minutesToTime, toMinutes } from '@/helpers'

interface ServiceProps {
    id: string
    name: string
    category: string
    price: number
    durationHours: number
    durationMinutes: number
    serviceId?: string
    enabled?: boolean
}

const getServiceList = (services: ServiceProps[]) => {
    return services.reduce((acc, value) => {

        if (!acc[value.category]) {
            acc[value.category] = []
        }

        acc[value.category].push({
            id: value.id,
            name: value.name,
            duration: {
                hours: value.durationHours,
                minutes: value.durationMinutes
            },
            serviceId: value.serviceId,
            price: value.price,
            enabled: value.enabled
        })

        return acc
    }, {} as Record<string, ServiceConfig[]>)
}

export default async function ProfessionalSettingsPage() {

    const session = await auth()
    const user = await getUserById(session?.user?.id ?? '')
    const entity = await getEntityById(user?.entityId ?? '')

    const filterServices =
        entity?.services
            .filter(s => !s.archived)
            .map(s => ({
                id: s.id,
                name: s.name,
                price: s.basePrice,
                category: s.category,
                durationHours: s.baseDurationHours,
                durationMinutes: s.baseDurationMinutes,
                serviceId: s.id,
                enabled: true
            }))

    const entityServiceList = getServiceList(filterServices as ServiceProps[])

    const professionals = entity?.users.map(({ id, name, entityId, photo, workDays, serviceOverrides }) =>
    ({
        id,
        name: name ?? '',
        entityId,
        photo,
        services:
            serviceOverrides.length > 0
                ? getServiceList(
                    serviceOverrides.map(s => ({
                        id: s.id,
                        name: s.service.name,
                        price: s.price,
                        serviceId: s.serviceId,
                        category: s.service.category,
                        durationHours: s.durationHours,
                        durationMinutes: s.durationMinutes,
                        enabled: s.enabled
                    }))
                )
                :
                { ...entityServiceList },
        workdays: workDays.length > 0
            ? workDays.map((w, idx) => ({
                ...w,
                from: minutesToTime(
                    Math.max(
                        toMinutes(w.from),
                        toMinutes(entity.workdays[idx].from)
                    )
                ),
                to: minutesToTime(
                    Math.min(
                        toMinutes(w.to),
                        toMinutes(entity.workdays[idx].to)
                    )
                )
            }))
            : entity.workdays
    })) ?? []

    return (
        <>
            <div className="flex items-center gap-2 mb-3">
                <Link href="/admin/settings" title="Volver">
                    <IoMdArrowRoundBack className="cursor-pointer text-xl text-green-700" />
                </Link>
                <h1 className="text-lg text-green-700 font-bold">Configuración</h1>
            </div>
            <div className="flex flex-col gap-6">
                <div className="bg-white w-full rounded-md p-7">
                    <ProfessionalSettings
                        professionals={professionals}
                        workDays={entity?.workdays ?? []}
                    />
                </div>
            </div>
        </>
    )
}
