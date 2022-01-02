import { storageService } from './async-storage.service'
import { getObjectKey, updateObjByKey, addToExlusiveArr } from './util.service'

//key for the local storage
const STORAGE_KEY = 'history'

/**
 * @typedef {import ('../services/song.service').SongToShow} SongToShow 
 */

/**
 * Defining History Obeject :
 * @typedef {Object} History
 * @property {Array<VisitedSong>} visitedSongs - the songs the user visited before
 * @property {Array<SearchList>} searchList - the user searches and results
 * @property {UserHistory} lastUserhistory - the user preferences
 */

/**
 * Defining VisitedSong Obeject:
 * @typedef {Object} VisitedSong - Object of song properties
 * @property {String} kind - name of the kind of object from youtube api
 * @property {String} etag - etag of the object
 * @property {String} id - id of the object
 * @property {Object} snippet - includes the most common keys we use in this app. Include main properties such as title, description, thumbnails , publish time etc. 
 * @property {Object} contentDetails - includes the content information about the object
 * @property {Boolean} isPlaying - informing if this song has been called to play durind the save action
 */

/**
 * Defining SearchList Obeject :
 * @typedef {Object} SearchList
 * @property {String} search - the user search input
 * @property {Array<SongToShow>} res -the results of the search
 */

/** 
 * Defining UserHistory Obeject :
 * @typedef {Object} UserHistory
 * @property {Boolean} isListView - Informing the user preference view of results
 * @property {String} [lastSearch] - the last user search
 * @property {Number} page - the page number this user is currently on
 * @property {Boolean} isDarkTheme -Informing the user preference of the app theme
 */


// Initialization:
const defaultHistory = {
  searchList: [],
  visitedSongs: [],
  lastUserhistory: {
    page: 0,
    isListView: false,
    lastSearch: '',
    isDarkTheme: true,
  },
}

// check if there isn't history add default object to the storage service
if (!localStorage.history)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultHistory))

/**
 * @property {Function} loadHistory
 * @returns {Promise<any>} - loading the history from the local storge
 */
async function loadHistory() {
  return await storageService.query(STORAGE_KEY)
}

// async function getByKey(key) {
//   key = getObjectKey(key)
//   let res = await storageService.query(STORAGE_KEY)
//   return res[key]
// }

/**
 * @property {Function} - addSearch
 * @param {SearchList} search
 */
async function addSearch(search) {
  let history = await storageService.query(STORAGE_KEY)
  let { searchList } = history
  // searchList = addToExlusiveArr(searchList, search)
  searchList.unshift(search)
  await storageService.putObj(STORAGE_KEY, 'searchList', searchList)
}

/**
 * @property {Function} addVisitedSong
 * @param {VisitedSong} song
 */
async function addVisitedSong(song) {
  let history = await storageService.query(STORAGE_KEY)
  const { visitedSongs } = history
  visitedSongs.push(song)
  await storageService.putObj(STORAGE_KEY, 'visitedSongs', visitedSongs)
}

/**
 * @property {Function} saveUserHistory
 * @param {String} key -key name in order to find one of the keys values
 * @param {any} val - any value of the user object
 * @returns {Promise<History>} - the history object
 */

async function saveUserHistory(key, val) {
  try {
    let history = await storageService.query(STORAGE_KEY)
    /**@type any */
    let { lastUserhistory } = history
    lastUserhistory = updateObjByKey(lastUserhistory, key, val)
    const changedHistory = await storageService.putObj(
      STORAGE_KEY,
      'lastUserhistory',
      lastUserhistory
    )
    return changedHistory
  } catch (err) {
    console.error(err)
  }
}

/**
 * @property {Function} clearHistory - Clear the history of the user
 */

function clearHistory() {
  storageService.removeEntity(STORAGE_KEY)
}

export const historyService = {
  loadHistory,
  // getByKey,
  addSearch,
  addVisitedSong,
  clearHistory,
  saveUserHistory,
}
