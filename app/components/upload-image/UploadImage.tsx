'use client'

import { TbPhotoPlus } from 'react-icons/tb'

interface Props {
    name: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    className?: string
    multiple?: boolean
}

export const UploadImage = ({ name, handleChange, className, multiple }: Props) => {
    return (
        <label className={`cursor-pointer h-full ${className}`}>
            <div className="flex h-full justify-center items-center bg-zinc-200 rounded-sm border border-zinc-600">
                <TbPhotoPlus className="text-zinc-400 text-6xl" />
            </div>
            <input onChange={handleChange} name={name} multiple={multiple} className="hidden" type="file" accept="image/png, image/jpeg, image/webp" />
        </label>
    )
}
