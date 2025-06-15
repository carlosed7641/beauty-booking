interface Reservation {
    id: string
    selectedService: ServiceItemExtended
    selectedProfessional: string
    selectedDate: string,
    selectedHour: string,
    isCompleted: boolean
    status: 'pending' | 'canceled' | 'completed'
}