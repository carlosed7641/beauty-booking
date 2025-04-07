interface Props {
  setShowModal: (showModal: boolean) => void
  children: React.ReactNode | React.ReactNode[]
}

export const Modal = ({ setShowModal, children }: Props) => {

  return (
    <>
      <div onClick={() => setShowModal(false)} className="fixed z-[999] bg-zinc-800 right-0 left-0 bottom-0 top-0 opacity-50 pointer-events-auto" />
      <div className="fadeIn absolute z-[999] w-[95%] md:w-2/3 max-h-3/4 overflow-y-scroll rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 pt-0 shadow-lg">
        {children}
      </div>
    </>
  )
}