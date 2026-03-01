interface ProfessionalData {
    id: string
    name: string
    photo?: string | null
    entityId: string
    resume?: string
    reviews?: {
        points: number
        count: number
    }
}