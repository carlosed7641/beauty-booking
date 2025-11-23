import { useModal } from '@/store'
import { Modal, ModalHeader } from '@/components'
import { formatInputDate, isLessOrEqualThan } from '@/helpers'

interface Props {
    customRange: Date[]
    setCustomRange: React.Dispatch<React.SetStateAction<Date[]>>
    setDateRange: React.Dispatch<React.SetStateAction<Date[]>>
    limitDate: Date
}

export const DateRangeModal = ({
    customRange,
    setCustomRange,
    setDateRange,
    limitDate
}: Props) => {

    const { setOpenModal } = useModal()

    const handleCustomRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target

        const [year, month, day] = value.split("-").map(Number)
        const date = new Date(year, month - 1, day)

        if (isLessOrEqualThan(date, limitDate)) return

        const [start, end] = customRange

        const isInitial = name === 'initialDate'

        const isInvalid =
            (isInitial && date > end) ||
            (!isInitial && date < start)

        if (isInvalid) return

        setCustomRange(prev => isInitial ? [date, prev[1]] : [prev[0], date])
    }

    const handleSubmit = () => {
        setDateRange(customRange)
        setOpenModal(null)
    }

    return (
        <Modal className="overflow-hidden! md:w-[600px]!">
            <ModalHeader>
                <h1 className="text-green-700 text-lg">Selecciona un rango de fechas</h1>
            </ModalHeader>
            <div className="flex flex-col gap-3">
                <label className="flex flex-col gap-1">
                    <span className="text-green-700">Fecha inicial</span>
                    <input name="initialDate" type="date" value={formatInputDate(customRange[0])} onChange={handleCustomRangeChange} className="border border-green-700 px-2 rounded-md focus:outline-0" />
                </label>
                <label className="flex flex-col gap-1">
                    <span className="text-green-700">Fecha final</span>
                    <input name="finalDate" type="date" value={formatInputDate(customRange[1])} onChange={handleCustomRangeChange} className="border border-green-700 px-2 rounded-md focus:outline-0" />
                </label>
                <button className="btn-primary rounded-md" onClick={handleSubmit}>Confirmar</button>
            </div>
        </Modal>
    )
}
