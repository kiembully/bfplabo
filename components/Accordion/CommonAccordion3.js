import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import { Grid } from '@mui/material'
import CommonTable2 from '../Table/CommonTables2'

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

const CommonAccordion3 = (props) => {
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
                    flex: '1',
                    color: list.color ? list.color : '#000'
                  }}>
                    {list.title}
                  </span>
                  {list.data && list.data.length}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0 }}>
                  <CommonTable2 tableData={list.data} />
              </AccordionDetails>
            </Accordion>
          )
        })
      }
      </Grid>
    </Grid>
  )
}

CommonAccordion3.propTypes = {
  data: PropTypes.any
}

export default CommonAccordion3
