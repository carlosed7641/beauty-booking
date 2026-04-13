'use client'

import { useState } from 'react'
import { FaToggleOff, FaToggleOn } from 'react-icons/fa'


interface Props {
    professional: ProfessionalSchedule
    selectedView: ProfessionalData | null
    setSelectedView: (selectedView: ProfessionalData) => void
}

export const ToggleListView = ({ professional, selectedView, setSelectedView  }: Props) => {


    return (
        <button
            className="flex items-center gap-1 cursor-pointer my-5"
            onClick={() => setSelectedView(professional)}
        >
            {
                selectedView ?
                    <FaToggleOn className="text-green-700 text-xl" /> :
                    <FaToggleOff className="text-green-700 text-xl" />
            }
            <span>Cambiar a vista de lista</span>
        </button>
    )
}
