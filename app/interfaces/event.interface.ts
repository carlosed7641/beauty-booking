interface Customer {
    id: string
    name: string
    phone: {
        indicator: string
        number: string
    }
    birthDay?: Date | null
    gender?: Gender | null
    userId?: string | null
    isBlocked?: boolean
    customerAvgRating?: number | null
}

interface EventDate {
    id: string
    title: string
    start: Date
    end: Date
    customer: Customer
    entity?: {
        id?: string
        name?: string
        cancelDateTime?: number
    }
    selectedService: {
        serviceId: string
        category?: string
        description?: string
        name: string
        duration: {
            hours: number
            minutes: number
        }
        price: number
    },
    professionalRating?: number | null
    customerRating?: number | null
    selectedProfessional: {
        id: string
        name: string
        photo?: string
    },
    typeBooking: string
    status?: EventStatus | null
}

const EventStatus = {
    completed: 'completed',
    pending: 'pending',
    cancelled: 'cancelled',
    aborted: 'aborted'
} as const

type EventStatus = (typeof EventStatus)[keyof typeof EventStatus]

interface EventReview {
    id: string
    title: string
    start: Date
    professional: {
        name: string | null
        photo: string | null
    }
}
