'use client'

import { useState } from 'react'
import { FaToggleOff, FaToggleOn } from 'react-icons/fa'
import { ADDITIONAL_FUNCTIONS_CONFIG } from '@/util/const'

interface Props {
    values: AddtionalFunctions
}

export const AdditionalFunctions = ({ values }: Props) => {

    const [functions, setFunctions] = useState<AddtionalFunctions>(values)

    const handleSave = () => {
        console.log(functions)
    }

    return (
        <ul className="flex flex-col gap-4">
            <h2 className="pb-1 border-b border-zinc-200 font-bold text-zinc-600">Funciones adicionales</h2>
            {
                ADDITIONAL_FUNCTIONS_CONFIG.map(({ id, title, hint, options }) => (
                    <li key={id} className="flex flex-col gap-2">
                        <div className="flex flex-col gap-1">
                            <span className="font-bold text-zinc-600">{title}</span>
                            <span className="text-sm text-zinc-500">{hint}</span>
                        </div>

                        {options ?
                            <select onChange={(e) => setFunctions(prev => ({ ...prev, [id]: e.target.value }))}
                                className="w-fit px-2 border border-green-700 rounded-md focus:outline-0" value={functions[id] as string | number}>
                                {options?.map(option =>
                                    <option key={`${id}-${option.value}`} value={option.value}>{option.label}</option>)}
                            </select>
                            :
                            <div className="flex items-center gap-1 cursor-pointer"
                                onClick={() => setFunctions(prev => ({ ...prev, [id]: !prev[id] }))}>
                                { functions[id] ? <FaToggleOn className="text-green-700 text-xl" /> : <FaToggleOff className="text-green-700 text-xl" /> }
                            </div>
                        }
                    </li>
                ))
            }
            <button
                onClick={handleSave}
                className="bg-green-700 font-bold p-1 rounded-full justify-center flex text-white cursor-pointer hover:bg-green-800 w-full md:w-36 disabled:opacity-60 disabled:pointer-events-none">
                Guardar
            </button>
        </ul>
    )
}
