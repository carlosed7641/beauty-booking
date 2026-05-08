'use client'

import { useModal } from '@/store'

interface Props {
  className?: string
  children: React.ReactNode | React.ReactNode[]
}

export const Modal = ({ className = '', children }: Props) => {

  const setOpenModal = useModal(state => state.setOpenModal)

  return (
    <>
      <div onClick={() => setOpenModal(null)} className="fixed z-999 bg-zinc-800 right-0 left-0 bottom-0 top-0 opacity-50 pointer-events-auto" />
      <div className={`${className} fadeIn fixed z-999 w-[95%] sm:w-3/4 lg:w-250 max-h-3/4 overflow-y-scroll rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 pt-0 shadow-lg`}>
        {children}
      </div>
    </>
  )
}