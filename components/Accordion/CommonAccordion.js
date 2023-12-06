import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import { Grid } from '@mui/material'

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
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '18px', color: '#05595B' }} />}
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

const CommonAccordion = (props) => {
  const {
    data
  } = props

  const [expanded, setExpanded] = useState('')

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <Grid
      container
      spacing={2}
    >
      <Grid item md={6} xs={12}>
      {
        data.map((list, index) => {
          return index <= 3 && (
            <Accordion
              sx={{
                marginBottom: index === 3 ? '0' : '20px',
                borderRadius: '7px',
                border: '1px solid #05595B',
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
                    '@media (max-width: 900px)': {
                      fontSize: '16px'
                    }
                  }}
                >
                  {list.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{
                  '@media (max-width: 900px)': {
                    fontSize: '14px'
                  }
                }}>
                  {list.text}
                </Typography>
              </AccordionDetails>
            </Accordion>
          )
        })
      }
      </Grid>
      <Grid item md={6} xs={12}>
      {
        data.map((list, index) => {
          return index > 3 && (
            <Accordion
              sx={{
                marginBottom: '20px',
                borderRadius: '7px',
                border: '1px solid #05595B',
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
                  '@media (max-width: 900px)': {
                    fontSize: '16px'
                  }
                }}
              >
                {list.title}
              </Typography>
            </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{
                  '@media (max-width: 900px)': {
                    fontSize: '14px'
                  }
                }}>
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

CommonAccordion.propTypes = {
  data: PropTypes.array
}

export default CommonAccordion
