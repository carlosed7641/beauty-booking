'use client'

import { useState } from 'react'
import { FaToggleOff, FaToggleOn } from 'react-icons/fa'
import { ADDITIONAL_FUNCTIONS_CONFIG } from '@/util/const'
import { updateEntity } from '@/actions'

interface Props {
    values: AddtionalFunctions
    entityId: string
}

export const AdditionalFunctions = ({ values, entityId }: Props) => {

    const [functions, setFunctions] = useState<AddtionalFunctions>(values)
    const [savedFunctions, setSavedFunctions] = useState<AddtionalFunctions>(values)
    const [isLoading, setIsLoading] = useState(false)

    const handleSave = async () => {
        if (!entityId) throw new Error('Ocurrió un error inesperado')

        const previousSaved = { ...savedFunctions }
        const payload = { 
            cancelDateTime: Number(functions.cancelDateTime)
        }

        setIsLoading(true)

        try {
            await updateEntity({ entityId, ...payload })
            setSavedFunctions(payload)
        } catch {
            setFunctions(previousSaved)
        } finally {
            setIsLoading(false)
        }
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
                                {functions[id] ? <FaToggleOn className="text-green-700 text-xl" /> : <FaToggleOff className="text-green-700 text-xl" />}
                            </div>
                        }
                    </li>
                ))
            }
            <button
                disabled={isLoading}
                onClick={handleSave}
                className="btn-primary font-bold rounded-full justify-center flex w-full md:w-36 disabled:opacity-55 disabled:pointer-events-none">
                { isLoading ? 'Procesando...' : 'Guardar'}
            </button>
        </ul>
    )
}
