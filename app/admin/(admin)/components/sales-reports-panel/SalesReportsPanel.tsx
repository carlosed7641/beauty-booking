import { formatNumber } from '@/helpers'
import { CgSpinner } from 'react-icons/cg'

interface Props {
    isLoading: boolean
    totalSales: number
    completedServices: number
    groupSales: GroupSale[]
}

export const SalesReportsPanel = ({
    isLoading,
    totalSales,
    completedServices,
    groupSales,
}: Props) => {
    return (
        <div className="w-[300px] md:w-[450px] mx-auto flex flex-col items-center">
            {
                isLoading ?
                    <CgSpinner className="text-5xl text-green-700 animate-spin my-8" />
                    :
                    groupSales.length > 0 ?
                        <>
                            <div className="flex justify-center gap-8 pb-2 border-b border-zinc-300">
                                <span>Total: <b>{formatNumber(totalSales)}</b></span>
                                <span>Cantidad: <b>{completedServices}</b></span>
                            </div>
                            <table className="w-full">
                                <thead className="bg-green-700 text-white">
                                    <tr>
                                        <th className="py-1">Nombre</th>
                                        <th className="py-1">Cantidad</th>
                                        <th className="py-1">Ventas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        groupSales.map(s => (
                                            <tr key={s.id} className="border-b border-zinc-300">
                                                <td className="text-center py-1">{s.name}</td>
                                                <td className="text-center py-1">{s.quantity}</td>
                                                <td className="text-center py-1">${formatNumber(s.total)}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </>
                        :
                        <h3 className="my-5">No hay reporte para la fecha seleccionada</h3>
            }
        </div>
    )
}
