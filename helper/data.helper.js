export const formatDateToReadable = (date) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const dayOfWeek = daysOfWeek[date.getUTCDay()]
  const month = months[date.getUTCMonth()]
  const day = date.getUTCDate()
  const year = date.getUTCFullYear()
  const hours = date.getUTCHours()
  const minutes = date.getUTCMinutes()
  const seconds = date.getUTCSeconds()
  // const timeZoneOffset = date.getTimezoneOffset()
  // const timeZoneOffsetHours = Math.floor(Math.abs(timeZoneOffset) / 60)
  // const timeZoneOffsetMinutes = Math.abs(timeZoneOffset) % 60
  // const timeZoneSign = timeZoneOffset >= 0 ? '-' : '+'

  // const timeZoneString = `${timeZoneSign}${String(timeZoneOffsetHours).padStart(2, '0')}:${String(timeZoneOffsetMinutes).padStart(2, '0')}`

  return `${dayOfWeek} ${month} ${day} ${year} ${hours}:${minutes}:${seconds}`
}

export const searchInObjectsArray = (array, searchString) => {
  const results = []

  array.forEach((item) => {
    for (const key in item) {
      if (typeof item[key] === 'string' && item[key].includes(searchString)) {
        results.push(item)
        break
      } else if (typeof item[key] === 'object') {
        for (const subKey in item[key]) {
          if (typeof item[key][subKey] === 'string' && item[key][subKey].includes(searchString)) {
            results.push(item)
            break
          }
        }
      }
    }
  })

  return results
}

export const jsonToFormData = (json, formData) => {
  for (const key in json) {
  // eslint-disable-next-line no-prototype-builtins
    if (json.hasOwnProperty(key) && key !== 'files') {
      if (key === 'deadline' || key === 'deadlineInPh') {
        // Handle the 'deadline' field separately
        const deadlineDate = new Date(json[key])
        formData.append(key, deadlineDate.toISOString())
      } else if (typeof json[key] === 'object' && json[key] !== null) {
        // Handle nested objects recursively
        for (const nestedKey in json[key]) {
          // eslint-disable-next-line no-prototype-builtins
          if (json[key].hasOwnProperty(nestedKey)) {
            const formKey = `${key}[${nestedKey}]`
            formData.append(formKey, json[key][nestedKey])
          }
        }
      } else {
        formData.append(key, json[key])
      }
    }
  }

  return formData
}
