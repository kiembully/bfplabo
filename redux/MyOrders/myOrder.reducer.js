import {
  MY_ORDERS_LOADING,
  MY_ORDERS_ERROR,
  MY_ORDERS_DATA,
  MY_ORDERS_MESSAGE,
  MY_ORDER_DATA
} from './myOrder.action-types'

// const currentDate = new Date()

const INITIAL_STATE = {
  loading: false,
  data: [],
  // data: [{
  //   orderId: 0,
  //   orderNum: 0,
  //   orderAmount: 0,
  //   userId: 0,
  //   typeOfService: 'writing',
  //   otherTypeOfService: '',
  //   subject: '',
  //   totalPage: 1,
  //   topic: '',
  //   details: '',
  //   sources: 0,
  //   academicLevel: 0,
  //   formatStyle: 0,
  //   paperType: 0,
  //   spacing: 0,
  //   otherSpacing: '',
  //   optionalNeeds: {
  //     chart: false,
  //     plagiarism: false,
  //     abstract: false
  //   },
  //   totalChart: 0,
  //   timezone: 0,
  //   deadline: currentDate.setDate(currentDate.getDate() + 1),
  //   fileUpload: [],
  //   orderStatus: 0,
  //   isFullyPaid: false
  // }],
  singleData: {},
  error: false,
  message: ''
}

const MyOrderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MY_ORDERS_LOADING: {
      return {
        ...state,
        loading: action.payload
      }
    }
    case MY_ORDERS_ERROR: {
      return {
        ...state,
        error: action.payload
      }
    }
    case MY_ORDERS_DATA: {
      return {
        ...state,
        data: action.payload
      }
    }
    case MY_ORDERS_MESSAGE: {
      return {
        ...state,
        message: action.payload
      }
    }
    case MY_ORDER_DATA: {
      return {
        ...state,
        singleData: action.payload
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default MyOrderReducer
