import { generateDatesArray } from '@/helpers'

export const entities: Entity[] = [
  {
    id: '422',
    imageSrc: 'https://picsum.photos/200/200',
    name: 'Acicalate Vip',
    address: {
      street: 'Cra 30 #24-32',
      city: 'Soledad',
      state: 'Atlántico',
      country: 'Colombia',
      reference: 'Arriba del TA DA'
    },
    reviews: {
      points: 4.5,
      counts: 233
    },
    followers: 38,
    scheduling: 104,
    contactUrl: 'https://www.whatsapp.com/channel/0029Va4PN8hFCCoO00odQi0v'
  },
  {
    id: '423',
    imageSrc: 'https://picsum.photos/200/200',
    name: 'Acicalate Vip',
    address: {
      street: 'Cra 30 #24-32',
      city: 'Soledad',
      state: 'Atlántico',
      country: 'Colombia',
      reference: 'Arriba del TA DA'
    },
    reviews: {
      points: 4.5,
      counts: 233
    },
    followers: 38,
    scheduling: 104,
    contactUrl: 'https://www.whatsapp.com/channel/0029Va4PN8hFCCoO00odQi0v'
  },
  {
    id: '424',
    imageSrc: 'https://picsum.photos/200/200',
    name: 'Acicalate Vip',
    address: {
      street: 'Cra 30 #24-32',
      city: 'Soledad',
      state: 'Atlántico',
      country: 'Colombia',
      reference: 'Arriba del TA DA'
    },
    reviews: {
      points: 4.5,
      counts: 233
    },
    followers: 38,
    scheduling: 104,
    contactUrl: 'https://www.whatsapp.com/channel/0029Va4PN8hFCCoO00odQi0v'
  },
  {
    id: '425',
    imageSrc: 'https://picsum.photos/200/200',
    name: 'Acicalate Vip',
    address: {
      street: 'Cra 30 #24-32',
      city: 'Soledad',
      state: 'Atlántico',
      country: 'Colombia',
      reference: 'Arriba del TA DA'
    },
    reviews: {
      points: 4.5,
      counts: 233
    },
    followers: 38,
    scheduling: 104,
    contactUrl: 'https://www.whatsapp.com/channel/0029Va4PN8hFCCoO00odQi0v'
  }
]

export const serviceList: Service[] = [
  {
    entityId: '422',
    category: "Color cabello",
    services: [
      { name: "Rayitos platinados", description: "Los mejores rayitos", duration: '4h', price: 30000 },
      { name: "Tinte", description: "El mejor tinte", duration: '3.5h', price: 25000 }
    ]
  },
  {
    entityId: '422',
    category: "Cortes",
    services: [
      { name: "Sencillo", description: "Corte básico", duration: '30m', price: 15000 },
      { name: "Corte y barba", description: "Corte y barba", duration: '45m', price: 20000 }
    ]
  }
]

export const professionals: ProfessionalData[] = [
  {
    id: 'abc',
    name: 'Gregorio Carrena',
    photo: 'https://picsum.photos/150/150',
    entityId: '422',
    resume: 'Barbero con más de 10 años de experiencia',
    reviews: {
      points: 4.7,
      count: 224
    }
  },
  {
    id: 'bcf',
    name: 'Carlos Castro',
    photo: 'https://picsum.photos/150/150',
    entityId: '422',
    resume: 'Barbero con más de 3 años de experiencia',
    reviews: {
      points: 4.3,
      count: 122
    }
  }
]

export const availableDates = generateDatesArray()
export const scheduleHours = ['10:00', '20:00']
export const excludeHours = ['12:00', '12:30', '13:00']

export const workSamples: WorkSample[] = [
  {
    category: 'Fade',
    image: 'https://picsum.photos/160/170',
    author: 'Carlos Castro',
    authorId: 'bcf',
    entityId: '422'
  },
  {
    category: 'Siete',
    image: 'https://picsum.photos/160/170',
    author: 'Gregorio Carrena',
    authorId: 'abc',
    entityId: '422'
  },
  {
    category: 'Fade',
    image: 'https://picsum.photos/160/170',
    author: 'Gregorio Carrena',
    authorId: 'abc',
    entityId: '422'
  }
]

export const reservations: Reservation[]= [
  {
    id: 123,
    name: 'Corte adolescente',
    price: 15000,
    duration: '30m',
    date: '15 de mayo de 2025',
    hour: '9:30AM',
    professional: 'Gregorio Carrena',
    entity: 'Acicalate VIP',
    status: 'completed'
  },
  {
    id: 124,
    name: 'Corte adulto',
    price: 15000,
    duration: '30m',
    date: '15 de mayo de 2025',
    hour: '9:30AM',
    professional: 'Gregorio Carrena',
    entity: 'Acicalate VIP',
    status: 'completed'
  },
  {
    id: 125,
    name: 'Corte niño',
    price: 15000,
    duration: '30m',
    date: '15 de mayo de 2025',
    hour: '9:30AM',
    professional: 'Gregorio Carrena',
    entity: 'Acicalate VIP',
    status: 'completed'
  },
  {
    id: 126,
    name: 'Corte siete',
    price: 15000,
    duration: '30m',
    date: '15 de mayo de 2025',
    hour: '9:30AM',
    professional: 'Gregorio Carrena',
    entity: 'Acicalate VIP',
    status: 'canceled'
  },
  {
    id: 127,
    name: 'Corte hombre',
    price: 15000,
    duration: '30m',
    date: '15 de mayo de 2025',
    hour: '9:30AM',
    professional: 'Gregorio Carrena',
    entity: 'Acicalate VIP',
    status: 'pending'
  },
]

export const reviews: ReviewList[] = [
  {
    id: 1,
    userId: 27,
    service: {
      id: '1',
      name: 'Corte joven'
    },
    professional: {
      id: 'abc',
      name: 'Gregorio Carrena',
      photo: 'https://picsum.photos/150/150'
    },
    date: 1746382434738,
    points: 4
  },
  {
    id: 2,
    userId: 27,
    service: {
      id: '3',
      name: 'Corte adulto'
    },
    professional: {
      id: 'abc',
      name: 'Gregorio Carrena',
      photo: 'https://picsum.photos/150/150'
    },
    date: 1746382434338,
    points: 5
  },
  {
    id: 3,
    userId: 27,
    service: {
      id: '2',
      name: 'Corte adulto'
    },
    professional: {
      id: 'def',
      name: 'Carlos Castro',
      photo: 'https://picsum.photos/150/150'
    },
    date: 1746385434338,
    points: 5
  },
  {
    id: 4,
    userId: 32,
    service: {
      id: '2',
      name: 'Corte prueba'
    },
    professional: {
      id: 'def',
      name: 'Carlos Castro',
      photo: 'https://picsum.photos/150/150'
    },
    date: 1746385434338,
    points: 3
  }
]

export const session: Session = {
  id: 57,
  name: 'Carlos Castro Reales',
  country: 'Colombia',
  photo: 'https://picsum.photos/180/180',
  indicator: '+57',
  phone: '3004394704',
  birthDay: '2000-04-26',
  gender: 'Hombre',
  shareNumberPhone: true
}