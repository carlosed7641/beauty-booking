'use client'

import { useState } from 'react'
import { Dialog } from '@/components/dialog/Dialog'
import { RxCaretDown } from 'react-icons/rx'

export const UserMenu = () => {

    const [isOpenDialog, setIsOpenDialog] = useState(false)

    const shortName = (name: string) => {
        return name.length > 8 ? name.slice(0, 8)+'...': name
    }

    return (
        <div
            onMouseEnter={() => setIsOpenDialog(true)}
            onMouseLeave={()=> setIsOpenDialog(false)}
            className="hidden gap-2 items-center cursor-pointer relative md:flex">
            <span className="rounded-full p-1.5 bg-white text-black">
                CC
            </span>
            <p className="flex items-end">
                {shortName('Carlos Castro')}
                <RxCaretDown />
            </p>
            {
                isOpenDialog && <Dialog />
            }
        </div>
    )
}
