interface ServiceConfig extends ServiceData {
    id: string
}

interface ProfessionalSettings {
    id: string
    name: string
    entityId: string | null
    photo?: string | null
    workdays: WorkDays[]
    services?: { [key: string]: ServiceConfig[]}
}