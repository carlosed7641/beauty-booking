'use client'

import { useState } from 'react'
import { FiEdit, FiTrash } from 'react-icons/fi'
import { PiPlusCircleBold } from 'react-icons/pi'
import { skills } from '@/util/fake-data'
import { SkillForm } from './SkillForm'

export const Skills = () => {

    const [isAdding, setIsAdding] = useState(false)
    const [error, setError] = useState('')
    const [touched, setTouched] = useState(false)
    const [currentSkill, setCurrentSkill] = useState({ id: '', name: '', percentage: 0 })

    const handleUpdateSkill = (skill: Skill) => {
        setIsAdding(false)
        setCurrentSkill(skill)
    }

    const handleToggleSkill = () => {
        if (!currentSkill.id) setIsAdding(prev => !prev)
        setCurrentSkill({ id: '', name: '', percentage: 0 })
        setTouched(false)
        setError('')
    }

    const handleDeleteSkill = (id: string) => {
        //TODO: Delete Skill
    }

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
                                skills.map(skillItem => (
                                    <li key={skillItem.id} className="flex flex-col md:flex-row gap-3">
                                        {
                                            skillItem.id === currentSkill.id ?
                                                <SkillForm
                                                    currentSkill={currentSkill}
                                                    setCurrentSkill={setCurrentSkill}
                                                    touched={touched}
                                                    setTouched={setTouched}
                                                    error={error}
                                                    setError={setError}
                                                    setIsAdding={setIsAdding}
                                                />
                                                :
                                                <>
                                                    <div className="flex flex-col gap-2 flex-1">
                                                        <div className="flex justify-between">
                                                            <span>{skillItem.name}</span>
                                                            <span>{skillItem.percentage}%</span>
                                                        </div>
                                                        <div className="w-full h-2 rounded-full bg-zinc-300">
                                                            <div style={{ width: `${skillItem.percentage}%` }} className="bg-green-700 h-full rounded-full transition-all"></div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2 items-center justify-end">
                                                        <FiEdit onClick={() => handleUpdateSkill(skillItem)} className="text-green-700 cursor-pointer" />
                                                        <FiTrash onClick={() => handleDeleteSkill(skillItem.id)} className="text-zinc-500 cursor-pointer" />
                                                    </div>
                                                </>
                                        }
                                    </li>
                                ))
                            }
                            {
                                isAdding &&
                                <li className="flex flex-col md:flex-row md:items-end gap-3">
                                    <SkillForm
                                        currentSkill={currentSkill}
                                        setCurrentSkill={setCurrentSkill}
                                        touched={touched}
                                        setTouched={setTouched}
                                        error={error}
                                        setError={setError}
                                        setIsAdding={setIsAdding}
                                        showLabel
                                    />
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
