import { SetStateAction, TransitionStartFunction, useEffect, useState } from 'react'
import { FaRegCircleCheck, FaRegCircleXmark } from 'react-icons/fa6'
import { INITIAL_SKILL } from '@/util/const'
import { createSkill, updateSkill } from '@/actions'
import { CgSpinner } from 'react-icons/cg'

type OptimisticAction = { type: 'delete', id: string } | { type: 'update', skill: Skill }
interface Props {
    currentSkill: Skill
    setCurrentSkill: (value: SetStateAction<Skill>) => void
    touched: boolean
    setTouched: (value: SetStateAction<boolean>) => void
    error: string
    setError: (value: SetStateAction<string>) => void
    setIsAdding: (value: SetStateAction<boolean>) => void
    setSkills:(action: OptimisticAction) => void
    isPending: boolean
    startTransition: TransitionStartFunction
    showLabel?: boolean
}

export const SkillForm = ({
    currentSkill,
    setCurrentSkill,
    touched,
    setTouched,
    error,
    setError,
    setIsAdding,
    showLabel,
    setSkills,
    startTransition,
    isPending,
}: Props) => {

    const [isLoading, setIsLoading] = useState(false)

    const handleChangePercentage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value

        if (/^\d{0,3}$/.test(input)) {
            if (input === '') {
                setCurrentSkill(prev => ({ ...prev, percentage: 0 }))
                return
            }

            const number = parseInt(input, 10)

            if (number >= 0 && number <= 100) {
                setCurrentSkill(prev => ({ ...prev, percentage: number }))
            }
        }
    }

    const handleKeyDownPercentage = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault()
            setCurrentSkill(prev => {
                const current = typeof prev.percentage === 'number' ? prev.percentage : 0
                const percentage = current < 100 ? current + 1 : 100
                return {
                    ...prev,
                    percentage
                }
            })
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setCurrentSkill(prev => {
                const current = typeof prev.percentage === 'number' ? prev.percentage : 0
                const percentage = current > 0 ? current - 1 : 0
                return {
                    ...prev,
                    percentage
                }
            })
        }
    }

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentSkill(prev => ({
            ...prev,
            name: e.target.value
        }))
    }

    const handleAddSkill = async () => {
        if (error || !currentSkill.name) return setError('Este campo no debe estar vacío')
            
        setIsLoading(true)
        if (currentSkill.id) {
            //Update
            startTransition(async () => {
                setSkills({ type: 'update', skill: currentSkill })
                await updateSkill(currentSkill)
                setIsLoading(false)
            })
        } else {
            await createSkill({ name: currentSkill.name, percentage: currentSkill.percentage })
            setIsLoading(false)
        }

        setCurrentSkill(INITIAL_SKILL)
        setIsAdding(false)
        setTouched(false)
    }

    const handleCloseSkill = () => {
        if (!currentSkill.id) setIsAdding(prev => !prev)
        setCurrentSkill(INITIAL_SKILL)
        setTouched(false)
        setError('')
    }

    useEffect(() => {
        if (touched) {
            if (!currentSkill.name) setError('Este campo no debe estar vacío')
            else setError('')
        }
    }, [currentSkill.name])

    return (
        <>
            <div className="flex flex-col flex-1 mt-3 gap-3 w-full">
                <div className="flex flex-col md:flex-row gap-3">
                    <label className="flex-1 flex flex-col gap-2">
                        {showLabel && <>Ingresa la habilidad</>}
                        <input onKeyDown={() => !touched && setTouched(true)} value={currentSkill.name} onChange={handleChangeName} className="border border-green-700 p-1 rounded-md focus:outline-0" type="text" placeholder="Ej: Delineado" />
                        {error && <span className="text-red-500">{error}</span>}
                    </label>
                    <label className="md:w-26 flex flex-col gap-2">
                        {showLabel && <>Porcentaje (%)</>}
                        <input onKeyDown={handleKeyDownPercentage} onChange={handleChangePercentage} value={currentSkill.percentage} inputMode="numeric" className="border border-green-700 p-1 rounded-md focus:outline-0" type="text" />
                    </label>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-300">
                    <div style={{ width: `${currentSkill.percentage}%` }} className="bg-green-700 h-full rounded-full transition-all"></div>
                </div>
            </div>
            <div className="flex gap-2 items-end justify-end">
                {
                    isLoading ?
                        <CgSpinner className="text-green-700 animate-spin text-2xl" />
                        :
                        <>
                            <button disabled={isPending}>
                                <FaRegCircleCheck onClick={handleAddSkill} className="text-green-700 cursor-pointer" />
                            </button>
                            <button >
                                <FaRegCircleXmark onClick={handleCloseSkill} className="text-zinc-500 cursor-pointer" />
                            </button>
                        </>
                }
            </div>
        </>
    )
}
