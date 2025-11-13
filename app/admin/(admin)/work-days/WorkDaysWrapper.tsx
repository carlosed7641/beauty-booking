'use client'

import { useState } from 'react'
import { WorkDays } from '../components'

export const WorkDaysWrapper = ({ workdays }: { workdays: WorkDays[] }) => {
    const [data, setData] = useState({ workdays })

    const handleSave = () => {
        //TODO: [POST]
        console.log(data)
    }

    const isValid = !data.workdays.some(({ error }) => error)

    return (
       <div className="flex flex-col gap-5">
        <WorkDays
            data={data}
            setData={setData}
            workdays={data.workdays}
        />
        <button disabled={!isValid} onClick={handleSave} className="btn-primary font-bold rounded-full justify-center flex w-full md:w-36">Guardar</button>
       </div>
    )
}
