interface ServiceItemDTO {
    serviceId?: string
    entityId: string
    archived?: boolean
    name: string
    category: string
    description?: string | null
    basePrice: number
    baseDurationHours: number
    baseDurationMinutes: number
    gender?: Gender | null
}
