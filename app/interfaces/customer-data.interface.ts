interface CustomerData extends Customer {
    visits: number
    lastVisit: Date
    total: number
    services: { id: string, name: string }[]
    isAdminCreated: boolean
}

interface CustomerInfo {
    id: string
    name: string
    indicator?: string
    phone?: string
    photo?: string
}