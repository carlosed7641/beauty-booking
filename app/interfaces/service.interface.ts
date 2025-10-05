interface ServiceItem {
  serviceId: string
  name: string
  description?: string
  price: number
  duration: string
}

interface Service {
  entityId: string
  entityName: string
  category: string
  services: ServiceItem[]
}

interface ServiceItemExtended extends ServiceItem {
  entityName: string
  category: string
}