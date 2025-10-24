interface EventDate {
    id: string
    title: string
    start: Date
    end: Date
    customer: {
        id: string
        name: string
        phone: string
    },
    selectedService: {
        serviceId: string
        name: string
        duration: string | {
            hours: number
            minutes: number
        }
        price: number
    },
    selectedProfessional: {
        id: string
        name: string
    },
    isAdminBooking: boolean
    customerReview: number | null
    status?: 'completed' | 'pending' | 'cancelled' | 'aborted'
    allDay: boolean
}