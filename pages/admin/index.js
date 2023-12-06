import { Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DashboardHeader from '../../components/Header'
import { connect } from 'react-redux'
import { compose } from '@reduxjs/toolkit'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import CommonBackdrop from '../../components/Backdrop'
import { searchInObjectsArray } from '../../helper/data.helper'
import CommnonResponsiveDialog from '../../components/Dialog'
// import InfoIcon from '@mui/icons-material/Info'
import RegisterOfficer from '../../components/Register/register'
import { getOfficers, setSubmitOfficerError, submitOfficer } from '../../redux/officer/officer.actions'
import Toastify from '../../components/Notifs/Toastify'
import CommonTable from '../../components/Table/CommonTables'

const dashboard = (props) => {
  const {
    user,
    officers,
    submitOfficer,
    setSubmitOfficerError,
    getOfficers
  } = props

  const [localofficers, setLocalofficers] = useState()
  const [isUserLoggedin, setIsUserLogged] = useState(false)
  // const [isAdmin, setAdminStatus] = useState(false)
  const [textFilter, setTextFilter] = useState('')
  const handleFilter = (value) => {
    setTextFilter(value)
    if (value !== '') {
      setLocalofficers(searchInObjectsArray(officers?.masterList, value))
    } else {
      setLocalofficers(officers?.masterList)
    }
  }
  const [statusFilter, setStatusFilter] = useState('')
  const handleStatusFilter = (value) => {
    setStatusFilter(value)
  }
  const router = useRouter()

  useEffect(() => {
    // populate data
    if (localStorage.getItem('USER_ID')) {
      getOfficers('')
      setIsUserLogged(true)
    } else {
      router.push('/login')
    }
  }, [])

  useEffect(() => {
    // initially set in progress orders
    setLocalofficers(officers?.masterList)
    if (!officers.loading) {
      handleFilter(statusFilter)
    }
  }, [officers])

  useEffect(() => {
    // dynamically set status filters
    if (!officers.loading) {
      handleFilter(statusFilter)
    }
  }, [statusFilter])

  const [openDialog, setOpenDialog] = useState()
  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  return isUserLoggedin && (
    <Grid container spacing={1} sx={{
      padding: '20px',
      maxWidth: '1200px',
      margin: 'auto'
    }}>
        <Grid item xs={12}>
          <DashboardHeader
            title={`Admin ${user?.credentials?.name?.split(' ')[0]}`}
            isAdmin={true}
            isUserLoggedin={isUserLoggedin}
            textFilter={textFilter}
            handleFilter={handleFilter}
            statusFilter={statusFilter}
            handleStatusFilter={handleStatusFilter}
          />
        </Grid>
        <Grid item xs={12} sx={{
          marginTop: '120px'
        }}>
          <CommonTable tableData={localofficers} />
        </Grid>
        <Grid
        item
        xs={12}
        >
          <div style={{
            display: 'block',
            width: '100%',
            margin: 'auto',
            paddingTop: '115px'
          }}>
            <Button
              type='button'
              variant='outlined'
              onClick={() => setOpenDialog(true)}
              >
                Add
            </Button>
            {/* {
              !officers.loading &&
              <CardRenderer orders={officers} localOrders={localofficers} />
            } */}
          </div>
        </Grid>
        <CommnonResponsiveDialog
          isOpen={openDialog}
          handleClose={handleCloseDialog}
          denyAction={handleCloseDialog}
          contentText='Officer Registration'
        >
          <RegisterOfficer
            handleSubmit={submitOfficer}
            setSubmitOfficerError={setSubmitOfficerError}
            filteredOfficers={localofficers}
            handleDismiss={handleCloseDialog}
            officers={officers}
          />
        </CommnonResponsiveDialog>
        <CommonBackdrop disabled={true} isOpen={officers.loading}/>
        <Toastify />
    </Grid>
  )
}

dashboard.propTypes = {
  getOfficers: PropTypes.func,
  submitOfficer: PropTypes.func,
  setSubmitOfficerError: PropTypes.func
}

const enhanced = compose(
  connect(
    (state) => ({
      user: state.login,
      officers: state.officers
    }),
    (dispatch) => ({
      getOfficers: (_data) => dispatch(getOfficers(_data)),
      submitOfficer: (_data) => dispatch(submitOfficer(_data)),
      setSubmitOfficerError: (_data) => dispatch(setSubmitOfficerError(_data))
    })
  )
)

export default enhanced(dashboard)
