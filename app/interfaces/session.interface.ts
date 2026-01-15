export enum Role {
 admin = 'admin',
 user = 'user',
 employee = 'employee'
}

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
    role?: Role
    artisticName?: string
    experienceArea?: string
    experienceYears?: string
    description?: string
}