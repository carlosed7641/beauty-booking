import clsx from 'clsx'
import Image from 'next/image'
import { useService } from '@/store'
import { profesionals } from '@/util/fake-data'

export const SelectProfessional = () => {

    const { serviceState, setServiceState } = useService()

    return (
        <>
            <p className="text-xl">Selecciona el profesional</p>
            <div className="flex md:flex-wrap gap-1 md:gap-3 overflow-x-scroll md:overflow-auto scroll-none">
                {
                    profesionals.map(p => (
                        <div onClick={() => setServiceState({
                            ...serviceState,
                            selectedProfessional: p.name
                        })} className="flex flex-col w-40 shrink-0 md:w-auto gap-2 items-center cursor-pointer" key={p.name}>
                            <Image
                                className={
                                    clsx(
                                        "rounded-full",
                                        {
                                            "border-4 border-green-700": serviceState.selectedProfessional === p.name
                                        }
                                    )
                                }
                                src={p.photo} alt={p.name} width={150} height={150} />
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
