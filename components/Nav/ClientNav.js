import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import CommonLink from '../LinkButton'
import Drawer from '../Drawer/Drawer'

const ButtonAppBar = () => {
  const [isLoggedIn, setLoginStatus] = useState(false)
  useEffect(() => {
    if (localStorage.getItem('USER_ID')) {
      setLoginStatus(true)
    }
  }, [])

  const [drawerState, setDrawerState] = useState(false)
  const openDrawer = () => {
    setDrawerState(true)
  }
  const closeDrawer = () => {
    setDrawerState(false)
  }

  return (
    <div>
      <Box sx={{
        flexGrow: 1,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2
      }}>
        <AppBar position="static">
          <Toolbar sx={{ backgroundColor: '#fbfbfb' }}>
            <IconButton
              size="large"
              edge="start"
              color="primary"
              aria-label="menu"
              onClick={openDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                alignItems: 'center',
                justifyItems: 'center',
                display: 'flex',
                width: '100%'
              }}>
            </Typography>
            <CommonLink
              path={isLoggedIn ? '/admin' : '/login'}
              label='Order'
              variant="contained"
            >
              { isLoggedIn ? 'admin' : 'login' }
            </CommonLink>
            {/* <CommonLink
              path='/order'
              label='Order'
              variant="outlined"
              btnStyle={{
                background: '#fff',
                marginLeft: '10px',
                color: '#52A7C1'
              }}
            >
              Order
            </CommonLink> */}
          </Toolbar>
        </AppBar>
      </Box>

      <Drawer
        anchor="left"
        openDrawer={openDrawer}
        closeDrawer={closeDrawer}
        drawerState={drawerState}
      />
    </div>
  )
}

export default ButtonAppBar
