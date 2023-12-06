export const isOtherInputValid = (other, value) => {
  return other.length <= 0 && (value === 'other' || value === 2)
}

export const isEmpty = (value) => {
  return value.length <= 0
}

export const isWordMinimum = (text, min) => {
  const words = text.trim().split(/\s+/)
  return words.length < min
}

export const isNumberZero = (value) => {
  return value <= 0
}

export const isPasswordValid = (value) => {
  if (value.length < 6) {
    return false
  }
  if (!/\d/.test(value)) {
    return false
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
    return false
  }
  return true
}

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isValidDate = (dateString) => {
  const date = new Date(dateString)
  return date.toString() !== 'Invalid Date'
}

export const isDateWithinThreeHours = (dateString) => {
  // Convert the input date string to a Date object
  const inputDate = new Date(dateString)

  // Get the current date and time
  const currentDate = new Date()

  // Calculate the time difference in milliseconds
  const timeDifference = inputDate - currentDate

  // Calculate the number of milliseconds in three hours
  const threeHoursInMilliseconds = 3 * 60 * 60 * 1000

  // Check if the time difference is less than three hours
  return timeDifference < threeHoursInMilliseconds
}
