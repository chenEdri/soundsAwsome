import { useState } from 'react'
import { SongPreview } from '../music/SongPreview'
import ReactLoading from 'react-loading'
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons'

export function SearchPreview({ index, item, onLoadSong }) {

  const [isOpenRes, setIsOpenRes] = useState(false)
  const toggleRes = () => setIsOpenRes(!isOpenRes)

  if (!item || !item.search || !item.res) return <ReactLoading type={'cubes'} color='#a22b44' />
  const { search, res } = item
  const isHover = isOpenRes ? 'no-hover' : ''
  return (
    <div
      className={`search-res-container flex column ${isHover}`}
      onClick={() => toggleRes()}
    >
      <div className='flex sb'>
        <div className='idx'>{search}</div>
        <div className='arrow'>
          {isOpenRes ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </div>
      </div>
      {isOpenRes ? (
        <ul>
          {res.map((song, idx) => (
            <li key={idx}>
              <SongPreview
                index={index}
                idx={idx}
                song={song}
                onLoadSong={onLoadSong}
                isSearchPrev={true}
              />
            </li>
          ))}
        </ul>
      ) : (
        ''
      )}
    </div>
  )
}
