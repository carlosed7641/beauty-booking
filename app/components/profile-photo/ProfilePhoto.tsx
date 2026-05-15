'use client'

import { useEffect, useOptimistic, useRef, useState, useTransition } from 'react'
import Image from 'next/image'
import { IoIosCamera } from 'react-icons/io'
import { updateUser } from '@/actions'

interface Props {
    photo: string | null
    name: string
}

export const ProfilePhoto = ({ name, photo }: Props) => {

    const [showTooltip, setShowTooltip] = useState(false)
    const [isPending, startTransition] = useTransition()
    const [optimisticPhoto, setOptimisticPhoto] =
        useOptimistic(photo,
            (_, newPhoto: string | null) => newPhoto)
    const tooltipRef = useRef<HTMLLabelElement | null>(null)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        const tempPhotoUrl = URL.createObjectURL(files[0])

        startTransition(async () => {
            setOptimisticPhoto(tempPhotoUrl)
            await updateUser({ photo: Array.from(files) })
        })

        setShowTooltip(false)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
                setShowTooltip(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <>
            <div className="relative rounded-full hover:bg-black hover:opacity-65 cursor-pointer" onClick={() =>setShowTooltip(prev => !prev)}>
                {
                    optimisticPhoto ?
                        <Image
                            src={optimisticPhoto}
                            className="h-21.25 w-21.25 md:h-25 md:w-25 rounded-full"
                            height={85}
                            width={85}
                            alt={name}
                        />
                        :
                        <div className="rounded-full text-3xl md:text-5xl h-21.25 w-21.25 md:h-25 md:w-25 flex items-center justify-center bg-green-700 text-white select-none">
                            {name[0]}
                        </div>
                }
                <div className="absolute bottom-2 right-0 bg-gray-200 rounded-full h-8 w-8 flex items-center justify-center">
                    <IoIosCamera className="text-lg" />
                </div>
            </div>
            {
                showTooltip &&
                <label ref={tooltipRef} className="bg-white absolute -bottom-8.5 -left-5 rounded-md text-sm border hover:bg-zinc-100 border-zinc-200 px-2 py-0.5 cursor-pointer select-none">
                    {optimisticPhoto ? 'Cambiar foto de perfil' : 'Elegir foto de perfil'}
                    <input disabled={isPending} onChange={handleFileChange} className="hidden" type="file" accept="image/png, image/jpeg, image/webp" />
                </label>
            }
        </>
    )
}
