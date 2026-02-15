interface ServiceFormData {
    serviceId: string
    name: string
    category: string
    gender?: Gender | null
    description: string
    hours: number
    minutes: number
    price: string
}