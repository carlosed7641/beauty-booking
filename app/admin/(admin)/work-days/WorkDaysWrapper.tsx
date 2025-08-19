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
        <button disabled={!isValid} onClick={handleSave} className="bg-green-700 font-bold p-1 rounded-full justify-center flex text-white cursor-pointer hover:bg-green-800 w-full md:w-36 disabled:opacity-60 disabled:pointer-events-none">Guardar</button>
       </div>
    )
}
