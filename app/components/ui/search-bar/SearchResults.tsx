import Link from 'next/link'
import { EntitySearchCard } from "@/(beauty)/components"

interface Props {
    results: Entity[]
    totalMatches: number
    term: string
}

export const SearchResults = ({ results, totalMatches, term }: Props) => {

    return (
        <div className="absolute bg-white w-full rounded-b-sm shadow-sm">
            {totalMatches > 0 ? (
                <>
                    { results.map(entity => <EntitySearchCard key={entity.id} entity={entity} />) }
                    {
                        totalMatches > 3 && 
                        <Link className="flex p-2 justify-center border-t border-zinc-200 underline text-green-700 font-bold" href={`/search/entity?q=${term}`}>
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
