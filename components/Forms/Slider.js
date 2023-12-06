import React, { useEffect, useState } from 'react'
import Slider from '@mui/material/Slider'
import { FormControl, FormLabel, Grid, TextField } from '@mui/material'
import PropTypes from 'prop-types'

const CommonSlider = (props) => {
  const {
    title,
    propValue,
    propChange,
    min,
    max
  } = props
  const [localValue, setLocalValue] = useState(propValue)
  const handleLocalValue = (event) => {
    setLocalValue(event.target.value)
  }

  useEffect(() => {
    if (typeof propChange === 'function') {
      propChange(localValue)
    }
  }, [localValue])

  const isMax = (val) => {
    return max <= val
  }

  return (
    <FormControl sx={{
      m: 1,
      width: 'stretch',
      padding: '0 8px'
    }}
    size="small">
      <FormLabel
        sx={{
          fontSize: '16px'
        }}
        id="demo-radio-buttons-group-label">
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 'auto' }}>{title}</div>
            <div>{isMax(localValue) ? 'Other' : localValue}</div>
          </div>
      </FormLabel>
      <Grid container spacing={2}>
        <Grid item xs={isMax(localValue) ? 8 : 12}>
          <Slider
            aria-label="Deadline"
            defaultValue={0}
            onChange={handleLocalValue}
            step={1}
            marks
            min={min}
            max={max}
          />
        </Grid>
        <Grid item xs={4} sx={{ display: isMax(localValue) ? 'inline' : 'none' }}>
          <TextField type='number' size='small' min={11} value={localValue} onChange={handleLocalValue} />
        </Grid>
      </Grid>
    </FormControl>
  )
}

CommonSlider.propTypes = {
  title: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  propValue: PropTypes.number,
  propChange: PropTypes.func
}

export default CommonSlider
