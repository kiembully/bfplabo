import {
  EMAIL_DATA,
  EMAIL_LOADING,
  EMAIL_MESSAGE
} from './email.actions'

const INITIAL_STATE = {
  loading: false,
  data: {
    from: '',
    to: '',
    subject: '',
    text: ''
  },
  message: ''
}

const emailReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_DATA: {
      return {
        ...state,
        data: action.payload
      }
    }
    case EMAIL_LOADING: {
      return {
        ...state,
        loading: action.payload
      }
    }
    case EMAIL_MESSAGE: {
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

export default emailReducer
