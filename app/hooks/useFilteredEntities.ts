'use client'

import { useEffect, useState } from 'react'
import { entities } from '@/util/fake-data'

export const useFilteredEntities = (term: string) => {

    const [results, setResults] = useState<Entity[]>([])
    const [totalMatches, setTotalMatches] = useState(0)

    useEffect(() => {

        const trimmed = term.trim()

        if (!trimmed) {
            setResults([])
            return
        }

        const matches = entities.filter(entity =>
            entity.name.toLowerCase().includes(trimmed.toLowerCase())
        )

        const totalMatches = matches.length
        const filtered = matches.slice(0, 3)

        setResults(filtered)
        setTotalMatches(totalMatches)

    }, [term])

    return { results, totalMatches }
}
