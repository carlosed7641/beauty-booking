import { generateDatesArray } from '@/helpers'

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
    name: 'Gregorio Carrena',
    photo: 'https://picsum.photos/150/150',
    entityId: 422,
    resume: 'Barbero con más de 10 años de experiencia',
    reviews: {
      points: 4.7,
      count: 224
    }
  },
  {
    name: 'Carlos Castro',
    photo: 'https://picsum.photos/150/150',
    entityId: 422,
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
