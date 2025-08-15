import { AdditionalFunctions } from './additional-functions/AdditionalFunctions'
import { Sections } from './sections/Sections'

export default function SettingsPage() {

    // TODO: Get from DB
    const values = {
        cancelDateTime: 20,
        customerInterval: 'recommended',
        showAdminAgenda: true,
        advanceBookingControl: 30
    }

    return (
        <>
            <h1 className="text-lg text-green-700 mb-3 font-bold">Configuración</h1>
            <div className="flex flex-col gap-6">
                <div className="bg-white w-full rounded-md p-7">
                    <div className="grid md:grid-cols-[1fr_2fr] gap-5">
                        <Sections />
                        <AdditionalFunctions values={values} />
                    </div>
                </div>
            </div>
        </>
    )
}