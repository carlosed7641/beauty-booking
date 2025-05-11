interface ProfessionalData {
    id: string
    name: string
    photo: string
    entityId: string
    resume: string
    reviews: {
        points: number
        count: number
    }
}