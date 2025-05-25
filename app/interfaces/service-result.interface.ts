interface ServiceResult {
    category: string
    name: string
    price: number
    entity: {
        id: string
        name: string
        reviews: Reviews
    }
}