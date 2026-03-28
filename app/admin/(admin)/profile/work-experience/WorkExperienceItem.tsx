import { useFormContext } from 'react-hook-form'
import { PiSuitcaseSimpleDuotone } from 'react-icons/pi'
import { FiEdit, FiTrash } from 'react-icons/fi'
import { useModal } from '@/store'
import { formatInputDate, getAbbreviatedDate, getTotalTime } from '@/helpers'

interface Props {
    modalId: string
    item: WorkExperience
    setSelectedId: (id: string) => void
}

export const WorkExperienceItem = ({ modalId, item, setSelectedId }: Props) => {

    const setOpenModal = useModal(state => state.setOpenModal)
    const { reset } = useFormContext()

    const handleUpdate = (data: WorkExperience) => {
        reset({
            ...data,
            startDate:
                formatInputDate(data.startDate),
            endDate: data.endDate ? formatInputDate(data.endDate) : null
        })
        setOpenModal(modalId + 'Update')
    }

    return (
        <li className="flex gap-3 border-b border-zinc-300 pb-3">
            <div className="h-16 w-16 rounded-full border border-green-700 flex items-center justify-center">
                <PiSuitcaseSimpleDuotone className="text-green-700 text-4xl" />
            </div>
            <div className="flex justify-between flex-1">
                <div className="flex flex-col text-xs">
                    <span className="font-bold text-sm">{item.position}</span>
                    <span className="font-bold text-sm text-green-700">{item.company}</span>
                    <span className="text-zinc-500">{item.city}</span>
                    <div className="flex text-zinc-500">
                        <span>{getAbbreviatedDate(item.startDate)}</span>
                        <span className="mx-0.5">-</span>
                        <span>{item.endDate ? getAbbreviatedDate(item.endDate) : 'Actualidad'}</span>
                        <span className="mx-1">·</span>
                        <span>{getTotalTime(item.startDate, item.endDate ?? new Date())}</span>
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <FiEdit onClick={() => handleUpdate(item)} className="text-green-700 cursor-pointer" />
                    <FiTrash onClick={() => {
                        setOpenModal('DeleteWE')
                        setSelectedId(item.id)
                    }} className="text-zinc-500 cursor-pointer" />
                </div>
            </div>
        </li>
    )
}
