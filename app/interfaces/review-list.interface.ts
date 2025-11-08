interface ReviewList {
    id: number
    user: UserInfo
    service: {
        id: string
        name: string
    }
    professional: UserInfo
    entityId: string
    date: number
    points: number
}

interface UserInfo {
    id: string
    name: string
    photo?: string
    blocked?: boolean
}