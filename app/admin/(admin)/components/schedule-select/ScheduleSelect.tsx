import { Modal, ModalHeader } from '@/components'
import { ScheduleList } from './ScheduleList'

interface Props {
    yearLimit?: number
    type: 'year' | 'month'
    date: Date
    onChangeDate: (value: number, type: "month" | "year") => void
}

export const ScheduleSelect = ({ date, yearLimit, type, onChangeDate }: Props) => {
    return (
        <Modal className="overflow-hidden!">
            <ModalHeader>
                <h1 className="text-green-700 font-bold">Selecciona un {type === 'month' ? 'mes' : 'año'}</h1>
            </ModalHeader>
            <ScheduleList
                yearLimit={yearLimit}
                type={type}
                date={date}
                onChangeDate={onChangeDate}
            />
        </Modal>
    )
}
