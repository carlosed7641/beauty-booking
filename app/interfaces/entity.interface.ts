interface Entity {
    id: string
    name: string | null
    countryId: string
    logo?: string | null
    cover?: string | null
    contactUrl: string | null
    followers: number
    scheduling: number
    ownerId: string
    address: string | null
    addressReference: string | null
    shopType: string | null
}
interface Reviews {
    points: number
    counts: number
}

interface SimpleEntity {
    id: string
    numberId: number
    logo: string | null
    name: string | null
    address: string | null
    userId?: string
    _count: {
        events: number
        followers: number
    },
    reviews?: {
        points: number
        count: number
    }
}
