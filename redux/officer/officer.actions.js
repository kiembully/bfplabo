// import { authGetHandler, authSubmitHandler } from '../../helper/axios.helper'
import { authGetHandler, authSubmitHandler } from '../../helper/axios.helper'
import {
  OFFICER_LOADING,
  OFFICER_ENTRY,
  OFFICER_ERROR,
  OFFICER_MESSAGE,
  OFFICER_LIST
} from './officer.action-types'

export const setOfficerEntryAction = (payload) => ({
  type: OFFICER_ENTRY,
  payload
})

export const setOfficerListAction = (payload) => ({
  type: OFFICER_LIST,
  payload
})

export const setOfficerLoadingAction = (payload) => ({
  type: OFFICER_LOADING,
  payload
})

export const setOfficerErrorAction = (payload) => ({
  type: OFFICER_ERROR,
  payload
})

export const setOfficerMessageAction = (payload) => ({
  type: OFFICER_MESSAGE,
  payload
})

export const submitOfficer = (payload) => async (dispatch) => {
  dispatch(setOfficerLoadingAction(true))
  await authSubmitHandler('officer/register', payload).then((res) => {
    dispatch(setOfficerMessageAction(res.data.message))
    dispatch(setOfficerLoadingAction(false))
    dispatch(setOfficerErrorAction(false))

    dispatch(setOfficerEntryAction(res.data))
  }).catch(err => {
    dispatch(setOfficerMessageAction(err.response.data.message))
    dispatch(setOfficerLoadingAction(false))
    dispatch(setOfficerErrorAction(true))
  })
}

export const getOfficers = (payload) => async (dispatch) => {
  dispatch(setOfficerLoadingAction(true))
  await authGetHandler('officer', '').then((res) => {
    // const sortedOrder = res.data.officers.sort((a, b) => new Date(b.deadline) - new Date(a.deadline))
    dispatch(setOfficerMessageAction('Officers retrieved!'))
    dispatch(setOfficerLoadingAction(false))
    dispatch(setOfficerErrorAction(false))

    dispatch(setOfficerListAction(res.data.officers))
  }).catch(err => {
    console.log(err)
    dispatch(setOfficerMessageAction('Error in retrieving officers'))
    dispatch(setOfficerLoadingAction(false))
    dispatch(setOfficerErrorAction(true))
  })
}

export const setSubmitOfficerError = (payload) => async (dispatch) => {
  dispatch(setOfficerErrorAction(payload))
}

// export const addOfficer = (payload) => async (dispatch) => {
//   dispatch(loginLoadingAction(true))
//   await authSubmitHandler('users/register', payload).then((res) => {
//     // localStorage.setItem('USER_TYPE', payload.userType)
//     localStorage.setItem('USER_ID', res.data.user.id)
//     // localStorage.setItem('MY_ORDERS', res.data.user.orders)
//     dispatch(loginEntryAction(res.data.user))
//     dispatch(loginMessageAction('Registration completed.'))
//     dispatch(loginLoadingAction(false))
//   }).catch(err => {
//     if (err.response) {
//       dispatch(loginMessageAction(err.response.data.message))
//     } else {
//       dispatch(loginMessageAction('Network Error. Please try again later.'))
//     }
//     dispatch(loginErrorAction(true))
//     dispatch(loginLoadingAction(false))
//   })
// }

// export const getUserById = (payload) => async (dispatch) => {
//   dispatch(loginLoadingAction(true))
//   await authGetHandler('users', payload).then((res) => {
//     dispatch(loginEntryAction(res.data.user))
//     dispatch(loginMessageAction('Signup successfully completed.'))
//     dispatch(loginLoadingAction(false))
//   }).catch(err => {
//     if (err.response) {
//       dispatch(loginMessageAction(err.response.data.message))
//     } else {
//       dispatch(loginMessageAction('Network Error. Please try again later.'))
//     }
//     dispatch(loginErrorAction(true))
//     dispatch(loginLoadingAction(false))
//   })
// }

// export const setLoginError = (payload) => async (dispatch) => {
//   dispatch(loginErrorAction(payload))
// }

// export const clickLogout = (payload) => (dispatch) => {
//   dispatch(loginEntryAction(payload))
//   dispatch(loginLoadingAction(false))
//   dispatch(loginErrorAction(false))
//   dispatch(loginMessageAction(''))
// }
