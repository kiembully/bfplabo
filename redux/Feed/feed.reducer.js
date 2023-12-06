import {
  FEED_LOADING,
  FEED_SET,
  FEED_ERROR,
  FEED_PAGE,
  FEED_UPDATING
} from './feed.action-types'

const INITIAL_STATE = {
  data: null,
  loading: false,
  updating: false,
  error: false,
  isDataFetched: false,
  page: 1
}

const feedReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FEED_LOADING: {
      return {
        ...state,
        loading: action.payload
      }
    }
    case FEED_UPDATING: {
      return {
        ...state,
        updating: action.payload
      }
    }
    case FEED_SET: {
      return {
        ...state,
        data: action.payload,
        isDataFetched: true
      }
    }
    case FEED_ERROR: {
      return {
        ...state,
        error: action.payload
      }
    }
    case FEED_PAGE: {
      return {
        ...state,
        page: action.payload
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default feedReducer
