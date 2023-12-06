import React, { useState } from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import { OrderStatusList } from '../../constants/order.constants'
import PropTypes from 'prop-types'
// import FormLabel from '@mui/material/FormLabel'

const ColorRadioButtons = (props) => {
  const {
    statusFilter,
    handleStatusFilter
  } = props
  const [selectedValue, setSelectedValue] = useState(statusFilter)

  const handleChange = (event) => {
    setSelectedValue(event.target.value)
    handleStatusFilter(event.target.value)
  }

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item }
  })

  return (
    <FormControl
      sx={{
        padding: '0 10px'
      }}
    >
      {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
      <RadioGroup
        row
        aria-labelledby="demo-radio-buttons-group-label"
        value="in_progress"
        name="radio-buttons-group"
      >
        <FormControlLabel
          value=''
          control={
            <Radio
              {...controlProps('')}
              sx={{
                color: 'default',
                '&.Mui-checked': {
                  color: 'default'
                }
              }}
            />}
          label='All'
        />
        {
          OrderStatusList.map((list, index) => {
            return (
              <FormControlLabel
                key={index}
                value={list.text}
                control={
                  <Radio
                    {...controlProps(list.id)}
                    sx={{
                      color: list.color,
                      '&.Mui-checked': {
                        color: list.color
                      }
                    }}
                  />}
                label={list.text}
              />
            )
          })
        }
      </RadioGroup>
    </FormControl>
  )
}

ColorRadioButtons.propTypes = {
  statusFilter: PropTypes.string,
  handleStatusFilter: PropTypes.func
}

export default ColorRadioButtons
