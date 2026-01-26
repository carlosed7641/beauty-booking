'use client'

import { useEffect, useOptimistic, useState, useTransition } from 'react'
import { PiPlusCircleBold } from 'react-icons/pi'
import { SkillForm } from './SkillForm'
import { SkillItem } from './SkillItem'
import { INITIAL_SKILL } from '@/util/const'
import { deleteSkill } from '@/actions'

type OptimisticAction = { type: 'delete', id: string } | { type: 'update', skill: Skill }
 
export const Skills = ({ skills }: { skills: Skill[] }) => {

    const [isAdding, setIsAdding] = useState(false)
    const [error, setError] = useState('')
    const [touched, setTouched] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [currentSkill, setCurrentSkill] = useState(INITIAL_SKILL)
    const [isPending, startTransition] = useTransition()
    const [optimisticSkills, setOptimisticSkills] = useOptimistic(
        skills,
        (state, action: OptimisticAction) => {
            switch (action.type) {
                case 'delete':
                    return state.filter(skill => skill.id !== action.id)

                case 'update':
                    return state.map(skill =>
                        skill.id === action.skill.id ? action.skill : skill
                    )
                default:
                    return state
            }
        }
    )

    const handleUpdateSkill = (skill: Skill) => {
        setIsAdding(false)
        setCurrentSkill(skill)
    }

    const handleDeleteSkill = (id: string) => {
        startTransition(async () => {
            setIsLoading(true)
            setOptimisticSkills({type: 'delete', id })
            await deleteSkill(id)
            setIsLoading(false)
        })
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
                    optimisticSkills.length > 0 ?
                        <ul className="flex flex-col gap-3">
                            {
                                optimisticSkills.map(skill => (
                                    <li key={skill.id} className="flex flex-col md:flex-row gap-3">
                                        {
                                            skill.id === currentSkill.id ?
                                                <SkillForm
                                                    currentSkill={currentSkill}
                                                    setCurrentSkill={setCurrentSkill}
                                                    setSkills={setOptimisticSkills}
                                                    touched={touched}
                                                    setTouched={setTouched}
                                                    error={error}
                                                    setError={setError}
                                                    startTransition={startTransition}
                                                    isPending={isPending}
                                                    setIsAdding={setIsAdding}
                                                />
                                                :
                                                <SkillItem
                                                    key={skill.id}
                                                    skill={skill}
                                                    isLoading={isLoading}
                                                    isPending={isPending}
                                                    onEdit={() => handleUpdateSkill(skill)}
                                                    onDelete={() => handleDeleteSkill(skill.id ?? '')}
                                                />
                                        }
                                    </li>
                                ))
                            }
                        </ul>
                        :
                        !isAdding && <p>No hay nada acá aún</p>
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
                            setSkills={setOptimisticSkills}
                            setIsAdding={setIsAdding}
                            startTransition={startTransition}
                            isPending={isPending}
                            showLabel
                        />
                    </li>
                }
            </div>
        </div>
    )
}
