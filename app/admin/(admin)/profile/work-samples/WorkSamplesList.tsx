'use client'

import { SetStateAction } from 'react'
import Image from 'next/image'
import { IoMdAdd } from 'react-icons/io'

interface Props {
    workSamples: WorkSample[]
    setFormData: (value: SetStateAction<SampleForm>) => void
    setShowForm: (value: SetStateAction<boolean>) => void
}

export const WorkSamplesList = ({ workSamples,setFormData, setShowForm }: Props) => {

    const handleClickSample = (sample: WorkSample) => {
        const { author, authorId, entityId, ...data } = sample
        setFormData(data)
        setShowForm(true)
    }

    return (
        <>
            <span className="text-zinc-600 text-sm text-center flex">
                Acá puedes crear y ver tus muestras de trabajo. Potenciales clientes podrán apreciarlos y descubrir tu talento
            </span>
            <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 mt-4 gap-3">
                {
                    workSamples.map(sample => {
                        const mainImage = sample.images.find(image => image.mainImage) || sample.images[0]
                        return (
                            <li className="cursor-pointer" onClick={() => handleClickSample(sample)} key={sample.id}>
                                <Image className="rounded-t-sm object-cover w-full" src={mainImage.url} alt={sample.name} width={160} height={170} />
                                <div className="bg-zinc-100 p-2 rounded-b-sm">
                                    <span className="inline-block w-full text-green-700 font-bold text-lg">{sample.name}</span>
                                    <span className="text-sm text-zinc-600">{sample.category}</span>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
            <button onClick={() => setShowForm(true)} title="Agregar" className="fixed bottom-5 justify-self-end rounded-full bg-green-700 text-white h-10 w-10 flex items-center justify-center text-2xl cursor-pointer shadow-sm">
                <IoMdAdd />
            </button>
        </>
    )
}
