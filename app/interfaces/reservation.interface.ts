interface Reservation {
    id: string
    selectedService: ServiceItemExtended
    selectedProfessional: string
    selectedDate: Date,
    selectedHour: string,
    status: 'pending' | 'canceled' | 'completed'
}