interface Session {
    id: string
    name: string
    country: string
    photo?: string
    indicator?: string
    phone?: string
    birthDay: string
    gender: string
    shareNumberPhone?: boolean
    role?: 'admin' | 'user' | 'employee'
    artisticName?: string
    experienceArea?: string
    experienceYears?: string
    description?: string
}