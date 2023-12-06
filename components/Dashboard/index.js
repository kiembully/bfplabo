import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from '@reduxjs/toolkit'
import { Button, Grid } from '@mui/material'
import CommonLink from '../LinkButton'
import Admin from './admin'
import Client from './client'
import { useRouter } from 'next/router'
import { clickLogout } from '../../redux/login/login.actions'

const Dashboard = (props) => {
  const {
    user,
    clickLogout
  } = props

  const router = useRouter()
  const handleLogout = () => {
    const defaultUserState = {
      id: '',
      name: '',
      email: '',
      password: '',
      userType: 0,
      orders: []
    }

    localStorage.clear()
    clickLogout(defaultUserState)
    router.push('/')
  }

  return (
    <Grid container spacing={1} sx={{ padding: '20px', maxWidth: '768px', margin: 'auto' }}>
      <Grid item xs={12} sx={{
        display: 'flex',
        width: '100%',
        borderRadius: 0
      }}
      >
        <h1 style={{
          margin: '0 0 30px 0',
          textAlign: 'left',
          flex: 'auto'
        }}>Dashboard</h1>
        <div>
          <Button
          variant='contained'
          onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </Grid>
      {/* <Grid item xs={12}>
        <h2 style={{ margin: '0 0 20px 0' }}>Hello {user.name}</h2>
      </Grid> */}
      {
        // if user is client
        user.userType === 0 && <>
        <Client user={user} />
        </>
      }
      {
        (user.assignedOrders && user.assignedOrders.length > 0) &&
          <>
            <Grid item xs={12}>
              <p>Assigned Orders: {user?.assignedOrders?.length}</p>
            </Grid>
            <Grid item xs={12}>
              <CommonLink
              path='/assignedOrders'
              label='Assigned Order'
              variant='contained'
              >
                View Orders
              </CommonLink>
            </Grid>
          </>
      }
      {
        user.userType === 2 && <>
          <Admin user={user} />
        </>
      }
    </Grid>
  )
}

Dashboard.propTypes = {
  user: PropTypes.object,
  clickLogout: PropTypes.func
}

const enhanced = compose(
  connect(
    (state) => ({
      login: state.login,
      myOrders: state.myOrders
    }),
    (dispatch) => ({
      clickLogout: (_data) => dispatch(clickLogout(_data))
    })
  )
)

export default enhanced(Dashboard)
