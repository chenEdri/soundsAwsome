// necessary core imports:
import { useEffect, useState } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// components:
import { Header } from './cmps/Header'
import { Footer } from './cmps/Footer'
import ScrollToTop from './cmps/ScrollToTop'
import { Player } from './cmps/music/Player'
import routes from './router'

// functionality:
import { loadSong, saveSongToPlay } from './store/action/song.action'
import { loadHistory, saveUserHistory } from './store/action/history.action'
import { eventBusService } from './services/eventBus.service'

function App() {
  const { lastUserhistory } = useSelector((state) => state.historyReducer)
  const { songs, currSong } = useSelector((state) => state.songReducer)
  const [isPlayerVisible, setIsPlayerVisible] = useState(false)
  const { isDarkTheme } = lastUserhistory
  const dispatch = useDispatch()
  let removeEventBus = []

  useEffect(() => {
    if(currSong && currSong.id && !isPlayerVisible) setIsPlayerVisible(true)
    if (!lastUserhistory) dispatch(loadHistory())
    removeEventBus = eventBusService.on('play-song', (song) => {
      song = { ...song, isPlaying: true }
      dispatch(saveSongToPlay(song))
      setIsPlayerVisible(true)
    })
    return () => {
      removeEventBus = null
    }
  }, [lastUserhistory, currSong])

  const toggleDarkMode = () => {
    dispatch(
      saveUserHistory('SET_LAST_USER_HISTORY', 'isDarkTheme', !isDarkTheme)
    )
  }
  const getSongToPlay = (idx) => {
    dispatch(loadSong(songs[idx].id, true))
  }

  const bgc = isDarkTheme ? 'dark-bgc' : 'li-bgc'
  return (
    <div className={`App ${bgc}`}>
      <Router>
        <Header toggleDarkMode={toggleDarkMode} />
        <Switch>
          {routes.map((route) => (
            <Route
              key={route.path}
              exact
              component={route.component}
              path={route.path}
            />
          ))}
        </Switch>
        <ScrollToTop />
      </Router>
      {currSong && isPlayerVisible ? (
        <div className="play-bar">
        <Player song={currSong} songs={songs} getSongToPlay={getSongToPlay} />
        </div>
      ) : (
        <Footer />
      )}
    </div>
  )
}
export default App
