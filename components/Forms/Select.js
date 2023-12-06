import React, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import PropTypes from 'prop-types'

const CommonSelect = (props) => {
  const {
    title,
    list,
    propValue,
    propOnChange
  } = props

  const [localValue, setLocalValue] = useState(propValue)
  const isDeadline = title.toLowerCase().includes('timezone')
  const handleChange = (event) => {
    setLocalValue(event.target.value)
  }

  useEffect(() => {
    if (typeof propOnChange === 'function') {
      propOnChange(localValue)
    }
  }, [localValue])

  return (
    <FormControl sx={{
      m: isDeadline ? 0 : 1,
      width: 'stretch'
    }} size="small">
      <InputLabel id="demo-select-small-label">{title}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={localValue}
        label={title}
        onChange={handleChange}
      >
        {
          list.map((item, index) => (
            <MenuItem key={index} value={item.id}>{item.text}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  )
}

CommonSelect.propTypes = {
  title: PropTypes.string,
  list: PropTypes.array,
  currentTimezone: PropTypes.func,
  propValue: PropTypes.any,
  propOnChange: PropTypes.func
}

export default CommonSelect
