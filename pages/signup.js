import React, { useEffect } from 'react'
import { compose } from '@reduxjs/toolkit'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { clickSignup, setLoginError } from '../redux/login/login.actions'
import Signup from '../components/Signup'
import { useRouter } from 'next/router'

const SignupPage = (props) => {
  const {
    login,
    signupEntry,
    setLoginError
  } = props

  const router = useRouter()
  useEffect(() => {
    if (localStorage.getItem('USER_ID')) {
      router.push('/order')
    }
  })

  return (
    <div>
      <Signup
      setLoginError={setLoginError}
      clickSignup={signupEntry}
      login={login}
      />
    </div>
  )
}

SignupPage.propTypes = {
  signupEntry: PropTypes.func.isRequired,
  setLoginError: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired
}

const enhanced = compose(
  connect(
    (state) => ({
      login: state.login
    }),
    (dispatch) => ({
      signupEntry: (_data) => dispatch(clickSignup(_data)),
      setLoginError: (_data) => dispatch(setLoginError(_data))
    })
  )
)

export default enhanced(SignupPage)
