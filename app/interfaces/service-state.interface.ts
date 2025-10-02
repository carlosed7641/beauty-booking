interface ServiceState {
    id?: string
    selectedService: ServiceItem | null
    selectedProfessional: string | null
    selectedDate: Date | null // TODO: fix
    selectedHour: string | null
    customer?: {
        id: string
        name: string
    }
}
