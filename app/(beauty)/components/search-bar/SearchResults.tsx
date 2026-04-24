import Link from 'next/link'
import { EntitySearchCard } from '..'
import { useKeyboardOptions } from '@/hooks'

interface Props {
    results: SimpleEntity[]
    totalMatches: number
    term: string
    setOpenResults: (value: boolean) => void
    loading: boolean
}

export const SearchResults = ({ results, totalMatches, term, setOpenResults, loading }: Props) => {

    const { optionRef } = useKeyboardOptions({
        totalOptions: totalMatches > 3 ? results.length + 1 : results.length,
        isOpenOptions: setOpenResults
    })

    return (
        <div className="absolute bg-white w-full rounded-b-sm shadow-sm">
            {loading ?
                <div className="border-t border-zinc-200 px-3 py-2">Cargando...</div>
                :
                totalMatches > 0 ? (
                    <>
                        {results.map((entity, index) => <EntitySearchCard key={entity.numberId} ref={el => { optionRef.current[index] = el }} entity={entity} />)}
                        {
                            totalMatches > 3 &&
                            <Link ref={el => { optionRef.current[results.length] = el }} className="flex p-2 justify-center border-t border-zinc-200 underline text-green-700 font-bold hover:bg-zinc-100 focus:bg-zinc-100 outline-0" href={`/entities?q=${term}`}>
                                Ver más
                            </Link>
                        }
                    </>
                ) : (
                    <div className="border-t border-zinc-200 px-3 py-2">No se han encontrado resultados para tu búsqueda</div>
                )}
        </div>
    )
}