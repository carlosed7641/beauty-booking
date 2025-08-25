interface ServiceConfig extends ServiceData {
    id: string
}

interface ServiceConfigAlt {
    id: string
    name: string
    duration?: {
        hours: number
        minutes: number
    }
    price?: number
}

interface ProfessionalSettings {
    id: string
    name: string
    entityId: string
    photo?: string
    workdays: WorkDays[][]
    services: { [key: string]: ServiceConfig[]}
}