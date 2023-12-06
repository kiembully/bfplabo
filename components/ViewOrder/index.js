import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from '@reduxjs/toolkit'
import { Button, Grid, IconButton, Paper, Typography } from '@mui/material'
import styles from './viewOrder.module.scss'
import { countdownToDate } from '../../helper/date.helper'
import { OrderStatusList, PaymentStatusList } from '../../constants/order.constants'
import { getTextValueById } from '../../helper/renderOrder.helper'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { editOrder, editOrderByAssignedWriter } from '../../redux/Order/order.actions'
import OrderCard from '../Card/OrderCard'
import DownloadIcon from '@mui/icons-material/Download'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import { jsonToFormData } from '../../helper/data.helper'
import CommonFileUpload from '../Forms/FileUpload'
import { editClientOrderFiles, editWriterOrderFiles } from '../../redux/MyOrders/myOrder.actions'
import Toastify from '../Notifs/Toastify'
import { getUserByCreatorsId, getUserByType } from '../../redux/Users/users.actions'
import { getUserById } from '../../redux/login/login.actions'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { success } from '../../helper/notify.helper'
import CommnonResponsiveDialog from '../Dialog'
import CommonTable from '../Table/CommonTables'
import { handleOrderTransactionLog, handlePaymentDetails } from '../../helper/orderTransactions.helper'

// import { notify, success } from '../../helper/notify.helper'

