interface Customer {
    id: string
    name: string
    phone: {
        indicator: string
        number: string
    }
    birthDay: Date
    gender: Gender
    reviewPointsAverage: number
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
    selectedProfessional: {
        id: string
        name: string
        photo?: string
    },
    isAdminBooking: boolean
    customerReview: number | null
    status?: 'completed' | 'pending' | 'cancelled' | 'aborted'
    allDay: boolean
}