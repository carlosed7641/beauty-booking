import { useProfileSteps } from '../../store'
import { SHOP_TYPES } from '@/util/const'

export const StepTwo = () => {

    const data = useProfileSteps(state => state.data)
    const setData = useProfileSteps(state => state.setData)
    const showErrors = useProfileSteps(state => state.showErrors)

    const handleSetType = (type: string) => {
        const { shopType } = data
        const alreadySelected = shopType.includes(type)

        const updatedTypes = alreadySelected
            ? shopType.filter(t => t !== type)
            : [...shopType, type]

        setData({ ...data, shopType: updatedTypes })
    }

    return (
        <>
            <div className="flex flex-col gap-3 md:grid md:gap-8 grid-cols-[1fr_2fr]">
                <div className="flex flex-col gap-3">
                    <label className="flex flex-col gap-2">
                        <span className="text-green-700">Nombre del negocio *</span>
                        <input onChange={(e) => setData({ ...data, name: e.target.value })} value={data.name} className="border rounded-md focus:outline-0 focus:border-green-700 border-zinc-300 px-2 py-1 " type="text" placeholder="¿Cómo se llama tu negocio?" autoComplete="given-name" />
                        {showErrors && !data.name && <span className="text-red-500">El nombre del negocio es obligatorio</span>}
                    </label>
                    {/* <label className="flex flex-col gap-2">
                        <span className="text-green-700">Acerca del negocio</span>
                        <textarea onChange={(e) => setData({ ...data, description: e.target.value })} value={data.description} className="border rounded-md focus:outline-0 focus:border-green-700 border-zinc-300 px-2 py-1 " placeholder="Detalles sobre tu negocio" />
                    </label> */}
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-green-700">Tipo de negocio (selecciona uno o más) *</span>
                    <ul className="flex gap-5 flex-wrap">
                        {
                            SHOP_TYPES.map((type, idx) => (
                                <li className="w-full md:w-auto" key={idx}>
                                    <label className="flex gap-2 md:gap-1 items-center text-sm cursor-pointer">
                                        <input checked={data.shopType.includes(type)} onChange={() => handleSetType(type)} type="checkbox" className=" cursor-pointer h-4 w-4 md:h-3.5 md:w-3.5 accent-green-700" />
                                        {type}
                                    </label>
                                </li>
                            ))
                        }
                    </ul>
                    {showErrors && !data.shopType.length && <span className="text-red-500">Debes seleccionar al menos un tipo</span>}
                </div>
            </div>
        </>
    )
}
