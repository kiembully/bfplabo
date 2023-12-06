import { INITIAL_STATE } from '../../constants/order.constants'
import { authGetHandler, authSubmitHandler, authUpdateHandler } from '../../helper/axios.helper'
import {
  ORDER_LOADING,
  ORDER_ERROR,
  ORDER_STEPS,
  ORDER_DATA,
  ORDER_MESSAGE
} from './order.action-types'

export const OrderEntryAction = (payload) => ({
  type: ORDER_STEPS,
  payload
})

export const OrderLoadingAction = (payload) => ({
  type: ORDER_LOADING,
  payload
})

export const OrderErrorAction = (payload) => ({
  type: ORDER_ERROR,
  payload
})

export const OrderDataAction = (payload) => ({
  type: ORDER_DATA,
  payload
})

export const OrderMessageAction = (payload) => ({
  type: ORDER_MESSAGE,
  payload
})

export const SetStepAction = (payload) => async (dispatch) => {
  localStorage.setItem('CURRENT_STEP', payload)
  dispatch(OrderEntryAction(payload))
}

export const SetOrderData = (payload) => async (dispatch) => {
  dispatch(OrderDataAction(payload))
}

export const SetOrderError = (payload) => async (dispatch) => {
  dispatch(OrderErrorAction(payload))
}

export const SetOrderMessage = (payload) => async (dispatch) => {
  dispatch(OrderMessageAction(payload))
}

export const getOrderByUserId = (payload) => async (dispatch) => {
  dispatch(OrderLoadingAction(true))
  await authGetHandler('orders/user', payload).then((res) => {
    dispatch(OrderLoadingAction(false))
    dispatch(OrderErrorAction(false))
    dispatch(OrderEntryAction(res.data.orders))
    // localStorage.setItem('MY_ORDERS', JSON.stringify(res.data.orders))
  }).catch(err => {
    dispatch(OrderMessageAction(err.response.data.message))
    dispatch(OrderLoadingAction(false))
    dispatch(OrderErrorAction(true))
  })
}

export const submitOrder = (payload) => async (dispatch) => {
  dispatch(OrderLoadingAction(true))
  await authSubmitHandler('orders', payload).then((res) => {
    dispatch(OrderMessageAction(res.data.message))
    dispatch(OrderLoadingAction(false))
    dispatch(OrderErrorAction(false))
    dispatch(OrderDataAction(res.data))
    localStorage.setItem('NEW_ORDER_MESSAGE', (res.data.message))
    localStorage.setItem('NEW_ORDER_ID', (res.data.order._id))
  }).catch(err => {
    dispatch(OrderMessageAction(err.response.data.message))
    dispatch(OrderLoadingAction(false))
    dispatch(OrderErrorAction(true))
    localStorage.setItem('NEW_ORDER_MESSAGE', (err.response.data.message))
    localStorage.removeItem('NEW_ORDER_ID')
  })
}

export const editOrder = (payload) => async (dispatch) => {
  dispatch(OrderLoadingAction(true))
  await authUpdateHandler('orders', payload).then((res) => {
    // console.log(res)
    dispatch(OrderMessageAction(res.data.message))
    dispatch(OrderLoadingAction(false))
    dispatch(OrderErrorAction(false))
    dispatch(OrderDataAction(res.data))
    localStorage.setItem('NEW_ORDER_MESSAGE', (res.data.message))
    localStorage.setItem('NEW_ORDER_ID', (res.data.order._id))
    localStorage.removeItem('EDIT_ORDER')
  }).catch(err => {
    dispatch(OrderMessageAction(err.response.message))
    dispatch(OrderLoadingAction(false))
    dispatch(OrderErrorAction(true))
    localStorage.setItem('NEW_ORDER_MESSAGE', (err.response.message))
    localStorage.removeItem('NEW_ORDER_ID')
  })
}

export const editOrderByAssignedWriter = (payload) => async (dispatch) => {
  dispatch(OrderLoadingAction(true))
  await authUpdateHandler('orders/updateOrderByAssignedWriter', payload).then((res) => {
    console.log(res)
    dispatch(OrderMessageAction(res.data.message))
    dispatch(OrderLoadingAction(false))
    dispatch(OrderErrorAction(false))
    dispatch(OrderDataAction(res.data))
    localStorage.setItem('NEW_ORDER_MESSAGE', (res.data.message))
    localStorage.setItem('NEW_ORDER_ID', (res.data.order._id))
    localStorage.removeItem('EDIT_ORDER')
  }).catch(err => {
    dispatch(OrderMessageAction(err.response.message))
    dispatch(OrderLoadingAction(false))
    dispatch(OrderErrorAction(true))
    localStorage.setItem('NEW_ORDER_MESSAGE', (err.response.message))
    localStorage.removeItem('NEW_ORDER_ID')
  })
}

export const resetNewOrder = () => async (dispatch) => {
  dispatch(OrderMessageAction(''))
  dispatch(OrderLoadingAction(false))
  dispatch(OrderErrorAction(false))
  dispatch(OrderDataAction(INITIAL_STATE.data))
  dispatch(OrderEntryAction(0))
  localStorage.removeItem('NEW_ORDER_MESSAGE')
  localStorage.removeItem('NEW_ORDER_ID')
  localStorage.removeItem('EDIT_ORDER')
  localStorage.setItem('CURRENT_STEP', 0)
}
