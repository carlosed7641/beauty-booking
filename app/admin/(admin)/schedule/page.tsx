import { auth } from '@/auth.config'
import { Schedule } from './Schedule'
import { professionals as fakeProfessionals } from '@/util/fake-data'
import { getCustomersByEntityId, getUserById } from '@/actions'

// TODO: Api call
const professionals = fakeProfessionals.filter(sl => sl.entityId === '422')

export default async function SchedulePage() {

    const session = await auth()
    const user = await getUserById(session?.user?.id ?? '')
    const customers = await getCustomersByEntityId(user?.entityId ?? '')

    const foundationYear = user?.entity?.createdAt
        ? new Date(user.entity.createdAt).getFullYear()
        : new Date().getFullYear()

    return (
        <Schedule
            foundationYear={foundationYear}
            professionals={professionals}
            customers={customers}
        />
    )
}