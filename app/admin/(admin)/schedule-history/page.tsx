import { ScheduleHistory } from './ScheduleHistory'
import { professionals } from '@/util/fake-data'

export default function ScheduleHistoryPage() {

    const events: EventDate[] = [ // 17/10 - 15/10 - 30/9
        {
            id: 'f445465',
            title: 'Corte hombre',
            start: new Date(2025, 9, 17, 10, 45, 0),
            end: new Date(2025, 9, 17, 11, 30, 0),
            customer: {
                id: "125",
                name: "David Ortiz",
                phone: '3004394704'
            },
            selectedService: {
                serviceId: "001",
                name: "Corte hombre",
                duration: "45m",
                price: 35_000
            },
            selectedProfessional: {
                id: 'bcf',
                name: "Carlos Castro"
            },
            isAdminBooking: true,
            customerReview: 3,
            allDay: false
        },
        {
            id: 'f445466',
            title: 'Corte hombre',
            start: new Date(2025, 9, 17, 13, 45, 0),
            end: new Date(2025, 9, 17, 14, 30, 0),
            customer: {
                id: "126",
                name: "Juan Ortiz",
                phone: '3004494704'
            },
            selectedService: {
                serviceId: "001",
                name: "Corte hombre",
                duration: "45m",
                price: 35_000
            },
            selectedProfessional: {
                id: 'bcf',
                name: "Carlos Castro"
            },
            isAdminBooking: false,
            customerReview: null,
            allDay: false
        },
        {
            id: 'f445466',
            title: 'Corte niño',
            start: new Date(2025, 9, 15, 17, 45, 0),
            end: new Date(2025, 9, 15, 18, 30, 0),
            customer: {
                id: "125",
                name: "David Ortiz",
                phone: '3004394704'
            },
            selectedService: {
                serviceId: "016",
                name: "Corte niño",
                duration: "35m",
                price: 30_000
            },
            selectedProfessional: {
                id: 'abc',
                name: "Gregorio Carrena"
            },
            isAdminBooking: false,
            customerReview: 2,
            allDay: false
        },
        {
            id: 'f445467',
            title: 'Rayitos platinados',
            start: new Date(2025, 8, 30, 17, 45, 0),
            end: new Date(2025, 8, 30, 18, 30, 0),
            customer: {
                id: "125",
                name: "Gerard Piqué",
                phone: '3004398380'
            },
            selectedService: {
                serviceId: "006",
                name: "Rayitos platinados",
                duration: "45m",
                price: 20_000
            },
            selectedProfessional: {
                id: 'bcf',
                name: "Carlos Castro"
            },
            isAdminBooking: false,
            customerReview: 2,
            allDay: false
        }
    ] // TODO: Get from Api

    const foundationYear = 2020  // TODO: Api
    const professionalsEmployees = [...professionals] // TODO: Api

    return (
        <ScheduleHistory 
            professionals={professionalsEmployees}
            events={events}
            foundationYear={foundationYear}
        />
    )
}