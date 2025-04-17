interface Entity {
    id: string
    imageSrc: string
    name: string
    address: Address
    reviews: Reviews
    followers: number
    scheduling: number
    contactUrl: string
}

interface Address {
    street: string
    city: string
    state: string
    country: string
    reference: string
}

interface Reviews {
    points: number
    counts: number
}
