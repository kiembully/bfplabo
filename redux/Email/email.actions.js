import { authSubmitHandler } from '../../helper/axios.helper'
import {
  EMAIL_LOADING,
  EMAIL_MESSAGE,
  EMAIL_DATA
} from './email.action-types'

export const emailLoadingActions = (payload) => ({
  type: EMAIL_LOADING,
  payload
})

export const emailMessageActions = (payload) => ({
  type: EMAIL_MESSAGE,
  payload
})

export const emailDataActions = (payload) => ({
  type: EMAIL_DATA,
  payload
})

export const sendEmailInvoice = (payload) => async (dispatch) => {
  dispatch(emailLoadingActions(true))
  await authSubmitHandler('email/invoice', payload).then((res) => {
    dispatch(emailLoadingActions(false))
    console.log(res)
  }).then(err => {
    dispatch(emailLoadingActions(false))
    console.log(err)
  })
}
