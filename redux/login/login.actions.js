import { authGetHandler, authSubmitHandler } from '../../helper/axios.helper'
import {
  LOGIN_LOADING,
  LOGIN_ENTRY,
  LOGIN_ERROR,
  LOGIN_MESSAGE
} from './login.action-types'

export const loginEntryAction = (payload) => ({
  type: LOGIN_ENTRY,
  payload
})

export const loginLoadingAction = (payload) => ({
  type: LOGIN_LOADING,
  payload
})

export const loginErrorAction = (payload) => ({
  type: LOGIN_ERROR,
  payload
})

export const loginMessageAction = (payload) => ({
  type: LOGIN_MESSAGE,
  payload
})

export const clickLogin = (payload) => async (dispatch) => {
  dispatch(loginLoadingAction(true))
  await authSubmitHandler('users/login', payload).then((res) => {
    // localStorage.setItem('USER_TYPE', res.data.user.userType)
    localStorage.setItem('USER_ID', res.data.user.id)
    // localStorage.setItem('MY_ORDERS', res.data.user.orders)
    dispatch(loginEntryAction(res.data.user))
    dispatch(loginMessageAction('Login successfully.'))
    dispatch(loginLoadingAction(false))
    dispatch(loginErrorAction(false))
  }).catch(err => {
    if (err.response) {
      dispatch(loginMessageAction(err.response.data.message))
    } else {
      dispatch(loginMessageAction('Network Error. Please try again later.'))
    }
    dispatch(loginErrorAction(true))
    dispatch(loginLoadingAction(false))
  })
}

export const clickSignup = (payload) => async (dispatch) => {
  dispatch(loginLoadingAction(true))
  await authSubmitHandler('users/signup', payload).then((res) => {
    // localStorage.setItem('USER_TYPE', payload.userType)
    localStorage.setItem('USER_ID', res.data.user.id)
    // localStorage.setItem('MY_ORDERS', res.data.user.orders)
    dispatch(loginEntryAction(res.data.user))
    dispatch(loginMessageAction('Signup successfully completed.'))
    dispatch(loginLoadingAction(false))
  }).catch(err => {
    if (err.response) {
      dispatch(loginMessageAction(err.response.data.message))
    } else {
      dispatch(loginMessageAction('Network Error. Please try again later.'))
    }
    dispatch(loginErrorAction(true))
    dispatch(loginLoadingAction(false))
  })
}

export const getUserById = (payload) => async (dispatch) => {
  dispatch(loginLoadingAction(true))
  await authGetHandler('users', payload).then((res) => {
    dispatch(loginEntryAction(res.data.user))
    dispatch(loginMessageAction('Signup successfully completed.'))
    dispatch(loginLoadingAction(false))
  }).catch(err => {
    if (err.response) {
      dispatch(loginMessageAction(err.response.data.message))
    } else {
      dispatch(loginMessageAction('Network Error. Please try again later.'))
    }
    dispatch(loginErrorAction(true))
    dispatch(loginLoadingAction(false))
  })
}

export const setLoginError = (payload) => async (dispatch) => {
  dispatch(loginErrorAction(payload))
}

export const clickLogout = (payload) => (dispatch) => {
  dispatch(loginEntryAction(payload))
  dispatch(loginLoadingAction(false))
  dispatch(loginErrorAction(false))
  dispatch(loginMessageAction(''))
}
