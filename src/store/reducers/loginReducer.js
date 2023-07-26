const initialState = {
  logged: false,
  user: {},
  errorState: '',
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOGGED':
      return { ...state, logged: action.payload }
    case 'SET_USER':
      return { ...state, user: action.payload }
    case 'SET_ERROR':
      return { ...state, errorState: action.payload }
    default:
      return state
  }
}

export default loginReducer
