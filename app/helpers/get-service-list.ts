interface ServiceData {
    id: string
    name: string
    entityId: string
    gender: Gender | null
    description: string | null
    category: string
    basePrice: number
    baseDurationHours: number
    baseDurationMinutes: number
    archived: boolean
}

export const getServiceList = (services: ServiceData[]) => {
    return Object.values(
        services.reduce((acc, value) => {
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
}