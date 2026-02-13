import { Services } from './Services'
import { serviceList, serviceCategories } from '@/util/fake-data'

export default function ServicesPage() {
    // TODO: Get from session
    const entityId = '422'
    // TODO: Api call
    const services = serviceList.filter(service => service.entityId === entityId)
    const categories = serviceCategories
    return (
        <Services services={services} categories={categories} />
    )
}