const ViewOrder = (props) => {
  const {
    // loading,
    // message,
    // error,
    order,
    newOrder,
    editOrder,
    editOrderByAssignedWriter,
    editWriterOrderFiles,
    editClientOrderFiles,
    user,
    getUserByType,
    partyUsers,
    getUserByCreatorsId
  } = props

  const router = useRouter()

  const [timer, setTimer] = useState([])
  const timeUnit = ['Days', 'Hours', 'Mins', 'Secs']
  const [openDialog, setOpenDialog] = useState(false)
  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleConfirmAction = () => {
    handleCloseDialog()
  }
  const toggleOpenDialog = () => {
    handleOpenDialog()
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (user.credentials.userType === 0) {
        setTimer(countdownToDate(order?.deadline))
      } else {
        setTimer(countdownToDate(order?.deadlineInPh))
      }
    }, [1000])

    return () => clearInterval(interval)
  })

  const [payload, setPayload] = useState(order)
  const handlePayload = (obj, key, value) => {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      obj[key] = value
    } else {
      obj[key] = value
    }
    setPayload(obj)
  }
  const returnPayload = (obj, key, value) => {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      obj[key] = value
    } else {
      obj[key] = value
    }
    return obj
  }

  const [writer, setWriter] = useState('')
  const handleWriter = (arr, key, val) => {
    if (typeof arr === 'object') {
      for (const item of arr) {
        if (item[key] === val) {
          return item
        }
      }
    }
    return null
    // setWriter(arr?.find(item => item[key] === val))
  }
  const [writersList, setWritersList] = useState()
  // const [orderCreator, setOrderCreator] = useState()
  const handleWritersList = (list) => {
    const result = {}
    list.forEach(item => {
      result[item._id] = item.name.toUpperCase()
    })
    return result
  }
  useEffect(() => {
    // to get the users (type 1)
    getUserByType(1)
  }, [])

  useEffect(() => {
    if (user.credentials.userType === 2) {
      if (typeof order.creator !== 'undefined') {
        getUserByCreatorsId(order?.creator)
      }
    }
    console.log(order)
  }, [order])

  const [activityLogs, setActivityLogs] = useState()
  useEffect(() => {
    // initialize logs after reloads and change routes
    if (
      typeof newOrder.transactionLog === 'undefined' ||
      typeof newOrder.data === 'undefined'
    ) {
      // initialize logs after updating order details
      if (Array.isArray(order.transactionLog)) {
        setActivityLogs(order.transactionLog)
      } else {
        setActivityLogs(newOrder?.data?.order?.transactionLog)
      }
    }
  }, [newOrder, order])

  useEffect(() => {
    setWritersList(partyUsers.data.users)
    setWriter(handleWriter(partyUsers.data.users, 'id', order?.writer)?.name)
  }, [partyUsers])

  const handleAssignWriter = (userType) => {
    if (userType === 1) {
      Swal.fire({
        title: 'Apply as writer?',
        showCancelButton: true,
        icon: 'question',
        confirmButtonText: 'Yes',
        confirmButtonColor: '#1976d2',
        customClass: {
          title: styles.customDialogTitle
        }
      }).then((result) => {
        if (result.dismiss) {
          return
        }
        if (result.isConfirmed) {
          let payload
          payload = returnPayload(order, 'writer', user.credentials.id)
          payload = returnPayload(order, 'id', router.query.id)
          payload = returnPayload(order, 'transactionLog', handleOrderTransactionLog(true, order.orderStatus, user.credentials.id, order.isFullyPaid, order.discountedPrice, user.credentials.name))

          handleEditOrderByAssignedWriter(payload)
        }
      })

      return
    }

    Swal.fire({
      title: 'Choose Writer',
      input: 'select',
      inputOptions: handleWritersList(writersList),
      showCancelButton: true,
      confirmButtonText: 'Assign',
      confirmButtonColor: '#1976d2',
      customClass: {
        title: styles.customDialogTitle
      }
    }).then((result) => {
      if (result.dismiss) {
        return
      }
      if (result.isConfirmed) {
        let payload
        payload = returnPayload(order, 'writer', result.value)
        payload = returnPayload(order, 'id', router.query.id)
        payload = returnPayload(order, 'transactionLog', handleOrderTransactionLog(true, order.orderStatus, result.value, order.isFullyPaid, order.discountedPrice, user.credentials.name))

        handleEditOrderByAssignedWriter(payload)
      }
    })
  }

  const handleEditOrderByAssignedWriter = (payload) => {
    const pd = new FormData()
    editOrderByAssignedWriter(jsonToFormData(payload, pd))
    Swal.fire({
      title: 'Processing your request.',
      text: 'Please wait.',
      timer: 3000,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => { Swal.showLoading() },
      customClass: {
        title: styles.customDialogTitle,
        container: styles.customDialogTitle
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        Swal.fire({
          title: newOrder.error ? 'Request Failed' : 'Success!',
          text: newOrder.message,
          icon: newOrder.error ? 'error' : 'success',
          customClass: {
            title: styles.customDialogTitle,
            container: styles.customDialogTitle
          }
        })
      }
    })
  }

  const handleEditOrderResult = (payload) => {
    const pd = new FormData()
    editOrder(jsonToFormData(payload, pd))
    Swal.fire({
      title: 'Processing order status.',
      text: 'Please wait.',
      timer: 3000,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => { Swal.showLoading() },
      customClass: {
        title: styles.customDialogTitle,
        container: styles.customDialogTitle
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        Swal.fire({
          title: newOrder.error ? 'Request Failed' : 'Success!',
          text: newOrder.message,
          icon: newOrder.error ? 'error' : 'success',
          customClass: {
            title: styles.customDialogTitle,
            container: styles.customDialogTitle
          }
        }).then(() => {
          window.location.reload()
        })
      }
    })
  }

  const handleOrderStatus = () => {
    Swal.fire({
      title: 'Choose Status',
      input: 'select',
      inputValue: order?.orderStatus,
      inputOptions: {
        draft: 'Draft',
        invoice: 'For Invoicing',
        in_progress: 'In Progress',
        completed: 'Completed',
        cancelled: 'Cancelled',
        revision: 'Revision'
      },
      showCancelButton: true,
      confirmButtonText: 'Assign',
      confirmButtonColor: '#1976d2',
      customClass: {
        title: styles.customDialogTitle
      }
    }).then((result) => {
      if (result.dismiss) {
        return
      }
      if (result.isConfirmed) {
        let payload
        payload = returnPayload(order, 'orderStatus', result.value)
        payload = returnPayload(order, 'id', router.query.id)
        payload = returnPayload(order, 'transactionLog', handleOrderTransactionLog(true, result.value, order.writer, order.isFullyPaid, order.discountedPrice, user.credentials.name))

        handleEditOrderResult(payload)
      }
    })
  }

  const handleViewFile = (fileUrl) => {
    window.open(fileUrl, '_blank')
  }

  const [fileUpload, setFileUpload] = useState()
  const handleFileUpload = (val) => {
    handlePayload(order, 'files', val)
    setFileUpload(val)
  }

  const handleUploadWriterFiles = () => {
    const pd = new FormData()
    // file handling
    if (payload.files.length > 0) {
      for (let i = 0; i < payload.files.length; i++) {
        pd.append('files', payload.files[i])
      }
    }

    editWriterOrderFiles(jsonToFormData(payload, pd))
  }

  const handleUploadClientFiles = () => {
    const pd = new FormData()
    // file handling
    if (payload.files.length > 0) {
      for (let i = 0; i < payload.files.length; i++) {
        pd.append('files', payload.files[i])
      }
    }

    editClientOrderFiles(jsonToFormData(payload, pd))
  }

  const getCalculatedBalance = () => {
    return order?.paymentDetails && order?.paymentDetails[order?.paymentDetails.length - 1]?.balance.toFixed(2)
  }

  const getPaymentStatus = () => {
    const id = order?.paymentDetails && order?.paymentDetails[order?.paymentDetails.length - 1]?.paymentStatus
    const statusObject = PaymentStatusList.find(item => item.id === id)

    return statusObject ? statusObject.status : 'Status Not Found'
  }

  const handlePaymentStatus = () => {
    if (getCalculatedBalance() === 0) {
      Swal.fire({
        text: 'There is no remaining balance to pay.',
        confirmButtonColor: '#1976d2',
        icon: 'info',
        customClass: {
          title: styles.customDialogTitle,
          container: styles.customDialogTitle
        }
      })
      return
    }

    Swal.fire({
      title: `Amount to Pay: $${getCalculatedBalance()}`,
      input: 'select',
      inputValue: order?.orderStatus,
      inputOptions: {
        0: 'Unpaid',
        1: 'Pending Invoice',
        2: 'Partially Paid',
        3: 'Fully Paid',
        4: 'Refunded'
        // 5: 'Disputed'
      },
      showCancelButton: true,
      confirmButtonText: 'Update',
      confirmButtonColor: '#1976d2',
      customClass: {
        title: styles.customDialogTitle
      }
    }).then((result) => {
      if (result.isConfirmed) {
        let payload
        payload = returnPayload(order, 'isFullyPaid', result.value === '3')
        payload = returnPayload(order, 'id', router.query.id)
        payload = returnPayload(order, 'transactionLog', handleOrderTransactionLog(true, order.orderStatus, order.writer, result.value === '0', order.discountedPrice, user.credentials.name))

        // FOR ADDING PENDING INVOICE
        if (result.value === '1') {
          Swal.fire({
            title: 'Payment Details',
            html: '<input id="orderId" class="swal2-input" placeholder="Order ID">' +
                  '<input id="bank" class="swal2-input" placeholder="Bank">' +
                  '<input id="invoiceUrl" class="swal2-input" placeholder="Invoice URL">',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            confirmButtonColor: '#1976d2',
            customClass: {
              title: styles.customDialogTitle,
              container: styles.customDialogTitle
            },
            preConfirm: () => {
              return {
                orderId: document.getElementById('orderId').value,
                bank: document.getElementById('bank').value,
                invoiceUrl: document.getElementById('invoiceUrl').value
              }
            }
          }).then((result) => {
            if (result.isConfirmed) {
              // input validations
              if (
                result.value.orderId === '' ||
                result.value.bank === '' ||
                result.value.invoiceUrl === ''
              ) {
                Swal.fire({
                  title: 'Invalid Inputs',
                  text: 'Do not leave an empty field!',
                  confirmButtonColor: '#1976d2',
                  icon: 'error',
                  customClass: {
                    title: styles.customDialogTitle,
                    container: styles.customDialogTitle
                  }
                })
              } else {
                const paymentDetails = {
                  amount: 0,
                  bank: result.value.bank,
                  orderId: result.value.orderId,
                  transactionId: 'N/A',
                  paymentType: 1,
                  balance: parseFloat(order?.discountedPrice.toFixed(2)),
                  invoiceUrl: result.value.invoiceUrl,
                  paymentStatus: 1
                }
                payload = returnPayload(order, 'orderStatus', 'invoice')
                payload = returnPayload(order, 'paymentDetails', handlePaymentDetails(paymentDetails))
                handleEditOrderResult(payload)
              }
            }
          })
        }

        // for fresh partial payment
        if (result.value === '2') {
          // disallow user to pay partially if there's a partial payment already
          const amount = (order?.paymentDetails && order?.paymentDetails[order?.paymentDetails.length - 1]?.amount).toFixed(2)
          if (amount > 0 && amount !== order?.discountedPrice) {
          // if (amountToPay !== order?.discountedPrice) {
            Swal.fire({
              title: 'Invalid transaction.',
              text: 'An initial partial payment is already made, please settle the remaining balance.',
              confirmButtonColor: '#1976d2',
              icon: 'error',
              customClass: {
                title: styles.customDialogTitle,
                container: styles.customDialogTitle
              }
            })
            return
          }
          // process starts here
          Swal.fire({
            title: `Order Price: $${order?.discountedPrice.toFixed(2)}`,
            html: '<input id="orderId" class="swal2-input" placeholder="Order ID">' +
                  '<input id="transactionId" class="swal2-input" placeholder="Transaction ID">' +
                  '<input id="bank" class="swal2-input" placeholder="Bank">' +
                  '<input id="invoiceUrl" class="swal2-input" placeholder="Invoice URL">' +
                  '<input id="amount" class="swal2-input" placeholder="Amount">',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            confirmButtonColor: '#1976d2',
            customClass: {
              title: styles.customDialogTitle,
              container: styles.customDialogTitle
            },
            preConfirm: () => {
              return {
                orderId: document.getElementById('orderId').value,
                transactionId: document.getElementById('transactionId').value,
                bank: document.getElementById('bank').value,
                amount: document.getElementById('amount').value,
                invoiceUrl: document.getElementById('invoiceUrl').value
              }
            }
          }).then((result) => {
            if (result.isConfirmed) {
              if (
                result.value.orderId === '' ||
                result.value.transactionId === '' ||
                result.value.bank === '' ||
                result.value.invoiceUrl === '' ||
                result.value.amount === ''
              ) {
                Swal.fire({
                  title: 'Invalid Inputs',
                  text: 'Do not leave an empty field!',
                  confirmButtonColor: '#1976d2',
                  icon: 'error',
                  customClass: {
                    title: styles.customDialogTitle,
                    container: styles.customDialogTitle
                  }
                })
                return
              }

              if (
                parseFloat(result.value.amount) >= order?.discountedPrice.toFixed(2) || parseFloat(result.value.amount) <= 0
              ) {
                Swal.fire({
                  title: 'Amount is out of range!',
                  text: 'Please type an amount not greater than the total price and not equal to zero.',
                  confirmButtonColor: '#1976d2',
                  icon: 'error',
                  customClass: {
                    title: styles.customDialogTitle,
                    container: styles.customDialogTitle
                  }
                })
                return
              }

              const paymentDetails = {
                amount: parseFloat(result.value.amount),
                bank: result.value.bank,
                orderId: result.value.orderId,
                transactionId: result.value.transactionId,
                paymentType: 2,
                balance: parseFloat(order?.discountedPrice.toFixed(2)) - parseFloat(result.value.amount),
                invoiceUrl: result.value.invoiceUrl,
                paymentStatus: 2
              }
              payload = returnPayload(order, 'orderStatus', 'in_progress')
              payload = returnPayload(order, 'paymentDetails', handlePaymentDetails(paymentDetails))
              handleEditOrderResult(payload)
            }
          })
        }

        // to pay in full
        if (result.value === '3') {
          const balance = (order?.paymentDetails && order?.paymentDetails[order?.paymentDetails.length - 1]?.balance).toFixed(2)
          // check if there's a balance to pay
          if (balance === 0) {
            Swal.fire({
              title: 'Payment info',
              text: 'There is no remaining balance to pay.',
              icon: 'info',
              confirmButtonColor: '#1976d2',
              customClass: {
                title: styles.customDialogTitle,
                container: styles.customDialogTitle
              }
            })
            return
          }
          // amount should be equal to zero to determine if the user is paying the full amount
          // process starts here
          Swal.fire({
            title: `Amount to pay: $${balance}`,
            html: '<input id="orderId" class="swal2-input" placeholder="Order ID">' +
                  '<input id="transactionId" class="swal2-input" placeholder="Transaction ID">' +
                  '<input id="bank" class="swal2-input" placeholder="Bank">' +
                  '<input id="invoiceUrl" class="swal2-input" placeholder="Invoice URL">' +
                  '<input id="amount" class="swal2-input" placeholder="Amount">',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            confirmButtonColor: '#1976d2',
            customClass: {
              title: styles.customDialogTitle,
              container: styles.customDialogTitle
            },
            preConfirm: () => {
              return {
                orderId: document.getElementById('orderId').value,
                transactionId: document.getElementById('transactionId').value,
                bank: document.getElementById('bank').value,
                amount: document.getElementById('amount').value,
                invoiceUrl: document.getElementById('invoiceUrl').value
              }
            }
          }).then((result) => {
            if (result.isConfirmed) {
              if (parseFloat(balance) !== parseFloat(result.value.amount)) {
                Swal.fire({
                  title: 'Invalid amount',
                  text: 'Please enter exact amount!',
                  confirmButtonColor: '#1976d2',
                  icon: 'error',
                  customClass: {
                    title: styles.customDialogTitle,
                    container: styles.customDialogTitle
                  }
                })
              } else {
                // payment success happens here
                const paymentDetails = {
                  amount: parseFloat(result.value.amount),
                  bank: result.value.bank,
                  orderId: result.value.orderId,
                  transactionId: result.value.transactionId,
                  paymentType: 0,
                  balance: 0,
                  invoiceUrl: result.value.invoiceUrl,
                  paymentStatus: 3
                }
                payload = returnPayload(order, 'orderStatus', 'in_progress')
                payload = returnPayload(order, 'paymentDetails', handlePaymentDetails(paymentDetails))
                handleEditOrderResult(payload)
              }
            }
          })
        }

        if (result.value === '4') {
          const balance = (order?.paymentDetails && order?.paymentDetails[order?.paymentDetails.length - 1]?.balance).toFixed(2)
          // check if there's a balance to pay
          if (balance === 0) {
            Swal.fire({
              title: 'Payment info',
              text: 'There is no remaining balance to pay.',
              icon: 'info',
              confirmButtonColor: '#1976d2',
              customClass: {
                title: styles.customDialogTitle,
                container: styles.customDialogTitle
              }
            })
            // return
          }
        }

        // handleEditOrderResult(payload)
      }
    })
  }

  const renderSubHeader = (data) => {
    const deadline = new Date(data)
    return `Deadline: ${deadline.toLocaleString()}`
  }

  const copyToClipBoard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        success('Text copied to clipboard')
      })
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={5} xs={12}>
          <Paper elevation={3} sx={{
            padding: '10px',
            borderRadius: '10px',
            marginBottom: '20px'
          }}>
            <Grid
              container
              spacing={1}
              sx={{
                textAlign: 'center',
                width: 'auto',
                maxWidth: '450px',
                margin: 'auto',
                marginBottom: '20px'
              }}>
              {
                timer.map((list, index) => {
                  return (
                    <Grid
                      item
                      xs={3}
                      key={index}
                      className={styles.timerWrap}>
                        <div>
                          <span>
                            {timer[index].toString()}
                          </span>
                          <br />
                          {timeUnit[index]}
                        </div>
                    </Grid>
                  )
                })
              }
              <Grid item xs={12}>
                <Typography variant="p">
                  {renderSubHeader(order.deadline)}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
          <Paper elevation={3} sx={{
            padding: '10px',
            borderRadius: '10px',
            marginBottom: '20px'
          }}>
            <Grid
              container
              spacing={1}
              sx={{
                textAlign: 'center',
                width: 'auto',
                maxWidth: '450px',
                margin: 'auto',
                marginBottom: '20px'
              }}>
              <Grid item xs={12} sx={{
                alignSelf: 'center',
                textAlign: 'center',
                marginBottom: '15px'
              }}>
                <h2 style={{ margin: '0 auto' }}>Price: ${ order?.discountedPrice?.toFixed(2) }</h2>
                <span style={{
                  fontWeight: 'medium',
                  fontSize: '16px'
                }}>
                  Remaining balance: ${getCalculatedBalance()}
                </span>
              </Grid>
              <Grid item xs={8} sx={{
                alignSelf: 'center',
                textAlign: 'left',
                display: 'flex'
              }}>
                Payment Status:
                <span style={{
                  fontWeight: 'bold',
                  marginLeft: '5px'
                }}>
                  {
                    getPaymentStatus()
                  }
                </span>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: 'right' }}>
                {
                  user.credentials.userType === 2 &&
                  <Button
                    variant='outlined'
                    type='button'
                    onClick={handlePaymentStatus}>
                      Update
                  </Button>
                }
              </Grid>
              <Grid item xs={8} sx={{ alignSelf: 'center', textAlign: 'left' }}>
                Order Status:
                <span style={{
                  fontWeight: 'bold',
                  marginLeft: '5px'
                }}>
                  { getTextValueById(order?.orderStatus, OrderStatusList) }
                </span>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: 'right' }}>
                {
                  user.credentials.userType === 2 &&
                  <Button
                    variant='outlined'
                    type='button'
                    onClick={handleOrderStatus}>
                      Update
                  </Button>
                }
              </Grid>
              <Grid item xs={8} sx={{ alignSelf: 'center', textAlign: 'left' }}>
                Writer ID:
                <span style={{
                  fontWeight: 'bold',
                  marginLeft: '5px'
                }}>
                  {
                    (order?.writer === '' || (typeof order.writer === 'undefined'))
                      ? 'Unassigned'
                      : writer
                  }
                </span>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: 'right' }}>
                {
                  ((user.credentials.userType === 2) || user.credentials.userType === 1) &&
                  <Button
                    variant='outlined'
                    type='button'
                    onClick={() => handleAssignWriter(user.credentials.userType)}>
                    {
                      user.credentials.userType === 1
                        ? 'Apply'
                        : (order?.writer === '' || (typeof order.writer === 'undefined'))
                            ? 'Assign'
                            : 'Reassign'
                      // (order?.writer === '' || (typeof order.writer === 'undefined'))
                      //   ? (user.credentials.userType === 1)
                      //       ? 'Apply'
                      //       : 'Assign'
                      //   : 'Reassign'
                    }
                  </Button>
                }
              </Grid>
              {
                user.credentials.userType === 2 && <>
                  <Grid item xs={6} sx={{ alignSelf: 'center', textAlign: 'left' }}>
                    Activity Log:
                  </Grid>
                  <Grid item xs={6} sx={{ textAlign: 'right' }}>
                    <Button
                      variant='outlined'
                      type='button'
                      onClick={toggleOpenDialog}>
                        View
                    </Button>
                  </Grid>
                </>
              }
            </Grid>
          </Paper>
        </Grid>
        <Grid item md={7} xs={12}>
          <Paper elevation={3} sx={{
            padding: '10px',
            borderRadius: '10px',
            mb: 4
          }}>
            <Grid
              container
              spacing={1}
              sx={{
                width: 'auto',
                maxWidth: '450px',
                margin: 'auto'
              }}>
                {
                  user.credentials.userType === 2 && <>
                    <Grid item xs={12}>
                      <h3 style={{ marginBottom: '5px', textAlign: 'center' }}>Client Details</h3>
                    </Grid>
                    <Grid item xs={6} sx={{ marginBottom: '10px' }}>
                      Name:
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: 'right', marginBottom: '10px' }}>
                      {!partyUsers.loading && partyUsers?.user?.user?.name}
                    </Grid>
                    <Grid item xs={6}>
                      Email:
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: 'right' }}>
                      {!partyUsers.loading && partyUsers?.user?.user?.email}
                    </Grid>
                    <Grid item xs={4}>
                      <span style={{ display: 'flex', marginTop: '10px' }}>
                        ID:
                      </span>
                    </Grid>
                    <Grid item xs={8} sx={{
                      marginBottom: '20px',
                      display: 'flex',
                      justifyContent: 'right',
                      alignItems: 'center'
                    }}>
                      {
                        !partyUsers.loading && <>
                        <IconButton aria-label="settings" onClick={() => copyToClipBoard(partyUsers?.user?.user?.id)}>
                          <ContentCopyIcon />
                        </IconButton>
                        {partyUsers?.user?.user?.id}
                        </>
                      }
                    </Grid>
                  </>
                }
              <Grid item xs={12}>
                <h3 style={{ textAlign: 'center' }}>Order Details</h3>
                <OrderCard order={order} />
              </Grid>
              <Grid item xs={12}>
                <h3 style={{ marginBottom: '5px' }}>Attachments</h3>
                {
                  order?.clientFiles?.length > 0
                    ? order?.clientFiles.map((file, index) => {
                      return (
                        <div key={index} className={styles.attachmentWrap}>
                          <Grid container spacing={1}>
                            <Grid item xs={6} sx={{ alignSelf: 'center' }}>{file.originalName}</Grid>
                            <Grid item xs={6} sx={{ textAlign: 'right' }}>
                              <IconButton onClick={() => { handleViewFile(file.path) }}>
                                <VisibilityRoundedIcon />
                              </IconButton>
                              <IconButton>
                                <DeleteRoundedIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </div>
                      )
                    })
                    : <p>No files attached.</p>
                }
                {
                  user.credentials.userType === 0 && <>
                  <CommonFileUpload
                      propValue={fileUpload}
                      propOnChange={handleFileUpload}
                      incomingFiles={order?.data?.clientFiles}
                  />
                  {
                    fileUpload && fileUpload.length > 0
                      ? <Button
                        variant='contained'
                        type='button'
                        sx={{
                          display: 'flex',
                          margin: 'auto'
                        }}
                        onClick={() => handleUploadClientFiles()}>
                          Upload
                      </Button>
                      : null
                  }
                  </>
                }
              </Grid>
              <Grid item xs={12} sx={{ marginBottom: 2 }}>
                <h3 style={{ marginBottom: '5px' }}>Writer&apos;s Attachments</h3>
                {
                  order?.writerFiles?.length > 0
                    ? order?.writerFiles.map((file, index) => {
                      return (
                        <div key={index} className={styles.attachmentWrap}>
                          <Grid container spacing={1}>
                            <Grid item xs={6} sx={{ alignSelf: 'center' }}>{file.originalName}</Grid>
                            <Grid item xs={6} sx={{ textAlign: 'right' }}>
                              <IconButton onClick={() => { handleViewFile(file.path) }}>
                                <VisibilityRoundedIcon />
                              </IconButton>
                              <IconButton>
                                <DownloadIcon />
                              </IconButton>
                              <IconButton>
                                <DeleteRoundedIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </div>
                      )
                    })
                    : <p>No files attached.</p>
                }
                <>
                  {
                    (user.credentials.userType === 2 || user.credentials.userType === 1) && <>
                      <CommonFileUpload
                          propValue={fileUpload}
                          propOnChange={handleFileUpload}
                          incomingFiles={order?.data?.clientFiles}
                      />
                      {
                        fileUpload && fileUpload.length > 0
                          ? <Button
                            variant='contained'
                            type='button'
                            sx={{
                              display: 'flex',
                              margin: 'auto'
                            }}
                            onClick={() => handleUploadWriterFiles()}>
                              Upload
                          </Button>
                          : null
                      }
                      </>
                  }
                </>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <CommnonResponsiveDialog
        fullScreen
        isOpen={openDialog}
        handleClose={handleCloseDialog}
        confirmAction={handleConfirmAction}
        title='Activity log'
        confirmButton='Close'
      >
        <CommonTable
          tableData={activityLogs}
          copyToClipBoard={copyToClipBoard}
        />
      </CommnonResponsiveDialog>
      <Toastify />
    </>
  )
}

