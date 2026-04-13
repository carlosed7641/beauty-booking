import { auth } from '@/auth.config'
import { getEntityById, getUserById } from '@/actions'
import { ScheduleHistory } from './ScheduleHistory'

export default async function ScheduleHistoryPage() {

    const session = await auth()
    const user = await getUserById(session?.user?.id ?? '')
    const entity = await getEntityById(user?.entityId ?? '')
    const foundationYear = user?.entity?.createdAt
        ? new Date(user.entity.createdAt).getFullYear()
        : new Date().getFullYear()

    const filteredProfessionals = user?.role === 'employee'
        ? entity?.users.filter(usr => usr.id === user.id) ?? []
        : (entity?.users ? [...entity.users] : [])

    const professionals = filteredProfessionals.map(({ id, name, entityId, photo }) => ({
        id,
        name: name ?? '',
        entityId: entityId ?? '',
        photo
    })) ?? []



    return (
        <ScheduleHistory
            professionals={professionals}
            foundationYear={foundationYear}
            entityId={user?.entityId ?? ''}
            isEmployee={user?.role === 'employee'}
        />
    )
}