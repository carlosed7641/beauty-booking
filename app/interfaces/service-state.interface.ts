interface ServiceState {
    id?: string
    selectedService: ServiceItem | null
    selectedProfessional: {
        id: string
        name: string
    } | null
    selectedDate: Date | null
    selectedHour: string | null
    customer?: {
        id: string
        name: string
    }
}