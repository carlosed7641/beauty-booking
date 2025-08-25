
import { ProfessionalSettings } from './ProfessionalSettings'
import { professionalsEmployees as professionals } from '@/util/fake-data'

//TODO: Get serviceList from entity
const serviceList = {
    'Cortes': [
        { id: 'Corte', name: 'Corte' },
        { id: 'Corte hombre', name: 'Corte hombre' },
        { id: 'Corte con barba', name: 'Corte con barba' },
        { id: 'Corte niño', name: 'Corte niño' }
    ],
    'Peinados': [
        { id: 'Peinados', name: 'Peinados' },
        { id: 'Trenzas', name: 'Trenzas' }
    ],
    'Color': [
        { id: 'Diseño color', name: 'Diseño color' },
        { id: 'Mechas', name: 'Mechas' },
        { id: 'Efecto raíz', name: 'Efecto raíz' }
    ],
    'Uñas': [
        { id: 'Manos', name: 'Manos' },
        { id: 'Pies', name: 'Pies' },
        { id: 'Manos y pies', name: 'Manos y pies' }
    ]
}

export default function ProfessionalSettingsPage() {
    return (
        <>
            <h1 className="text-lg text-green-700 mb-3 font-bold">Configuración</h1>
            <div className="flex flex-col gap-6">
                <div className="bg-white w-full rounded-md p-7">
                    <ProfessionalSettings professionals={professionals} serviceList={serviceList} />
                </div>
            </div>
        </>
    )
}
