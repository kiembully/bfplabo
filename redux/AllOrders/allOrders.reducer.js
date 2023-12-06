import {
  ALL_ORDERS_ERROR,
  ALL_ORDERS_DATA,
  ALL_ORDERS_MESSAGE,
  ALL_ORDERS_LOADING
} from './allOrders.action-types'

const INITIAL_STATE = {
  loading: false,
  error: false,
  data: [],
  message: ''
}

const AllOrdersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ALL_ORDERS_ERROR: {
      return {
        ...state,
        error: action.payload
      }
    }
    case ALL_ORDERS_DATA: {
      return {
        ...state,
        data: action.payload
      }
    }
    case ALL_ORDERS_MESSAGE: {
      return {
        ...state,
        message: action.payload
      }
    }
    case ALL_ORDERS_LOADING: {
      return {
        ...state,
        loading: action.payload
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default AllOrdersReducer
