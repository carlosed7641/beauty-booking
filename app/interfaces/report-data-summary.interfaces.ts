interface GroupSale {
    id: string
    name: string 
    quantity: number
    total: number 
}

interface ReportDataSummary {
    totalSales: number
    averageServiceTime: number
    completedServices: number
    averageServiceValue: number
    bills: number
    bestSellingProfessional: { data: { id: string, name: string, photo?: string }, count: number }
    bestSellingService: { name: string, count: number }
    manualScheduling: number
    adminScheduling: number
    abortedRate: number
    cancellationRate: number
    totalCustomers: number
    groupSales: GroupSale[]
}