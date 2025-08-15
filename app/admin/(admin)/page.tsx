import Link from 'next/link'
import { FaRegCalendar } from 'react-icons/fa'
import { GoQuestion } from 'react-icons/go'
import { HiOutlineUsers } from 'react-icons/hi2'
import { IoSettingsOutline, IoShareSocialOutline } from 'react-icons/io5'
import { MdOutlineStarPurple500 } from 'react-icons/md'
import { AdminSections } from './components'

export default function HomePage() {
  return (
    <div className="flex flex-col gap-3">
      <div className="bg-white w-full rounded-md p-7">
        <div className="md:flex justify-between">
          <div className="flex md:flex-col md:gap-3 md:w-fit items-center md:items-start justify-between md:justify-start">
            <Link href="/admin/profile" className="flex gap-2">
              <div className="text-xl md:text-3xl rounded-full h-14 w-14 md:h-[80px] md:w-[80px] flex items-center justify-center bg-green-700 text-white">
                C
              </div>
              <div className="flex flex-col text-xs md:text-sm">
                <span>Hola</span>
                <span className="text-green-700 text-sm md:text-base pointer-events-none">Carlos Castro</span>
                <span>Administador</span>
                <span>Negocio: Master Barber</span>
              </div>
            </Link>
            <div className="text-green-700 text-xl md:text-2xl flex gap-4 md:w-full">
              <IoShareSocialOutline title="Compartir" className="cursor-pointer" />
              <Link href="/admin/settings" className="flex gap-2">
                <IoSettingsOutline title="Configuración" className="cursor-pointer" />
              </Link>
              <GoQuestion title="Ayuda" className="cursor-pointer" />
            </div>
          </div>
          <div className="grid grid-cols-3 mt-5 gap-4">
            <div className="flex flex-col items-center gap-2">
              <HiOutlineUsers className="text-lg text-green-700" />
              <div className="flex flex-col items-center">
                <span className="text-sm">0</span>
                <span className="text-xs text-center text-zinc-500">Seguidores del negocio</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <FaRegCalendar className="text-lg text-green-700" />
              <div className="flex flex-col items-center">
                <span className="text-sm">0</span>
                <span className="text-xs text-center text-zinc-500">Agendamientos</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <MdOutlineStarPurple500 className="text-lg text-amber-400" />
              <div className=" flex flex-col items-center ">
                <span className="text-sm">0.0</span>
                <span className="text-xs text-center text-zinc-500">(0)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSections />
    </div>
  )
}