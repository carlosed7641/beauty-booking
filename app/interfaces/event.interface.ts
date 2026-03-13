interface Customer {
    id: string
    name: string
    phone: {
        indicator: string
        number: string
    }
    birthDay: Date | null
    gender: Gender | null
    userId?: string | null
}

interface EventDate {
    id: string
    title: string
    start: Date
    end: Date
    customer: Customer
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
    selectedProfessional: {
        id: string
        name: string
        photo?: string
    },
    isAdminBooking: boolean
    status?: EventStatus | null
}

const EventStatus = {
  completed: 'completed',
  pending: 'pending',
  cancelled: 'cancelled',
  aborted: 'aborted'
} as const

type EventStatus = (typeof EventStatus)[keyof typeof EventStatus]