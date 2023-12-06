import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import PropTypes from 'prop-types'
import { SetStepAction, SetOrderError, submitOrder, resetNewOrder } from '../../redux/Order/order.actions'
import { connect } from 'react-redux'
import { compose } from '@reduxjs/toolkit'
import Toastify from '../Notifs/Toastify'
import Swal from 'sweetalert2'
import { notify } from '../../helper/notify.helper'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import styles from '../Card/order.module.scss'
// validations
import {
  isWordMinimum,
  isOtherInputValid,
  isValidDate,
  isDateWithinThreeHours
} from '../../helper/validation.helper'
import OrderPayment from '../Order/OrderPayment'
import { useRouter } from 'next/router'
import { handleOrderTransactionLog, handlePaymentDetails } from '../../helper/orderTransactions.helper'
import { jsonToFormData } from '../../helper/data.helper'

const steps = ['Select', 'Create', 'Pay']

const CommonStepper = ({ children, ...props }) => {
  const {
    hasLabel,
    enableSkip,
    setStep,
    setOrderError,
    newOrder,
    submitOrder,
    user
  } = props
  const [activeStep, setActiveStep] = useState(newOrder?.step)
  const [skipped, setSkipped] = useState(new Set())
  const [payload, setPayload] = useState(newOrder?.data)
  const formData = new FormData()

  const handlePaymentMethod = (value) => {
    const discount = value === 0 ? 20 : 0

    const discountedPrice = payload.price - (payload.price * (discount / 100))

    handlePayload(payload, 'discount', discount)
    handlePayload(payload, 'discountedPrice', discountedPrice)
  }

  useEffect(() => {
    setStep(activeStep)
    window.scrollTo(0, 0)
  }, [activeStep])

  useEffect(() => {
    setActiveStep(newOrder.step)
  }, [newOrder.step])

  const isStepOptional = (step) => {
    return step === 1 && enableSkip
  }

  const isStepSkipped = (step) => {
    return skipped.has(step)
  }

  const handleNext = () => {
    // validation
    // Step 1
    if (activeStep === 0) {
      if (typeof newOrder.data.typeOfService === 'undefined') {
        notify('Choose Type of Service.')
        setOrderError(true)
        return
      }
      if (isOtherInputValid(newOrder.data.otherTypeOfService, newOrder.data.typeOfService)) {
        notify('Please specify other Type of Service.')
        setOrderError(true)
        return
      }
    }
    // Step 2
    if (activeStep === 1) {
      if (
        !newOrder.data.subject ||
        !newOrder.data.topic ||
        !newOrder.data.details
      ) {
        notify('Some inputs are empty.')
        setOrderError(true)
        return
      }
      if (isWordMinimum(newOrder.data.details, 3)) {
        notify('Detailed Instructions must have atleast 3 words.')
        setOrderError(true)
        return
      }
      if (isOtherInputValid(newOrder.data.otherSpacing, newOrder.data.spacing)) {
        notify('Please specify other spacing.')
        setOrderError(true)
        return
      }
      if ((newOrder.data.totalChart <= 0 && newOrder.data.optionalNeeds.chart) || isNaN(newOrder.data.totalChart)) {
        notify('Please specify total charts needed.')
        setOrderError(true)
        return
      }
      if (!newOrder.data.totalPage || isNaN(newOrder.data.totalPage)) {
        notify('Invalid number of pages.')
        setOrderError(true)
        return
      }
      if (newOrder.data.sources < 0 || isNaN(newOrder.data.sources)) {
        notify('Invalid number of sources.')
        setOrderError(true)
        return
      }
      if (!isValidDate(newOrder.data.deadline)) {
        notify('Invalid Date.')
        setOrderError(true)
        return
      }
      if (isDateWithinThreeHours(newOrder.data.deadline)) {
        notify('We cannot accept a deadline of less than 3 hours.')
        setOrderError(true)
        return
      }
    }

    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setOrderError(false)
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.")
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values())
      newSkipped.add(activeStep)
      return newSkipped
    })
  }

  const handleReset = () => {
    setActiveStep(newOrder.step - 1)
  }

  const renderCompleteStep = () => {
    return (
      <div>
        <OrderPayment />
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          pt: 2,
          position: 'absolute',
          top: 50,
          left: 0
        }}>
          <Button
          sx={{
            margin: 'auto'
          }}
          variant='text'
          onClick={handleReset}>
            <ArrowBackIcon />
          </Button>
        </Box>
      </div>
    )
  }

  const handlePayload = (obj, key, value) => {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      obj[key] = value
    } else {
      obj[key] = value
    }
    setPayload(obj)
  }

  const router = useRouter()
  const handleDraftOrder = () => {
    if (!localStorage.getItem('USER_ID')) {
      Swal.fire({
        text: 'You need to login in order to proceed.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Login',
        confirmButtonColor: '#1976d2',
        customClass: {
          container: styles.customDialogTitle
        }
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem('FROM_ORDER', true)
          router.push('/login')
        }
      })

      return null
    }

    if (localStorage.getItem('USER_ID')) {
      handlePayload(payload, 'creator', localStorage.getItem('USER_ID'))
    }

    Swal.fire({
      title: 'Save order as Draft',
      text: 'You can view and still edit this order in myOrders page after.',
      showCancelButton: true,
      confirmButtonText: 'Draft',
      confirmButtonColor: '#1976d2',
      customClass: {
        title: styles.customDialogTitle,
        container: styles.customDialogTitle
      }
    }).then((result) => {
      let isSuccess
      if (result.isConfirmed) {
        handlePaymentMethod(1)

        const paymentDetails = {
          amount: payload.discountedPrice,
          bank: 'N/A',
          orderId: 'N/A',
          transactionId: 'N/A',
          paymentType: 3,
          balance: payload.discountedPrice,
          invoiceUrl: 'N/A',
          paymentStatus: 0
        }

        handlePayload(payload, 'orderStatus', 'draft')
        handlePayload(payload, 'transactionLog', handleOrderTransactionLog(localStorage.getItem('EDIT_ORDER'), 'draft', payload.writer, payload.isFullyPaid, payload.discountedPrice, user.credentials.name))
        handlePayload(payload, 'paymentDetails', handlePaymentDetails(paymentDetails))

        let pd = new FormData()
        pd = jsonToFormData(payload, formData)
        // file handling
        if (payload.files.length > 0) {
          for (let i = 0; i < payload.files.length; i++) {
            pd.append('files', payload.files[i])
          }
        }

        submitOrder(pd)

        Swal.fire({
          title: 'Processing your order.',
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
          handlePayload(payload, 'orderStatus', 'draft')

          isSuccess = localStorage.getItem('NEW_ORDER_MESSAGE').includes('successfully')
          if (result.dismiss === Swal.DismissReason.timer) {
            Swal.fire({
              title: isSuccess ? 'Order Saved as Draft.' : localStorage.getItem('NEW_ORDER_MESSAGE'),
              icon: isSuccess ? 'success' : 'warning',
              text: isSuccess ? 'You can check your orders in orders page.' : '',
              confirmButtonColor: '#1976d2',
              customClass: {
                title: styles.customDialogTitle,
                container: styles.customDialogTitle
              }
            }).then(() => {
              if (isSuccess) {
                router.push(`/viewOrder/${localStorage.getItem('NEW_ORDER_ID')}`)
                resetNewOrder()
              }
            })
          }
        })
      }
    })
  }

  const renderUnfinishStep = () => {
    return (
      <div>
        {children}
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          pt: 2,
          paddingTop: 0,
          marginBottom: '80px'
        }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
            variant="filled"
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            {
              newOrder.step === 2 &&
              <Button
              variant="outlined"
              onClick={handleDraftOrder}
              sx={{ mr: 1 }}
              >
                Draft
              </Button>
            }
            <Button
            variant="contained"
            onClick={handleNext}
            >
              {activeStep === steps.length - 1 ? 'Checkout' : 'Next'}
            </Button>
            <Toastify />
          </Box>
      </div>
    )
  }

  return (
    <Box sx={{
      width: '100%',
      position: 'relative',
      paddingTop: '60px'
    }}>
      <Stepper activeStep={activeStep} sx={{
        padding: '20px',
        position: 'fixed',
        backgroundColor: '#fff',
        left: 0,
        right: 0,
        top: 0,
        zIndex: 2,
        boxShadow: '3px 0 10px rgb(0 0 0 / 0.5)'
      }}>
        {steps.map((label, index) => {
          const stepProps = {}
          const labelProps = {}
          // if (isStepOptional(index)) {
          //   labelProps.optional = (
          //     <Typography variant="caption">Optional</Typography>
          //   )
          // }
          if (isStepSkipped(index)) {
            stepProps.completed = false
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{hasLabel ? label : null}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      {activeStep === steps.length ? (renderCompleteStep()) : (renderUnfinishStep())}
    </Box>
  )
}

CommonStepper.propTypes = {
  children: PropTypes.element,
  hasLabel: PropTypes.bool,
  enableSkip: PropTypes.bool,
  setStep: PropTypes.func.isRequired,
  setOrderError: PropTypes.func.isRequired,
  submitOrder: PropTypes.func.isRequired,
  newOrder: PropTypes.object,
  user: PropTypes.object
}

const enhanced = compose(
  connect(
    (state) => ({
      newOrder: state.newOrder,
      user: state.login
    }),
    (dispatch) => ({
      setStep: (_data) => dispatch(SetStepAction(_data)),
      setOrderError: (_data) => dispatch(SetOrderError(_data)),
      submitOrder: (_data) => dispatch(submitOrder(_data))
    })
  )
)

export default enhanced(CommonStepper)
