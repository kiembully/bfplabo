import React, { useEffect, useState } from 'react'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import PropTypes from 'prop-types'

const CommonBackdrop = (props) => {
  const {
    disabled,
    isOpen,
    hasProgress,
    toggleClose
  } = props
  const [open, setOpen] = useState(true)
  const handleClose = () => {
    if (disabled) {
      return
    }
    toggleClose()
    setOpen(false)
  }

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: 3 }}
        open={open}
        onClick={handleClose}
      >
        {
          hasProgress && <CircularProgress color="inherit" />
        }
      </Backdrop>
    </div>
  )
}

CommonBackdrop.propTypes = {
  disabled: PropTypes.bool.isRequired,
  hasProgress: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  toggleClose: PropTypes.func
}

export default CommonBackdrop
