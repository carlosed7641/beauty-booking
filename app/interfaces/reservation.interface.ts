interface Reservation {
    id: string
    selectedService: ServiceItemExtended
    selectedProfessional: {
        id: string
        name: string
    }
    selectedDate: Date,
    selectedHour: string,
    status: 'pending' | 'canceled' | 'completed'
}