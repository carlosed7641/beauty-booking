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
      { serviceId: '001', name: "Rayitos platinados", description: "Los mejores rayitos", duration: { hours: 4, minutes: 0 }, price: 30000, gender: 'Masculino', archived: true },
      { serviceId: '002', name: "Tinte", description: "El mejor tinte", duration: { hours: 3, minutes: 30 }, gender: 'Masculino', price: 25000 }
    ]
  },
  {
    entityId: '422',
    entityName: 'Acicalate Vip',
    category: "Cortes",
    services: [
      { serviceId: '003', name: "Sencillo", description: "Corte básico", duration: { hours: 0, minutes: 30 }, gender: 'Masculino', price: 15000 },
      { serviceId: '004', name: "Corte y barba", description: "Corte y barba", duration: { hours: 0, minutes: 45 }, gender: 'Masculino', price: 20000 }
    ]
  },
  {
    entityId: '422',
    entityName: 'Acicalate Vip',
    category: "Peinados",
    services: [
      { serviceId: '005', name: "Trenzas", description: "Trenzas básicas", duration: { hours: 1, minutes: 0 }, gender: 'Unisex', price: 18000 },
      { serviceId: '006', name: "Cepillado", description: "Cepillado básico", duration: { hours: 0, minutes: 45 }, gender: 'Femenino', price: 12000 }
    ]
  },
  {
    entityId: '425',
    entityName: 'Prueba',
    category: "Cortes",
    services: [
      { serviceId: '007', name: "Especial", description: "Corte especial", duration: { hours: 0, minutes: 30 }, gender: 'Masculino', price: 16000 },
      { serviceId: '008', name: "Barba con pigmentación", description: "Barba con pigmentación", duration: { hours: 0, minutes: 45 }, gender: 'Masculino', price: 14000 }
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

export const workSamples: WorkSample[] = [
  {
    id: '123',
    category: 'Cortes',
    name: 'Fade',
    images:  [
      {
        id: '123',
        mainImage: true,
        url: 'https://picsum.photos/160/170'
      },
      {
        id: '124',
        mainImage: false,
        url: 'https://picsum.photos/160/170'
      },
      {
        id: '125',
        mainImage: false,
        url: 'https://picsum.photos/160/170'
      }
    ],
    author: 'Carlos Castro',
    authorId: 'abc',
    entityId: '422'
  },  
  {
    id: '124',
    category: 'Peinados',
    name: 'Alisado',
    images:  [
      {
        id: '222',
        mainImage: true,
        url: 'https://picsum.photos/160/170'
      }
    ],
    author: 'Gregorio Carrena',
    authorId: 'bcf',
    entityId: '422'
  },
  {
    id: '125',
    category: 'Peinados',
    name: 'Trenzas',
    images:  [
      {
        id: '333',
        mainImage: true,
        url: 'https://picsum.photos/160/170'
      },
      {
        id: '444',
        mainImage: false,
        url: 'https://picsum.photos/160/170'
      }
    ],
    author: 'Pedro Pascal',
    authorId: 'ggg',
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
      gender: 'Masculino',
      duration: { hours: 4, minutes: 0 },
      price: 30000,
    },
    selectedProfessional: {
      id: "abc",
      name: "Carlos Castro"
    },
    selectedDate: new Date(2025, 8, 14, 10, 0, 0),
    selectedHour: "2:00 PM",
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
      gender: 'Masculino',
      duration: { hours: 1, minutes: 0 },
      price: 30000
    },
    selectedProfessional: {
      id: "abc",
      name: "Carlos Castro"
    },
    selectedDate: new Date(2025, 8, 15, 10, 0, 0),
    selectedHour: "2:00 PM",
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
      gender: 'Masculino',
      duration: { hours: 4, minutes: 0 },
      price: 30000
    },
    selectedProfessional: {
      id: "abc",
      name: "Carlos Castro"
    },
    selectedDate: new Date(2025, 8, 14, 10, 0, 0),
    selectedHour: "2:00 PM",
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
      duration: { hours: 4, minutes: 0 },
      gender: 'Masculino',
      price: 30000
    },
    selectedProfessional:{
      id: "abc",
      name: "Carlos Castro"
    },
    selectedDate: new Date(2025, 8, 14, 10, 0, 0),
    selectedHour: "2:00 PM",
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
  id: '57',
  name: 'Carlos Castro Reales',
  country: 'Colombia',
  photo: 'https://picsum.photos/180/180',
  indicator: '+57',
  phone: '3004394704',
  birthDay: '2000-04-26',
  gender: 'Hombre',
  shareNumberPhone: true,
  role: 'admin'
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

export const skills: Skill[] = [
  {
    id: '123',
    name: "Adaptación",
    percentage: 80
  },
  {
    id: '124',
    name: "Coloración",
    percentage: 90
  },
  {
    id: '125',
    name: "Pigmentación",
    percentage: 55
  }
]

export const professionalsEmployees: ProfessionalSettings[] = [
    {
      id: 'abc',
      name: 'Carlos Castro',
      entityId: '123',

      // photo: 'https://picsum.photos/200/200',
      workdays: [
          [
              { from: '09:00', to: '13:00' },
              { from: '15:00', to: '16:00' }
          ],
          [
              { from: '09:00', to: '13:00' },
              { from: '15:00', to: '21:00' }
          ],
          [
              { from: '09:00', to: '13:00' },
              { from: '15:00', to: '21:00' }
          ],
          [
              { from: '09:00', to: '13:00' },
              { from: '15:00', to: '21:00' }
          ],
          [
              { from: '09:00', to: '13:00' },
              { from: '15:00', to: '20:30' },
              { from: '22:00', to: '23:00' }
          ],
          [
              { from: '09:00', to: '13:00' },
              { from: '15:00', to: '21:00' }
          ],
          [
              { from: '09:00', to: '16:00' }
          ]
      ],
      services: {
          'Cortes': [{ id: 'Corte', name: 'Corte', duration: { hours: 0, minutes: 30}, price: 20_000 },  { id: 'Corte hombre', name: 'Corte hombre', duration: { hours: 1, minutes: 0}, price: 30_000 }],
          'Peinados': [{ id: 'Trenzas', name: 'Trenzas', duration: { hours: 1, minutes: 30 }, price: 60_000 }]
      }
    },
    {
      id: 'def',
      name: 'Andrés Vega',
      entityId: '123',

      photo: 'https://picsum.photos/200/200',
      workdays: [
          [
              { from: '08:00', to: '12:00' },
              { from: '14:00', to: '20:00' }
          ],
          [
              { from: '08:00', to: '12:00' },
              { from: '14:00', to: '20:00' }
          ],
          [
              { from: '08:00', to: '12:00' },
              { from: '14:00', to: '20:00' }
          ],
          [
              { from: '08:00', to: '12:00' },
              { from: '14:00', to: '20:00' }
          ],
          [
              { from: '08:00', to: '12:00' },
              { from: '14:00', to: '20:00' },
              { from: '22:00', to: '23:00' }
          ],
          [
              { from: '08:00', to: '12:00' },
              { from: '14:00', to: '20:00' }
          ],
          [
              { from: '08:00', to: '15:00' }
          ]
      ],
      services: {
          'Cortes': [{ id: 'Corte con barba', name: 'Corte con barba', duration: { hours: 0, minutes: 45}, price: 30_000 }],
          'Uñas': [{ id: 'Manos', name: 'Manos', duration: { hours: 3, minutes: 15 }, price: 40_000 }]
      }
    }
]