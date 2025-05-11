interface ServiceItem {
    name: string
    description: string
    price: number
    duration: string
}

interface Service {
    entityId: string
    category: string
    services: ServiceItem[]
}