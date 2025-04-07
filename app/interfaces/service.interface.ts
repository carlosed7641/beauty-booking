interface ServiceItem {
    name: string
    description: string
    price: number
    duration: string
}

interface Service {
    category: string,
    services: ServiceItem[]
}