interface ServiceItem {
  serviceId: string
  name: string
  description?: string | null
  price: number
  gender?: Gender | null
  category?: string
  duration: {
    hours: number
    minutes: number
  }
  archived?: boolean
}

const Gender = {
  men: 'men',
  women: 'women',
  other: 'other'
}

type Gender = keyof typeof Gender

interface Service {
  entityId: string 
  entityName?: string
  category: string
  services: ServiceItem[]
}

interface ServiceItemExtended extends ServiceItem {
  entityName: string
  category: string
}