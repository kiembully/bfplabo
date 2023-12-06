import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from '@reduxjs/toolkit'
import { Box, Grid, Paper, Typography } from '@mui/material'
import { getAllOrders } from '../../redux/AllOrders/allOrders.actions'
// import Paper from '@mui/material/Paper'
// import PieCharts from '../Charts/PieCharts'
import { paperBodyStyle, paperHeaderStyle, paperStyle, paperStyle3 } from './dashboard.styles'
import CommonLink from '../LinkButton'
import CommonAreaChart from '../Charts/AreaChart'
import CommonAccordion3 from '../Accordion/CommonAccordion3'
import CommonLineChart from '../Charts/LineChart'
import CommonBarChart from '../Charts/BarChart'

const admin = (props) => {
  const {
    // user,
    allOrders,
    getAllOrders
    // order
  } = props

  useEffect(() => {
    getAllOrders()
  }, [])

  // const [localAllOrders, setLocalAllOrders] = useState()
  // const [draftOrders, setDraftOrders] = useState()
  const [invoiceOrders, setInvoiceOrders] = useState()
  const [inProgressOrders, setInProgressOrders] = useState()
  const [completedOrders, setCompletedOrders] = useState()
  const [cancelledOrders, setCancelledOrders] = useState()
  const [refundedOrders, setRefundedOrders] = useState()

  const handleOrdersByStatus = (status) => {
    const filteredStatus = (object) => object.orderStatus === status
    const ordersByStatus = allOrders.data.filter(filteredStatus)
    return ordersByStatus
  }

  useEffect(() => {
    // setLocalAllOrders(allOrders?.data)
    // setDraftOrders(handleOrdersByStatus('draft'))
    setInvoiceOrders(handleOrdersByStatus('invoice'))
    setInProgressOrders(handleOrdersByStatus('in_progress'))
    setCompletedOrders(handleOrdersByStatus('completed'))
    setCancelledOrders(handleOrdersByStatus('cancelled'))
    setRefundedOrders(handleOrdersByStatus('refunded'))
  }, [allOrders])

  const orderSummaryData = [
    {
      title: 'Pending Invoice',
      data: invoiceOrders,
      value: invoiceOrders && invoiceOrders.length,
      color: '#DFCFBE'
    },
    {
      title: 'In Progress',
      data: inProgressOrders,
      value: inProgressOrders && inProgressOrders.length,
      color: '#0088FE'
    },
    {
      title: 'Completed',
      data: completedOrders,
      value: completedOrders && completedOrders.length,
      color: '#00C49F'
    },
    {
      title: 'Cancelled',
      data: cancelledOrders,
      value: cancelledOrders && cancelledOrders.length,
      color: '#FFBB28'
    },
    {
      title: 'Refunded Orders',
      data: refundedOrders,
      value: refundedOrders && refundedOrders.length,
      color: '#FF8042'
    }
  ]

  return !allOrders.loading && (
    <Grid container spacing={1}>
      <Grid item xs={12} >
        <Paper elevation={3} sx={paperStyle3} >
          <Typography variant="h6">Order Summary</Typography>
          {/* <div style={{
            marginTop: '15px'
          }}>
            {
              orderSummaryData
                ? <div style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <PieCharts data={orderSummaryData} />
                  <div style={{
                    padding: '10px 0 10px 10px'
                  }}>
                    {
                      orderSummaryData.map((list, index) => {
                        return (
                          <p key={`legend-${index}`}
                            style={{
                              flex: 'auto',
                              width: '100%',
                              display: 'flex',
                              fontSize: '10px',
                              whiteSpace: 'nowrap'
                            }}>
                            <div style={{
                              height: '12px',
                              width: '12px',
                              marginRight: '10px',
                              backgroundColor: list.color
                            }}>
                            </div>
                              {list.title}
                          </p>
                        )
                      })
                    }
                  </div>
                </div>
                : <p>Empty</p>
            }
          </div> */}
          <CommonAccordion3 data={orderSummaryData} />
          <CommonLink
          path='/myOrders'
          label='My Orders'
          variant='contained'
          btnStyle={{
            display: 'flex',
            fontSize: '10px',
            backgroundColor: '#52A7C1',
            width: '100%',
            maxWidth: '312px',
            ':hover': {
              backgroundImage: 'linear-gradient(315deg, #B3F6D8, #52A7C1)'
            },
            margin: '0 auto'
          }}
          >
            View all orders
          </CommonLink>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={3} sx={paperStyle3} >
          <Typography variant="h6">Sales Summary</Typography>
          <CommonAreaChart />
        </Paper>
      </Grid>
      <Grid item xs={12} >
        <Paper elevation={3} sx={paperStyle3} >
          <Typography variant="h6">Client Summary</Typography>
          <Box sx={{
            display: 'flex',
            width: '100%',
            flexFlow: 'row',
            '@media (max-width: 600px)': {
              flexFlow: 'column'
            }
          }}>
            <div style={{
              padding: '0 20px'
            }}>
            <Paper elevation={3} sx={paperStyle} >
              <Typography variant="p" sx={paperHeaderStyle}>
                Total Clients
              </Typography>
              <div style={paperBodyStyle}>
                32
              </div>
            </Paper>
            </div>
            <div style={{
              flex: 'auto'
            }}>
              <CommonLineChart />
            </div>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} >
        <Paper elevation={3} sx={paperStyle3} >
          <Typography variant="h6">Writer Summary</Typography>
          <Box sx={{
            display: 'flex',
            width: '100%',
            flexFlow: 'row',
            '@media (max-width: 600px)': {
              flexFlow: 'column'
            }
          }}>
            <div style={{
              padding: '0 20px'
            }}>
              <Paper elevation={3} sx={paperStyle} >
                <Typography variant="p" sx={paperHeaderStyle}>
                  Total Writers
                </Typography>
                <div style={paperBodyStyle}>
                  3
                </div>
              </Paper>
            </div>
            <div style={{
              flex: 'auto'
            }}>
              <CommonBarChart />
            </div>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}

admin.propTypes = {
  login: PropTypes.object,
  allOrders: PropTypes.object,
  getAllOrders: PropTypes.func
}

const enhanced = compose(
  connect(
    (state) => ({
      login: state.login,
      allOrders: state.allOrders
    }),
    (dispatch) => ({
      getAllOrders: (_data) => dispatch(getAllOrders(_data))
    })
  )
)

export default enhanced(admin)
