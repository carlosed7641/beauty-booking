interface ServiceState {
    id?: string
    selectedService: ServiceItem | null
    selectedProfessional: string | null
    selectedDate: string | Date | null // TODO: fix
    selectedHour: string | null
    isCompleted: boolean
    customer?: {
        id: string
        name: string
    }
}
