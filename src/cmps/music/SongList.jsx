import React from 'react'
import { SongPreview } from './SongPreview'
import { PlayPreview } from './PlayPreview'
import ReactLoading from 'react-loading'

function _SongList({ songs, index, isListView, onLoadSong }) {
  if (!songs) return <ReactLoading type={'cubes'} color='#a22b44' />
  return (
    <ul className='playlist'>
      {isListView
        ? songs.map((song, idx) => (
            <li key={idx}>
              <SongPreview
                index={index}
                idx={index + idx}
                song={song}
                onLoadSong={onLoadSong}
                isSearchPrev={false}
              />
            </li>
          ))
        : songs.map((song) => (
            <li key={song.id}>
              <PlayPreview song={song} onLoadSong={onLoadSong} loadKey={'search'}/>
            </li>
          ))}
    </ul>
  )
}

export const SongList = React.memo(_SongList)
