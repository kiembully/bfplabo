import {
  OFFICER_LOADING,
  OFFICER_ENTRY,
  OFFICER_ERROR,
  OFFICER_MESSAGE,
  OFFICER_LIST
} from './officer.action-types'

const INITIAL_STATE = {
  loading: false,
  incomingList: [],
  masterList: [],
  error: false,
  message: ''
}

const officerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OFFICER_LOADING: {
      return {
        ...state,
        loading: action.payload
      }
    }
    case OFFICER_ENTRY: {
      return {
        ...state,
        incomingList: action.payload
      }
    }
    case OFFICER_LIST: {
      return {
        ...state,
        masterList: action.payload
      }
    }
    case OFFICER_ERROR: {
      return {
        ...state,
        error: action.payload
      }
    }
    case OFFICER_MESSAGE: {
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

export default officerReducer
