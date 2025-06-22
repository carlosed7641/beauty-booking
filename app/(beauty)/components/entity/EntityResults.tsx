'use client'

import { useState } from "react"
import { EntityCard } from "./EntityCard"
import { VIEWS } from "@/util/const"

interface Props {
  results: Entity[]
  query: string
}

export const EntityResults = ({ results, query }: Props) => {

  const [view, setView] = useState<ResultView>(VIEWS.grid)

  return (
    <>

      <button onClick={() => setView(VIEWS.grid)}>Grid</button>
      <button onClick={() => setView(VIEWS.list)}>List</button>
      <div className={view.class}>
        {
          results.map(entity => (
            <EntityCard entity={entity} key={entity.id} />
          ))
        }
      </div>
    </>
  )
}
