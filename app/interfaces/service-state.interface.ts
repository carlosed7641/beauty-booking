interface ServiceState {
    id?: string
    selectedService: ServiceItem | null
    selectedProfessional: string | null
    selectedDate: string | null
    selectedHour: string | null
    isCompleted: boolean
    customer?: {
        id: string
        name: string
    }
}
