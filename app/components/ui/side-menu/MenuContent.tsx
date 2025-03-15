import Link from 'next/link'
import { FaRegStar } from 'react-icons/fa'
import { FiMapPin } from 'react-icons/fi'
import { IoSettingsOutline, IoStorefrontOutline } from 'react-icons/io5'
import { LuNotebook } from 'react-icons/lu'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import { RxCaretRight } from "react-icons/rx"


export const MenuContent = () => {
  return (
    <div className="h-auto w-full">
        <Link href="/profile" className="flex gap-2 p-5 bg-[#E2F5E5]">
            <span className="flex items-center justify-center rounded-full p-2 h-12 w-12 bg-white text-black border border-zinc-400">
                CC
            </span>
            <div className="flex flex-col">
                <p className="font-bold">Carlos Eduardo</p>
                <span className="flex items-center h-5">
                    Mi perfil
                    <RxCaretRight size={24} />
                </span>
            </div>
        </Link>
        <ul className="flex flex-col gap-2 py-4">
            <li>
               <Link className="flex items-center gap-2 text-lg py-3 px-5" href="/my-reservations">
                    <LuNotebook className="text-2xl" />
                    Mis Reservas
               </Link> 
            </li>
            <li>
               <Link className="flex items-center gap-2 text-lg py-3 px-5" href="/my-reservations">
                    <MdOutlineFavoriteBorder  className="text-2xl" />
                    Mis Favoritos
               </Link> 
            </li>
            <li>
               <Link className="flex items-center gap-2 text-lg py-3 px-5" href="/my-reservations">
                    <FaRegStar className="text-2xl" />
                    Reseñas
               </Link> 
            </li>
            <li>
               <Link className="flex items-center gap-2 text-lg py-3 px-5" href="/my-reservations">
                    <IoStorefrontOutline className="text-2xl" />
                    Negocios Seguidos
               </Link> 
            </li>
            <li>
               <Link className="flex items-center gap-2 text-lg py-3 px-5" href="/my-reservations">
                    <FiMapPin className="text-2xl" />
                   Mapa
               </Link> 
            </li>
            <li>
               <Link className="flex items-center gap-2 text-lg py-3 px-5" href="/my-reservations">
                    <IoSettingsOutline className="text-2xl" />
                   Otros
               </Link> 
            </li>
        </ul>
    </div>
  )
}
