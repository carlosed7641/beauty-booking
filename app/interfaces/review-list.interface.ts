interface ReviewList {
    id: number
    userId: number
    service: {
        id: string
        name: string
    }
    professional: Professional
    date: number
    points: number
}

interface Professional {
    id: string
    name: string
    photo: string
}