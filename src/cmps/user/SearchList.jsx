import React from 'react'
import { SearchPreview } from './SearchPreview.jsx'

export function SearchList({index , searches , onLoadSong}) {
  if (!searches && !searches.length) return <div>nothing to show</div>
  return (
    <ul className="searches">
      {searches.map((item, idx) => (
         <li key={idx}> 
         <SearchPreview
            index={index}
            item={item}
            onLoadSong={onLoadSong}
          /></li>
      ))}
    </ul>
  )
}

