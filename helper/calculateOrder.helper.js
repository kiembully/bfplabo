import {
  writingPricePerPageList,
  editingPricePerPageList,
  slidePricePerPageList,
  rewritePricePerPageList,
  WritersAcademicLevelList2
} from '../constants/order.constants'
import { getTextValueById } from './renderOrder.helper'

export const calculateOrder = (type, level, deadline, spacing) => {
  // console.log(type, level, deadline)
  switch (type) {
    case 'writing': {
      return getPricing(level, deadline, spacing, writingPricePerPageList)
    }
    case 'editing': {
      return getPricing(level, deadline, spacing, editingPricePerPageList)
    }
    case 'proofreading': {
      return getPricing(level, deadline, spacing, rewritePricePerPageList)
    }
    case 'powerpoint': {
      return getPricing(level, deadline, spacing, slidePricePerPageList)
    }
    case 'other': {
      return 'Other'
    }
  }
}

const getPricing = (level, deadline, spacing, obj) => {
  const lev = getTextValueById(level, WritersAcademicLevelList2)
  const dline = findNearestDeadline(deadline)
  const multi = spacing === 0 ? 2 : 1

  const data = obj.find(item => item.deadline === dline)
  // Check if the object exists and the level is valid
  if (data && (lev in data)) {
    return data[lev] * multi
  } else {
    return 'Invalid deadline or level'
  }
}

const findNearestDeadline = (inputDate) => {
  const deadlineOptions = [
    '19 days',
    '14 days',
    '10 days',
    '7 days',
    '5 days',
    '4 days',
    '3 days',
    '48 hours',
    '24 hours',
    '12 hours',
    '6 hours',
    '3 hours'
  ]

  const currentDate = new Date()
  const inputTime = inputDate.getTime()
  const timeDifferences = deadlineOptions.map(option => {
    const [value, unit] = option.split(' ')
    const milliseconds = unit === 'days' ? parseInt(value) * 24 * 60 * 60 * 1000 : parseInt(value) * 60 * 60 * 1000
    return Math.abs(currentDate.getTime() + milliseconds - inputTime)
  })

  const nearestIndex = timeDifferences.indexOf(Math.min(...timeDifferences))
  return deadlineOptions[nearestIndex]
}

export const defaultDiscount = (price) => {
  return price - (price * 0.15)
}
