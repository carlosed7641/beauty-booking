'use client'

import { AiOutlineMenu } from 'react-icons/ai'
import { useMenu } from '@/store'
import clsx from 'clsx'

export const HamburgerMenu = () => {
    const { setIsOpenMenu, isOpenMenu } = useMenu()
    const handleOpenMenu = () => setIsOpenMenu(true)

    return (
        <div onClick={handleOpenMenu} className={
            clsx(
              "flex flex-col gap-1 items-center justify-center pt-4 pb-2 text-green-700 transition-all",
              {
                "bg-green-700 text-white": isOpenMenu
              }  
            )
        }>
            <AiOutlineMenu className="text-xl" />
            Más
        </div>
    )

}
