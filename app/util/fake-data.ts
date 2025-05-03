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
    category: "Color cabello",
    services: [
      { name: "Rayitos platinados", description: "Los mejores rayitos", duration: '4h', price: 30000 },
      { name: "Tinte", description: "El mejor tinte", duration: '3.5h', price: 25000 }
    ]
  },
  {
    category: "Cortes",
    services: [
      { name: "Sencillo", description: "Corte básico", duration: '30m', price: 15000 },
      { name: "Corte y barba", description: "Corte y barba", duration: '45m', price: 20000 }
    ]
  }
]

export const profesionals = [
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

export const workSamples = [
  {
    category: 'Fade',
    image: 'https://picsum.photos/160/170',
    author: 'Carlos Castro',
    authorId: 'bcf'
  },
  {
    category: 'Siete',
    image: 'https://picsum.photos/160/170',
    author: 'Gregorio Carrena',
    authorId: 'abc'
  },
  {
    category: 'Fade',
    image: 'https://picsum.photos/160/170',
    author: 'Gregorio Carrena',
    authorId: 'abc'
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
