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
    isFollowing?: boolean
    reviews?: {
        points: number
        count: number
    }
}
