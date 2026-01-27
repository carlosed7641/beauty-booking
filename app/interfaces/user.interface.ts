import { Gender, Role } from '@/generated/prisma/enums'

export type UserWithEntity = User & {
  entity: Entity | null
}

export interface UserDTO {
    artisticName?: string | null
    birthDay?: Date | null
    countryId?: string | null
    description?: string | null
    entityId?: string | null
    experienceArea?: string | null
    experienceYears?: string | null
    gender?: Gender | null
    indicator?: string | null
    name?: string | null
    phone?: string | null
    photo?: File[] | null
    isPublicProfile?: boolean
    role?: Role
}

export interface User {
    artisticName: string | null
    birthDay: Date | null
    countryId: string | null
    description: string | null
    email: string
    entityId: string | null
    experienceArea: string | null
    experienceYears: string | null
    gender: Gender | null
    id: string
    indicator: string | null
    isRegisterCompleted: boolean
    name: string | null
    password: string
    phone: string | null
    photo: string | null
    role: Role
    shareNumberPhone: boolean
}

