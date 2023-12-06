import { authGetHandler } from '../../helper/axios.helper'
import {
  ALL_ORDERS_ERROR,
  ALL_ORDERS_DATA,
  ALL_ORDERS_MESSAGE,
  ALL_ORDERS_LOADING
} from './allOrders.action-types'

export const allOrdersErrorAction = (payload) => ({
  type: ALL_ORDERS_ERROR,
  payload
})
export const allOrdersDataAction = (payload) => ({
  type: ALL_ORDERS_DATA,
  payload
})
export const allOrdersMessageAction = (payload) => ({
  type: ALL_ORDERS_MESSAGE,
  payload
})
export const allOrdersLoadingAction = (payload) => ({
  type: ALL_ORDERS_LOADING,
  payload
})

export const getAllOrders = (query) => async (dispatch) => {
  dispatch(allOrdersLoadingAction(true))
  await authGetHandler('orders', '', query).then((res) => {
    // sorted order by deadline
    const sortedOrder = res.data.orders.sort((a, b) => new Date(b.deadline) - new Date(a.deadline))
    dispatch(allOrdersLoadingAction(false))
    dispatch(allOrdersDataAction(sortedOrder))
    dispatch(allOrdersErrorAction(false))
    dispatch(allOrdersMessageAction('All orders fetched.'))
  }).catch(err => {
    dispatch(allOrdersErrorAction(true))
    dispatch(allOrdersLoadingAction(false))
    dispatch(allOrdersMessageAction(err.response.data.message))
  })
}
