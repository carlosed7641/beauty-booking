'use client'

import { useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { PiPlusCircleBold } from 'react-icons/pi'
import { useModal } from '@/store'
import { WorkExperienceItem, WorkExperienceModal } from '..'
import { workExperience as experienceData } from '@/util/fake-data'

const getSortedExperience = (data: typeof experienceData) => {
    return [...data].sort((a, b) => {
        const dateA = new Date(a.endDate ?? new Date()).getTime()
        const dateB = new Date(b.endDate ?? new Date()).getTime()
        return dateB - dateA
    })
}

export const WorkExperience = () => {

    const methods = useForm()
    const { setOpenModal } = useModal()
    const sortedExperience = useMemo(() => getSortedExperience(experienceData), [])

    return (
        <FormProvider {...methods}>
            <div className="bg-white w-full rounded-md p-7">
                <div className="flex justify-between md:justify-start md:gap-3 items-center mb-3 text-green-700">
                    <span className="text-xl md:text-2xl">Experiencia laboral</span>
                    <PiPlusCircleBold onClick={() => setOpenModal(WorkExperience.name + 'Add')} className="text-2xl cursor-pointer" />
                </div>
                <div className="flex flex-col gap-3 mt-2">
                    {
                        sortedExperience.length > 0 ?
                            <ul className="flex flex-col gap-3">
                                {sortedExperience.map(item =>
                                    <WorkExperienceItem
                                        key={item.id}
                                        modalId={WorkExperience.name}
                                        item={item}
                                    />
                                )}
                            </ul>
                            :
                            <p>No hay nada acá aún</p>
                    }
                </div>
            </div>
            <WorkExperienceModal modalId={WorkExperience.name} />
        </FormProvider>
    )
}
