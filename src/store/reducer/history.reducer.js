const initialState = {
  searchList: [],
  visitedSongs: [],
  lastUserhistory: {
    page: 0,
    isListView: false,
    lastSearch: '',
    isDarkTheme: true,
  },
}

export function historyReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_HISTORY':
      const { searchList, visitedSongs, lastUserhistory } = action.history
      return {
        ...state,
        searchList,
        visitedSongs,
        lastUserhistory,
      }
    case 'SET_SEARCH':
      return {
        ...state,
        searchList: action.res,
      }
    case 'SET_VISITED_SONGS':
      return {
        ...state,
        visitedSongs: action.res,
      }
    case 'SET_LAST_USER_HISTORY':
      return {
        ...state,
        lastUserhistory: action.res,
      }
    case 'ADD_SEARCH':
      const _searchList = state.searchList
      _searchList.unshift(action.searchList)
    return {
        ...state,
        searchList: _searchList,
      }
    case 'ADD_VISITED_SONGS':
      const _visitedSongs = state.visitedSongs
      _visitedSongs.push(action.song)
      return {
        ...state,
        visitedSongs: _visitedSongs,
      }
    case 'CLEAR_HISTORY':
      return {
        state: initialState,
      }
    default:
      return state
  }
}
