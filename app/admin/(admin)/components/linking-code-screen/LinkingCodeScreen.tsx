'use client'

import { linkProfessional } from '@/actions'
import { useState, useTransition } from 'react'
import { RegistrationData } from '../registration-data/RegistrationData'
import { SignOut } from '@/components'

interface Props {
    needRegistration: boolean
}

export const LinkingCodeScreen = ({ needRegistration }: Props) => {

    const [code, setCode] = useState('')
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState(false)
    const [showNextStep, setShowNextStep] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        if (value.length > 6) return
        setCode(value.toUpperCase())
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError(false)
        startTransition(async () => {
            try {
                await linkProfessional(code)
                if (needRegistration) return setShowNextStep(true)
            } catch {
                setError(true)
            }
        })
    }

    return (

        <>
            {
                showNextStep ?
                    <RegistrationData isEmployee />
                    :
                    (
                        <div className="bg-zinc-100 flex flex-col items-center justify-center pt-24 md:items-center gap-5 px-4 md:pt-0 h-screen">
                            <h2>Escribe el código para vincularte al negocio</h2>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-2 border border-green-700 p-12 rounded-md">
                                <input value={code} onChange={handleChange} className="border px-3 py-2 rounded-md focus:outline-0 border-green-700" type="text" placeholder="Código" />
                                <button disabled={code.length < 6 || isPending} className="btn-primary rounded-full" style={{ paddingBlock: 6 }}>Ingresar</button>
                                {error && <span className="text-red-500">El código expiró o es incorrecto</span>}
                            </form>
                            <SignOut />
                        </div>
                    )
            }
        </>

    )
}
