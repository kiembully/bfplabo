import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import Stack from '@mui/material/Stack'
// import Typography from '@mui/material/Typography'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { FormControl, FormLabel } from '@mui/material'
import CommonSelect from './Select'
import { TimezoneList } from '../../constants/order.constants'
import PropTypes from 'prop-types'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('America/New_York')

const TIMEZONES = TimezoneList

const CommonTimeDatePicker = (props) => {
  const {
    title,
    propValue,
    propOnChange,
    timezone,
    handleTimezone,
    propOnChangeLocal
  } = props
  const [value, setValue] = useState(dayjs(propValue))

  const [currentTimezone, setCurrentTimezone] = useState(timezone)

  // function filterTimezonesById (timezones, id) {
  //   return timezones.filter((timezone) =>
  //     timezone.id === id
  //   )
  // }

  useEffect(() => {
    if (typeof handleTimezone === 'function') {
      handleTimezone(currentTimezone)
    }
  }, [currentTimezone])

  useEffect(() => {
    const date = new Date(`${value.$M + 1}/${value.$D}/${value.$y} ${value.$H}:${value.$m}:${value.$ms}`)
    if (typeof propOnChange === 'function') {
      propOnChange(date)
      // propOnChange(dayjs.tz(date, filterTimezonesById(TIMEZONES, currentTimezone)[0].text))
    }
  }, [value])

  useEffect(() => {
    if (typeof propOnChangeLocal === 'function') {
      propOnChangeLocal(dayjs.tz(value, 'Asia/Singapore'))
    }
  }, [value])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormControl sx={{
        m: 0,
        width: 'stretch',
        margin: '8px'
      }}>
        <FormLabel
        sx={{
          marginBottom: '10px',
          paddingLeft: '7px',
          fontSize: '14px'
        }}
        component="legend">
          {title}
        </FormLabel>
        <Stack spacing={2}>
          <CommonSelect
            title='Select timezone'
            list={TIMEZONES}
            propValue={currentTimezone}
            propOnChange={setCurrentTimezone}
          />
          <DateTimePicker
            title={title}
            value={value}
            onChange={setValue}
            disablePast
            sx={{
              '.MuiInputBase-input': {
                padding: '8.5px 14px'
              }
            }}
          />
        </Stack>
      </FormControl>
    </LocalizationProvider>
  )
}

CommonTimeDatePicker.propTypes = {
  title: PropTypes.string,
  propValue: PropTypes.any,
  timezone: PropTypes.any,
  propOnChange: PropTypes.func,
  handleTimezone: PropTypes.func,
  propOnChangeLocal: PropTypes.func
}

export default CommonTimeDatePicker
