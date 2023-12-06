import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
// import FavoriteIcon from '@mui/icons-material/Favorite'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PropTypes from 'prop-types'
import { Box, Grid } from '@mui/material'
import { renderOptionalNeeds, renderOrderKeyNames, renderOrderValues } from '../../helper/renderOrder.helper'
import Swal from 'sweetalert2'
import styles from './order.module.scss'
import { connect } from 'react-redux'
import { compose } from '@reduxjs/toolkit'
import { SetOrderData, SetStepAction, editOrder } from '../../redux/Order/order.actions'
import { useRouter } from 'next/router'
import Toastify from '../Notifs/Toastify'
import { success } from '../../helper/notify.helper'
import { calculateOrder, defaultDiscount } from '../../helper/calculateOrder.helper'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}))

const OrderCard = (props) => {
  const {
    order,
    isCollapsed,
    setStep,
    setOrderData,
    key,
    user
  } = props
  const [expanded, setExpanded] = useState(isCollapsed)
  const router = useRouter()
  const [payload, setPayload] = useState(order)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleEditOrder = (order) => {
    if (order.isFullyPaid && user.credentials.userType !== 2) {
      Swal.fire({
        title: 'Unable to edit order.',
        icon: 'error',
        html: 'Please contact our support at <a href="mailto:support@cleversally.com">support@cleversally.com</a>.',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#1976d2',
        customClass: {
          title: styles.customDialogTitle,
          container: styles.customDialogTitle
        }
      })
      return
    }

    Swal.fire({
      title: 'Edit this order?',
      showCancelButton: true,
      confirmButtonText: 'Edit',
      confirmButtonColor: '#1976d2',
      customClass: {
        title: styles.customDialogTitle
      }
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem('EDIT_ORDER', true)
        handleConfirmEdit(order)
      } else {
        localStorage.removeItem('EDIT_ORDER')
      }
    })
  }

  const handlePreview = (id) => {
    // if (router.pathname === '/myOrder/[id]') {
    //   router.back()
    //   return
    // }

    router.push(`viewOrder/${id}`)
  }

  const handleConfirmEdit = (order) => {
    const payload = order
    setStep(0)
    setOrderData(payload)
    router.push('/order')
  }

  const renderSubHeader = (data) => {
    const deadline = new Date(data)
    return `Due: ${deadline.toLocaleString()}`
  }

  const renderDataFields = (data) => {
    return Object.entries(data).map(([key, value]) => {
      if (typeof value === 'object' && !Array.isArray(value)) {
        // If the value is an object (e.g., optionalNeeds), recursively call the function
        return null
      } else {
        if (
          router.asPath === '/order' && (
            key === 'price' ||
            key === 'discountedPrice' ||
            key === 'coupon' ||
            key === 'discount' ||
            key === 'writer' ||
            key === 'deadlineInph'
          )
        ) {
          return null
        } else if (
          router.asPath.includes('/myOrder') && key === 'deadlineInPh'
        ) {
          return null
        } else if (
          key === 'clientFiles' || key === 'writerFiles' || key === 'transactionLog' || key === 'paymentDetails'
        ) {
          return null
        } else {
          // Otherwise, render the key-value pair
          return (
            key !== '_id' &&
            key !== '__v' &&
            key !== 'creator' &&
            key !== 'deadlineInPh' &&
            key !== 'userId' &&
            key !== 'orderNum') && (
            <React.Fragment key={key}>
              <Grid item xs={5} sx={{ alignSelf: 'center' }}>
                <p style={{ margin: 0 }}>{renderOrderKeyNames(key)}</p>
              </Grid>
              <Grid item xs={7} sx={{ textAlign: 'right' }}>
                <p style={{ margin: 0, textTransform: 'capitalize' }}>{renderOrderValues(key, value)}</p>
              </Grid>
            </React.Fragment>
          )
        }
      }
    })
  }

  const renderTitle = (order) => {
    // if (router.asPath.includes('/viewOrder')) {
    //   return (
    //     <span>
    //       Order Details
    //     </span>
    //   )
    // }

    if (order.id) {
      return (
        <span>
          ID: {order.id.slice(0, order.id.length - 10) + '...'}
        </span>
      )
    } else {
      return (
        <span>
          Price: ${order.price}
        </span>
      )
    }
  }

  const setOrderStatusTheme = (status) => {
    switch (status) {
      case 'draft': {
        return '#DFCFBE'
      }
      case 'invoice': {
        return '#fdffcd'
      }
      case 'in_progress': {
        return '#0088FE'
      }
      case 'completed': {
        return '#00C49F'
      }
      case 'cancelled': {
        return '#FFBB28'
      }
      default: {
        return '#FF8042'
      }
    }
  }

  const copyToClipBoard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        success('Text copied to clipboard')
      })
  }

  const handlePayload = (obj, key, value) => {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      obj[key] = value
    } else {
      obj[key] = value
    }
    setPayload(obj)
    setOrderData(obj)
  }

  useEffect(() => {
    if (router.pathname === '/order') {
      handlePayload(
        payload,
        'price',
        (defaultDiscount(calculateOrder(order.typeOfService, order.academicLevel, order?.deadline, order?.spacing) * order.totalPage)).toFixed(2)
      )
    } else {
      setPayload(order)
    }
  }, [order])

  return (
    <Card sx={{
      width: 'auto',
      padding: '5px',
      border: `4px solid ${setOrderStatusTheme(payload.orderStatus)}`,
      borderRadius: '17px',
      marginBottom: '12px',
      boxShadow: '0 5px 13px rgba(64,85,196,.14)'
    }}
    key={key}
    >
      <CardHeader
      sx={{ padding: '10px' }}
        action={
          <IconButton aria-label="settings" onClick={() => copyToClipBoard(payload.id)}>
            <ContentCopyIcon />
          </IconButton>
        }
        title={renderTitle(payload)}
        subheader={renderSubHeader(payload.deadline)}
      />
      {
        router.asPath !== '/order' &&
        <CardActions disableSpacing sx={{ padding: '0 5px' }}>
          {/* <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton> */}
          {
            (router.asPath !== '/admin' && router.asPath !== '/assignedOrders') && <IconButton
              sx={{
                display: (payload.orderStatus === 'draft' || user.credentials.userType === 2) ? 'flex' : 'none'
              }}
              aria-label='share'
              onClick={() => handleEditOrder(payload)}
            >
              <EditIcon />
            </IconButton>
          }
          {
            (router.pathname !== '/viewOrder/[id]') &&
              <IconButton aria-label='share' onClick={() => handlePreview(payload.id)} >
                <VisibilityIcon />
              </IconButton>
          }
          <span style={{
            fontSize: '12px',
            flex: '1 1 auto',
            textAlign: 'right'
          }}>See {expanded ? 'less' : 'more'}</span>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      }
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph><strong>Order Details:</strong></Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
              {renderDataFields(payload)}
              <Grid item xs={5}>
                <p style={{ margin: '7px 0' }}>Chart</p>
                <p style={{ margin: '7px 0' }}>Plagiarism</p>
                <p style={{ margin: '7px 0' }}>Abstract</p>
              </Grid>
              <Grid item xs={7} sx={{ textAlign: 'right' }}>
                <p style={{ margin: '7px 0' }}>{renderOptionalNeeds(payload?.optionalNeeds?.chart)}</p>
                <p style={{ margin: '7px 0' }}>{renderOptionalNeeds(payload?.optionalNeeds?.plagiarism)}</p>
                <p style={{ margin: '7px 0' }}>{renderOptionalNeeds(payload?.optionalNeeds?.abstract)}</p>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Collapse>
      <Toastify />
    </Card>
  )
}

OrderCard.propTypes = {
  isCollapsed: PropTypes.bool,
  order: PropTypes.object,
  user: PropTypes.object,
  newOrder: PropTypes.object,
  setStep: PropTypes.func,
  setOrderData: PropTypes.func,
  editOrder: PropTypes.func,
  key: PropTypes.any
}

const enhanced = compose(
  connect(
    (state) => ({
      newOrder: state.newOrder,
      user: state.login
    }),
    (dispatch) => ({
      setStep: (_data) => dispatch(SetStepAction(_data)),
      setOrderData: (_data) => dispatch(SetOrderData(_data)),
      editOrder: (_data) => dispatch(editOrder(_data))
    })
  )
)

export default enhanced(OrderCard)
