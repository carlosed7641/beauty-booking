import Link from 'next/link'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { auth } from '@/auth.config'
import { getEntityEmployeeData, getUserById } from '@/actions'
import { Employees } from './Employees'
import { LinkingCodeButton } from './LinkingCodeButton'

export default async function LinkingProfessionalPage() {

    const session = await auth()
    const user = await getUserById(session?.user?.id ?? '')
    const entity = await getEntityEmployeeData(user?.entityId ?? '')

    return (
        <>
            <div className="flex items-center gap-2 mb-3">
                <Link href="/admin/settings" title="Volver">
                    <IoMdArrowRoundBack className="cursor-pointer text-xl text-green-700" />
                </Link>
                <h1 className="text-lg text-green-700 font-bold">Vincular profesional</h1>
            </div>
            <div className="flex flex-col gap-6">
                <div className="bg-white w-full rounded-md p-7 relative">
                    {
                        entity?.users && entity?.users.length > 0 ?
                            <Employees employees={entity.users} />
                            :
                            <p>Aún no tienes profesionales asociados</p>
                    }
                    <LinkingCodeButton linkingCode={entity?.linkingCode ?? ''} />
                </div>
            </div>
        </>
    )
}