import { useSteps } from '../../store'

const SHOP_TYPES = ['Barbería', 'Cejas & Pesteñas', 'Centro de Maquillaje', 'Cosmetología', 'Peluquería', 'Salón de Belleza', 'Spa Masajes', 'Tatuajes']

export const StepOne = () => {

  const { data, setData, showErrors } = useSteps()

  const handleSetType = (type: string) => {
    const { types } = data.stepOne
    const alreadySelected = types.includes(type)

    const updatedTypes = alreadySelected
      ? types.filter(t => t !== type)
      : [...types, type]

    setData({
      ...data,
      stepOne: {
        ...data.stepOne,
        types: updatedTypes
      }
    })
  }

  return (
    <div className="flex flex-col gap-3 md:grid md:gap-8" style={{ gridTemplateColumns: '1fr 2fr' }}>
      <div className="flex flex-col gap-3">
        <label className="flex flex-col gap-2">
          <span className="text-green-700">Nombre del negocio *</span>
          <input onChange={(e) => setData(
            {
              ...data,
              stepOne: {
                ...data.stepOne,
                name: e.target.value
              }
            }
          )} value={data.stepOne.name ?? ''} className="border rounded-md focus:outline-0 focus:border-green-700 border-zinc-300 px-2 py-1 " type="text" placeholder="¿Cómo se llama tu negocio?" autoComplete="given-name" />
          {showErrors && !data.stepOne.name && <span className="text-red-500">El nombre del negocio es obligatorio</span>}
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-green-700">Dirección de tu negocio *</span>
          <input onChange={(e) => setData(
            {
              ...data,
              stepOne: {
                ...data.stepOne,
                address: e.target.value
              }
            }
          )} value={data.stepOne.address ?? ''} className="border rounded-md focus:outline-0 focus:border-green-700 border-zinc-300 px-2 py-1 " type="text" placeholder="Buscar dirección" autoComplete="shipping street-address" />
          {showErrors && !data.stepOne.address && <span className="text-red-500">El dirección del negocio es obligatoria</span>}
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-green-700">Detalles adicionales de dirección (opcional)</span>
          <input onChange={(e) => setData(
            {
              ...data,
              stepOne: {
                ...data.stepOne,
                reference: e.target.value
              }
            }
          )} value={data.stepOne.reference ?? ''} className="border rounded-md focus:outline-0 focus:border-green-700 border-zinc-300 px-2 py-1 " type="text" placeholder="Ej: A una cuadra del parque" />
        </label>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-green-700">Tipo de negocio (selecciona uno o más) *</span>
        <ul className="flex gap-5 flex-wrap">
          {
            SHOP_TYPES.map((type, idx) => (
              <li className="w-full md:w-auto" key={idx}>
                <label className="flex gap-2 md:gap-1 items-center text-sm cursor-pointer">
                  <input checked={data.stepOne.types.includes(type)} onChange={() => handleSetType(type)} type="checkbox" className=" cursor-pointer h-4 w-4 md:h-3.5 md:w-3.5 accent-green-700" />
                  {type}
                </label>
              </li>
            ))
          }
        </ul>
        {showErrors && !data.stepOne.types.length && <span className="text-red-500">Debes seleccionar al menos un tipo</span>}
      </div>
    </div>
  )
}
