import { auth } from '@/auth.config'
import { Schedule } from './Schedule'
import { getCustomersByEntityId, getEntityById, getUserById } from '@/actions'
import { getServiceList } from '@/helpers'

export default async function SchedulePage() {

    const session = await auth()
    const user = await getUserById(session?.user?.id ?? '')
    const customers = await getCustomersByEntityId(user?.entityId ?? '')
    const entity = await getEntityById(user?.entityId ?? '')
    const foundationYear = user?.entity?.createdAt
        ? new Date(user.entity.createdAt).getFullYear()
        : new Date().getFullYear()

    const filteredServices = entity?.services.filter(s => !s.archived) ?? []
    const services = getServiceList(filteredServices)

    const professionals = entity?.users.map(({ id, name, entityId, photo, workDays, serviceOverrides }) =>
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
                : entity.services
                    .filter(s => !s.archived)
                    .map(s => ({
                        id: s.id,
                        duration: {
                            hours: s.baseDurationHours,
                            minutes: s.baseDurationMinutes
                        },
                        price: s.basePrice
                    }))
        // workdays: workDays.length > 0
        //     ? workDays.map((w, idx) => ({
        //         ...w,
        //         from: minutesToTime(
        //             Math.max(
        //                 toMinutes(w.from),
        //                 toMinutes(entity.workdays[idx].from)
        //             )
        //         ),
        //         to: minutesToTime(
        //             Math.min(
        //                 toMinutes(w.to),
        //                 toMinutes(entity.workdays[idx].to)
        //             )
        //         )
        //     }))
        //     : entity.workdays
    })) ?? []

    return (
        <Schedule
            foundationYear={foundationYear}
            professionals={professionals}
            customers={customers}
            entityId={user?.entityId ?? ''}
            services={services}
        />
    )
}