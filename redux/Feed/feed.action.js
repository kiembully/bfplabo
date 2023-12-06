import axiosHelper from '../../helper/axios.helper'

import {
  FEED_LOADING,
  FEED_SET,
  FEED_ERROR,
  FEED_PAGE,
  FEED_UPDATING
} from './feed.action-types'

export const feedLoadingAction = (payload) => ({
  type: FEED_LOADING,
  payload
})

export const feedUpdatingAction = (payload) => ({
  type: FEED_UPDATING,
  payload
})

export const setFeed = (payload) => ({
  type: FEED_SET,
  payload
})

export const feedErrorAction = (payload) => ({
  type: FEED_ERROR,
  payload
})

export const feedPageAction = (payload) => ({
  type: FEED_PAGE,
  payload
})

export const feedInitializeAction = (page) => async (dispatch) => {
  try {
    dispatch(feedLoadingAction(true))
    axiosHelper(page, 'base').then((res) => {
      dispatch(setFeed(res.data))
      localStorage.setItem('CURRENT_FEED', JSON.stringify(res.data))
      dispatch(feedLoadingAction(false))
    })
  } catch (error) {
    console.log(error)
  }
}

export const feedUpdateAction = (payload) => async (dispatch) => {
  try {
    dispatch(feedUpdatingAction(true))
    const page = payload.newPage
    const data = payload.data
    axiosHelper(page).then((res) => {
      console.log(payload)
      dispatch(setFeed(data.concat(res.data)))
      localStorage.setItem('CURRENT_FEED', JSON.stringify(data.concat(res.data)))
      dispatch(feedUpdatingAction(false))
    })
  } catch (error) {
    console.log(error)
  }
}
