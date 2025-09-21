import { useService } from '@/store'
import { DateList } from '@/components'
import { getTotalMinutes } from '@/helpers'
import { availableDates } from '@/util/fake-data'

export const SelectDate = ({ dates = availableDates }: { dates?: DateItem[] }) => {

    const { serviceState, setServiceState } = useService()
    const frecuencyMintues = getTotalMinutes(serviceState.selectedService?.duration!)

    const onClickDate = (date: DateItem) => {
        setServiceState({
            ...serviceState,
            selectedDate: date.dateString
        })
    }

    return (
        <>
            <p className="text-xl">Selecciona la fecha</p>
            <div className="overflow-x-scroll md:overflow-auto scroll-none flex gap-2 md:grid md:[grid-template-columns:repeat(10,minmax(0,55px))] md:gap-3">
                <DateList
                    datesList={dates}
                    onClick={onClickDate}
                    frequencyMintues={frecuencyMintues}
                    selectedDate={serviceState.selectedDate}
                />
            </div>
        </>
    )
}