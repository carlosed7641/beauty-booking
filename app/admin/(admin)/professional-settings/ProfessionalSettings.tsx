'use client'

import { useState } from 'react'
import { SelectProfessional } from '../components'
import { AssignServices, AssignWorkDays, SelectOption } from '.'

interface Props {
    professionals: ProfessionalSettings[]
    serviceList: { [key: string]: ServiceConfig[] }
    workDays: WorkDays[]
}

export const ProfessionalSettings = ({ professionals, serviceList, workDays }: Props) => {

    const [selectedProfessional, setSelectedProfessional] = useState(professionals[0])
    const [selectedOption, setSelectedOption] = useState(0)

    return (
        <>
            <SelectProfessional
                professionals={professionals}
                selectedProfessional={selectedProfessional}
                setSelectedProfessional={setSelectedProfessional as React.Dispatch<React.SetStateAction<ProfessionalSettings | ProfessionalData>>}
            />
            <SelectOption
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
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
                    hint="Elige qué servicios asignar al profesional"
                    selectedProfessional={selectedProfessional}
                    setSelectedProfessional={setSelectedProfessional}
                    serviceList={serviceList}
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
