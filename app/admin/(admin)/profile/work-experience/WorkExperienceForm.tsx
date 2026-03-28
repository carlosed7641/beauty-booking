import { useEffect, useState } from 'react'
import { SubmitHandler, useFormContext } from 'react-hook-form'
import { FaToggleOff, FaToggleOn } from 'react-icons/fa'
import { useModal } from '@/store'
import { Field } from '@/components'
import { createWorkExperience, updateWorkExpererience } from '@/actions'
import { CgSpinner } from 'react-icons/cg'

export const WorkExperienceForm = () => {

  const { register, handleSubmit, formState, formState: { isValid }, trigger, watch, setValue } = useFormContext<WorkExperience>()
  const setOpenModal = useModal(state => state.setOpenModal)
  const [errors, setErrors] = useState({
    startDate: '',
    endDate: '',
    difference: '',
  })
  const [connectionError, setConnectionError] = useState(false)
  const [stillWorkHere, setStillWorkHere] = useState(
    Boolean(formState.defaultValues?.startDate
      && !formState.defaultValues?.endDate
    ))

  const [isLoading, setIsLoading] = useState(false)
  const { startDate, endDate } = watch()

  const onSubmit: SubmitHandler<WorkExperience> = async (data) => {

    setConnectionError(false)
    setIsLoading(true)

    const formatedData = {
      ...data,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null
    }

    const result = data.id
      ? await updateWorkExpererience(formatedData)
      : await createWorkExperience(formatedData)

    if (!result.ok) {
      setConnectionError(true)
      setIsLoading(false)
      return
    }

    setOpenModal(null)
  }

  const validateDate = (date: Date | null, type: keyof typeof errors) => {
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
    validateDate(endDate ?? null, 'endDate')
    validateDateDifference()
  }, [endDate])

  useEffect(() => {
    trigger('endDate')
    if (stillWorkHere) {
      setValue('endDate', null)
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
          <input {...register("company", {
            required: true,
            setValueAs: value => typeof value === 'string' ? value.trim() : value
          })} className="mt-2 border border-green-700 p-1 rounded-md focus:outline-0" type="text" />
        </Field>
        <Field label="Cargo que ocupaste *">
          <input {...register("position", {
            required: true,
            setValueAs: value => typeof value === 'string' ? value.trim() : value
          })} className="mt-2 border border-green-700 p-1 rounded-md focus:outline-0" type="text" />
        </Field>
        <Field label="Fecha de inicio *" error={errors.startDate}>
          <input {...register("startDate", {
            required: true
          })} className="mt-2 border border-green-700 p-1 rounded-md focus:outline-0" type="date" />
        </Field>
        <Field label="Fecha de finalización" error={errors.endDate}>
          <input {...register("endDate", { required: !stillWorkHere })} className="mt-2 border border-green-700 p-1 rounded-md focus:outline-0 disabled:opacity-50" type="date" disabled={stillWorkHere} />
          <div onClick={() => setStillWorkHere(prev => !prev)} className="flex items-center gap-1 cursor-pointer mt-2">
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
        <input {...register("city", {
          required: true,
          setValueAs: value => typeof value === 'string' ? value.trim() : value
        })} className="mt-2 border border-green-700 p-1 rounded-md focus:outline-0" type="text" />
      </Field>
      {connectionError && <span className="text-red-500">Ocurrió un error al guardar los datos. Por favor, inténtelo de nuevo.</span>}
      <button disabled={!isFormValid || isLoading} type="submit" className="bg-green-700 font-bold mt-2 p-1 rounded justify-center flex self-end cursor-pointer text-white w-full md:w-[15%] hover:bg-green-800 disabled:pointer-events-none disabled:opacity-50">
        {isLoading ? <CgSpinner className="text-white animate-spin text-2xl" /> : 'Guardar'}
      </button>
    </form>
  )
}
