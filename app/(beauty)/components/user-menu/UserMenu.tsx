'use client'

import { useState } from 'react'
import Link from 'next/link'
import { RxCaretDown } from 'react-icons/rx'
import { Dialog } from '@/components'
import { shortName, showInitials } from '@/helpers'
import { MENU_OPTIONS } from '@/util/const'

const options = MENU_OPTIONS.filter(opt => opt.href !== '/')

export const UserMenu = () => {

    const [isOpenDialog, setIsOpenDialog] = useState(false)

    return (
        <div
            onMouseEnter={() => setIsOpenDialog(true)}
            onMouseLeave={() => setIsOpenDialog(false)}
            className="hidden gap-2 items-center cursor-pointer relative md:flex">
            <span className="flex items-center justify-center rounded-full h-10 w-10 bg-white text-black">
                {showInitials("Carlos Castro")}
            </span>
            <p className="flex items-end">
                {shortName('Carlos Castro')}
                <RxCaretDown />
            </p>
            {
                isOpenDialog &&
                <Dialog>
                    <ul className="pb-3">
                        <li>
                            <Link onClick={() => setIsOpenDialog(false)} href="/profile" className="pt-4 pb-2 px-5 flex gap-2 hover:bg-zinc-100">
                                <span className="flex items-center justify-center rounded-full border border-zinc-200 w-10 h-10 bg-white text-black">
                                    {showInitials('Carlos Castro')}
                                </span>
                                <div className="flex flex-col">
                                    <span className="font-bold">Carlos Castro</span>
                                    <span className="text-sm flex items-center">
                                        Mi perfil
                                        <RxCaretDown className="rotate-[270deg]" />
                                    </span>
                                </div>
                            </Link>
                        </li>
                        <hr className="text-zinc-200" />
                        {
                            options.map(opt => (
                                <li key={opt.href}>
                                    <Link onClick={() => setIsOpenDialog(false)} className="flex py-1.5 px-5 text-zinc-600 hover:bg-zinc-100" href={opt.href}>
                                        {opt.label}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </Dialog>
            }
        </div>
    )
}