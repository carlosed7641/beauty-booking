'use client'

import { useState } from 'react'
import { WorkDays } from '../components'
import { updateWorkDay } from '@/actions'

export const WorkDaysWrapper = ({ workdays }: { workdays: WorkDays[] }) => {
    const [data, setData] = useState({ workdays })
    const [savedData, setSavedData] = useState(workdays)
    const [status, setStatus] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSave = async () => {
        setStatus('')
        setIsLoading(true)

        try {
            await updateWorkDay(data.workdays)
            setStatus('Success')
            setSavedData(data.workdays)

            setTimeout(() => {
                setStatus('')
            }, 5000)
        } catch {
            setData({ workdays: savedData })
            setStatus('Error')
        } finally {
            setIsLoading(false)
        }


    }

    const isValid = !data.workdays.some(({ error }) => error)

    return (
        <div className="flex flex-col gap-5">
            <WorkDays
                data={data}
                setData={setData}
                workdays={data.workdays}
            />
            <button disabled={!isValid || isLoading} onClick={handleSave} className="btn-primary font-bold rounded-full justify-center flex w-full md:w-36">
                {isLoading ? 'Procesando...' : 'Guardar'}
            </button>
            {status === 'Success' && <p className="text-green-700">Actualizado correctamente!</p>}
            {status === 'Error' && <p className="text-red-700">Ocurrió un error, inténtelo más tarde</p>}
        </div>
    )
}
