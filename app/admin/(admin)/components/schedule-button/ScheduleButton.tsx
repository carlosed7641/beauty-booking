import { FiCalendar } from 'react-icons/fi'
import { useModal } from '@/store'

export const ScheduleButton = () => {

    const { setOpenModal } = useModal()

    return (
        <button onClick={() => setOpenModal('ScheduleAssing')} className="bg-green-700 text-white fixed 2xl:absolute bottom-16 right-16 h-12 w-12  xl:right-[calc(50%-600px+75px)] rounded-full shadow-md text-xl flex items-center justify-center hover:bg-green-800 cursor-pointer">
            <FiCalendar />
        </button>
    )
}
