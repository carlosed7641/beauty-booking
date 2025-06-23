'use client'

import { useEffect } from 'react'
import { HiMiniScissors } from 'react-icons/hi2'

export default function Loading() {

    useEffect(() => {
        document.body.classList.add('overflow-hidden')
    }, [])
    return (
        <div className="absolute top-0 bottom-0 left-0 right-0 z-[999] h-screen bg-white flex items-center justify-center">
            <HiMiniScissors size={65} className="animate-spin text-green-700" />
        </div>
    )
}