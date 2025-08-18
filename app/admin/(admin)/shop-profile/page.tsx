import { Steps } from './steps'

export default function ShopProfilePage() {
    return (
        <>
            <h1 className="text-lg text-green-700 mb-3 font-bold">Perfil del negocio</h1>
            <div className="flex flex-col gap-6">
                <div className="bg-white w-full rounded-md p-7">
                    <Steps />
                </div>
            </div>
        </>
    )
}