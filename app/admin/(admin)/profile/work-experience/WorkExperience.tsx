'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { PiPlusCircleBold } from 'react-icons/pi'
import { useModal } from '@/store'
import { WorkExperienceItem, WorkExperienceModal } from '..'

export const WorkExperience = ({ workExperiences }: { workExperiences: WorkExperience[]}) => {

    const methods = useForm()
    const { setOpenModal } = useModal()

    return (
        <FormProvider {...methods}>
            <div className="bg-white w-full rounded-md p-7">
                <div className="flex justify-between md:justify-start md:gap-3 items-center mb-3 text-green-700">
                    <span className="text-xl md:text-2xl">Experiencia laboral</span>
                    <PiPlusCircleBold onClick={() => setOpenModal(WorkExperience.name + 'Add')} className="text-2xl cursor-pointer" />
                </div>
                <div className="flex flex-col gap-3 mt-2">
                    {
                        workExperiences.length > 0 ?
                            <ul className="flex flex-col gap-3">
                                {workExperiences.map(item =>
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
