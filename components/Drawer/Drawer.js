import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
// import ListItemButton from '@mui/material/ListItemButton'
// import ListItemIcon from '@mui/material/ListItemIcon'
// import ListItemText from '@mui/material/ListItemText'
// import InboxIcon from '@mui/icons-material/MoveToInbox'
// import MailIcon from '@mui/icons-material/Mail'
import PropTypes from 'prop-types'
// import Image from 'next/image'
import { clientMenu } from '../../constants/route.constants'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import { compose } from '@reduxjs/toolkit'
import { clickLogout } from '../../redux/login/login.actions'
import Link from 'next/link'

const Drawer = (props) => {
  const {
    anchor,
    openDrawer,
    closeDrawer,
    drawerState,
    clickLogout
  } = props

  const router = useRouter()
  const [isUserLoggedin, setUserStatus] = useState(false)
  useEffect(() => {
    if (localStorage.getItem('USER_ID')) {
      setUserStatus(true)
    }
  }, [])

  const [state, setState] = useState(false)
  useEffect(() => {
    setState(drawerState)
  }, [drawerState])

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

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={closeDrawer}
      onKeyDown={closeDrawer}
    >
      <div style={{
        height: '65px',
        width: '100%',
        maxWidth: '200px',
        margin: 'auto',
        position: 'relative'
      }}>
        {/* <Image
          src='/cleversally_logo.png'
          fill
          alt='cleversally menu icon'
          sizes="(max-width: 768px) 100%, (max-width: 1200px) 100%, 100%"
        /> */}
      </div>
      <Divider />
      <List>
        {clientMenu.map((text, index) => (
          <ListItem key={text.name} disablePadding>
            <Link href={text.path} style={{
              width: '100%',
              padding: '10px'
            }}>{text.name}</Link>
          </ListItem>
        ))}
      </List>
      {
        isUserLoggedin &&
        <Button
        sx={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          right: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: '150px'
        }}
        variant='contained'
        onClick={handleLogout}
        >
          Logout
        </Button>
      }
    </Box>
  )

  return (
    <div>
      <SwipeableDrawer
        anchor={anchor}
        open={state}
        onClose={closeDrawer}
        onOpen={openDrawer}
      >
        {list(anchor)}
      </SwipeableDrawer>
    </div>
  )
}

Drawer.propTypes = {
  anchor: PropTypes.string,
  openDrawer: PropTypes.func,
  closeDrawer: PropTypes.func,
  drawerState: PropTypes.bool,
  clickLogout: PropTypes.func
}

const enhanced = compose(
  connect(
    (state) => ({
      user: state.login
    }),
    (dispatch) => ({
      clickLogout: (_data) => dispatch(clickLogout(_data))
    })
  )
)

export default enhanced(Drawer)
