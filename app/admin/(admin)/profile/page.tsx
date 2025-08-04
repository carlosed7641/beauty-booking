import { FaToggleOff, FaToggleOn } from 'react-icons/fa'
import { PiPlusCircleBold } from 'react-icons/pi'
import { UpdateProfile } from '@/components'
import { WorkExperience, Skills } from '.'

export default function ProfilePage() {
    return (
        <>
            <h1 className="text-lg text-green-700 mb-3 font-bold">Mi pefil</h1>
            <div className="flex flex-col gap-6">
                <div className="bg-white w-full rounded-md p-7">
                    <div className="flex items-center gap-3">
                        <div className="text-3xl md:text-5xl rounded-full h-[85px] w-[85px] md:h-[100px] md:w-[100px] flex items-center justify-center bg-green-700 text-white">
                            C
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-2xl text-green-700">Carlos Castro</p>
                            <UpdateProfile />
                            <div className="flex items-center gap-1 cursor-pointer">
                                {
                                    true ?
                                        <FaToggleOn className="text-green-700 text-xl" /> :
                                        <FaToggleOff className="text-green-700 text-xl" />
                                }
                                <span>¿Perfil público?</span>
                            </div>
                        </div>
                    </div>
                </div>
                <WorkExperience />
                <div className="bg-white w-full rounded-md p-7">
                    <div className="flex justify-between md:justify-start md:gap-3 items-center mb-3 text-green-700">
                        <span className="text-xl md:text-2xl">Mi trabajo</span>
                        <PiPlusCircleBold className="text-2xl cursor-pointer" />
                    </div>
                    <div className="flex flex-col gap-3">
                        {
                            true ?
                                <p>No hay nada acá aún</p>
                                : <></>
                        }
                    </div>
                </div>
                <Skills />
                <div className="flex flex-col md:flex-row justify-center md:justify-end gap-3">
                    <button className="md:w-60 py-2 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-full cursor-pointer">
                        Desvincularse del negocio
                    </button>
                    <button className="md:w-60 py-2  bg-red-500 hover:bg-red-600 text-white font-bold rounded-full cursor-pointer">
                        Eliminar cuenta
                    </button>
                </div>
            </div>

        </>
    );
}