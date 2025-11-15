import Link from 'next/link'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Steps } from './steps'

export default function ShopProfilePage() {
    return (
        <>
            <div className="flex items-center gap-2 mb-3">
                <Link href="/admin/settings" title="Volver">
                     <IoMdArrowRoundBack className="cursor-pointer text-xl text-green-700" />
                </Link>
                <h1 className="text-lg text-green-700 font-bold">Perfil del negocio</h1>
            </div>
            <div className="flex flex-col gap-6">
                <div className="bg-white w-full rounded-md p-7">
                    <Steps />
                </div>
            </div>
        </>
    )
}