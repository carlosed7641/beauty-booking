import Link from 'next/link'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Steps } from './steps'
import { auth } from '@/auth.config'
import { getEntityById, getUserById } from '@/actions'

export default async function ShopProfilePage() {

    const session = await auth()
    const user = await getUserById(session?.user?.id ?? ' ')
    const shopData = await getEntityById(user?.entityId ?? '')

    const initialData = {
        name: shopData?.name ?? '',
        shopType: shopData?.shopType?.split(',').map(type => type) ?? [],
        images: {
            logo: shopData?.logo ? { url: shopData?.logo } : null,
            cover: shopData?.cover ? { url: shopData?.cover } : null
        },
        address: shopData?.address ?? '',
        addressReference: shopData?.addressReference ?? ''
    }
    
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
                    <Steps initialData={initialData} entityId={user?.entityId ?? ''} />
                </div>
            </div>
        </>
    )
}