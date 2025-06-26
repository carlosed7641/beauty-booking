import { useModal } from '@/store'
import { IoCloseSharp } from 'react-icons/io5'

interface Props {
    children: React.ReactNode | React.ReactNode[]
}

export const ModalHeader = ({ children }: Props) => {

    const { setOpenModal } = useModal()

    return (
        <div className="flex items-center w-full justify-between sticky top-0 z-10 mb-5     
        pt-6 pb-3 bg-white border-b border-zinc-300">
            {children}
            <IoCloseSharp
                onClick={() => setOpenModal(null)}
                className="text-2xl cursor-pointer"
            />
        </div>
    )
}
