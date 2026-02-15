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
