import { Gender, Role } from '@/generated/prisma/enums'

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

