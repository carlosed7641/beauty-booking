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
        duration: string
        price: number
    },
    selectedProfessional: {
        id: string
        name: string
    },
    isAdminBooking: boolean
    customerReview: number | null
    allDay: boolean
}