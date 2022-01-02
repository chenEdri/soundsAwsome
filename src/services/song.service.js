import {storageService} from './async-storage.service'
import {youtubeService} from './youtube.service'
import {getExclusiveArr} from './util.service'
const STORAGE_KEY = 'song'


/**
 * Defining SongToShow Obeject :
 * @typedef {Object} SongToShow
 * @property {String} id - the id of the song
 * @property {String} title - the title of the song
 * @property {String} description - the description of the song
 * @property {String} imgUrl - the song image
 */


export const songService = {
  query,
  getById,
  remove,
  updateSongList
}

/**
 * @property {Function} query
 * @param {String} txt 
 * @returns {Promise<Array<SongToShow>>}
 */

async function query(txt) {
  if(!txt.length) return
  let songs = await youtubeService.get(txt)
  await storageService.postMany(STORAGE_KEY, songs)
  return songs
}

/**
 * @property {Function} getById - GET method in order to find one song object by its Id
 * @param {String} songId - The key/attribute we use to find the object with
 * @param {Boolean} isPlaying - The song current status in the player
 * @returns {Promise<SongToShow>} song
 */

async function getById(songId, isPlaying) {
  let song = await youtubeService.getSongById(songId)
  song = {...song.items[0], isPlaying}
  return song
}

/**
 * @property {Function} remove - DELETE method in order to delete on song from the saved list
 * @param {String} songId 
 * @returns {Promise<Void>}
 */

async function remove(songId) {
  return storageService.remove(STORAGE_KEY, songId)
}

/**
 * @property {Function} updateSongList
 * @param {Array<SongToShow>} songs 
 * @returns {Promise<Array<SongToShow>>}
 */

async function updateSongList(songs){
  let newSongList = getExclusiveArr(songs)
  newSongList = _getOrganizedRes(newSongList)
  await storageService.postMany(STORAGE_KEY, newSongList)
  return newSongList
}

/**
 * @property {Function} _getOrganizedRes - Inside function helps to orgenize the object result 
 * @param {Array<Object>} songs - Songs array with all the properties returning from the youtube API
 * @returns {Array<SongToShow>}
 */
function _getOrganizedRes(songs){
  if(!songs[0].hasOwnProperty('snippet')) return songs
  return songs.map(song=>{
      const {id} = song;
      const {title, description,thumbnails} = song.snippet
      return{ 
          id: id.videoId,
          title:title,
          description,
          imgUrl: thumbnails.medium.url
      }   
  })
}