ViewOrder.propTypes = {
  order: PropTypes.object,
  newOrder: PropTypes.object,
  editOrder: PropTypes.func,
  editOrderByAssignedWriter: PropTypes.func,
  editWriterOrderFiles: PropTypes.func,
  editClientOrderFiles: PropTypes.func,
  loading: PropTypes.bool,
  message: PropTypes.string,
  error: PropTypes.bool,
  user: PropTypes.object,
  getUserByType: PropTypes.func,
  partyUsers: PropTypes.object,
  getUserById: PropTypes.func,
  getUserByCreatorsId: PropTypes.func
}

const enhanced = compose(
  connect(
    (state) => ({
      newOrder: state.newOrder,
      user: state.login,
      partyUsers: state.users
    }),
    (dispatch) => ({
      editOrder: (_data) => dispatch(editOrder(_data)),
      editOrderByAssignedWriter: (_data) => dispatch(editOrderByAssignedWriter(_data)),
      editWriterOrderFiles: (_data) => dispatch(editWriterOrderFiles(_data)),
      editClientOrderFiles: (_data) => dispatch(editClientOrderFiles(_data)),
      getUserByType: (_data) => dispatch(getUserByType(_data)),
      getUserById: (_data) => dispatch(getUserById(_data)),
      getUserByCreatorsId: (_data) => dispatch(getUserByCreatorsId(_data))
    })
  )
)

export default enhanced(ViewOrder)
