'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { FaEdit } from 'react-icons/fa'
import { useModal } from '@/store'
import { Modal, ModalHeader } from '@/components'
import { COUNTRIES, GENDERS } from '@/util/const'
import { session } from '@/util/fake-data'

export const UpdateProfile = () => {

    const defaultValues = {
        name: session.name,
        country: session.country,
        photo: session.photo,
        indicator: session.indicator,
        phone: session.phone,
        birthDay: session.birthDay,
        gender: session.gender
    }

    const { openModal, setOpenModal } = useModal()
    const { register, handleSubmit, reset } = useForm<Omit<Session, 'id' | 'shareNumberPhone'>>({
        defaultValues
    })

    const onSubmit: SubmitHandler<Omit<Session, 'id' | 'shareNumberPhone'>> = (data) => {
        console.log(data)
        setOpenModal(null)
        reset()
    }

    return (
        <>
            <button onClick={() => setOpenModal(UpdateProfile.name)} className="text-green-700 w-fit flex gap-1 items-center cursor-pointer">
                <FaEdit />
                Editar perfil
            </button>
            {
                openModal === UpdateProfile.name &&
                <Modal>
                    <ModalHeader>
                        <p className="text-green-700 text-lg">Editar datos del perfil</p>
                    </ModalHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-3 gap-3" >
                        <div className="flex flex-col">
                            <label htmlFor="phone">Celular</label>
                            <div className="flex flex-1 gap-2 mt-2">
                                <select className="border border-green-700 p-1 rounded-md focus:outline-0" {...register("indicator", { required: true })}>
                                    {
                                        COUNTRIES.map(country => <option key={country.indicator} value={country.indicator}>{country.indicator}</option>)
                                    }
                                </select>
                                <input {...register("phone", { required: true })} id="phone" className="w-full border border-green-700 p-1 rounded-md focus:outline-0" type="text" />
                            </div>
                        </div>
                        <label className="flex flex-col">
                            Nombre
                            <input {...register("name", { required: true })} className="mt-2 border border-green-700 p-1 rounded-md focus:outline-0" type="text" />
                        </label>
                        <label className="flex flex-col">
                            País
                            <select {...register("country", { required: true })} className="mt-2 border border-green-700 p-1 rounded-md focus:outline-0">
                                {
                                    COUNTRIES.map(country => <option key={country.name} value={country.name}>{country.name}</option>)
                                }
                            </select>
                        </label>
                        <label className="flex flex-col">
                            Fecha de nacimiento
                            <input {...register("birthDay", { required: true })} className="mt-2 border border-green-700 p-1 rounded-md focus:outline-0" type="date" />
                        </label>
                        <label className="flex flex-col">
                            Género
                            <select {...register("gender", { required: true })} className="mt-2 border border-green-700 p-1 rounded-md focus:outline-0">
                                {GENDERS.map(gender => <option key={gender} value={gender}>{gender}</option>)}
                            </select>
                        </label>
                        <input type="submit" className="bg-green-700 font-bold mt-2 p-1 rounded justify-center flex self-end text-white cursor-pointer hover:bg-green-800" value="Guardar" />
                    </form>
                </Modal>
            }
        </>
    )
}