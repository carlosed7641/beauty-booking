import { useState } from 'react'
import { LiaSave } from 'react-icons/lia'
import { FaToggleOff, FaToggleOn } from 'react-icons/fa'
import { useModal } from '@/store'
import { toMinutes } from '@/helpers'
import { PROFESSIONAL_SETTINGS_ERRORS } from '@/util/const'
import { upsertWorkDay } from '@/actions'
import { Modal, ModalHeader } from '@/components'

interface Props {
    selectedProfessional: ProfessionalSettings
    setSelectedProfessional: React.Dispatch<React.SetStateAction<ProfessionalSettings>>
    workDays: WorkDays[]
}

export const AssignWorkDays = ({
    selectedProfessional,
    setSelectedProfessional,
    workDays
}: Props) => {

    const [status, setStatus] = useState({isLoading: false, error: false, isTouched: false })
    const openModal = useModal(state => state.openModal)
    const setOpenModal = useModal(state => state.setOpenModal)

    const handleChangeTime = (
        e: React.ChangeEvent<HTMLInputElement>,
        dayIndex: number
    ) => {
        const { name, value } = e.target

        if (!value.length) return

        setStatus(prev => ({...prev, isTouched: true }))

        setSelectedProfessional(prev => {
            const workdays = prev.workdays.map((item, idx) => {

                const isTarget = idx === dayIndex
                const hasProfessionalId = item.professionalId != null

                const baseItem = hasProfessionalId
                    ? item
                    : { ...item, professionalId: prev.id }

                if (!isTarget) return baseItem

                let errorKey: keyof typeof PROFESSIONAL_SETTINGS_ERRORS | null = null
                const inputMinutes = toMinutes(value)
                const itemTime = baseItem[name === 'from' ? 'to' : 'from']
                const itemMinutes = toMinutes(itemTime)

                if (name === 'to' && inputMinutes <= itemMinutes) errorKey = 'to'
                if (name === 'from' && inputMinutes >= itemMinutes) errorKey = 'from'

                if (inputMinutes < toMinutes(workDays[dayIndex].from) ||
                    inputMinutes > toMinutes(workDays[dayIndex].to)) {
                    errorKey = 'outRange'
                }

                const { error, ...baseWithoutError } = baseItem

                return {
                    ...baseWithoutError,
                    [name]: value,
                    ...(errorKey && {
                        error: PROFESSIONAL_SETTINGS_ERRORS[errorKey]
                    })
                }

            })

            return { ...prev, workdays }
        })

    }

    const handleDisableDay = (dayIndex: number) => {
        setStatus(prev => ({...prev, isTouched: true }))
        setSelectedProfessional(prev => {
            const workdays = prev.workdays.map((workday, index) => {

                const hasProfessionalId = workday.professionalId != null

                const baseItem = hasProfessionalId
                    ? workday
                    : { ...workday, professionalId: prev.id }

                if (index !== dayIndex) return baseItem
                return { ...baseItem, disabled: !workday.disabled }
            })

            return { ...prev, workdays }
        })
    }

    const handleSave = async () => {

        setStatus(prev => ({ ...prev, error: false, isLoading: true })) 

        try {
            await upsertWorkDay(selectedProfessional.workdays)
             setStatus(prev => ({ ...prev, error: false, isLoading: false }))
            setOpenModal('AssignWorkDaySuccess')
        } catch {
            setStatus(prev => ({ ...prev, error: true, isLoading: false }))
        } 
    }

    return (
        <>
            <div className="grid md:grid-cols-3 gap-3">
                {
                    selectedProfessional?.workdays.map((workday, dayIndex) => {
                        if (workDays[dayIndex]?.disabled) return null
                        return (
                            <div key={dayIndex} className="flex flex-col">
                                <div className="bg-green-700 text-white py-1 px-2 text-center font-bold">{workday.name}</div>
                                <ul className="flex flex-col my-1">

                                    <li key={dayIndex} className="border-b border-zinc-200 last:border-0 px-2">
                                        <div className="flex gap-2 items-center">
                                            <input disabled={workday.disabled} onChange={e => handleChangeTime(e, dayIndex)} name="from" className="bg-zinc-200 p-1 my-1 rounded-md min-w-0 flex-1 disabled:opacity-55" type="time" value={workday.from ?? ''} />
                                            <input disabled={workday.disabled} onChange={e => handleChangeTime(e, dayIndex)} name="to" className="bg-zinc-200 p-1 my-1 rounded-md min-w-0 flex-1 disabled:opacity-55" type="time" value={workday.to ?? ''} />

                                            <button
                                                className="text-lg cursor-pointer"
                                                onClick={() => handleDisableDay(dayIndex)}>
                                                {
                                                    workday.disabled ?
                                                        <FaToggleOff className="shrink-0 text-green-700" title="Activar" />
                                                        :
                                                        <FaToggleOn className="shrink-0 text-green-700" title="Desactivar" />
                                                }
                                            </button>

                                        </div>
                                        {workday.error && <span className="text-red-500 block w-full">{workday.error}</span>}
                                    </li>
                                </ul>
                            </div>
                        )
                    })
                }
            </div>
            { status.error && <span className="block mt-5 text-red-500">Ocurrió un error inesperado, inténtelo de nuevo</span>}
            <button onClick={handleSave} 
            className="fixed md:relative bottom-8 md:bottom-auto right-8 md:right-auto bg-green-700 p-1 rounded-full justify-center items-center flex gap-1 text-white cursor-pointer hover:bg-green-800 w-12 h-12 md:w-fit md:h-auto text-sm disabled:opacity-60 disabled:pointer-events-none focus:outline-0 md:px-8 md:justify-self-end mt-2" 
            disabled={selectedProfessional?.workdays.some(({ from, to, error, professionalId }) => !from || !to || !professionalId || error) || status.isLoading || !status.isTouched}>
                <LiaSave className="text-2xl" />
                <span className="hidden md:flex text-lg leading-[initial]">{status.isLoading ? 'Procesando...' : 'Guardar'}</span>
            </button>
            {
               openModal === 'AssignWorkDaySuccess' && (
                    <Modal className="md:w-fit! overflow-hidden!">
                        <ModalHeader>
                        <h3 className="text-green-700 font-bold">Horario actualizado</h3>
                        </ModalHeader>
                        <p>¡Los horarios fueron actualizados correctamente!</p>
                    </Modal>
                )
            }
        </>
    )
}
