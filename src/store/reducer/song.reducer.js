const initalPaginator = {
  count: 6,
  page: 1,
}

const initialState = {
  songs: [],
  currSong: null,
  paginator: initalPaginator,
  isListView: true,
}

export function songReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_SONGS':
      return {
        ...state,
        songs: action.songs,
      }
    case 'SET_SONG':
      return {
        ...state,
        currSong: action.song,
      }
    case 'REMOVE_SONG':
      return {
        ...state,
        songs: state.songs.filter((song) => song._id !== action._id),
      }
    case 'EDIT_SONG':
      return {
        ...state,
        songs: state.songs.map((song) =>
          song.id === action.savedSong.id ? action.savedSong : song
        ),
      }
    case 'ADD_SONG':
      return {
        ...state,
        songs: state.songs.push(action.savedSong),
      }
    case 'SET_PAGE':
      return {
        ...state,
        paginator: { ...state.paginator, page: action.page },
      }
    case 'SET_VIEW':
      return {
        ...state,
        isListView: action.isListView,
      }
    default:
      return state
  }
}
