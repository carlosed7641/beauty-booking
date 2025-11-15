import Link from 'next/link'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { WorkDaysWrapper } from './WorkDaysWrapper'
import { INITIAL_WORK_DAYS } from '@/util/const'

export default function WorkDaysPage() {
    //TODO: WorkDays from BD
    return (
        <>
            <div className="flex items-center gap-2 mb-3">
                <Link href="/admin/settings" title="Volver">
                     <IoMdArrowRoundBack className="cursor-pointer text-xl text-green-700" />
                </Link>
                <h1 className="text-lg text-green-700 font-bold">Disponibilidad del negocio</h1>
            </div>
            <div className="flex flex-col gap-6">
                <div className="bg-white w-full rounded-md p-7">
                    <WorkDaysWrapper workdays={INITIAL_WORK_DAYS} />
                </div>
            </div>
        </>
    )
}