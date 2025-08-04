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
      points: 4.6,
      counts: 233
    },
    followers: 38,
    scheduling: 104,
    contactUrl: 'https://www.whatsapp.com/channel/0029Va4PN8hFCCoO00odQi0v'
  },
  {
    id: '423',
    imageSrc: 'https://picsum.photos/200/200',
    name: 'Master Barber',
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
    name: 'Best Shop',
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
    name: 'Brothers Vip',
    address: {
      street: 'Cra 30 #24-32',
      city: 'Soledad',
      state: 'Atlántico',
      country: 'Colombia',
      reference: 'Arriba del TA DA'
    },
    reviews: {
      points: 4.4,
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
    entityName: 'Acicalate Vip',
    category: "Color cabello",
    services: [
      { serviceId: '001', name: "Rayitos platinados", description: "Los mejores rayitos", duration: '4h', price: 30000 },
      { serviceId: '002', name: "Tinte", description: "El mejor tinte", duration: '3.5h', price: 25000 }
    ]
  },
  {
    entityId: '422',
    entityName: 'Acicalate Vip',
    category: "Cortes",
    services: [
      { serviceId: '003', name: "Sencillo", description: "Corte básico", duration: '30m', price: 15000 },
      { serviceId: '004', name: "Corte y barba", description: "Corte y barba", duration: '45m', price: 20000 }
    ]
  },
  {
    entityId: '422',
    entityName: 'Acicalate Vip',
    category: "Peinados",
    services: [
      { serviceId: '005', name: "Trenzas", description: "Trenzas básicas", duration: '1h', price: 18000 },
      { serviceId: '006', name: "Cepillado", description: "Cepillado básico", duration: '45m', price: 12000 }
    ]
  },
  {
    entityId: '425',
    entityName: 'Prueba',
    category: "Cortes",
    services: [
      { serviceId: '007', name: "Especial", description: "Corte especial", duration: '30m', price: 16000 },
      { serviceId: '008', name: "Barba con pigmentación", description: "Barba con pigmentación", duration: '45m', price: 14000 }
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
    category: 'Cortes',
    name: 'Fade',
    image: 'https://picsum.photos/160/170',
    author: 'Carlos Castro',
    authorId: 'bcf',
    entityId: '422'
  },
  {
    category: 'Peinados',
    name: 'Alisado',
    image: 'https://picsum.photos/160/170',
    author: 'Gregorio Carrena',
    authorId: 'abc',
    entityId: '422'
  },
  {
    category: 'Cortes',
    name: 'Siete',
    image: 'https://picsum.photos/160/170',
    author: 'Gregorio Carrena',
    authorId: 'abc',
    entityId: '422'
  }
]

export const reservations: Reservation[] = [
  {
    id: 'abc',
    selectedService: {
      serviceId: "001",
      entityName: 'Acicalate Vip',
      category: 'Cortes',
      name: "Rayitos platinados",
      description: "Los mejores rayitos",
      duration: "4h",
      price: 30000
    },
    selectedProfessional: "Carlos Castro",
    selectedDate: "16 de junio de 2025",
    selectedHour: "2:00 PM",
    isCompleted: true,
    status: 'pending'
  },
  {
    id: 'abd',
    selectedService: {
      serviceId: "001",
      entityName: 'Acicalate Vip',
      category: 'Cortes',
      name: "Corte hombre",
      description: "Los mejores rayitos",
      duration: "4h",
      price: 30000
    },
    selectedProfessional: "Carlos Castro",
    selectedDate: "16 de junio de 2025",
    selectedHour: "2:00 PM",
    isCompleted: true,
    status: 'completed'
  },
  {
    id: 'abe',
    selectedService: {
      serviceId: "001",
      entityName: 'Acicalate Vip',
      category: 'Cortes',
      name: "Rayitos básicos",
      description: "Los mejores rayitos",
      duration: "4h",
      price: 30000
    },
    selectedProfessional: "Carlos Castro",
    selectedDate: "16 de junio de 2025",
    selectedHour: "2:00 PM",
    isCompleted: true,
    status: 'canceled'
  },
  {
    id: 'abc',
    selectedService: {
      serviceId: "001",
      entityName: 'Acicalate Vip',
      category: 'Cortes',
      name: "Rayitos platinados",
      description: "Los mejores rayitos",
      duration: "4h",
      price: 30000
    },
    selectedProfessional: "Carlos Castro",
    selectedDate: "16 de junio de 2025",
    selectedHour: "2:00 PM",
    isCompleted: true,
    status: 'completed'
  }
]

export const reviews: ReviewList[] = [
  {
    id: 1,
    user: {
      id: '27',
      name: 'Carlos Castro'
    },
    service: {
      id: '1',
      name: 'Corte joven'
    },
    professional: {
      id: 'abc',
      name: 'Gregorio Carrena',
      photo: 'https://picsum.photos/150/150'
    },
    entityId: '422',
    date: 1746382434738,
    points: 4
  },
  {
    id: 2,
    user: {
      id: '27',
      name: 'Carlos Castro'
    },
    service: {
      id: '3',
      name: 'Corte adulto'
    },
    professional: {
      id: 'abc',
      name: 'Gregorio Carrena',
      photo: 'https://picsum.photos/150/150'
    },
    entityId: '422',
    date: 1746382434338,
    points: 5
  },
  {
    id: 3,
    user: {
      id: '27',
      name: 'Carlos Castro'
    },
    service: {
      id: '2',
      name: 'Corte adulto'
    },
    professional: {
      id: 'bcf',
      name: 'Carlos Castro',
      photo: 'https://picsum.photos/150/150'
    },
    entityId: '422',
    date: 1746385434338,
    points: 5
  },
  {
    id: 4,
    user: {
      id: '27',
      name: 'Carlos Castro'
    },
    service: {
      id: '2',
      name: 'Corte prueba'
    },
    professional: {
      id: 'bcf',
      name: 'Carlos Castro',
      photo: 'https://picsum.photos/150/150'
    },
    entityId: '422',
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
  shareNumberPhone: true,
  role: 'user'
}

export const categories = ['cortes', 'peinados', 'uñas', 'limpieza facial']

export const favoriteEntities: Entity[] = [
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
  }
]

export const workExperience = [
  {
    id: 'abc',
    workName: 'Master Barber',
    position: 'Barbero',
    startDate: '2024-03-04',
    endDate: '2024-12-10',
    place: 'Barranquilla',
    stillWorkHere: false,
    experience: "Trabajo haciendo cortes de pelo"
  },
  {
    id: 'def',
    workName: 'Acicalate Vip',
    position: 'Barbero',
    startDate: '2024-12-15',
    stillWorkHere: true,
    place: 'Bogotá'
  },
  {
    id: 'ghi',
    workName: 'Cali VIP',
    position: 'Barbero',
    startDate: '2022-05-03',
    endDate: '2024-02-28',
    stillWorkHere: false,
    place: 'Cali'
  }
]

export const skills = [
  {
    name: "Adaptación",
    percentage: 80
  },
  {
    name: "Coloración",
    percentage: 90
  },
  {
    name: "Pigmentación",
    percentage: 55
  }
]