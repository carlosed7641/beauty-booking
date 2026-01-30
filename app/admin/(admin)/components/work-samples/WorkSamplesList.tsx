'use client'

import { SetStateAction } from 'react'
import Image from 'next/image'
import { IoMdAdd } from 'react-icons/io'

interface Props {
    workSamples: WorkSample[]
    setFormData: (value: SetStateAction<WorkSample>) => void
    setShowForm: (value: boolean | string | null) => void
    hideButton?: boolean
}

export const WorkSamplesList = ({ workSamples, setFormData, setShowForm, hideButton }: Props) => {

    const handleClickSample = (sample: WorkSample) => {
        setFormData(sample)
        setShowForm(true)
    }

    return (
        <>
            <span className="text-zinc-600 text-center flex">
                Acá puedes crear y ver tus muestras de trabajo. Potenciales clientes podrán apreciarlos y descubrir tu talento
            </span>
            {
                workSamples.length > 0 ?
                    <ul className="flex flex-wrap gap-2 mt-2">
                        {
                            workSamples.map(sample => {
                                const mainImage = sample.images.find(image => image.main) || sample.images[0]
                                return (
                                 <li className="cursor-pointer w-[48%] md:w-[19%] shrink-0" onClick={() => handleClickSample(sample)} key={sample.id}>
                                        <Image className="rounded-t-sm h-42.5 w-full object-cover" src={mainImage.url} alt={sample.name} width={160} height={170} />
                                        <div className="bg-zinc-100 p-2 rounded-b-sm">
                                            <span className="inline-block w-full text-green-700 font-bold text-lg">{sample.name}</span>
                                            <span className="text-sm text-zinc-600">{sample.category}</span>
                                        </div>
                                    </li>       
                                )
                            })
                        }
                    </ul>
                    :
                    <div className="h-75 md:h-100 flex items-center justify-center">
                        <h3>No has creado ninguna muestra de trabajo</h3>
                    </div>
            }
            {
                !hideButton &&
                <button onClick={() => setShowForm(true)} title="Agregar" className="fixed bottom-5 justify-self-end rounded-full bg-green-700 text-white h-10 w-10 flex items-center justify-center text-2xl cursor-pointer shadow-sm">
                    <IoMdAdd />
                </button>}
        </>
    )
}
