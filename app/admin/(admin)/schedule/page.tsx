import { Schedule } from './Schedule'
import { professionals as fakeProfessionals } from '@/util/fake-data'

const foundationYear = 2020 // TODO: Get from Api

// TODO: Api call
const professionals = fakeProfessionals.filter(sl => sl.entityId === '422')

export default function SchedulePage() {
    return (
        <Schedule
            foundationYear={foundationYear}
            professionals={professionals}
        />
    )
}