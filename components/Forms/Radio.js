import React, { useEffect, useState } from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import PropTypes from 'prop-types'
import CommonInput from './Input'
import { Grid } from '@mui/material'

const CommonRadioButton = (props) => {
  const {
    title,
    list,
    row,
    propOnChange,
    propValue,
    otherSpacing,
    otherSpacingValue,
    paymentValues,
    error
  } = props

  const [localValue, setLocalValue] = useState(propValue)
  const isSpacing = title.toLowerCase().includes('spacing')
  const handleLocalValue = (event) => {
    setLocalValue(parseInt(event.target.value))
  }

  useEffect(() => {
    if (typeof propOnChange === 'function') {
      propOnChange(localValue)
    }
  }, [localValue])

  const renderOtherInput = (value) => {
    if (isSpacing) {
      return value === 2
    }
  }

  const setInputLabel = () => {
    if (isSpacing) {
      return 'Please specify'
    }
  }

  return (
    <FormControl sx={{
      width: 'stretch',
      alignItems: 'left'
    }} size="small">
      {
        title !== '' && <FormLabel
        sx={{
          fontSize: '18px',
          paddingLeft: '10px',
          fontWeight: 'medium',
          color: '#000',
          textAlign: 'center'
        }}
        id="demo-radio-buttons-group-label">
          {title}
        </FormLabel>
      }
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        row={row}
        value={localValue}
        onChange={handleLocalValue}
      >
        {
          list.map((item, index) => (
            <FormControlLabel
              key={index}
              value={item.id}
              control={<Radio size="small" sx={{ padding: '6px' }} />}
              sx={{
                margin: 0,
                '> .MuiFormControlLabel-label': {
                  width: '100%'
                }
              }}
              label={
                <Grid container spacing={0}>
                  <Grid item xs={8} sx={{ alignSelf: 'center' }}>
                    {item.text}
                  </Grid>
                  <Grid item xs={4} sx={{ textAlign: 'right', fontWeight: 'bold', color: 'green', fontSize: '24px' }}>
                    {paymentValues && paymentValues[index]}
                  </Grid>
                </Grid>
                // <div style={{ display: 'flex', width: '100%' }}>
                //   <span style={{ flex: '1' }}>{item.text}</span>
                //   <span>{paymentValues && paymentValues[index]}</span>
                // </div>
              }
            />
          ))
        }
      </RadioGroup>
      {
        renderOtherInput(localValue)
          ? <CommonInput
              title={setInputLabel()}
              type='text'
              propValue={otherSpacingValue}
              propOnChange={otherSpacing}
              error={error}
              />
          : <></>
      }
    </FormControl>
  )
}

CommonRadioButton.propTypes = {
  title: PropTypes.string,
  list: PropTypes.array,
  row: PropTypes.bool,
  error: PropTypes.bool,
  propValue: PropTypes.any,
  otherSpacingValue: PropTypes.any,
  propOnChange: PropTypes.func,
  otherSpacing: PropTypes.func,
  paymentValues: PropTypes.array
}

export default CommonRadioButton
