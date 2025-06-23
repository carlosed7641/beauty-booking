import Link from "next/link"
import { IoCloseSharp } from "react-icons/io5"
import { RxCaretRight } from "react-icons/rx"
import { useMenu } from "@/store"
import { useKeyboardOptions } from "@/hooks"
import { showInitials } from "@/helpers"
import { MENU_OPTIONS } from "@/util/const"

export const MenuContent = () => {

    const { setIsOpenMenu } = useMenu()
    const options = MENU_OPTIONS.filter(opt => !opt.onBotton?.only)

    const { optionRef } = useKeyboardOptions({
        totalOptions: options.length,
        isOpenOptions: setIsOpenMenu
    })
  
    return (
        <div className="h-auto w-full">
            <div className="flex justify-between items-center bg-[#E2F5E5]">
                <Link onClick={() => setIsOpenMenu(false)} href="/profile" className="flex gap-2 p-3 pl-5 flex-1">
                    <span className="flex items-center justify-center rounded-full p-2 h-12 w-12 bg-white text-black border border-zinc-400">
                        {
                            showInitials('Carlos Castro')
                        }
                    </span>
                    <div className="flex flex-col">
                        <p className="font-bold">Carlos Eduardo</p>
                        <span className="flex items-center h-5">
                            Mi perfil
                            <RxCaretRight size={24} />
                        </span>
                    </div>
                </Link>
                <div
                    className="p-5 pr-6 h-full flex"
                    onClick={() => setIsOpenMenu(false)}
                >
                    <IoCloseSharp className="text-2xl" />
                </div>
            </div>
            <ul className="flex flex-col gap-2 py-4">
                {
                    options.map(({ Icon, label, href }, index) => (
                        <li key={label}>
                            <Link
                                ref={el => { optionRef.current[index] = el }}
                                onClick={() => setIsOpenMenu(false)}
                                className="flex items-center gap-2 text-lg py-3 px-5 active:bg-zinc-100 hover:bg-zinc-100 focus:bg-zinc-100 outline-0"
                                href={href}
                            >
                                <Icon className="text-2xl" />
                                {label}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
