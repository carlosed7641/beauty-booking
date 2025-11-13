import { Modal, ModalHeader } from '@/components'

interface Props {
    serviceName: string
    hours: number
    minutes: number
    error?: string
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    handleSave: () => void
}

export const SelectHour = ({
    serviceName,
    hours,
    minutes,
    error,
    handleChange,
    handleSave
}: Props) => {
    return (
        <Modal className="md:w-[450px]! overflow-auto!">
            <ModalHeader>
                <p className="text-green-700 font-bold text-lg">{serviceName}</p>
            </ModalHeader>
            <div className="grid md:grid-cols-2 gap-3">
                <div className="flex flex-col gap-2">
                    <p className="text-green-700 font-bold">Horas</p>
                    <select onChange={handleChange} name="hours" value={hours} className="border border-green-700 focus:outline-0">
                        {Array.from({ length: 13 }).map((_, idx) => (
                            <option key={idx} value={idx}>{idx}</option>
                        ))}
                    </select>
                </div>
                <label className="flex flex-col gap-2">
                    <p className="text-green-700 font-bold">Minutos</p>
                    <select onChange={handleChange} name="minutes" value={minutes} className="border border-green-700 focus:outline-0">
                        {Array.from({ length: 12 }).map((_, idx) => (
                            <option key={idx * 5} value={idx * 5}>{idx * 5}</option>
                        ))}
                    </select>
                </label>
            </div>
            {error && <span className="text-red-500 mt-3 block">{error}</span>}
            <button onClick={handleSave} className="btn-primary py-0.5! mt-3 rounded-md w-full font-bold">
                Enviar
            </button>
        </Modal>
    )
}
