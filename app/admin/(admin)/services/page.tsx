import { DEFAULT_SERVICES_LIST } from '@/util/const'
import { Services } from './Services'
import { serviceList } from '@/util/fake-data'
import { auth } from '@/auth.config'
import { getServiceByEntityId, getUserById } from '@/actions'

export default async function ServicesPage() {

    const session = await auth()
    const user = await getUserById(session?.user?.id ?? '')
    const servicesDB = await getServiceByEntityId(user?.entityId ?? '')

    const categories = Object.keys(DEFAULT_SERVICES_LIST)
    const services = Object.values(
        servicesDB.reduce((acc, value) => {
            if (!acc[value.category]) {
                acc[value.category] = {
                    entityId: value.entityId,
                    category: value.category,
                    services: []
                }
            }

            acc[value.category].services.push({
                serviceId: value.id,
                name: value.name,
                description: value.description,
                duration: {
                    hours: value.baseDurationHours,
                    minutes: value.baseDurationMinutes
                },
                price: value.basePrice,
                gender: value.gender,
                archived: value.archived
            })

            return acc
        }, {} as Record<string, Service>)
    )

    return (
        <Services 
            services={services} 
            categories={categories} 
            entityId={user?.entityId ?? ''}
        />
    )
}