import { Modal, ModalHeader } from '@/components'
import { MonthList } from './MonthList'
import { useSchedule } from '../../store'

interface Props {
    onChangeDate: (value: number, type: "month" | "year") => void
}

export const ScheduleMonths = ({ onChangeDate }: Props) => {

    const { date } = useSchedule(state => state.schedule)
    
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
