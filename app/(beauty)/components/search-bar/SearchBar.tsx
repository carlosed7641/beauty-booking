'use client'

import { useState, useEffect } from 'react'
import { SearchInput } from './SearchInput'
import { SearchResults } from './SearchResults'
import { useFilteredEntities } from '@/hooks'
import { useSearchParams } from 'next/navigation'

export const SearchBar = () => {

    const [term, setTerm] = useState('')
    const [openResults, setOpenResults] = useState(false)
    const { results, totalMatches } = useFilteredEntities(term)
    const searchParams = useSearchParams()
    const search = searchParams.get('q')

    useEffect(() => {
        setTerm(search ?? '')
    }, [search])

    return (
        <div className="relative w-full md:w-3/5">
            <SearchInput
                value={term}
                onChange={setTerm}
                setOpenResults={setOpenResults}
            />
            {term && openResults && <SearchResults
                setOpenResults={setOpenResults}
                results={results}
                totalMatches={totalMatches}
                term={term}
            />}
        </div>
    )
}
