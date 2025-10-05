import { Schedule } from './Schedule'
import { professionals as fakeProfessionals } from '@/util/fake-data'

const events: EventDate[] = [
    {
        id: 'f445465',
        title: 'Cepillado',
        start: new Date(2025, 9, 5, 17, 45, 0),
        end: new Date(2025, 9, 5, 18, 30, 0),
        customer: {
            id: "125",
            name: "David Ortiz",
            phone: '3004394704'
        },
        selectedService: {
            serviceId: "006",
            name: "Cepillado",
            duration: "45m",
            price: 30_000
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

const foundationYear = 2020 // TODO: Get from Api

   // TODO: Api call
const professionals = fakeProfessionals.filter(sl => sl.entityId === '422')

export default function SchedulePage() {

    return (
        <>
            <h1 className="text-lg text-green-700 mb-3 font-bold">Agenda</h1>
            <div className="flex flex-col gap-6">
                <div className="bg-white w-full rounded-md p-7 relative">
                    <Schedule
                        events={events}
                        foundationYear={foundationYear}
                        professionals={professionals}
                    />
                </div>
            </div>
        </>
    )
}