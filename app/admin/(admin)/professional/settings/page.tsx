
import { ProfessionalSettings } from './ProfessionalSettings'
import { professionalsEmployees as professionals } from '@/util/fake-data'

export default function ProfessionalSettingsPage() {
    return (
        <>
            <h1 className="text-lg text-green-700 mb-3 font-bold">Configuración</h1>
            <div className="flex flex-col gap-6">
                <div className="bg-white w-full rounded-md p-7">
                    <ProfessionalSettings professionals={professionals} />
                </div>
            </div>
        </>
    )
}
