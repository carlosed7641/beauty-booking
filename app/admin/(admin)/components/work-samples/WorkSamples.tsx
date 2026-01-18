'use client'

import { PiPlusCircleBold } from 'react-icons/pi'
import { useModal } from '@/store'
import { WorkSamples as WorkSamplesWrapper } from '@/components'
import { WorkSamplesModal } from './WorkSamplesModal'
import { workSamples as allWorkSamples } from '@/util/fake-data'

const userId = 'abc'

export const WorkSamples = () => {

    const workSamples = allWorkSamples.filter(ws => ws.authorId === userId)
    const { openModal, setOpenModal } = useModal()

    return (
        <>
            <div className="bg-white w-full rounded-md p-7">
                <div className="flex justify-between md:justify-start md:gap-3 items-center mb-3 text-green-700">
                    <span className="text-xl md:text-2xl">Mi trabajo</span>
                    <PiPlusCircleBold onClick={() => setOpenModal(WorkSamples.name)} className="text-2xl cursor-pointer" />
                </div>
                <div className="flex flex-col gap-3">
                    {
                        workSamples.length > 0 ?
                            <WorkSamplesWrapper workSamples={workSamples} hideFilters hideName />
                            : <p>No hay nada acá aún</p>
                    }
                </div>
            </div>
            {openModal === WorkSamples.name && <WorkSamplesModal workSamples={workSamples} />}
        </>
    )
}
