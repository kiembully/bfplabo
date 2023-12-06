import React from 'react'
import BottomNav from '../Nav/BottomNav'
import { compose } from '@reduxjs/toolkit'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

const Footer = (props) => {
  const {
    user
  } = props

  const router = useRouter()
  const withoutNav = ['/', '/comingsoon']
  return (
    <div style={{ height: '50px' }}>
      {
        !withoutNav.includes(router.asPath) &&
        <BottomNav user={user} />
      }
    </div>
  )
}

const enhanced = compose(
  connect(
    (state) => ({
      user: state.login
    })
  )
)

Footer.propTypes = {
  user: PropTypes.object
}

export default enhanced(Footer)
