interface ServiceConfig extends ServiceData {
    id: string
}

interface ProfessionalSettings {
    id: string
    name: string
    entityId: string
    photo?: string
    workdays: WorkDays[][]
    services: { [key: string]: ServiceConfig[]}
}