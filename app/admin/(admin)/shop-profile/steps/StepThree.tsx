import { LuMapPin } from 'react-icons/lu'
import { useProfileSteps } from '../../store'

export const StepThree = () => {

    const { data, showErrors, setData } = useProfileSteps()

    return (
        <>
            <div className="flex flex-col gap-3">
                <button className="bg-green-700 p-1 rounded-full justify-center items-center flex gap-1 text-white cursor-pointer hover:bg-green-800 w-fit px-4 text-sm disabled:opacity-60 disabled:pointer-events-none focus:outline-0">
                    <LuMapPin />
                    Usar mi ubicación actual
                </button>
                <label className="flex flex-col gap-2">
                    <span className="text-green-700">Dirección de tu negocio *</span>
                    <input onChange={(e) => setData({ ...data, address: e.target.value })} value={data.address} className="border rounded-md focus:outline-0 focus:border-green-700 border-zinc-300 px-2 py-1 " type="text" placeholder="Ej: Av. Siempre viva #123" />
                    {showErrors && !data.address && <span className="text-red-500">La dirección del negocio es obligatoria</span>}
                </label>
                <p className="text-green-700">Confirma que la dirección esté correcta</p>
                <span className="text-sm text-zinc-500">
                    Mantén presionado el pin y arrástralo hasta la ubicación del negocio. También puedes tocar en el mapa para cambiar la ubicación del pin.
                </span>
                { /* TODO: Map here */}
                <div id="map" className="bg-zinc-300 h-[300px] rounded-md w-full"></div>
                <label className="flex flex-col gap-2">
                    <span className="text-green-700">Detalles adicionales de dirección</span>
                    <input onChange={(e) => setData({ ...data, addressDetail: e.target.value })} value={data.addressDetail} className="border rounded-md focus:outline-0 focus:border-green-700 border-zinc-300 px-2 py-1 " type="text" placeholder="Ej: A una calle del centro" />
                </label>
            </div>
        </>
    )
}
