
import Link from 'next/link'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { ProfessionalSettings } from './ProfessionalSettings'
import { auth } from '@/auth.config'
import { getEntityById } from '@/actions'
import { minutesToTime, toMinutes } from '@/helpers'

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

export default async function ProfessionalSettingsPage() {

    const session = await auth()
    const entity = await getEntityById(session?.user?.entityId ?? '')

    const professionals = entity?.users.map(({ id, name, entityId, photo, workDays }) =>
        ({
            id, name: name ?? '', entityId, photo,
            workdays: workDays.length > 0
                ? workDays.map((w, idx) => ({
                    ...w,
                    from: minutesToTime(
                        Math.max(
                            toMinutes(w.from),
                            toMinutes(entity.workdays[idx].from)
                        )
                    ),
                    to: minutesToTime(
                        Math.min(
                            toMinutes(w.to),
                            toMinutes(entity.workdays[idx].to)
                        )
                    )
                }))
                : entity.workdays
        })) ?? []

    return (
        <>
            <div className="flex items-center gap-2 mb-3">
                <Link href="/admin/settings" title="Volver">
                    <IoMdArrowRoundBack className="cursor-pointer text-xl text-green-700" />
                </Link>
                <h1 className="text-lg text-green-700 font-bold">Configuración</h1>
            </div>
            <div className="flex flex-col gap-6">
                <div className="bg-white w-full rounded-md p-7">
                    <ProfessionalSettings professionals={professionals} serviceList={serviceList} workDays={entity?.workdays ?? []} />
                </div>
            </div>
        </>
    )
}
