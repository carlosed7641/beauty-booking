'use client'

import { AiOutlineMenu } from 'react-icons/ai'
import { useMenu } from '@/store'

export const HamburgerMenu = () => {
    const { setIsOpenMenu } = useMenu()
    const handleOpenMenu = () => setIsOpenMenu(true)
    return <AiOutlineMenu size={25} className="md:hidden" onClick={handleOpenMenu} />
}
