import React, { useEffect } from 'react'
import styles from './layout.module.scss'
import Head from 'next/head'
// import Nav from './Nav'
// import Footer from './Footer'
import { useRouter } from 'next/router'
// import { renderTitle } from '../helper/meta.helper'
import { compose } from '@reduxjs/toolkit'
import { connect } from 'react-redux'
import { getUserById } from '../redux/login/login.actions'
import PropTypes from 'prop-types'
import ClientNav from './Nav/ClientNav'

export const title = ''

// eslint-disable-next-line react/prop-types
const Layout = ({ children, ...props }) => {
  const {
    getCurrentUser
  } = props

  const router = useRouter()
  const pathWithNoBottomNav = ['/', '/comingsoon']

  useEffect(() => {
    if (localStorage.getItem('USER_ID')) {
      getCurrentUser(localStorage.getItem('USER_ID'))
    }
  }, [router])

  return (
    <div className={styles.container}>
        <Head>
            <link rel="icon" href="/favicon-16x16.png" />
            <title>{title}</title>
            {/* INSERT META DATA IN THIS SECTION */}
            <meta name="description" content="This is a sample title content" />
        </Head>
        {
          (pathWithNoBottomNav.includes(router.asPath)) &&
          <ClientNav />
        }
        {/* <Nav /> */}
        <main className={styles.main}>{children}</main>
        {/* {
          (router.asPath !== '/') &&
          <Footer />
        } */}
    </div>
  )
}

Layout.propTypes = {
  getCurrentUser: PropTypes.func,
  login: PropTypes.object
}

const enhanced = compose(
  connect(
    (state) => ({
      login: state.login
    }),
    (dispatch) => ({
      getCurrentUser: (_data) => dispatch(getUserById(_data))
    })
  )
)

export default enhanced(Layout)
