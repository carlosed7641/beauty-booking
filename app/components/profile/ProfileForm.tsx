'use client'

import { useForm } from 'react-hook-form'
import { CgSpinner } from 'react-icons/cg'
import { formatInputDate } from '@/helpers'
import { AREAS_OF_EXPERIENCIES, GENDERS, YEARS_OF_EXPERIENCIES } from '@/util/const'
import { UserDTO } from '@/interfaces/user.interface'
import { getCountries } from '@/actions'
import { useEffect, useState } from 'react'

interface Props {
    initialValues?: UserDTO
    isLoading: boolean
    error: string
    onSubmit: (data: UserDTO) => void
}

export const ProfileForm = ({ initialValues, onSubmit, isLoading, error }: Props) => {

    const defaultValues = initialValues ? {
        ...initialValues,
        birthDay: initialValues.birthDay ? formatInputDate(initialValues.birthDay as Date) : null
    } : {}
    const [countries, setCountries] = useState<Country[]>([])

    const { register, handleSubmit, formState, watch } = useForm<UserDTO>({ defaultValues })
    const watchRole = watch('role')



    useEffect(() => {
        const fetchCountries = async () => {
            const dBCountries = await getCountries()
            setCountries(dBCountries)
        }

        fetchCountries()
    }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <div className="grid md:grid-cols-3 gap-3">
                <div className="flex flex-col">
                    <label htmlFor="phone">Celular*</label>
                    <div className="flex flex-1 gap-2 mt-2">
                        <select disabled={countries.length === 0} className="min-w-18 border border-green-700 p-1 rounded-md focus:outline-0 disabled:opacity-55" {...register("indicator", { required: true })}>
                            {
                                countries.map(country => <option key={country.indicator} value={country.indicator}>+{country.indicator}</option>)
                            }
                        </select>
                        <input {...register("phone",
                            {
                                required: true,
                                setValueAs: value =>
                                    typeof value === 'string' ? value.trim() : value
                            })
                        }
                            id="phone" className="w-full border border-green-700 p-1 rounded-md focus:outline-0" type="text" />
                    </div>
                </div>
                <label className="flex flex-col">
                    Nombre*
                    <input {...register("name",
                        {
                            required: true,
                            setValueAs: value =>
                                typeof value === 'string' ? value.trim() : value
                        })
                    }
                        className="mt-2 border border-green-700 p-1 rounded-md focus:outline-0" type="text" />
                </label>
                {
                    watchRole === 'admin' &&
                    <>
                        <label className="flex flex-col">
                            Nombre artístico
                            <input {...register("artisticName")} className="mt-2 border border-green-700 p-1 rounded-md focus:outline-0" type="text" />
                        </label>
                        <label className="flex flex-col">
                            Área de experiencia
                            <select {...register("experienceArea")} className="mt-2 border border-green-700 p-1 rounded-md focus:outline-0">
                                <option value="">Elige un área</option>
                                {
                                    AREAS_OF_EXPERIENCIES.map(area => <option key={area} value={area}>{area}</option>)
                                }
                            </select>
                        </label>
                        <label className="flex flex-col">
                            Años de experiencia
                            <select {...register("experienceYears")} className="mt-2 border border-green-700 p-1 rounded-md focus:outline-0">
                                <option value="">Elige una opcion</option>
                                {
                                    YEARS_OF_EXPERIENCIES.map((range, idx) => <option key={range} value={range}>{`${range} ${idx === 0 ? 'año' : 'años'}`}</option>)
                                }
                            </select>
                        </label>
                    </>
                }
                <label className="flex flex-col">
                    País*
                    <select disabled={countries.length === 0}  {...register("countryId", { required: true })} className="mt-2 border border-green-700 p-1 rounded-md focus:outline-0 disabled:opacity-55">
                        {
                            countries.map(country => <option key={country.id} value={country.id}>{country.name}</option>)
                        }
                    </select>
                </label>
                <label className="flex flex-col">
                    Fecha de nacimiento*
                    <input {...register("birthDay", { required: true })} className="mt-2 border border-green-700 p-1 rounded-md focus:outline-0" type="date" />
                </label>
                <label className="flex flex-col">
                    Género*
                    <select {...register("gender", { required: true })} className="mt-2 border border-green-700 p-1 rounded-md focus:outline-0">
                        {Object.entries(GENDERS).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
                    </select>
                </label>
            </div>
            {
                watchRole === 'admin' &&
                <label className="flex flex-col w-full">
                    Escribe una descripción sobre ti
                    <textarea {...register("description")} className="mt-2 border border-green-700 p-1 rounded-md focus:outline-0" />
                </label>
            }
            {formState.isSubmitted && Object.keys(formState.errors).length > 0 && <span className="text-red-500">Completa todos los campos requeridos (*)</span>}
            {error && <span className="text-red-500">{error}</span>}

            <button disabled={isLoading} type="submit" className="bg-green-700 font-bold mt-2 p-1 rounded justify-center flex self-end text-white cursor-pointer hover:bg-green-800 w-full md:w-36 disabled:pointer-events-none disabled:opacity-50">
                {isLoading ? <CgSpinner className="text-white animate-spin text-2xl" /> : 'Guardar'}
            </button>
        </form>
    )
}
