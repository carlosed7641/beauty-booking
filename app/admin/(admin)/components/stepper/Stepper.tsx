import clsx from 'clsx'
import { useSteps } from '../../store'

export const Stepper = () => {
    const step = useSteps(state => state.step)

    return (
        <div className="pt-5 pb-0 px-2">
            {step === 0 && <h1 className="text-center text-2xl text-green-700 font-bold">Empecemos a configurar tu negocio</h1>}
            <div className="my-5 flex justify-center gap-8">
                {Array.from({ length: 5 }, (_, idx) => (
                    <div key={idx} className="relative before:absolute
                  before:content-[''] before:border-2 before:border-zinc-400 before:w-full before:-left-1/2 before:z-2 before:top-5 after:absolute after:content-[''] after:top-5 after:border-2 after:border-zinc-400 after:w-full after:left-1/2 after:z-2 first:before:content-none last:after:content-none">
                        <div className={
                            clsx(
                                "relative z-5 h-10 w-10 font-bold border-2 rounded-full flex items-center justify-center",
                                {
                                    "bg-green-700 text-white border-green-700": idx < step,
                                    "bg-blue-500 text-white border-blue-500": idx === step,
                                    "bg-white text-green-700 border-green-700  ": idx > step
                                }
                            )
                        }>
                            {idx + 1}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
