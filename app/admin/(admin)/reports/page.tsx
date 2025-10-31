import { Reports } from './Reports'
import { professionals } from '@/util/fake-data'

export default function ReportsPage() {

    const foundationDate = new Date(2024, 9, 15)
    const events: EventDate[] = [
        {
            id: 'f445465',
            title: 'Cepillado',
            start: new Date(2025, 9, 21, 17, 45, 0),
            end: new Date(2025, 9, 21, 18, 30, 0),
            customer: {
                id: "125",
                name: "David Ortiz",
                phone: '3004394704'
            },
            selectedService: {
                serviceId: "006",
                name: "Rayitos",
                duration: { hours: 0, minutes: 45 },
                price: 30_000
            },
            selectedProfessional: {
                id: 'bcf',
                name: "Carlos Castro",
                photo: 'https://picsum.photos/64/64'
            },
            isAdminBooking: true,
            customerReview: 2,
            allDay: false,
            status: 'completed'
        },
        {
            id: 'f445468',
            title: 'Corte hombre',
            start: new Date(2025, 9, 21, 17, 45, 0),
            end: new Date(2025, 9, 21, 18, 30, 0),
            customer: {
                id: "124",
                name: "David Ortiz",
                phone: '3004394704'
            },
            selectedService: {
                serviceId: "007",
                name: "Corte hombre",
                duration: { hours: 1, minutes: 30 },
                price: 40_000
            },
            selectedProfessional: {
                id: 'abc',
                name: "Gregorio Carrena",
                photo: 'https://picsum.photos/64/64'
            },
            isAdminBooking: true,
            customerReview: 1,
            allDay: false,
            status: 'aborted'
        },
        {
            id: 'f445467',
            title: 'Prueba',
            start: new Date(2025, 9, 21, 17, 45, 0),
            end: new Date(2025, 9, 21, 18, 30, 0),
            customer: {
                id: "125",
                name: "David Ortiz",
                phone: '3004394704'
            },
            selectedService: {
                serviceId: "016",
                name: "Prueba",
                duration: { hours: 0, minutes: 30 },
                price: 35_000
            },
            selectedProfessional: {
                id: 'bcf',
                name: "Carlos Castro",
                photo: 'https://picsum.photos/64/64'
            },
            isAdminBooking: true,
            customerReview: null,
            allDay: false,
            status: 'pending'
        },
        {
            id: 'f445475',
            title: 'Trenzas',
            start: new Date(2025, 9, 21, 17, 45, 0),
            end: new Date(2025, 9, 21, 18, 30, 0),
            customer: {
                id: "133",
                name: "David Ortiz",
                phone: '3004394704'
            },
            selectedService: {
                serviceId: "777",
                name: "Cepillado con trenzas",
                duration: { hours: 1, minutes: 0 },
                price: 20_000
            },
            selectedProfessional: {
                id: 'bcf',
                name: "Carlos Castro",
                photo: 'https://picsum.photos/64/64'
            },
            isAdminBooking: false,
            customerReview: 2,
            allDay: false,
            status: 'cancelled'
        },
        {
            id: 'f445465',
            title: 'Rayitos',
            start: new Date(2025, 9, 21, 17, 45, 0),
            end: new Date(2025, 9, 21, 18, 30, 0),
            customer: {
                id: "105",
                name: "David Ortiz",
                phone: '3004394704'
            },
            selectedService: {
                serviceId: "006",
                name: "Rayitos",
                duration: { hours: 0, minutes: 45 },
                price: 30_000
            },
            selectedProfessional: {
                id: 'abc',
                name: 'Gregorio Carrena',
                photo: 'https://picsum.photos/64/64'
            },
            isAdminBooking: false,
            customerReview: 3,
            allDay: false,
            status: 'completed'
        },
        {
            id: 'f445460',
            title: 'Aminoacidos',
            start: new Date(2025, 9, 21, 17, 45, 0),
            end: new Date(2025, 9, 21, 18, 30, 0),
            customer: {
                id: "678",
                name: "David Ortiz",
                phone: '3004394704'
            },
            selectedService: {
                serviceId: "789",
                name: "Aminoacidos",
                duration: { hours: 2, minutes: 45 },
                price: 70_000
            },
            selectedProfessional: {
                id: 'bcf',
                name: "Carlos Castro",
                photo: 'https://picsum.photos/64/64'
            },
            isAdminBooking: false,
            customerReview: 2,
            allDay: false,
            status: 'completed'
        }
    ] // TODO: Get from Api

    return (
        <Reports
            events={events}
            foundationDate={foundationDate}
            professionals={professionals}
        />
    )
}