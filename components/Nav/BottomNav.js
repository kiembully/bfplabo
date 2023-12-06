import { React, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import FeedIcon from '@mui/icons-material/Feed'
import HomeIcon from '@mui/icons-material/Home'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import CommonLink from '../LinkButton'
import PropTypes from 'prop-types'

const buttonStyle = () => {
  return (
    {
      width: '100%',
      height: '50px',
      color: 'inherit',
      fontSize: '16px',
      display: 'flex'
    }
  )
}

const linkStyle = (link, router) => {
  // console.log(link, router)
  return (
    {
      flex: 'auto',
      textAlign: 'center',
      color: router === link ? '#0097ff' : '#808080',
      outline: '0'
    }
  )
}

const BottomNav = (props) => {
  const {
    user
  } = props
  const [isGuest, setIsGuest] = useState(false)

  const setOrdersPath = (userType) => {
    if (userType === 2) {
      return '/admin'
    }
    if (userType === 1) {
      return '/assignedOrders'
    }
    if (userType === 0) {
      return '/myOrders'
    }
  }

  useEffect(() => {
    setIsGuest(true)
  }, [])

  return (
    <Box sx={{
      width: '100%',
      bottom: 0,
      left: 0,
      right: 0,
      position: 'fixed',
      zIndex: 2
    }}>
      <div style={{
        display: 'flex',
        backgroundColor: '#fff',
        boxShadow: '0 3px 10px rgb(0 0 0 / 0.5)'
      }}>
        <CommonLink
          btnStyle={buttonStyle}
          linkStyle={linkStyle}
          path='/'
          label='home'
        >
          <HomeIcon style={{ fontSize: '30px' }} />
        </CommonLink>
        <CommonLink
          btnStyle={buttonStyle}
          linkStyle={linkStyle}
          path={user.credentials.userType === 1 ? '/openOrders' : '/order'}
          label={user.credentials.userType === 1 ? 'open order' : 'order'}
        >
          {
            isGuest ? <NoteAddIcon /> : <FeedIcon style={{ fontSize: '30px' }} />
          }
        </CommonLink>
        <CommonLink
          btnStyle={buttonStyle}
          linkStyle={linkStyle}
          path={setOrdersPath(user.credentials.userType)}
          label={setOrdersPath(user.credentials.userType)}>
          <DashboardOutlinedIcon style={{ fontSize: '30px' }} />
        </CommonLink>
        <CommonLink
          btnStyle={buttonStyle}
          linkStyle={linkStyle}
          path='/dashboard'
          label='Dashboard'
        >
          <AccountCircleIcon style={{ fontSize: '30px' }} />
        </CommonLink>
      </div>
    </Box>
  )
}

BottomNav.propTypes = {
  user: PropTypes.object
}

export default BottomNav
