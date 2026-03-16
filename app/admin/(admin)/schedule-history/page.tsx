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

    const professionals = entity?.users.map(({ id, name, entityId, photo }) => ({
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
        />
    )
}