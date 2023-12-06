import React, { useEffect } from 'react'
import Login from '../components/Login'
import { compose } from '@reduxjs/toolkit'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { clickLogin, setLoginError } from '../redux/login/login.actions'
import { useRouter } from 'next/router'

const LoginPage = (props) => {
  const {
    login,
    loginEntry,
    setLoginError
  } = props

  const router = useRouter()
  useEffect(() => {
    if (localStorage.getItem('USER_ID')) {
      if (login.credentials.id !== '') {
        if (login.credentials.id.length > 0) {
          // let route = '/order'
          // if (login.credentials.userType === 2) {
          //   route = '/admin'
          // }
          // if (login.credentials.userType === 1) {
          //   route = '/assignedOrders'
          // }
          router.push('/admin')
        } else {
          router.push('/')
        }
      }
    }
  })

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyItems: 'center'
    }}>
      <Login
        setLoginError={setLoginError}
        clickLogin={loginEntry}
        login={login}
      />
    </div>
  )
}

LoginPage.propTypes = {
  loginEntry: PropTypes.func.isRequired,
  setLoginError: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired
}

const enhanced = compose(
  connect(
    (state) => ({
      login: state.login
    }),
    (dispatch) => ({
      loginEntry: (_data) => dispatch(clickLogin(_data)),
      setLoginError: (_data) => dispatch(setLoginError(_data))
    })
  )
)

export default enhanced(LoginPage)
