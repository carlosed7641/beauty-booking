import { Modal, ModalHeader } from '@/components'
import { YearList } from './YearList'

interface Props {
    foundationYear: number
    date: Date
    onChangeDate: (value: number, type: "month" | "year") => void
}

export const ScheduleYears = ({ foundationYear, date, onChangeDate }: Props) => {
    return (
        <Modal className="overflow-hidden!">
            <ModalHeader>
                <h1 className="text-green-700 font-bold">Selecciona un año</h1>
            </ModalHeader>
            <YearList
                foundationYear={foundationYear}
                date={date}
                onChangeDate={onChangeDate}
            />
        </Modal >
    )
}
