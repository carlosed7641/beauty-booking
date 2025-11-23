import Image from 'next/image'
import clsx from 'clsx'
import { formatMinutes, formatNumber } from '@/helpers'

interface Props {
    isLoading: boolean
    dataSummary: ReportDataSummary
    selectedProfessionalId: string
}

interface SummaryProps {
    title: string
    value: string | number
    isLoading: boolean
    isLarge?: boolean
    lastLarge?: boolean
}

export const GeneralReportsPanel = ({ isLoading, dataSummary, selectedProfessionalId }: Props) => {

    const {
        abortedRate,
        adminScheduling,
        averageServiceTime,
        averageServiceValue,
        bestSellingProfessional,
        bestSellingService,
        bills,
        cancellationRate,
        completedServices,
        manualScheduling,
        totalCustomers,
        totalSales,
    } = dataSummary

    return (
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Summary
                title="Ventas generales"
                value={`$${formatNumber(totalSales)}`}
                isLoading={isLoading}
                isLarge
            />
            <Summary
                title="Tiempo promedio de los servicios"
                value={formatMinutes(averageServiceTime)}
                isLoading={isLoading}
            />
            <Summary
                title="Servicios completados"
                value={completedServices}
                isLoading={isLoading}
            />
            <Summary
                title="Valor promedio de servicios completados"
                value={`$${formatNumber(averageServiceValue)}`}
                isLoading={isLoading}
            />
            <Summary
                title="Gastos"
                value={`$${formatNumber(bills)}`}
                isLoading={isLoading}
            />
            {
                !selectedProfessionalId &&
                <li className="flex flex-col gap-1 items-center h-32 justify-center p-3 border border-zinc-200 rounded-md text-center col-span-2 transition-all">

                    {
                        isLoading ?
                            <div className="flex flex-col gap-2 items-center animate-pulse">
                                <div className="h-3 md:h-4 w-32 md:w-40 bg-gray-200 rounded-md"></div>
                                <div className="h-3 md:h-4 w-28 md:w-36 bg-gray-200 rounded-md"></div>
                            </div>
                            :
                            <>
                                Profesional con más ventas
                                <div className="grid grid-cols-2 items-center">
                                    {
                                        bestSellingProfessional.data.id &&
                                        <div className="flex items-center gap-3 pr-4 border-r border-zinc-200">
                                            {bestSellingProfessional.data.photo ?
                                                <Image
                                                    src="https://picsum.photos/64/64"
                                                    width={64}
                                                    height={64}
                                                    alt="Image"
                                                    className="rounded-full h-16 w-16 object-cover"
                                                /> :
                                                <div className="bg-green-700 h-16 w-16 flex items-center justify-center text-white rounded-full text-2xl">
                                                    {bestSellingProfessional.data.name[0]}
                                                </div>
                                            }
                                            <span className="text-green-700 font-bold">
                                                {bestSellingProfessional.data.name}
                                            </span>
                                        </div>
                                    }
                                    <span className="text-green-700 font-bold">
                                        ${formatNumber(bestSellingProfessional.count ?? '')}
                                    </span>
                                </div>
                            </>
                    }

                </li>
            }
            <Summary
                title="Servicio más vendido"
                value={bestSellingService.name}
                isLoading={isLoading}
                isLarge
            />
            <Summary
                title="Agendamientos manuales"
                value={manualScheduling}
                isLoading={isLoading}
            />
            <Summary
                title="Agendamientos Beauty Booking"
                value={adminScheduling}
                isLoading={isLoading}
            />
            <Summary
                title="Tasa de cancelación de citas"
                value={`${cancellationRate}%`}
                isLoading={isLoading}
            />
            <Summary
                title="Tasa de abandono de citas"
                value={`${abortedRate}%`}
                isLoading={isLoading}
            />
            <Summary
                title="Total clientes atendido"
                value={totalCustomers}
                isLoading={isLoading}
                isLarge
                lastLarge={Boolean(selectedProfessionalId)}
            />
        </ul>
    )
}

const Summary = ({
    title,
    value,
    isLoading,
    isLarge,
    lastLarge
}: SummaryProps) => {
    return (
        <li className={
            clsx(
                "flex flex-col gap-1 items-center h-32 justify-center p-3 border border-zinc-200 rounded-md text-center transition-all",
                {
                    "col-span-2": isLarge,
                    "md:col-span-4": lastLarge
                }
            )
        }>
            {
                isLoading ?
                    <div className="flex flex-col gap-2 items-center animate-pulse">
                        <div className="h-3 md:h-4 w-32 md:w-40 bg-gray-200 rounded-md"></div>
                        <div className="h-3 md:h-4 w-28 md:w-36 bg-gray-200 rounded-md"></div>
                    </div>
                    :
                    <>
                        <p>{title}</p>
                        <span className="text-green-700 font-bold">{value}</span>
                    </>
            }
        </li>
    )
}
