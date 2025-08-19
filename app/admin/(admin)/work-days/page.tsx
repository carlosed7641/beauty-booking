import { WorkDaysWrapper } from './WorkDaysWrapper'
import { INITIAL_WORK_DAYS } from '@/util/const'

export default function WorkDaysPage() {
    //TODO: WorkDays from BD
    return (
        <>
            <h1 className="text-lg text-green-700 mb-3 font-bold">Disponibilidad del negocio</h1>
            <div className="flex flex-col gap-6">
                <div className="bg-white w-full rounded-md p-7">
                    <WorkDaysWrapper workdays={INITIAL_WORK_DAYS} />
                </div>
            </div>
        </>
    )
}