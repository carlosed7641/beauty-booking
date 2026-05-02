interface ReviewList {
    id: string
    title: string
    user: UserInfo
    date: Date | null
    points: number
}

interface UserInfo {
    id: string
    name: string | null 
    photo?: string | null
    entityId?: string | null
    blocked?: boolean
}