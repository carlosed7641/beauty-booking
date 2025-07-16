import { useSteps } from '../../store'

const SHOP_TYPES = ['Barbería', 'Cejas & Pesteñas', 'Centro de Maquillaje', 'Cosmetología', 'Peluquería', 'Salón de Belleza', 'Spa Masajes', 'Tatuajes']

export const StepOne = () => {

  const { stepOneData, setStepOneData, showErrors } = useSteps()

  const handleSetType = (type: string) => {
    const { types } = stepOneData
    const alreadySelected = types.includes(type)

    const updatedTypes = alreadySelected
      ? types.filter(t => t !== type)
      : [...types, type]

    setStepOneData({
      ...stepOneData,
      types: updatedTypes
    })
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xl text-green-700 text-center ">Información de negocio</h2>
      <p className="text-center ">Esta es la información básica del negocio todos los campos son obligatorios</p>
      <div className="bg-white w-full rounded-md p-7 flex flex-col gap-3 md:grid md:gap-8" style={{ gridTemplateColumns: '1fr 2fr' }}>
        <div className="flex flex-col gap-3">
          <label className="flex flex-col gap-2">
            <span className="text-green-700">Nombre del negocio *</span>
            <input onChange={(e) => setStepOneData({
              ...stepOneData,
              name: e.target.value
            })} value={stepOneData.name ?? ''} className="border rounded-md focus:outline-0 focus:border-green-700 border-zinc-300 px-2 py-1 " type="text" placeholder="¿Cómo se llama tu negocio?" autoComplete="given-name" />
            {showErrors && !stepOneData.name && <span className="text-red-500">El nombre del negocio es obligatorio</span>}
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-green-700">Dirección de tu negocio *</span>
            <input onChange={(e) => setStepOneData({
              ...stepOneData,
              address: e.target.value
            })} value={stepOneData.address ?? ''} className="border rounded-md focus:outline-0 focus:border-green-700 border-zinc-300 px-2 py-1 " type="text" placeholder="Buscar dirección" autoComplete="shipping street-address" />
            {showErrors && !stepOneData.address && <span className="text-red-500">El dirección del negocio es obligatoria</span>}
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-green-700">Detalles adicionales de dirección (opcional)</span>
            <input onChange={(e) => setStepOneData({
              ...stepOneData,
              reference: e.target.value
            })} value={stepOneData.reference ?? ''} className="border rounded-md focus:outline-0 focus:border-green-700 border-zinc-300 px-2 py-1 " type="text" placeholder="Ej: A una cuadra del parque" />
          </label>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-green-700">Tipo de negocio (selecciona uno o más) *</span>
          <ul className="flex gap-5 flex-wrap">
            {
              SHOP_TYPES.map((type, idx) => (
                <li className="w-full md:w-auto" key={idx}>
                  <label className="flex gap-2 md:gap-1 items-center text-sm cursor-pointer">
                    <input checked={stepOneData.types.includes(type)} onChange={() => handleSetType(type)} type="checkbox" className=" cursor-pointer h-4 w-4 md:h-3.5 md:w-3.5 accent-green-700" />
                    {type}
                  </label>
                </li>
              ))
            }
          </ul>
          {showErrors && !stepOneData.types.length && <span className="text-red-500">Debes seleccionar al menos un tipo</span>}
        </div>
      </div>
    </div>
  )
}
