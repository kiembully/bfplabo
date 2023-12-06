import React, { useEffect, useState } from 'react'
import CommonInput from '../Forms/Input'
import PropTypes from 'prop-types'
import CommonMenu from '../Menu'
import TuneIcon from '@mui/icons-material/Tune'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import { Grid } from '@mui/material'
import CommonBackdrop from '../Backdrop'
import ColorRadioButtons from '../Forms/RadioGroup'
import { useRouter } from 'next/router'

const DashboardHeader = ({ children, ...props }) => {
  const {
    title,
    // isAdmin,
    isUserLoggedin,
    textFilter,
    handleFilter,
    statusFilter,
    handleStatusFilter
  } = props

  const [isExpanded, setExpandedCollapse] = useState(false)
  const handleCollapse = () => {
    setExpandedCollapse(!isExpanded)
  }

  const router = useRouter()
  const [isOpenOrdersRoute, setIsOpenOrdersRoute] = useState(false)
  useEffect(() => {
    setIsOpenOrdersRoute(router.asPath === '/openOrders')
  }, [router])

  return (
    <>
    <div style={{
      position: 'fixed',
      width: '100%',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: '#fff',
      boxShadow: '3px 0 10px rgb(0 0 0 / 0.5)',
      zIndex: 4,
      display: isUserLoggedin ? 'flex' : 'none'
    }}>
      <div style={{ width: '100%', maxWidth: '450px', margin: 'auto', paddingBottom: '7px' }}>
        <Grid container spacing={1} sx={{ alignItems: 'end', padding: '0 17px' }}>
          <Grid item xs={10}>
            <h1 style={{
              textAlign: 'left',
              marginBottom: '0',
              flex: 'auto'
            }}>
              {title}
            </h1>
          </Grid>
          <Grid item xs={2} sx={{ textAlign: 'center' }}>
            <CommonMenu />
          </Grid>
        </Grid>
        <Grid container spacing={1} sx={{ alignItems: 'center', padding: '0 10px' }}>
          <Grid item xs={isOpenOrdersRoute ? 12 : 11}>
            {
              isUserLoggedin &&
              <CommonInput
                title="Search for ID, Services, topics, subjects, details or status"
                label="Search Filter"
                propValue={textFilter}
                propOnChange={handleFilter}
                error={false}
              />
            }
          </Grid>
          {
            !isOpenOrdersRoute &&
            <Grid item xs={1} sx={{ textAlign: 'center' }}>
                <IconButton
                aria-label='options'
                onClick={handleCollapse}
                sx={{ padding: 0 }}>
                  <TuneIcon />
                </IconButton>
            </Grid>
          }
          </Grid>
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <ColorRadioButtons
              statusFilter={statusFilter}
              handleStatusFilter={handleStatusFilter}
            />
        </Collapse>
      </div>
    </div>
    <CommonBackdrop
      disabled={false}
      hasProgress={false}
      isOpen={isExpanded}
      toggleClose={handleCollapse}
    />
    </>
  )
}

DashboardHeader.propTypes = {
  isAdmin: PropTypes.bool,
  isUserLoggedin: PropTypes.bool,
  title: PropTypes.string,
  textFilter: PropTypes.string,
  handleFilter: PropTypes.func,
  statusFilter: PropTypes.string,
  handleStatusFilter: PropTypes.func,
  children: PropTypes.any
}

export default DashboardHeader
