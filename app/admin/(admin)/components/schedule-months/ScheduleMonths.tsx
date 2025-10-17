import { Modal, ModalHeader } from '@/components'
import { MonthList } from './MonthList'
import { useSchedule } from '../../store'

interface Props {
    date: Date
    onChangeDate: (value: number, type: "month" | "year") => void
}

export const ScheduleMonths = ({ date, onChangeDate }: Props) => {
    return (
        <Modal className="overflow-hidden!">
            <ModalHeader>
                <h1 className="text-green-700 font-bold">Selecciona un mes</h1>
            </ModalHeader>
            <MonthList
                date={date}
                onChangeDate={onChangeDate}
            />
        </Modal>
    )
}
