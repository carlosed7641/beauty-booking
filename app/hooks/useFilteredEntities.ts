'use client'

import { searchEntity } from '@/actions'
import { getReviews } from '@/helpers'
import { useEffect, useState } from 'react'

export const useFilteredEntities = (term: string) => {

    const [results, setResults] = useState<SimpleEntity[]>([])
    const [totalMatches, setTotalMatches] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const trimmed = term.trim()

        if (!trimmed) {
            setResults([])
            setTotalMatches(0)
            return
        }

        const timeout = setTimeout(async () => {
            try {
                setLoading(true)

                const { results, total } = await searchEntity(term, 3)

                const data = results.map(result => {
                    const { ratingCount, ratingPotins } = getReviews(result.events)
                    return {
                        ...result,
                        reviews: {

                            count: ratingCount,
                            points: ratingPotins
                        }
                    }
                })

                setResults(data)
                setTotalMatches(total)
            } finally {
                setLoading(false)
            }
        }, 300)

        return () => {
            clearTimeout(timeout)
        }


    }, [term])

    return { results, totalMatches, loading }
}
