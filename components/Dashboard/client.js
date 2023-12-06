import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from '@reduxjs/toolkit'
import { Grid, IconButton, Typography } from '@mui/material'
import { getOrdersByUserId } from '../../redux/MyOrders/myOrder.actions'
// import CommonAccordion2 from '../Accordion/CommonAccordion2'
import Paper from '@mui/material/Paper'
import { paperBodyStyle, paperHeaderStyle, paperStyle, paperStyle2, profileWrapStyle } from './dashboard.styles'
import CommonAccordion3 from '../Accordion/CommonAccordion3'
import CommonLink from '../LinkButton'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { success } from '../../helper/notify.helper'
import Toastify from '../Notifs/Toastify'

const client = (props) => {
  const {
    user,
    myOrders,
    getOrdersByUserId
    // order
  } = props

  useEffect(() => {
    getOrdersByUserId(user.id)
  }, [])

  const [localmyOrders, setLocalmyOrders] = useState()
  const [draftOrders, setDraftOrders] = useState()
  const [invoiceOrders, setInvoiceOrders] = useState()
  const [inProgressOrders, setInProgressOrders] = useState()
  const [completedOrders, setCompletedOrders] = useState()
  const [cancelledOrders, setCancelledOrders] = useState()
  const [refundedOrders, setRefundedOrders] = useState()
  // const []

  const handleOrdersByStatus = (status) => {
    const filteredStatus = (object) => object.orderStatus === status
    const ordersByStatus = myOrders.data.filter(filteredStatus)
    return ordersByStatus
  }

  useEffect(() => {
    setLocalmyOrders(myOrders?.data)
    setDraftOrders(handleOrdersByStatus('draft'))
    setInvoiceOrders(handleOrdersByStatus('invoice'))
    setInProgressOrders(handleOrdersByStatus('in_progress'))
    setCompletedOrders(handleOrdersByStatus('completed'))
    setCancelledOrders(handleOrdersByStatus('cancelled'))
    setRefundedOrders(handleOrdersByStatus('refunded'))
  }, [myOrders])

  const orderSummaryData = [
    {
      title: 'Draft Orders:',
      data: draftOrders
    },
    {
      title: 'Pending Invoice:',
      data: invoiceOrders
    },
    {
      title: 'In Progress:',
      data: inProgressOrders
    },
    {
      title: 'Completed:',
      data: completedOrders
    },
    {
      title: 'Cancelled:',
      data: cancelledOrders
    },
    {
      title: 'Draft Orders:',
      data: refundedOrders
    }
  ]

  const copyToClipBoard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        success('Text copied to clipboard')
      })
  }

  return !myOrders.loading && (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        <Paper elevation={3} sx={paperStyle} >
          <Typography variant="p" sx={paperHeaderStyle}>
            { user.name }
          </Typography>
          <div style={profileWrapStyle}>
            <div style={{ flex: 'auto' }}>Email:</div>
            <div>{user.email}</div>
          </div>
          <div style={profileWrapStyle}>
            <div style={{ flex: 'auto' }}>ID:</div>
            <div>
              <IconButton
                aria-label="settings"
                onClick={() => copyToClipBoard(user.id)}
                sx={{
                  ':hover': {
                    backgroundImage: 'linear-gradient(315deg, #B3F6D8, #52A7C1)',
                    color: '#fff'
                  }
                }}
              >
                <ContentCopyIcon />
              </IconButton>
              {user.id}
            </div>
          </div>
          <CommonLink
            path='/dashboard'
            label='Edit profile'
            variant='contained'
            btnStyle={{
              fontSize: '10px',
              backgroundColor: '#52A7C1',
              width: '100%',
              maxWidth: '312px',
              marginTop: '10px',
              ':hover': {
                backgroundImage: 'linear-gradient(315deg, #B3F6D8, #52A7C1)'
              }
            }}
            >
              Edit Profile
          </CommonLink>
        </Paper>
      </Grid>
      <Grid item sm={4} xs={12}>
        <Paper elevation={3} sx={paperStyle} >
          <Typography variant="p" sx={paperHeaderStyle}>
            Total Orders
          </Typography>
          <div style={paperBodyStyle}>
            {localmyOrders?.length}
          </div>
          <CommonLink
          path='/order'
          label='New Order'
          variant='contained'
          btnStyle={{
            fontSize: '10px',
            backgroundColor: '#52A7C1',
            width: '100%',
            maxWidth: '312px',
            ':hover': {
              backgroundImage: 'linear-gradient(315deg, #B3F6D8, #52A7C1)'
            }
          }}
          >
            PLACE NEW ORDER
          </CommonLink>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={3} sx={paperStyle2} >
          <Typography variant="p" sx={paperHeaderStyle}>
            Orders Summary
          </Typography>
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
              margin: '20px auto'
            }}
          >
            View all orders
          </CommonLink>
        </Paper>
      </Grid>
      <Toastify />
    </Grid>
  )
}

client.propTypes = {
  login: PropTypes.object,
  myOrders: PropTypes.object,
  getOrdersByUserId: PropTypes.func
}

const enhanced = compose(
  connect(
    (state) => ({
      login: state.login,
      myOrders: state.myOrders
    }),
    (dispatch) => ({
      getOrdersByUserId: (_data) => dispatch(getOrdersByUserId(_data))
    })
  )
)

export default enhanced(client)
