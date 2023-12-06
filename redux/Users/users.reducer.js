import {
  USERS_LOADING,
  USERS_DATA,
  USERS_ERROR,
  USERS_MESSAGE,
  USERS_SINGLE
} from './users.actions-type'

const INITIAL_STATE = {
  loading: false,
  data: [],
  user: [],
  error: false,
  message: ''
}

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USERS_LOADING: {
      return {
        ...state,
        loading: action.payload
      }
    }
    case USERS_DATA: {
      return {
        ...state,
        data: action.payload
      }
    }
    case USERS_ERROR: {
      return {
        ...state,
        error: action.payload
      }
    }
    case USERS_MESSAGE: {
      return {
        ...state,
        message: action.payload
      }
    }
    case USERS_SINGLE: {
      return {
        ...state,
        user: action.payload
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default usersReducer
