'use client'

import { TbPhotoPlus } from 'react-icons/tb'

interface Props {
    name: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const UploadImage = ({ name, handleChange }: Props) => {
    return (
        <label className="aspect-square cursor-pointer h-full w-full">
            <div className="flex h-full justify-center items-center bg-zinc-200 rounded-sm border border-zinc-600">
                <TbPhotoPlus className="text-zinc-400 text-6xl" />
            </div>
            <input onChange={handleChange} name={name} className="hidden" type="file" accept="image/png, image/jpeg, image/webp" />
        </label>
    )
}
