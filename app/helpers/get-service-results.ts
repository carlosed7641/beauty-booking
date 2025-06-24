import { entities } from '@/util/fake-data'

export const getServiceResults = (service: Service) => {
    
    const entity = entities.find(e => e.id === service.entityId)

    if (!entity) return []

    const results = service.services.map(({ name, price }) => {
        return {
            category: service.category.toLocaleLowerCase(),
            name,
            price,
            entity: {
                id: entity.id,
                name: entity.name,
                reviews: entity.reviews
            }
        }
    })

    return results
}