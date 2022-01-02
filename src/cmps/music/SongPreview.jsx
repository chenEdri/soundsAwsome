import { Link } from 'react-router-dom'

export function SongPreview({ index, idx, song, onLoadSong, isSearchPrev}) {
  const { id, title , imgUrl } = song
  const prevStyle = isSearchPrev ? 'song-result' : 'song-pick-result'
  return (
    <article >
    <div className={`${prevStyle} flex`} onClick={()=>{isSearchPrev? onLoadSong(id, 'search', index) : onLoadSong(id)}}> 
        <div className="idx">{idx + 1}</div>
          <img src={imgUrl} alt='#' />
        <div>{title}</div>
      </div>
    </article>
  )
}
