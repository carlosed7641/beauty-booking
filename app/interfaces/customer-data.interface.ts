interface CustomerData extends Customer {
    visits: number
    lastVisit: Date
    total: number
    services: { id: string, name: string }[]
}
