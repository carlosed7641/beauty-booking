import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function Loading() {
    return (
        <div className="absolute top-0 bottom-0 left-0 right-0 z-999 h-screen bg-white flex flex-col items-center gap-2 justify-center">
            <AiOutlineLoading3Quarters size={40} className="animate-spin text-green-700" />
            <p>Cargando...</p>
        </div>
    )
}