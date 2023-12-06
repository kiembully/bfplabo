import {
  LOGIN_LOADING,
  LOGIN_ENTRY,
  LOGIN_ERROR,
  LOGIN_MESSAGE
} from './login.action-types'

const INITIAL_STATE = {
  loading: false,
  credentials: {
    id: '',
    name: '',
    email: '',
    password: '',
    userType: 0
  },
  error: false,
  message: ''
}

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_LOADING: {
      return {
        ...state,
        loading: action.payload
      }
    }
    case LOGIN_ENTRY: {
      return {
        ...state,
        credentials: action.payload
      }
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        error: action.payload
      }
    }
    case LOGIN_MESSAGE: {
      return {
        ...state,
        message: action.payload
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default loginReducer
