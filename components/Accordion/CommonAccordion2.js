import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
// import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import { Grid } from '@mui/material'
import TaskAltIcon from '@mui/icons-material/TaskAlt'

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:before': {
    display: 'none'
  }
}))

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    // expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '18px', color: '#05595B' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, .05)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1)
  }
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)'
}))

const CommonAccordion2 = (props) => {
  const {
    data
  } = props

  const [expanded, setExpanded] = useState('panel1')

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <Grid
      container
      spacing={2}
    >
      <Grid item xs={12}>
      {
        data.map((list, index) => {
          return (
            <Accordion
              sx={{
                marginBottom: 0,
                border: '0',
                borderLeft: (expanded === `panel${index + 1}`) ? '2px solid #05595B' : '2px solid #B3F6D8',
                backgroundColor: 'transparent',
                transition: 'all 0.2s ease',
                color: '#0C312E',
                ':hover': {
                  backgroundColor: '#F8F8F8'
                }
              }}
              key={`accordion-${index + 1}`}
              expanded={expanded === `panel${index + 1}`}
              onChange={handleChange(`panel${index + 1}`)}
            >
              <AccordionSummary
                aria-controls={`panel${index + 1}d-content`}
                id={`panel${index + 1}d-header`}
              >
                <Typography
                  variant='h3'
                  sx={{
                    fontSize: '18px',
                    fontWeight: 'medium',
                    display: 'flex',
                    textAlign: 'left',
                    alignItems: 'center',
                    justifyItems: 'center',
                    width: '100%'
                  }}
                >
                  <span style={{
                    flex: '1'
                  }}>
                    {list.title}
                  </span>
                  <div style={{
                    background: '#D6D6D6',
                    borderRadius: '100%',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyItems: 'center',
                    marginRight: '4px'
                  }}>
                    <TaskAltIcon sx={{ color: '#52A7C1' }} />
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ textAlign: 'left', pl: '10px' }}>
                  {list.text}
                </Typography>
              </AccordionDetails>
            </Accordion>
          )
        })
      }
      </Grid>
    </Grid>
  )
}

CommonAccordion2.propTypes = {
  data: PropTypes.array
}

export default CommonAccordion2
