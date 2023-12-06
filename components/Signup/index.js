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
    clickSignup,
    setLoginError
  } = props

  const [username, setUsername] = useState('')
  const handleUsername = (value) => {
    setUsername(value)
  }
  const [useremail, setEmail] = useState('')
  const handleEmail = (value) => {
    setEmail(value)
  }
  const [pswd, setPassword] = useState('')
  const handlePassword = (value) => {
    setPassword((value))
  }
  const [pswd2, setPassword2] = useState('')
  const handlePassword2 = (value) => {
    setPassword2((value))
  }
  const currentDate = new Date()
  // const [type, setType] = useState(0)
  // const handleUserType = (value) => {
  //   setType(value ? 1 : 0)
  // }

  const handleSubmit = () => {
    if (!username) {
      notify('Invalid Name')
      setLoginError(true)
      return
    }

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

    if (pswd !== pswd2) {
      notify('Password did not match.')
      setLoginError(true)
      return
    }

    if (!isPasswordValid(pswd)) {
      notify('Password must be 6 characters long, contains number, and a special characters ')
      setLoginError(true)
      return
    }

    const payload = {
      name: username,
      email: useremail,
      password: pswd,
      userType: 0,
      dateJoined: currentDate,
      lastLoggedIn: currentDate
    }

    clickSignup(payload)
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
            />
          </div>
        </Grid>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12}>
          <CommonInput
            title="Name"
            propValue={username}
            propOnChange={handleUsername}
            error={login.error}
            // error={order.error}
          />
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
          <CommonInput
            title="Confirm Password"
            propValue={pswd2}
            propOnChange={handlePassword2}
            error={login.error}
            type="password"
          />
        </Grid>
        {/* <Grid item sm={6} xs={12} sx={{
          display: isLoginMode ? 'none' : 'block',
          paddingLeft: '5px'
        }}>
          <input type="checkbox" id="usertype" name="usertype" onChange={handleUserType} />
          <label
            htmlFor="usertype"
            style={{ fontSize: '14px', verticalAlign: 'text-top' }}>Check if you want to apply as Writer.</label>
        </Grid> */}
        <Grid item xs={12}
        sx={{
          textAlign: 'right',
          fontSize: '12px',
          padding: '0 12px',
          display: 'flex'
        }}>
            <Link style={{ textDecoration: 'none', textAlign: 'left' }} href='/login'>Already have an account? Login.</Link>
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
              Signup
          </Button>
          <Typography
            sx={{
              fontSize: 14,
              marginTop: '10px',
              color: login?.error ? '#b34045' : 'inherit'
            }}
          >
            {login.message}
          </Typography>
        </Grid>
        <Toastify />
        <CommonBackdrop disabled={true} isOpen={login.loading} />
    </Grid>
  )
}

Login.propTypes = {
  login: PropTypes.object,
  clickSignup: PropTypes.func.isRequired,
  setLoginError: PropTypes.func.isRequired
  // isLoginMode: PropTypes.bool.isRequired
}

export default Login
