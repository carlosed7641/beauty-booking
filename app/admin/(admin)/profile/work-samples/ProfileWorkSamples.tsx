'use client'

import { PiPlusCircleBold } from 'react-icons/pi'
import { useModal } from '@/store'
import { WorkSamples } from '@/components'
import { WorkSamplesModal } from '../../components'

interface Props {
    samples: WorkSample[]
    entityId: string
    authorId: string
}

export const ProfileWorkSamples = ({ samples, entityId, authorId }: Props) => {

    const openModal = useModal(state => state.openModal)
    const setOpenModal = useModal(state => state.setOpenModal)

    // To revalidate path
    const samplesKey = samples
        .map(s => `${s.id}-${s.updatedAt?.getTime() ?? new Date().getTime()}`)
        .join('|')

    return (
        <>
            <div className="bg-white w-full rounded-md p-7">
                <div className="flex justify-between md:justify-start md:gap-3 items-center mb-3 text-green-700">
                    <span className="text-xl md:text-2xl">Mi trabajo</span>
                    <PiPlusCircleBold onClick={() => setOpenModal('ProfileWorkSamples')} className="text-2xl cursor-pointer" />
                </div>
                <div className="flex flex-col gap-3">
                    {
                        samples.length > 0 ?
                            <WorkSamples key={samplesKey} workSamples={samples} hideFilters />
                            : <p>No hay nada acá aún</p>
                    }
                </div>
            </div>
            {openModal === 'ProfileWorkSamples' && (
                <WorkSamplesModal
                    workSamples={samples}
                    authorId={authorId}
                    entityId={entityId}
                />
            )}
        </>
    )
}
