'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useModal, useService } from '@/store'
import { SERVICE_INITIAL_STATE } from '@/util/const'

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {

    const pathname = usePathname()
    const openModal  = useModal(state => state.openModal)
    const setOpenModal = useModal(state => state.setOpenModal)
    const serviceState = useService(state => state.serviceState)
    const setServiceState = useService(state => state.setServiceState)

    useEffect(() => {
        setOpenModal(serviceState.selectedService && pathname.includes('entity') ? 'ServiceList': null)
    }, [pathname])

    useEffect(() => {
        document.body.classList.toggle('overflow-hidden', Boolean(openModal))
        if (!openModal) setServiceState(SERVICE_INITIAL_STATE)
    }, [openModal])

    return (
        <>
            {children}
        </>
    )
}
