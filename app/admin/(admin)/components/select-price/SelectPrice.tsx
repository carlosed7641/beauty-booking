import { Modal, ModalHeader } from '@/components'
import { formatNumber } from '@/helpers'

interface Props {
    serviceName: string
    price: number
    error?: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSave: () => void
}

export const SelectPrice = ({
    serviceName,
    price,
    error,
    handleChange,
    handleSave
}: Props) => {
    return (
        <Modal className="md:w-[450px]! overflow-auto!">
            <ModalHeader>
                <p className="text-green-700 font-bold text-lg">{serviceName}</p>
            </ModalHeader>
            <label className="flex flex-col gap-1">
                <span className="text-green-700">Precio desde</span>
                <div className="flex gap-1 items-center">
                    <span className="text-green-700 font-bold">$</span>
                    <input onChange={handleChange} name="price" className="flex-1 px-2 rounded-md border border-green-700 focus:outline-0 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="text" value={formatNumber(price.toString())} />
                </div>
            </label>
            {error && <span className="text-red-500 mt-3 block">{error}</span>}
            <button onClick={handleSave} className="py-0.5 bg-green-700 mt-3 rounded-md text-white w-full font-bold cursor-pointer">
                Guardar
            </button>
        </Modal>
    )
}
