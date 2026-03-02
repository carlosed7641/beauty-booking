interface ProfessionalSchedule {
    id: string
    name: string
    photo?: string | null
    entityId: string
    services: {
        id: string
        duration: {
            hours: number
            minutes: number
        }
        price: number
    }[],
    workdays: WorkDays[]
}