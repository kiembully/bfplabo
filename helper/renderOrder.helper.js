import {
  // TypeOfServicesList,
  WritersAcademicLevelList,
  TypeOfPaperList,
  SpacingList,
  FormatingStyleList,
  TimezoneList,
  OrderStatusList
} from '../constants/order.constants'

const orderKeyNames = {
  typeOfService: 'Type of Service',
  otherTypeOfService: 'Other Service',
  subject: 'Subject',
  totalPage: 'Total Pages',
  topic: 'Topic',
  details: 'Details',
  sources: 'Sources',
  academicLevel: 'Academic Level',
  formatStyle: 'Format Style',
  paperType: 'Paper Type',
  spacing: 'Spacing',
  otherSpacing: 'Other Spacing',
  totalChart: 'Total Chart',
  timezone: 'Timezone',
  deadline: 'Deadline',
  deadlineInPh: 'Deadline (PST)',
  fileUpload: 'Uploaded Files',
  optionalNeeds: 'Optional Needs',
  userId: 'User ID',
  orderStatus: 'Order Status',
  isFullyPaid: 'Payment Status',
  coupon: 'Coupon',
  discount: 'Discount',
  price: 'Price',
  discountedPrice: 'Total Price',
  id: 'Order ID',
  writer: 'Writer'
}

export const renderOptionalNeeds = (val) => {
  return val ? 'Yes' : 'No'
}

export const renderOrderKeyNames = (key) => {
  return orderKeyNames[key]
}

export const renderOrderValues = (key, val) => {
  if (key === 'academicLevel') {
    return getTextValueById(val, WritersAcademicLevelList)
  } else if (key === 'formatStyle') {
    return getTextValueById(val, FormatingStyleList)
  } else if (key === 'discountedPrice') {
    return val.toFixed(2)
  } else if (key === 'paperType') {
    return getTextValueById(val, TypeOfPaperList)
  } else if (key === 'spacing') {
    return getTextValueById(val, SpacingList)
  } else if (key === 'timezone') {
    return getTextValueById(val, TimezoneList)
  } else if (key === 'deadline') {
    const deadline = new Date(val)
    return deadline.toLocaleString()
  } else if (key === 'fileUpload') {
    return 'N/A'
  } else if (key === 'orderStatus') {
    return getTextValueById(val, OrderStatusList)
  } else if (key === 'isFullyPaid') {
    return val ? 'Paid' : 'Unpaid'
  } else if (key === 'deadlineInPh') {
    const deadline = new Date(val)
    return deadline.toLocaleString()
  } else if (key === 'discount') {
    return val + '%'
  } else {
    if (val === '') {
      return 'Not specified'
    }
    return val
  }
}

export const getTextValueById = (id, list) => {
  const selectedLevel = list?.find(item => item.id === id)
  return selectedLevel ? selectedLevel.text : 'Not Found'
}
