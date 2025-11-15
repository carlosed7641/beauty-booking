interface ServiceItem {
  serviceId: string
  name: string
  description?: string
  price: number
  gender?: Gender
  category?: string
  duration: {
    hours: number
    minutes: number
  }
  archived?: boolean
}

type Gender = 'Masculino' | 'Femenino' | 'Unisex'

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