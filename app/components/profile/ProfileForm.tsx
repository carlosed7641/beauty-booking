import { SubmitHandler, useForm } from 'react-hook-form'
import { useModal } from '@/store'
import { AREAS_OF_EXPERIENCIES, COUNTRIES, GENDERS, YEARS_OF_EXPERIENCIES } from '@/util/const'

interface Props {
    initialValues?: Omit<Session, 'id' | 'shareNumberPhone'> 
    onSubmit: (data: Omit<Session, 'id' | 'shareNumberPhone'>) => void
}


export const ProfileForm = ({ initialValues, onSubmit }: Props) => {

    const defaultValues = initialValues ? initialValues : {
        phone: '',
        indicator: '',
        name: '',
        country: '',
        birthDay: '',
        gender: ''
    }

    const { register, handleSubmit, reset, watch } = useForm<Omit<Session, 'id' | 'shareNumberPhone'>>({
        defaultValues
    })
    const watchRole = watch('role')

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <div className="grid md:grid-cols-3 gap-3">
                <div className="flex flex-col">
                    <label htmlFor="phone">Celular</label>
                    <div className="flex flex-1 gap-2 mt-2">
                        <select className="border border-green-700 p-1 rounded-md focus:outline-0" {...register("indicator", { required: true })}>
                            {
                                COUNTRIES.map(country => <option key={country.indicator} value={country.indicator}>+{country.indicator}</option>)
                            }
                        </select>
                        <input {...register("phone", { required: true })} id="phone" className="w-full border border-green-700 p-1 rounded-md focus:outline-0" type="text" />
                    </div>
                </div>
                <label className="flex flex-col">
                    Nombre
                    <input {...register("name", { required: true })} className="mt-2 border border-green-700 p-1 rounded-md focus:outline-0" type="text" />
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
            </div>
            {
                watchRole === 'admin' &&
                <label className="flex flex-col w-full">
                    Escribe una descripción sobre ti
                    <textarea {...register("description")} className="mt-2 border border-green-700 p-1 rounded-md focus:outline-0" />
                </label>
            }
            <input type="submit" className="bg-green-700 font-bold mt-2 p-1 rounded justify-center flex self-end text-white cursor-pointer hover:bg-green-800 w-full md:w-36" value="Guardar" />
        </form>
    )
}
