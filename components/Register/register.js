import { Button, Grid } from '@mui/material'
import React, { useState } from 'react'
import CommonInput from '../Forms/Input'
import PropTypes from 'prop-types'
import { notify } from '../../helper/notify.helper'
import Swal from 'sweetalert2'
import styles from '../Card/order.module.scss'

const RegisterOfficer = (props) => {
  const {
    handleSubmit,
    // filteredOfficers,
    setSubmitOfficerError,
    handleDismiss,
    officers
  } = props

  const [localFirstName, setFirstName] = useState('')
  const handleFirstName = (val) => {
    setFirstName(val)
  }
  const [localMiddleName, setMiddleName] = useState('')
  const handleMiddleName = (val) => {
    setMiddleName(val)
  }
  const [localLastName, setLastName] = useState('')
  const handleLastName = (val) => {
    setLastName(val)
  }

  const handleSubmitOfficer = () => {
    if (!localFirstName) {
      notify('Invalid first name!')
      setSubmitOfficerError(true)
      return
    }
    if (!localMiddleName) {
      notify('Invalid middle name!')
      setSubmitOfficerError(true)
      return
    }
    if (!localLastName) {
      notify('Invalid last name!')
      setSubmitOfficerError(true)
      return
    }

    const payload = {
      lastName: localFirstName,
      firstName: localMiddleName,
      middleName: localLastName
    }

    handleSubmit(payload)
    handleDismiss()
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
          title: officers.error ? 'Request Failed' : 'Success!',
          text: officers.message,
          icon: officers.error ? 'error' : 'success',
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

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <CommonInput
          title="First Name"
          propValue={localFirstName}
          propOnChange={handleFirstName}
          error={officers.error}
        />
      </Grid>
      <Grid item xs={12}>
        <CommonInput
          title="Middle Name"
          propValue={localMiddleName}
          propOnChange={handleMiddleName}
          error={officers.error}
        />
      </Grid>
      <Grid item xs={12}>
        <CommonInput
          title="Last Name"
          propValue={localLastName}
          propOnChange={handleLastName}
          error={officers.error}
        />
      </Grid>
      <Grid item xs={6} sx={{
        display: 'flex',
        justifyContent: 'right'
      }}>
        <Button
          type='button'
          variant='contained'
          onClick={handleSubmitOfficer}
        >
          Submit
        </Button>
      </Grid>
      <Grid item xs={6} sx={{
        display: 'flex',
        alignItems: 'center',
        justifyItems: 'center'
      }}>
        <Button
          type='button'
          variant='outlined'
          onClick={handleDismiss}
        >
          Cancel
        </Button>
      </Grid>
    </Grid>
  )
}

RegisterOfficer.propTypes = {
  handleSubmit: PropTypes.func,
  handleDismiss: PropTypes.func,
  setSubmitOfficerError: PropTypes.func,
  filteredOfficers: PropTypes.any,
  officers: PropTypes.any
}

export default RegisterOfficer
