'use client'

import { useEffect, useState } from 'react'
import { PiPlusCircleBold } from 'react-icons/pi'
import { SkillForm } from './SkillForm'
import { SkillItem } from './SkillItem'
import { INITIAL_SKILL } from '@/util/const'
import { skills } from '@/util/fake-data'

export const Skills = () => {

    const [isAdding, setIsAdding] = useState(false)
    const [error, setError] = useState('')
    const [touched, setTouched] = useState(false)
    const [currentSkill, setCurrentSkill] = useState(INITIAL_SKILL)

    const handleUpdateSkill = (skill: Skill) => {
        setIsAdding(false)
        setCurrentSkill(skill)
    }

    const handleDeleteSkill = (id: string) => {
        //TODO: Delete Skill
    }

    useEffect(() => {
        if (isAdding) {
            setCurrentSkill(INITIAL_SKILL)
            setTouched(false)
            setError('')
        }
    }, [isAdding])

    return (
        <div className="bg-white w-full rounded-md p-7">
            <div className="flex justify-between md:justify-start md:gap-3 items-center mb-3 text-green-700">
                <span className="text-xl md:text-2xl">Habilidades</span>
                <PiPlusCircleBold onClick={() => setIsAdding(prev => !prev)} className="text-2xl cursor-pointer" />
            </div>
            <div className="flex flex-col gap-3">
                {
                    skills.length > 0 ?
                        <ul className="flex flex-col gap-3">
                            {
                                skills.map(skill => (
                                    <li key={skill.id} className="flex flex-col md:flex-row gap-3">
                                        {
                                            skill.id === currentSkill.id ?
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
                                                <SkillItem
                                                    key={skill.id}
                                                    skill={skill}
                                                    onEdit={() => handleUpdateSkill(skill)}
                                                    onDelete={() => handleDeleteSkill(skill.id)}
                                                />
                                        }
                                    </li>
                                ))
                            }
                            {
                                isAdding && !currentSkill.id &&
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
