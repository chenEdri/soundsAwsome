//@ts-nocheck
// necessary core imports:
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactPlayer from 'react-player/youtube'

//functionality:
import { youtubeService } from '../services/youtube.service'
import { utilService } from '../services/util.service'
import { eventBusService } from '../services/eventBus.service'
import { loadSong, saveSongToPlay } from '../store/action/song.action'

// style:
import ReactLoading from 'react-loading'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import VolumeMuteIcon from '@material-ui/icons/VolumeMute'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import AllInclusive from '@material-ui/icons/AllInclusive'

export function Player() {
  const { songs } = useSelector((state) => state.songReducer)
  const song = useSelector((state) => state.songReducer.currSong)
  let removeEventBus = []
  //player initialize buttons :
  const playerRef = useRef()
  const [isReady, setIsReady] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isSeeking, setIsSeeking] = useState(false)
  const [isKeepListening, setIsKeepListening] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const [duration, setDuration] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timePlayed, setTimePlayed] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    removeEventBus = eventBusService.on('play-song', (song) => {
      song = { ...song, isPlaying: true }
      dispatch(saveSongToPlay(song))
    })
    if (playerRef && song) {
      song.isPlaying || isKeepListening
        ? setIsPlaying(true)
        : setIsPlaying(false)
      playerRef.current?.seekTo(timePlayed)
    }
    return () => {
      removeEventBus = null
    }
  }, [isSeeking, song, songs])

  const getSongToPlay = (idx) => {
    dispatch(loadSong(songs[idx].id, true))
  }

  //functions:
  //when the player is ready to be plaed it activate this func
  const onReady = () => setIsReady(true)

  // get curr sec and return prefixed to player show
  const showTime = (seconds) => {
    var mins
    var secs
    if (+seconds >= 60) {
      mins = parseInt(seconds / 60).toString()
      secs = parseInt(seconds - mins * 60)
        .toString()
        .padStart(2, '0')
    } else {
      mins = '0'
      secs = parseInt(seconds).toString().padStart(2, '0')
    }
    return `${mins}:${secs}`
  }

  // switching playin and pause buttons
  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  // handle volume changed by the user
  const handleVolumeChange = (volume) => setVolume(+volume)

  // switch between mute and unmute
  const toggleMute = () => setIsMuted(!isMuted)

  // switch to infinite mode so the user can listen without the need to click the play button
  const toggleInfinitListening = () => setIsKeepListening(!isKeepListening)

  // informing the App aplication to change to song is playing to the next one
  const getNextSong = () => {
    const idx = utilService.findIdxById(songs, song.id)
    if (idx && idx < songs.length) getSongToPlay(idx + 1)
  }

  // informing the App aplication to change to song is playing to the previous one
  const getPrevSong = () => {
    const idx = utilService.findIdxById(songs, song.id)
    if (idx) getSongToPlay(idx - 1)
  }

  // update the time has been played with a default interval that run in the player
  const handleProgress = (ev) => {
    if (!isSeeking) {
      setTimePlayed(ev.playedSeconds.toFixed(2))
    }
  }

  // update the duration of the song after it has been changed by the user
  const handleDurationChange = ({ target }) => {
    setTimePlayed(parseInt(target.value))
  }

  // changing the boolean variant to true will do two things:
  // 1. Enable the user to change the stram time a new value
  // 2. Prevent the automatic interval function to chang the streaming to another value
  const handleSeekMouseDown = () => {
    setIsSeeking(true)
  }

  // changing the boolean variant to flase will make the automatic interval to be activate again
  const handleSeekMouseUp = () => {
    setIsSeeking(false)
  }

  // update the duration of the song after it has been loaded to the player
  const handleDuration = (duration) => setDuration(duration)

  const validateSong = () => {
    return song && song.hasOwnProperty('snippet')
  }

  if (!validateSong()) return <ReactLoading type={'cubes'} color='#a22b44' />
  const infintClr = isKeepListening ? 'infinite' : ''
  const _title = youtubeService._titleSimplify(song.snippet.title)
  return (
    <section className='player-youtube youtube-vue'>
      <React.Fragment>
        <ReactPlayer
          ref={playerRef}
          hidden='hidden'
          className='player player-fragment hidden'
          width='640px'
          height='360px'
          url={
            `https://www.youtube.com/watch?v=${song?.id}` ||
            'https://www.youtube.com/watch?v=KDIbpeu9Ccw'
          }
          playing={isPlaying}
          controls={false}
          volume={volume}
          muted={isMuted}
          onReady={onReady}
          // onEnded={handleEnded}
          onProgress={handleProgress}
          onDuration={handleDuration}
        />
        <div className='player-left flex'>
          <img src={song.snippet.thumbnails.default.url} alt='#' />
          <div className='overflow-hidden'>
            <span>{_title || ''}</span>
          </div>
        </div>
        <div className='player-main'>
          <div className='actions'>
            <button
              disabled={!songs || !songs.length}
              // className='player-ctrl-btn flex align-center'
              title='Previous'
              onClick={() => getPrevSong()}
            >
              <SkipPreviousIcon />
            </button>
            <button
              className=''
              title={isPlaying ? 'Pause' : 'Play'}
              onClick={togglePlay}
            >
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </button>
            <button
              disabled={!songs || !songs.length}
              // className='player-ctrl-btn flex align-center'
              title='Next'
              onClick={() => getNextSong()}
            >
              <SkipNextIcon />
            </button>
          </div>
          <div className='durations flex space-between'>
            {!isReady ? (
              <ReactLoading type={'cubes'} color='#a22b44' />
            ) : (
              <React.Fragment>
                {/* <div className='song-time flex align-center space-between'> */}
                <p>{showTime(timePlayed)}</p>
                <input
                  className='duration-slider'
                  type='range'
                  name='played'
                  min={0}
                  max={duration}
                  onChange={handleDurationChange}
                  onMouseDown={handleSeekMouseDown}
                  onMouseUp={handleSeekMouseUp}
                  value={timePlayed}
                />

                {duration && <p>{showTime(duration + 1)}</p>}
                {/* </div> */}
              </React.Fragment>
            )}
          </div>
        </div>
        <div className='player-right'>
          <button
            className={`${infintClr}`}
            onClick={() => toggleInfinitListening()}
          >
            <AllInclusive />
          </button>
          <button
            // className='player-ctrl-btn flex justify-center align-center'
            title={isMuted ? 'Unmute' : 'Mute'}
            onClick={toggleMute}
          >
            {isMuted ? <VolumeMuteIcon /> : <VolumeUpIcon />}
          </button>

          <input
            className={`volume-slider ${isMuted ? 'muted' : ''}`}
            type='range'
            default={0.7}
            min={0}
            step={0.05}
            max={1}
            onChange={(ev) => handleVolumeChange(ev.target.value)}
            value={volume}
          />
        </div>
      </React.Fragment>
    </section>
  )
}
