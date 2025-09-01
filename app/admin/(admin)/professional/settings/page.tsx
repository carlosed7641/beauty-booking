
import { ProfessionalSettings } from './ProfessionalSettings'
import { INITIAL_WORK_DAYS } from '@/util/const'
import { professionalsEmployees as professionals } from '@/util/fake-data'

//TODO: Get serviceList from entity
const serviceList = {
    'Cortes': [
        { id: 'Corte', name: 'Corte', duration: { hours: 0, minutes: 30 }, price: 20000 },
        { id: 'Corte hombre', name: 'Corte hombre', duration: { hours: 0, minutes: 30 }, price: 20000 },
        { id: 'Corte con barba', name: 'Corte con barba', duration: { hours: 0, minutes: 30 }, price: 20000 },
        { id: 'Corte niño', name: 'Corte niño', duration: { hours: 0, minutes: 30 }, price: 20000 }
    ],
    'Peinados': [
        { id: 'Peinados', name: 'Peinados', duration: { hours: 0, minutes: 30 }, price: 20000 },
        { id: 'Trenzas', name: 'Trenzas', duration: { hours: 0, minutes: 30 }, price: 20000 }
    ],
    'Color': [
        { id: 'Diseño color', name: 'Diseño color', duration: { hours: 0, minutes: 30 }, price: 20000 },
        { id: 'Mechas', name: 'Mechas', duration: { hours: 0, minutes: 30 }, price: 20000 },
        { id: 'Efecto raíz', name: 'Efecto raíz', duration: { hours: 0, minutes: 30 }, price: 20000 }
    ],
    'Uñas': [
        { id: 'Manos', name: 'Manos', duration: { hours: 0, minutes: 30 }, price: 20000 },
        { id: 'Pies', name: 'Pies', duration: { hours: 0, minutes: 30 }, price: 20000 },
        { id: 'Manos y pies', name: 'Manos y pies', duration: { hours: 0, minutes: 30 }, price: 20000 }
    ]
}

// TODO: Get workDays from DB
const workDays = [...INITIAL_WORK_DAYS]

export default function ProfessionalSettingsPage() {
    return (
        <>
            <h1 className="text-lg text-green-700 mb-3 font-bold">Configuración</h1>
            <div className="flex flex-col gap-6">
                <div className="bg-white w-full rounded-md p-7">
                    <ProfessionalSettings professionals={professionals} serviceList={serviceList} workDays={workDays} />
                </div>
            </div>
        </>
    )
}
