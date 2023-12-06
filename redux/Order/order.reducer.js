import {
  ORDER_LOADING,
  ORDER_ERROR,
  ORDER_STEPS,
  ORDER_DATA,
  ORDER_MESSAGE
} from './order.action-types'

// const currentDate = new Date()

const INITIAL_STATE = {
  loading: false,
  step: 0,
  data: {
    typeOfService: 'writing',
    otherTypeOfService: '',
    subject: '',
    totalPage: 1,
    topic: '',
    details: '',
    sources: 0,
    academicLevel: 0,
    formatStyle: 0,
    paperType: 0,
    spacing: 1,
    otherSpacing: '',
    optionalNeeds: {
      chart: false,
      plagiarism: false,
      abstract: false
    },
    totalChart: 0,
    timezone: 0,
    deadline: null,
    deadlineInPh: null,
    files: null,
    orderStatus: 'draft',
    isFullyPaid: 0,
    coupon: '',
    discount: '',
    price: 0,
    discountedPrice: 0,
    writer: ''
  },
  error: false,
  message: ''
}

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ORDER_LOADING: {
      return {
        ...state,
        loading: action.payload
      }
    }
    case ORDER_STEPS: {
      return {
        ...state,
        step: action.payload
      }
    }
    case ORDER_ERROR: {
      return {
        ...state,
        error: action.payload
      }
    }
    case ORDER_DATA: {
      return {
        ...state,
        data: action.payload
      }
    }
    case ORDER_MESSAGE: {
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

export default orderReducer
