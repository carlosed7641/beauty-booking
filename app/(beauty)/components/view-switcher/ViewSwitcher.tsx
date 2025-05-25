'use client'

import { useState } from 'react'
import { IoGridOutline } from 'react-icons/io5'
import { PiListDashesBold } from 'react-icons/pi'
import clsx from 'clsx'
import { SearchResult } from '../search-result/SearchResult'
import { VIEWS } from '@/util/const'

interface Props {
    result: Entity[]
    query: string
}

export const ViewSwitcher = ({ result, query }: Props) => {

    const [view, setView] = useState<ResultView>(VIEWS.grid)

    return (
        <>
            <div className="flex justify-between gap-5 items-center mb-5">
                <div>
                    <span className="font-bold">{result.length > 0 ? result.length : 'Sin'}</span> resultados para <span className="font-bold">{query}</span>
                </div>
                {
                    result.length > 0 &&
                    <div className="flex items-center cursor-pointer">
                        <div className={
                            clsx(
                                "bg-green-200 hover:bg-green-300 transition-all px-5 py-2 border-r border-zinc-60 rounded-tl-full rounded-bl-full",
                                {
                                    "bg-green-300": view.class.includes('list')
                                }
                            )
                        } onClick={() => setView(VIEWS.list)}>
                            <PiListDashesBold />
                        </div>
                        <div className={
                            clsx(
                                "bg-green-200 hover:bg-green-300 transition-all px-5 py-2 rounded-tr-full rounded-br-full",
                                {
                                    "bg-green-300": view.class.includes('grid')
                                }
                            )
                        } onClick={() => setView(VIEWS.grid)}>
                            <IoGridOutline />
                        </div>
                    </div>
                }
            </div>
            <SearchResult result={result} view={view} />
        </>
    )
}
