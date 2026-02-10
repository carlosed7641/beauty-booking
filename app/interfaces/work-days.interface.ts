interface WorkDays {
    id?: string
    from: string
    to: string
    name: string
    order: number
    disabled?: boolean
    professionalId?: string | null
    error?: boolean | string
}