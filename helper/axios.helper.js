import axios from 'axios'

const baseUrl = process.env.NEXT_PUBLIC_FEED_BASE_URL

export const axiosHelper = async (page) => {
  const response = await axios.get(`${baseUrl}=${page}&limit=10`)
  return response
}

export const authSubmitHandler = async (endpoint, payload) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_DEV_BASE_URL}/${endpoint}`, payload)
  return response
}

export const authGetHandler = async (endpoint, param, query) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_DEV_BASE_URL}/${endpoint}/${param}`, { params: query })
  return response
}

export const authUpdateHandler = async (endpoint, param) => {
  const response = await axios.patch(`${process.env.NEXT_PUBLIC_DEV_BASE_URL}/${endpoint}/${param.get('id')}`, param)
  return response
}
