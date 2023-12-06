export const calculateDeadlineWithTime = (startDate, startTime, durationInDays, hourValue) => {
  // Validate the input
  if (
    !(startDate instanceof Date) || isNaN(startDate.getTime()) ||
    typeof startTime !== 'string' || !/^([01]\d|2[0-3]):([0-5]\d)$/.test(startTime) ||
    typeof durationInDays !== 'number' || durationInDays < 0
  ) {
    throw new Error('Invalid input. Please provide a valid Date object as the startDate, a valid time in the format "HH:mm", and a positive number of days.')
  }
  const [hours, minutes] = startTime.split(':').map(Number)
  const deadlineDate = new Date(startDate)
  deadlineDate.setDate(deadlineDate.getDate() + durationInDays)
  deadlineDate.setHours(hours + hourValue)
  deadlineDate.setMinutes(minutes)
  deadlineDate.setSeconds(0)
  deadlineDate.setMilliseconds(0)

  return deadlineDate
}

export const getCurrentDateInFormat = () => {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
  const day = currentDate.getDate().toString().padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const getCurrentTimeInFormat = () => {
  const currentDate = new Date()
  const hours = currentDate.getHours().toString().padStart(2, '0')
  const minutes = currentDate.getMinutes().toString().padStart(2, '0')

  return `${hours}:${minutes}`
}

// export const convertHoursToDays = (hours) => {
//   if (typeof hours !== 'number' || hours < 0) {
//     throw new Error('Invalid input. Please provide a positive number of hours.')
//   }

//   const days = hours / 24
//   return days
// }
export const countdownToDate = (targetDate) => {
  const targetTime = new Date(targetDate).getTime()

  // function updateCountdown() {
  const currentTime = new Date().getTime()
  const timeDifference = targetTime - currentTime

  if (timeDifference <= 0) {
    return [
      0,
      0,
      0,
      0
    ]
  }

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

  return [
    days,
    hours,
    minutes,
    seconds
  ]
  // return `${days}d ${hours}h ${minutes}m ${seconds}s`
}
