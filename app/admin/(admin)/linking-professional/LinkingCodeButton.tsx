'use client'

import { RiUserAddLine } from 'react-icons/ri'
import { useModal } from '@/store'
import { Modal, ModalHeader } from '@/components'
import { TbCopy, TbCopyCheck } from 'react-icons/tb'
import { useState } from 'react'

export const LinkingCodeButton = ({ linkingCode }: { linkingCode: string }) => {

  const openModal = useModal(state => state.openModal)
  const setOpenModal = useModal(state => state.setOpenModal)
  const [copied, setCopied] = useState(false)


  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(linkingCode)
      setCopied(true)

      setTimeout(() => setCopied(false), 2500)
    } catch (err) {
      console.error("Error al copiar", err)
    }
  }

  return (
    <>
      <button onClick={() => setOpenModal('LinkingCode')} className="absolute -bottom-12.5 right-1 btn-primary flex items-center gap-2 rounded-full text-sm">
        <RiUserAddLine className="text-base" />
        Vincular Profesional
      </button>
      {
        openModal === 'LinkingCode' && (
          <Modal className="md:w-135! overflow-hidden!">
            <ModalHeader>
              <div className="text-green-700 font-bold">Código para vincular</div>
            </ModalHeader>
            <div className="flex flex-col justify-center items-center-center text-center gap-3">
              Comparte este código para que se vinculen a tu negocio
              <div className="text-green-700 flex gap-2 justify-center items-center">
                <span className="font-bold text-2xl underline">{linkingCode}</span>
                <button onClick={handleCopy}>
                  {
                    copied ?
                      <TbCopyCheck className="text-xl cursor-pointer" />
                      :
                      <TbCopy title="Copiar código" className="text-xl cursor-pointer" />
                  }
                </button>
              </div>
            </div>
          </Modal>
        )
      }
    </>
  )
}
