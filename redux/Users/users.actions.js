import { authGetHandler } from '../../helper/axios.helper'
import {
  USERS_LOADING,
  USERS_DATA,
  USERS_ERROR,
  USERS_MESSAGE,
  USERS_SINGLE
} from './users.actions-type'

export const usersEntryAction = (payload) => ({
  type: USERS_DATA,
  payload
})

export const usersLoadingAction = (payload) => ({
  type: USERS_LOADING,
  payload
})

export const usersErrorAction = (payload) => ({
  type: USERS_ERROR,
  payload
})

export const usersMessageAction = (payload) => ({
  type: USERS_MESSAGE,
  payload
})

export const usersSingleAction = (payload) => ({
  type: USERS_SINGLE,
  payload
})

export const getUserByType = (payload) => async (dispatch) => {
  dispatch(usersLoadingAction(true))
  await authGetHandler('users/usertype', payload).then((res) => {
    dispatch(usersEntryAction(res.data))
    dispatch(usersMessageAction('Success!'))
    dispatch(usersLoadingAction(false))
  }).catch(err => {
    if (err.response) {
      dispatch(usersMessageAction(err.response.data.message))
    } else {
      dispatch(usersMessageAction('Network Error. Please try again later.'))
    }
    dispatch(usersErrorAction(true))
    dispatch(usersLoadingAction(false))
  })
}

export const getUserByCreatorsId = (payload) => async (dispatch) => {
  dispatch(usersLoadingAction(true))
  await authGetHandler('users', payload).then((res) => {
    dispatch(usersSingleAction(res.data))
    dispatch(usersMessageAction('Success!'))
    dispatch(usersLoadingAction(false))
  }).catch(err => {
    if (err.response) {
      dispatch(usersMessageAction(err.response.data.message))
    } else {
      dispatch(usersMessageAction('Network Error. Please try again later.'))
    }
    dispatch(usersErrorAction(true))
    dispatch(usersLoadingAction(false))
  })
}
