import React, { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { FormControl } from '@mui/material'
import PropTypes from 'prop-types'
import { isNumberZero } from '../../helper/validation.helper'

const CommonInput = (props) => {
  const {
    title,
    type,
    multiline,
    rows,
    helperText,
    propValue,
    propOnChange,
    error
  } = props

  const [localValue, setLocalValue] = useState(propValue)
  const [localValueHasError, setLocalValueError] = useState(false)
  const handleLocalValue = (event) => {
    // local validations
    handleLocalValidation(event.target.value)
    setLocalValue(event.target.value)
  }

  useEffect(() => {
    if (error) {
      handleLocalValidation(localValue)
    }

    if (typeof propOnChange === 'function') {
      let newValue = localValue
      if (type === 'number') {
        newValue = parseInt(localValue)
      }
      propOnChange(newValue)
    }
  }, [localValue, error])

  useEffect(() => {
    setLocalValue(propValue)
  }, [propValue])

  const handleLocalValidation = (value) => {
    if (title === 'Search for ID, Services, topics, subjects, details or status') {
      setLocalValueError(false)
      return
    }

    if (type === 'number') {
      if (title === 'Number of Pages') {
        setLocalValueError(isNumberZero(value))
      } else {
        setLocalValueError(value < 0)
      }
    } else {
      setLocalValueError(value.length <= 0)
    }
  }

  return (
    <FormControl sx={{
      m: title.toLowerCase().includes('many?') ? 0 : 1,
      width: 'stretch'
    }}
    size="small">
      <Stack
        component="form"
        spacing={2}
        noValidate
        autoComplete="off"
      >
        <TextField
          error={localValueHasError}
          type={type}
          label={title}
          id={`Form ${title} input`}
          size="small"
          multiline={multiline}
          rows={rows}
          helperText={helperText}
          value={localValue}
          onChange={handleLocalValue}
        />
      </Stack>
    </FormControl>
  )
}

CommonInput.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  multiline: PropTypes.bool,
  error: PropTypes.bool,
  rows: PropTypes.number,
  helperText: PropTypes.string,
  propValue: PropTypes.any,
  propOnChange: PropTypes.func
}

export default CommonInput
