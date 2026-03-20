import { getCustomersDataByEntityId, getUserById } from '@/actions'
import { auth } from '@/auth.config'
import { Customers } from './Customers'

export default async function CustomersPage() {

    const session = await auth()
    const user = await getUserById(session?.user?.id ?? '')
    const customers = await getCustomersDataByEntityId(user?.entityId ?? '')

    return (
        <Customers
            customers={customers}
        />
    )
}