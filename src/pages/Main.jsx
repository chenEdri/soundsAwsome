// necessary core imports:
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

//components:
import { Search } from '../cmps/music/Search'
import { SongList } from '../cmps/music/SongList'
import { SongModal } from '../cmps/music/SongModal'

//functionality:
import { saveUserHistory } from '../store/action/history.action'
import {
  loadSongs,
  loadSong,
  setPage,
  setView,
} from '../store/action/song.action'
import { getSongsToShow, getTotalPages } from '../services/util.service'

//style imports:
import GridView from '@material-ui/icons/GridOnOutlined'
import ViewList from '@material-ui/icons/ListAlt'
import { Pagination } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'

function MainApp() {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const [isModalSong, setIsModalSong] = useState(false)
  const { songs, paginator, isListView, currSong } = useSelector(
    //@ts-ignore
    (state) => state.songReducer
  )

  useEffect(() => {
    if (search.length) {
      dispatch(loadSongs(search))
    }
  }, [search])

  //use style for pagination:
  const useStyles = makeStyles(() => ({
    ul: {
      '& .MuiPaginationItem-root': {
        color: '#95adbe',
      },
    },
  }))

  /**
   * activat an async call to find songs by the search input 
   * @param {String} search 
   */
  const onSetSearch = (search) => {
    setSearch(search)
  }

  // toggle between the list views and save it as the preference for the user 
  const toggleListView = () => {
    dispatch(
      saveUserHistory('SET_LAST_USER_HISTORY', 'isListView', !isListView)
    )
    dispatch(setView(!isListView))
  }

  //set new page 
  const onSwitchPage = (e, pageNum) => {
    dispatch(setPage(pageNum))
  }

  //calling the store to load new song with async call to the api
  const onLoadSong = (id) => {
    dispatch(loadSong(id))
    setTimeout(()=>setIsModalSong(true),500)
  }

  // closing the image modal and sending shows back the search list
  const onCloseModal = () => {
    setIsModalSong(false)
  }

  //pagination variables:
  const classes = useStyles()
  const { page } = paginator
  const totalPages = getTotalPages(songs.length)
  const { index, songsToShow } = getSongsToShow(page, songs)
  
  //style attributes:
  const gridView = isListView ? '' : 'playlist-container'
  const fadeMain = isModalSong ? 'fade-out' : 'fade-in'
  const fadeModal = isModalSong ? 'fade-in' : 'fade-out'
  return (
    <section>
      <div className={`main-container ${fadeMain}`}>
        {!isModalSong ? <Search onSetSearch={onSetSearch} /> : ''}
        {!isModalSong && songs && songs.length ? (
         
            <div className={`${gridView}`}>
              <SongList
                songs={songsToShow}
                index={index}
                isListView={isListView}
                onLoadSong={onLoadSong}
              />
            </div>
        
        ) : (
          ''
        )}
        <div className='btn-group'>
          {songsToShow && songsToShow.length ? (
            <Pagination
              count={totalPages}
              size='medium'
              page={page}
              shape='rounded'
              onChange={onSwitchPage}
              classes={{ ul: classes.ul }}
            />
          ) : (
            ''
          )}
          <div className="btn-view">
            <button disabled={isListView} onClick={() => toggleListView()}>
              <ViewList />
            </button>
            <button disabled={!isListView} onClick={() => toggleListView()}>
              <GridView />
            </button>
          </div>
        </div>
      </div>
      {isModalSong && currSong ? (
        <div
          className={`modal-container ${fadeModal}`}
          onClick={() => onCloseModal()}
        >
          <SongModal song={currSong} />
        </div>
      ) : (
        ''
      )}
    </section>
  )
}

export default MainApp
