//@ts-nocheck
// necessary core imports:
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// components:
import { Header } from './cmps/Header'
import MainApp from './pages/Main'
import UserDashboard from './pages/UserDashboard'
import { Player } from './pages/Player'
import { Footer } from './cmps/Footer'

// functionality:
import { loadHistory, saveUserHistory } from './store/action/history.action'
import { loadSong } from './store/action/song.action'

function App() {
  const { lastUserhistory , visitedSongs } = useSelector((state) => state.historyReducer)
  const { currSong } = useSelector((state) => state.songReducer)
  const { isDarkTheme } = lastUserhistory
  const dispatch = useDispatch()
  

  useEffect(() => {
    if (!lastUserhistory) dispatch(loadHistory())
    if(!currSong && visitedSongs.length) dispatch(loadSong(visitedSongs[0].id, false)) 
  }, [lastUserhistory, visitedSongs])

  const toggleDarkMode = () => {
    dispatch(
      saveUserHistory('SET_LAST_USER_HISTORY', 'isDarkTheme', !isDarkTheme)
    )
  }

  const validateSong = ()=>{
    return (currSong && currSong.hasOwnProperty('snippet'))
  }
 
  const bgc = isDarkTheme ? 'dark-bgc' : 'li-bgc'
  return (
    <div className={`App ${bgc}`}>
      <Header toggleDarkMode={toggleDarkMode} />
      <MainApp />
      {validateSong() ? <div className='play-bar'>
        <Player/>
      </div>: ''}
      <UserDashboard />
    </div>
  )
}
export default App
