interface ServiceResult {
    id: string
    category: string
    name: string
    price: number
    duration: {
        hours: number,
        minutes: number
    }
    entity: {
        id: string
        numberId: number
        name: string
        reviews: Reviews
    }
}