import Link from 'next/link'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { AdditionalFunctions } from './additional-functions/AdditionalFunctions'
import { Sections } from './sections/Sections'
import { getEntityById, getUserById } from '@/actions'
import { auth } from '@/auth.config'

export default  async function SettingsPage() {

    const session = await auth()
    const user = await getUserById(session?.user?.id ?? ' ')
    const shopData = await getEntityById(user?.entityId ?? '')

    const values = {
        cancelDateTime: shopData?.cancelDateTime ?? 20
    }

    return (
        <>
            <div className="flex items-center gap-2 mb-3">
                <Link href="/admin" title="Volver">
                     <IoMdArrowRoundBack className="cursor-pointer text-xl text-green-700" />
                </Link>
                <h1 className="text-lg text-green-700 font-bold">Configuración</h1>
            </div>
            <div className="flex flex-col gap-6">
                <div className="bg-white w-full rounded-md p-7">
                    <div className="grid md:grid-cols-[1fr_2fr] gap-5">
                        <Sections />
                        <AdditionalFunctions values={values} entityId={user?.entityId ?? ''} />
                    </div>
                </div>
            </div>
        </>
    )
}