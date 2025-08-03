import { useEffect, useState } from 'react'
import { SubmitHandler, useFormContext } from 'react-hook-form'
import { FaToggleOff, FaToggleOn } from 'react-icons/fa'
import { useModal } from '@/store'
import { Field } from '@/components'

export const WorkExperienceForm = () => {

  const { register, handleSubmit, reset, formState: { isValid }, trigger, watch, setValue } = useFormContext<WorkExperience>()
  const { setOpenModal } = useModal()
  const [errors, setErrors] = useState({
    startDate: '',
    endDate: '',
    difference: ''
  })

  const { startDate, endDate, stillWorkHere } = watch()

  const onSubmit: SubmitHandler<WorkExperience> = (data) => {

    const cleanedData = { ...data }
    if (!cleanedData.endDate) delete cleanedData.endDate
    if (!cleanedData.experience) delete cleanedData.experience

    console.log(cleanedData)
    if (data.id) {
      // TODO: Update
    } else {
      // TODO: Create
    }

    setOpenModal(null)
  }

  const validateDate = (date: string, type: keyof typeof errors) => {
    if (!date) return
    const inputDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    setErrors(prev => ({
      ...prev,
      [type]: inputDate > today ? 'Ingresa una fecha válida' : ''
    }))
  }

  const validateDateDifference = () => {
    if (!startDate || !endDate) return

    const start = new Date(startDate)
    const end = new Date(endDate)
    setErrors(prev => ({
      ...prev,
      difference: start > end ? 'La fecha de inicio no puede ser mayor a la de finalización' : ''
    }))
  }

  useEffect(() => {
    validateDate(startDate, 'startDate')
    validateDateDifference()
  }, [startDate])

  useEffect(() => {
    validateDate(endDate ?? '', 'endDate')
    validateDateDifference()
  }, [endDate])

  useEffect(() => {
    trigger('endDate')
    if (stillWorkHere) {
      setValue('endDate', '')
      setErrors(prev => ({
        ...prev,
        endDate: ''
      }))
    }
  }, [stillWorkHere])


  const isFormValid = isValid && !Object.values(errors).some(msg => msg.length > 0)

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Nombre de la empresa *">
          <input {...register("workName", { required: true })} className="mt-2 border border-green-700 p-1 rounded-md focus:outline-0" type="text" />
        </Field>
        <Field label="Cargo que ocupaste *">
          <input {...register("position", { required: true })} className="mt-2 border border-green-700 p-1 rounded-md focus:outline-0" type="text" />
        </Field>
        <Field label="Fecha de inicio *" error={errors.startDate}>
          <input {...register("startDate", { required: true })} className="mt-2 border border-green-700 p-1 rounded-md focus:outline-0" type="date" />
        </Field>
        <Field label="Fecha de finalización" error={errors.endDate}>
          <input {...register("endDate", { required: !stillWorkHere })} className="mt-2 border border-green-700 p-1 rounded-md focus:outline-0 disabled:opacity-50" type="date" disabled={stillWorkHere} />
          <div onClick={() => setValue('stillWorkHere', !stillWorkHere)} className="flex items-center gap-1 cursor-pointer mt-2">
            {
              stillWorkHere ?
                <FaToggleOn className="text-green-700 text-xl" /> :
                <FaToggleOff className="text-green-700 text-xl" />
            }
            <span>Aún trabajo en este lugar</span>
          </div>
        </Field>
      </div>
      {errors.difference && <span className="text-red-500">{errors.difference}</span>}
      <Field label="Lugar *">
        <input {...register("place", { required: true })} className="mt-2 border border-green-700 p-1 rounded-md focus:outline-0" type="text" />
      </Field>
      <Field label="Describe tu experiencia" hint="Escribe tus funciones, actividades o logros">
        <textarea {...register("experience")} className="mt-2 border border-green-700 p-1 rounded-md focus:outline-0" />
      </Field>
      <input disabled={!isFormValid} type="submit" className="bg-green-700 font-bold mt-2 p-1 rounded justify-center flex self-end text-white cursor-pointer hover:bg-green-800 w-full md:w-36 disabled:opacity-70 disabled:pointer-events-none" value="Guardar" />
    </form>
  )
}
