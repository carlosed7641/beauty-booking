import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { PiUserFocusThin } from 'react-icons/pi'
import { COUNTRIES } from '@/util/const'

export const RegistrationForm = ({ onSubmit }: { onSubmit(data: RegistrationInputs): void }) => {

    const { register, handleSubmit, watch } = useForm<RegistrationInputs>()
    const watchPhoto = watch('photo')

    return (
        <div className="bg-[#eaf1eb] flex justify-center pt-24 md:items-center px-4 md:pt-0 h-screen">
            <div className="bg-white p-5 rounded-md shadow-md sm:w-[400px] w-full h-fit">
                <h1 className="text-2xl text-green-700 mb-4 text-center">Completa tu información</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <label className="flex flex-col gap-1 justify-center items-center cursor-pointer">
                        {
                            watchPhoto?.length ?
                                <Image height={150} width={150} alt="Imagen" src="https://picsum.photos/150/150" />
                                : <PiUserFocusThin className="text-green-700" size={180} />
                        }
                        <span>Toca para cambiar foto</span>
                        <input {...register('photo')} className="hidden" type="file" accept="image/png, image/jpeg, image/webp" />
                    </label>
                    <label className="flex flex-col gap-2">
                        Nombre
                        <input {...register('name', { required: true })} className="p-2 border border-zinc-300 rounded-md focus:outline-0 focus:border-green-700" type="text" placeholder="¿Cómo te conocen?" />
                    </label>
                    <label className="flex flex-col gap-2">
                        País
                        <select defaultValue="" className="p-2 border border-zinc-300 rounded-md focus:outline-0 focus:border-green-700" {...register('country', { required: true })}>
                            <option value="" disabled>-- Selecciona un país --</option>
                            {
                                COUNTRIES.map(country => <option key={country.name} value={country.name}>{country.name}</option>)
                            }
                        </select>
                    </label>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="phone">Número de contacto</label>
                        <div className="flex gap-2">
                            <select className="p-2 border border-zinc-300 rounded-md focus:outline-0 focus:border-green-700">
                                {COUNTRIES.map(country => <option key={country.indicator} value={country.indicator}>+{country.indicator}</option>)}
                            </select>
                            <input id="phone" {...register('phone', { required: true })} className="flex-1 p-2 border border-zinc-300 rounded-md focus:outline-0 focus:border-green-700" type="text" />
                        </div>
                    </div>
                    <button className="btn-primary rounded-md font-bold">Enviar</button>
                </form>
            </div>
        </div>
    )

}
