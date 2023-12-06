import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
// import FormHelperText from '@mui/material/FormHelperText'
import Checkbox from '@mui/material/Checkbox'
import CommonInput from './Input'
import PropTypes from 'prop-types'

const CommonCheckbox = (props) => {
  const {
    title,
    propValue,
    propOnChange,
    handleChartNumber,
    chartNumber,
    error
  } = props
  const [state, setState] = useState(propValue)
  const [totalChart, setTotalChart] = useState(chartNumber)

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    })
  }

  useEffect(() => {
    if (typeof propOnChange === 'function') {
      propOnChange(state)
    }
  }, [state])

  useEffect(() => {
    if (typeof handleChartNumber === 'function') {
      handleChartNumber(totalChart)
    }
  }, [totalChart])

  const { chart, plagiarism, abstract } = state

  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl sx={{ margin: '0 12px', width: 'stretch' }} component="fieldset" variant="standard">
        <FormLabel sx={{
          fontSize: '14px',
          paddingLeft: '7px'
        }}
        component="legend">
          {title}
        </FormLabel>
        <FormGroup>
          <div style={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <div style={{ flex: 'auto' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={chart}
                    onChange={handleChange}
                    name="chart"
                  />
                }
                label="Chart"
              />
            </div>
            <div>
              {
                chart && <CommonInput
                            title="How many?"
                            type="number"
                            propValue={totalChart}
                            propOnChange={setTotalChart}
                            error={error}
                          />
              }
            </div>
          </div>
          <FormControlLabel
            control={
              <Checkbox
                checked={plagiarism}
                onChange={handleChange}
                name="plagiarism"
              />
            }
            label="Turnitin Report"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={abstract}
                onChange={handleChange}
                name="abstract"
              />
            }
            label="Abstract Page"
          />
        </FormGroup>
        {/* <FormHelperText>Be careful</FormHelperText> */}
      </FormControl>
    </Box>
  )
}

CommonCheckbox.propTypes = {
  title: PropTypes.string,
  propValue: PropTypes.any,
  propOnChange: PropTypes.func,
  handleChartNumber: PropTypes.func,
  chartNumber: PropTypes.number,
  error: PropTypes.bool
}

export default CommonCheckbox
