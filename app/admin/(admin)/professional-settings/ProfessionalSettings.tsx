'use client'

import { useState } from 'react'
import { SelectProfessional } from '../components'
import { AssignServices, AssignWorkDays, SelectOption } from '.'

interface Props {
    professionals: ProfessionalSettings[]
    workDays: WorkDays[]
    isAdmin: boolean
}

export const ProfessionalSettings = ({ professionals, workDays, isAdmin }: Props) => {

    const [selectedProfessional, setSelectedProfessional] = useState(professionals[0])
    const [selectedOption, setSelectedOption] = useState(0)

    return (
        <>
            {
                isAdmin && 
                    <SelectProfessional
                    professionals={professionals}
                    selectedProfessional={selectedProfessional}
                    setSelectedProfessional={setSelectedProfessional as () => void}
                    />
            }
            <SelectOption
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                isAdmin={isAdmin}
            />
            {selectedOption === 0 &&
                <AssignWorkDays
                    selectedProfessional={selectedProfessional}
                    setSelectedProfessional={setSelectedProfessional}
                    workDays={workDays}
                />
            }
            {selectedOption === 1 &&
                <AssignServices
                    title="Asignar servicios"
                    hint={isAdmin ? "Elige que servicios asignar al profesional" : 'Elige que servicios ofreces'}
                    selectedProfessional={selectedProfessional}
                    setSelectedProfessional={setSelectedProfessional}
                />
            }
            {selectedOption === 2 &&
                <AssignServices
                    title="Asignar duración de servicios"
                    hint="Elige lo que puede tardar cada servicio por profesional"
                    selectedProfessional={selectedProfessional}
                    setSelectedProfessional={setSelectedProfessional}
                    type="duration"
                />

            }
            {selectedOption === 3 &&
                <AssignServices
                    title="Precios"
                    hint="Elige el precio de cada servicio por profesional"
                    selectedProfessional={selectedProfessional}
                    setSelectedProfessional={setSelectedProfessional}
                    type="price"
                />
            }
        </>
    )
}
