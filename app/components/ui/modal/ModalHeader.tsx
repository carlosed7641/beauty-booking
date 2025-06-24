import { IoCloseSharp } from 'react-icons/io5'

interface Props {
    setShowModal: (showModal: boolean) => void
    children: React.ReactNode | React.ReactNode[]
}

export const ModalHeader = ({ setShowModal, children }: Props) => {
    return (
        <div className="flex items-center w-full justify-between sticky top-0 z-10 mb-5     
        pt-6 pb-3 bg-white border-b border-zinc-300">
            {children}
            <IoCloseSharp
                onClick={() => setShowModal(false)}
                className="text-2xl cursor-pointer"
            />
        </div>
    )
}
