import { DEFAULT_SERVICES_LIST } from '@/util/const'
import { Services } from './Services'
import { auth } from '@/auth.config'
import { getServiceByEntityId, getUserById } from '@/actions'
import { getServiceList } from '@/helpers'

export default async function ServicesPage() {

    const session = await auth()
    const user = await getUserById(session?.user?.id ?? '')
    const servicesDB = await getServiceByEntityId(user?.entityId ?? '')

    const categories = Object.keys(DEFAULT_SERVICES_LIST)
    const services = getServiceList(servicesDB)

    return (
        <Services 
            services={services} 
            categories={categories} 
            entityId={user?.entityId ?? ''}
        />
    )
}