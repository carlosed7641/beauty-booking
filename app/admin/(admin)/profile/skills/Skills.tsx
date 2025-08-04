'use client'

import { useEffect, useState } from 'react'
import { FaRegCircleCheck, FaRegCircleXmark } from 'react-icons/fa6'
import { FiEdit, FiTrash } from 'react-icons/fi'
import { PiPlusCircleBold } from 'react-icons/pi'
import { skills } from '@/util/fake-data'

export const Skills = () => {

    const [isAdding, setIsAdding] = useState(false)
    const [error, setError] = useState('')
    const [touched, setTouched] = useState(false)
    const [value, setValue] = useState({ name: '', percentage: 0 })

    const handleChangePercentage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value

        if (/^\d{0,3}$/.test(input)) {
            if (input === '') {
                setValue(prev => ({ ...prev, percentage: 0 }))
                return
            }

            const number = parseInt(input, 10)

            if (number >= 0 && number <= 100) {
                setValue(prev => ({ ...prev, percentage: number }))
            }
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault()
            setValue(prev => {
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
            setValue(prev => {
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
        setValue(prev => ({
            ...prev,
            name: e.target.value
        }))
    }

    const handleAddSkill = () => {
        if (error || !value.name) return setError('Este campo no debe estar vacío')
        console.log(value)
        setValue({ name: '', percentage: 0 })
        setIsAdding(false)
        setTouched(false)
    }

    const handleToggleSkill = () => {
        setValue({ name: '', percentage: 0 })
        setIsAdding(prev => !prev)
        setTouched(false)
        setError('')
    }

    useEffect(() => {
        if (touched) {
            if (!value.name) setError('Este campo no debe estar vacío')
            else setError('')
        }
    }, [value.name])


    return (
        <div className="bg-white w-full rounded-md p-7">
            <div className="flex justify-between md:justify-start md:gap-3 items-center mb-3 text-green-700">
                <span className="text-xl md:text-2xl">Habilidades</span>
                <PiPlusCircleBold onClick={handleToggleSkill} className="text-2xl cursor-pointer" />
            </div>
            <div className="flex flex-col gap-3">
                {
                    skills.length > 0 ?
                        <ul className="flex flex-col gap-3">
                            {
                                skills.map(({ name, percentage }) => (
                                    <li key={name} className="flex gap-3">
                                        <div className="flex flex-col gap-2 flex-1">
                                            <div className="flex justify-between">
                                                <span>{name}</span>
                                                <span>{percentage}%</span>
                                            </div>
                                            <div className="w-full h-2 rounded-full bg-zinc-300">
                                                <div style={{ width: `${percentage}%` }} className="bg-green-700 h-full rounded-full transition-all"></div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <FiEdit className="text-green-700 cursor-pointer" />
                                            <FiTrash className="text-zinc-500 cursor-pointer" />
                                        </div>
                                    </li>
                                ))
                            }
                            {
                                isAdding &&
                                <li className="flex flex-col md:flex-row md:items-end gap-3">
                                    <div className="flex flex-col flex-1 mt-3 gap-3 w-full">
                                        <div className="flex flex-col md:flex-row gap-3">
                                            <label className="flex-1 flex flex-col gap-2">
                                                Ingresa la habilidad
                                                <input onKeyDown={() => !touched && setTouched(true)} value={value.name} onChange={handleChangeName} className="border border-green-700 p-1 rounded-md focus:outline-0" type="text" placeholder="Ej: Delineado" />
                                                {error && <span className="text-red-500">{error}</span>}
                                            </label>
                                            <label className="md:w-26 flex flex-col gap-2">
                                                Porcentaje (%)
                                                <input onKeyDown={handleKeyDown} onChange={handleChangePercentage} value={value.percentage} inputMode="numeric" className="border border-green-700 p-1 rounded-md focus:outline-0" type="text" />
                                            </label>
                                        </div>
                                        <div className="w-full h-2 rounded-full bg-zinc-300">
                                            <div style={{ width: `${value.percentage}%` }} className="bg-green-700 h-full rounded-full transition-all"></div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 items-center justify-end">
                                        <FaRegCircleCheck onClick={handleAddSkill} className="text-green-700 cursor-pointer" />
                                        <FaRegCircleXmark onClick={handleToggleSkill} className="text-zinc-500 cursor-pointer" />
                                    </div>
                                </li>
                            }
                        </ul>
                        :
                        <p>No hay nada acá aún</p>
                }
            </div>
        </div>
    )
}
