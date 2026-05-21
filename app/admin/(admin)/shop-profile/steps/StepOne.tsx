'use client'

import Image from 'next/image'
import { IoMdCloseCircle } from 'react-icons/io'
import { useProfileSteps } from '../../store'
import { UploadImage } from '@/components'

type ImageKeys = 'logo' | 'cover'

const imageFields: { key: ImageKeys, label: string }[] = [
    { key: 'logo', label: 'Logo' },
    { key: 'cover', label: 'Foto de portada' }
]

export const StepOne = () => {

    const data = useProfileSteps(state => state.data)
    const setData = useProfileSteps(state => state.setData)

    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        const file = e.target.files[0]
        const url = URL.createObjectURL(file)
        const name = e.target.name
        setData({ ...data, images: { ...data.images, [name]: { url, file: e.target.files } } })
    }

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-[350px_350px] gap-2 md:gap-4 md:justify-center">
                {imageFields.map(({ key, label }) => (
                    <div key={key} className="aspect-square">
                        <span className="text md:text-lg text-green-700 font-bold block text-center mb-2">
                            {label}
                        </span>
                        {data.images[key] ?
                            <div className="relative">
                                <Image
                                    className="rounded-sm object-cover"
                                    src={data.images[key].url}
                                    alt={label}
                                    width={600}
                                    height={600}
                                />
                                <IoMdCloseCircle onClick={() => setData({ ...data, images: { ...data.images, [key]: null } })} className="absolute cursor-pointer bottom-1 right-1 text-2xl fill-zinc-300" />
                            </div>
                            : <UploadImage name={key} handleChange={handleChangeImage} />
                        }
                    </div>
                ))}
            </div>
        </>
    )
}
