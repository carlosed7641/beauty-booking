import { auth } from '@/auth.config'
import { getEntityById, getUserById } from '@/actions'
import { Reports } from './Reports'

export default async function ReportsPage() {

    const session = await auth()
    const user = await getUserById(session?.user?.id ?? '')
    const entity = await getEntityById(user?.entityId ?? '')
    const foundationDate = entity?.createdAt ?? new Date()

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
        <Reports
            foundationDate={foundationDate}
            professionals={professionals}
            entityId={entity?.id ?? ''}
            isEmployee={user?.role === 'employee'}
        />
    )
}