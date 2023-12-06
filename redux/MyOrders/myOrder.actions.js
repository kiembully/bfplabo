import { authGetHandler, authUpdateHandler } from '../../helper/axios.helper'
import {
  MY_ORDERS_LOADING,
  MY_ORDERS_ERROR,
  MY_ORDERS_DATA,
  MY_ORDERS_MESSAGE,
  MY_ORDER_DATA
} from './myOrder.action-types'

export const MyOrderLoadingAction = (payload) => ({
  type: MY_ORDERS_LOADING,
  payload
})

export const MyOrderErrorAction = (payload) => ({
  type: MY_ORDERS_ERROR,
  payload
})

export const MyOrdersDataAction = (payload) => ({
  type: MY_ORDERS_DATA,
  payload
})

export const MyOrderMessageAction = (payload) => ({
  type: MY_ORDERS_MESSAGE,
  payload
})

export const MySingleOrderDataAction = (payload) => ({
  type: MY_ORDER_DATA,
  payload
})

export const getOrdersByUserId = (payload) => async (dispatch) => {
  dispatch(MyOrderLoadingAction(true))
  await authGetHandler('orders/user', payload).then((res) => {
    const sortedOrder = res.data.orders.sort((a, b) => new Date(b.deadline) - new Date(a.deadline))
    dispatch(MyOrderLoadingAction(false))
    dispatch(MyOrderErrorAction(false))
    dispatch(MyOrdersDataAction(sortedOrder))
    localStorage.setItem('MY_ORDERS', JSON.stringify(res.data.orders))
  }).catch(err => {
    console.log(err)
    dispatch(MyOrderMessageAction('Error in fetching data.'))
    dispatch(MyOrderLoadingAction(false))
    dispatch(MyOrderErrorAction(true))
  })
}

export const getOrderById = (payload) => async (dispatch) => {
  dispatch(MyOrderLoadingAction(true))
  await authGetHandler('orders', payload).then((res) => {
    dispatch(MyOrderLoadingAction(false))
    dispatch(MyOrderErrorAction(false))
    dispatch(MySingleOrderDataAction(res.data.order))
    localStorage.setItem('MY_ORDER', JSON.stringify(res.data.order))
  }).catch(err => {
    console.log(err)
    dispatch(MyOrderLoadingAction(false))
    dispatch(MyOrderMessageAction('Error in fetching data.'))
    dispatch(MyOrderErrorAction(true))
    localStorage.removeItem('MY_ORDER')
  })
}

export const getOrderByWriterId = (payload) => async (dispatch) => {
  dispatch(MyOrderLoadingAction(true))
  await authGetHandler('orders/writer', payload).then((res) => {
    const sortedOrder = res.data.orders.sort((a, b) => new Date(b.deadline) - new Date(a.deadline))
    dispatch(MyOrderLoadingAction(false))
    dispatch(MyOrderErrorAction(false))
    dispatch(MyOrdersDataAction(sortedOrder))
    localStorage.setItem('MY_ORDERS', JSON.stringify(res.data.orders))
  }).catch(err => {
    console.log(err)
    dispatch(MyOrderMessageAction('Error in fetching data.'))
    dispatch(MyOrderLoadingAction(false))
    dispatch(MyOrderErrorAction(true))
  })
}

export const getOrdersByOrderStatus = (payload) => async (dispatch) => {
  dispatch(MyOrderLoadingAction(true))
  await authGetHandler('orders/status', payload).then((res) => {
    const sortedOrder = res.data.orders.sort((a, b) => new Date(b.deadline) - new Date(a.deadline))
    dispatch(MyOrderLoadingAction(false))
    dispatch(MyOrderErrorAction(false))
    dispatch(MyOrdersDataAction(sortedOrder))
    localStorage.setItem('MY_ORDERS', JSON.stringify(res.data.orders))
  }).catch(err => {
    console.log(err)
    dispatch(MyOrderMessageAction('Error in fetching data.'))
    dispatch(MyOrderLoadingAction(false))
    dispatch(MyOrderErrorAction(true))
  })
}

export const editWriterOrderFiles = (payload) => async (dispatch) => {
  dispatch(MyOrderLoadingAction(true))
  await authUpdateHandler('orders/updateWriterFile', payload).then((res) => {
    dispatch(MyOrderMessageAction(res.data.message))
    dispatch(MyOrderLoadingAction(false))
    dispatch(MyOrderErrorAction(false))
    dispatch(MySingleOrderDataAction(res.data))
    localStorage.setItem('MY_ORDER', JSON.stringify(res.data.order))
  }).catch(err => {
    // console.log(err)
    dispatch(MyOrderMessageAction(err.response.data.message))
    dispatch(MyOrderLoadingAction(false))
    dispatch(MyOrderErrorAction(true))
    localStorage.removeItem('MY_ORDER')
    // localStorage.setItem('MY_ORDER_MESSAGE', (err.response.data.message))
    // localStorage.removeItem('NEW_ORDER_ID')
  })
}

export const editClientOrderFiles = (payload) => async (dispatch) => {
  dispatch(MyOrderLoadingAction(true))
  await authUpdateHandler('orders/updateClientFile', payload).then((res) => {
    dispatch(MyOrderMessageAction(res.data.message))
    dispatch(MyOrderLoadingAction(false))
    dispatch(MyOrderErrorAction(false))
    dispatch(MySingleOrderDataAction(res.data))
    localStorage.setItem('MY_ORDER', JSON.stringify(res.data.order))
  }).catch(err => {
    // console.log(err)
    dispatch(MyOrderMessageAction(err.response.data.message))
    dispatch(MyOrderLoadingAction(false))
    dispatch(MyOrderErrorAction(true))
    localStorage.removeItem('MY_ORDER')
    // localStorage.setItem('MY_ORDER_MESSAGE', (err.response.data.message))
    // localStorage.removeItem('NEW_ORDER_ID')
  })
}
