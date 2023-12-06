import React, { useState } from 'react'
import { Button, Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import CommonInput from '../Forms/Input'
import { notify } from '../../helper/notify.helper'
import Toastify from '../Notifs/Toastify'
import { isPasswordValid, isValidEmail } from '../../helper/validation.helper'
import Link from 'next/link'
import Image from 'next/image'
import CommonBackdrop from '../Backdrop'

const Login = (props) => {
  const {
    login,
    clickLogin,
    setLoginError
  } = props

  const [useremail, setEmail] = useState('')
  const handleEmail = (value) => {
    setEmail(value)
  }
  const [pswd, setPassword] = useState('')
  const handlePassword = (value) => {
    setPassword((value))
  }

  const handleSubmit = () => {
    if (!useremail || !isValidEmail(useremail)) {
      notify('Invalid Email')
      setLoginError(true)
      return
    }

    if (!pswd) {
      notify('Invalid Password')
      setLoginError(true)
      return
    }

    if (!isPasswordValid(pswd)) {
      notify('Password must be 6 characters long, contains number, and a special characters ')
      setLoginError(true)
      return
    }

    const payload = {
      email: useremail,
      password: pswd
    }
    clickLogin(payload, 'login')
  }

  return (
    <Grid container spacing={0}
      sx={{
        maxWidth: 450,
        margin: 'auto'
      }}
    >
        <Grid item xs={12}>
          <div style={{
            display: 'block',
            height: '100px',
            maxWidth: '300px',
            maxHeight: '100px',
            position: 'relative',
            margin: 'auto'
          }}>
            <Image
              src='/cleversally_logo.png'
              fill
              alt='CleverSally typography logo'
              priority
              sizes="(max-width: 768px) 100vw"
            />
          </div>
        </Grid>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12}>
          <CommonInput
            title="Email"
            propValue={useremail}
            propOnChange={handleEmail}
            error={login.error}
            // error={order.error}
          />
          <CommonInput
            title="Password"
            propValue={pswd}
            propOnChange={handlePassword}
            error={login.error}
            type="password"
          />
        </Grid>
        <Grid item xs={12}
        sx={{
          textAlign: 'right',
          fontSize: '12px',
          padding: '0 12px',
          display: 'flex'
        }}>
            <Link style={{ textDecoration: 'none', textAlign: 'left' }} href='/signup'>Don&apos;t have account? Signup.</Link>
            <span style={{ flex: 'auto', padding: '20px' }} />
            <Link style={{ textDecoration: 'none' }} href='/forgot'>Forgot Password?</Link>
        </Grid>
        <Grid item xs={12}
        sx={{ textAlign: 'center', marginTop: '25px' }}>
          <Button
            sx={{ minWidth: '200px', background: '#52A7C1' }}
            type="button"
            variant="contained"
            onClick={handleSubmit}
            >
              Login
          </Button>
          <Typography
            sx={{
              fontSize: 14,
              marginTop: '10px',
              color: login?.error ? '#b34045' : 'inherit'
            }}
          >
            {login?.error ? login.message : ''}
          </Typography>
        </Grid>
        <Toastify />
        <CommonBackdrop disabled={true} isOpen={login.loading} />
    </Grid>
  )
}

Login.propTypes = {
  login: PropTypes.object,
  clickLogin: PropTypes.func.isRequired,
  setLoginError: PropTypes.func.isRequired
}

export default Login
