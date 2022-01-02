import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
//components:
import { SearchList } from '../cmps/user/SearchList'
import { VisitedList } from '../cmps/user/VisitedList'

//functionality:
import { loadHistory } from '../store/action/history.action'
import { getSongsToShow, getTotalPages } from '../services/util.service'
import { loadSong, updateSongList } from '../store/action/song.action'

//style:
import { Pagination } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'

export default function UserDashboard() {
  // initialize:
  const [visitPage, setVisitPage] = useState(1)
  const [searchPage, setSearchPage] = useState(1)
  const { searchList, visitedSongs } = useSelector(
    //@ts-ignore
    (state) => state.historyReducer
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadHistory())
  }, [])

  /**
   * @param {String} id
   * @param {String} key
   */
  const onLoadSong = (id, key, index) => {
    dispatch(loadSong(id, true))
    if (key === 'search') {
      dispatch(updateSongList(searchList[index].res))
    } else dispatch(updateSongList(visitedSongs))
  }

  //use style for pagination:
  const useStyles = makeStyles(() => ({
    ul: {
      '& .MuiPaginationItem-root': {
        color: '#95adbe',
      },
    },
  }))

  //sets new page for each of the results
  const classes = useStyles()
  const onSwitchSearchPage = (e, pageNum) => setSearchPage(pageNum)
  const onSwitchVisitPage = (e, pageNum) => setVisitPage(pageNum)

  //for Search Pagination:
  const totSearched = getTotalPages(searchList.length, 5)
  const searches = getSongsToShow(searchPage, searchList, 5)

  //for Visit Pagination:
  const totVisited = getTotalPages(visitedSongs.length, 5)
  const visits = getSongsToShow(visitPage, visitedSongs, 5)
  return (
    <section className='main-container'>
      <div className='history-container'>
        <article>
          <div className='flex sb'>
            <h2>Recent Searches</h2>
            <Pagination
              count={totSearched}
              size='medium'
              page={searchPage}
              shape='rounded'
              onChange={onSwitchSearchPage}
              classes={{ ul: classes.ul }}
            />
          </div>
          <div className='search-container'>
            {searchList && searchList.length ? (
              <SearchList
                index={searches.index}
                searches={searches.songsToShow}
                onLoadSong={onLoadSong}
              />
            ) : (
              ''
            )}
          </div>
        </article>
        <article>
          <div className='flex sb'>
            <h2>Recent Songs</h2>
            <Pagination
              count={totVisited}
              size='medium'
              page={visitPage}
              shape='rounded'
              onChange={onSwitchVisitPage}
              classes={{ ul: classes.ul }}
            />
          </div>
          <div className='playlist-container'>
            {visitedSongs && visitedSongs.length ? (
              <VisitedList
                visitedSongs={visits.songsToShow}
                onLoadSong={onLoadSong}
              />
            ) : (
              ''
            )}
          </div>
        </article>
      </div>
    </section>
  )
}
