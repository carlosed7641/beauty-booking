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
    name: string | null 
    photo?: string | null
    entityId?: string | null
    blocked?: boolean
}