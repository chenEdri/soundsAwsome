import { historyService } from '../../services/history.service'

/**
 * Defining Search Object
 * @returns @typedef {Object} Search Object
 * @property {String} search - the input picked by the user
 * @property {Array<Object>} res - array of the result items from the Api
 */

export function loadHistory(){
  return async dispatch => {
    const history = await historyService.loadHistory()
    dispatch({type: 'SET_HISTORY', history})
  }
}

/**
 * @property {Function} addSearch
 * @param {Search} search 
 * @returns {Promise<void>|any}
 */
export function addSearch(search){
  return async dispatch =>{
    await historyService.addSearch(search);
    dispatch({ type: 'ADD_SEARCH', search })
  }
}

export function addVisitedSong(song){
  return async dispatch =>{
    await historyService.addSearch(song);
    dispatch({ type: 'ADD_VISITED_SONGS', song })
  }
}

/**
 * @property {Function} saveUserHistory
 * @param {String} type - the type that dispatch later to the reducer
 * @param {String} key - the key value will use to find which object key should we update. likewise- obj[key] 
 * @param {any} val - the value we will update inside the history object
 * @returns {Promise<void>| any}
 */
export function saveUserHistory(type, key, val){
  return async dispatch =>{
    const changedHistory = await historyService.saveUserHistory(key, val)
    dispatch({type, res: changedHistory.lastUserhistory})
  }
}

/**
 * 
 * @returns {Promise<void>|any}
 */
export function clearHistory() {
    return async dispatch => {
        await historyService.clear()
        dispatch({ type: 'CLEAR_HISTORY' })
      };
}

