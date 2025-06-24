'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MONTHS } from '@/util/const'

interface Inputs {
    name: string
    surname: string
    birthDay: string
    birthMonth: string
    birthYear: string
    gender: string
    email: string
    password: string
}

export const NewAccountForm = () => {

    const currentDate = new Date()
    const currentDay = currentDate.getDate()
    const currentMonthIndex = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()

    const [selectedMonth, setSelectecMonth] = useState(currentMonthIndex)
    const { register, handleSubmit, getValues, setValue } = useForm<Inputs>()

    const { days: daysNumber } = MONTHS[selectedMonth]
    const days = Array.from({ length: daysNumber }, (_, index) => index + 1)
    const years = Array.from({ length: 101 }, (_, index) => currentYear - index)

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const { birthDay, birthMonth: month, birthYear, ...rest } = data

        const birthMonth = Number(month) + 1
        const formatedData = {
            ...rest,
            birhDate: `${birthDay}/${birthMonth}/${birthYear}`
        }

        console.log(formatedData)
    }

    useEffect(() => {

        const limitDays = MONTHS[selectedMonth].days
        const birthDay = Number(getValues('birthDay'))
        if (birthDay > limitDays) {
            setValue('birthDay', limitDays.toString())
        }

    }, [selectedMonth])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col gap-2">
                    Nombre
                    <input {...register('name', { required: true })} className="p-2 border border-zinc-300 rounded-md focus:outline-0 focus:border-green-700" type="text" placeholder="Tu nombre" />
                </label>
                <label className="flex flex-col gap-2">
                    Apellido
                    <input {...register('surname', { required: true })} className="p-2 border border-zinc-300 rounded-md focus:outline-0 focus:border-green-700" type="text" placeholder="Tu apellido" />
                </label>
            </div>
            <div className="flex flex-col gap-2 ">
                <p>Fecha de nacimiento</p>
                <div className="grid grid-cols-3 gap-3">
                    <select {...register('birthDay', { required: true })} defaultValue={currentDay} className="p-2 border border-zinc-300 rounded-md focus:outline-0 focus:border-green-700">
                        {days.map(day => <option key={day} value={day}>{day}</option>)}
                    </select>
                    <select {...register('birthMonth', { required: true })} onChange={(e) => setSelectecMonth(Number(e.target.value))} defaultValue={selectedMonth} className="p-2 border border-zinc-300 rounded-md focus:outline-0 focus:border-green-700">
                        {MONTHS.map(({ month }, index) => <option key={index} value={index}>{month}</option>)}
                    </select>
                    <select {...register('birthYear', { required: true })} defaultValue={currentYear} className="p-2 border border-zinc-300 rounded-md focus:outline-0 focus:border-green-700">
                        {years.map(year => <option key={year} value={year}>{year}</option>)}
                    </select>
                </div>
            </div>
            <div className="flex flex-col gap-2 ">
                <p>Género</p>
                <div className="grid grid-cols-3 gap-3">
                    <label className="flex items-center justify-between p-2 border border-zinc-300 rounded-md focus:outline-0 focus:border-green-700">
                        Mujer
                        <input {...register('gender', { required: true })} type="radio" value="women" name="gender" />
                    </label>
                    <label className="flex items-center justify-between p-2 border border-zinc-300 rounded-md focus:outline-0 focus:border-green-700">
                        Hombre
                        <input {...register('gender', { required: true })} type="radio" value="men" name="gender" />
                    </label>
                    <label className="flex items-center justify-between p-2 border border-zinc-300 rounded-md focus:outline-0 focus:border-green-700">
                        Otro
                        <input {...register('gender', { required: true })} type="radio" value="other" name="gender" />
                    </label>
                </div>
            </div>
            <label className="flex flex-col gap-2">
                Correo electrónico
                <input {...register('email', { required: true })} className="p-2 border border-zinc-300 rounded-md focus:outline-0 focus:border-green-700" type="email" placeholder="tunombre@email.com" />
            </label>
            <label className="flex flex-col gap-2">
                Contraseña nueva
                <input {...register('password', { required: true })} className="p-2 border border-zinc-300 rounded-md focus:outline-0 focus:border-green-700" type="password" placeholder="********" />
            </label>
            <button className="bg-green-700 text-white rounded-md py-2 font-bold cursor-pointer hover:bg-green-800">Registrarte</button>
            <Link href="/auth/login" className="text-green-700 text-center">¿Ya tienes una cuenta?</Link>
        </form>
    )
}
