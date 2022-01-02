import React from 'react'
import { PlayPreview } from '../music/PlayPreview'

export function VisitedList({ visitedSongs ,onLoadSong }) {
  if (!visitedSongs) return <div>nothing to show</div>
  return (
    <ul className='playlist'>
      {visitedSongs.map((song, idx) => (
        <li key={idx}>
          <PlayPreview song={song} onLoadSong={onLoadSong} loadKey={'visit'}/>
        </li>
      ))}
    </ul>
  )
}
