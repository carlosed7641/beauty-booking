import clsx from 'clsx'
import Image from 'next/image'
import { useService } from '@/store'

export const SelectProfessional = ({ professionals }: { professionals: ProfessionalSchedule[] }) => {

    const serviceState = useService(state => state.serviceState)
    const setServiceState = useService(state => state.setServiceState)

    return (
        <>
            <p className="text-xl">Selecciona el profesional</p>
            <div className="flex md:flex-wrap gap-1 md:gap-3 overflow-x-scroll md:overflow-auto scroll-none">
                {
                    professionals.map(p => (
                        <div onClick={() => setServiceState({
                            ...serviceState,
                            selectedProfessional: {
                                id: p.id,
                                name: p.name
                            }
                        })} className="flex flex-col w-40 shrink-0 md:w-auto gap-2 items-center cursor-pointer" key={p.name}>
                            {
                                p.photo ?
                                    <Image
                                        className={
                                            clsx(
                                                "rounded-full aspect-square",
                                                {
                                                    "border-4 border-green-700": serviceState.selectedProfessional?.id === p.id
                                                }
                                            )
                                        }
                                        src={p.photo} alt={p.name} width={150} height={150} />
                                    :
                                    <div className={
                                         clsx(
                                                  "bg-green-600 text-white text-7xl rounded-full aspect-square flex justify-center items-center h-37.5 w-37.5",
                                                {
                                                   "border-4 border-green-700": serviceState.selectedProfessional?.id === p.id
                                                }
                                            )
                                    }
                                  >
                                        {p.name[0]} 
                                    </div>
                            }
                            <div className="flex flex-col items-center">
                                <p className="font-bold">{p.name}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}