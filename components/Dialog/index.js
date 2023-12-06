import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
// import useMediaQuery from '@mui/material/useMediaQuery'
// import { useTheme } from '@mui/material/styles'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'

const CommnonResponsiveDialog = ({ children, ...props }) => {
  const {
    isOpen,
    handleClose,
    confirmAction,
    denyAction,
    title,
    contentText,
    confirmButton,
    denyButton,
    fullScreen
  } = props
  // const theme = useTheme()
  // const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={isOpen || false}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
        id="responsive-dialog-title"
        sx={{
          textAlign: 'center',
          position: 'relative',
          fontSize: '32px'
        }}>
          {
            title
          }
          {
            fullScreen && <Button
            type="button"
            sx={{
              borderRadius: '100%',
              padding: '10px 10px',
              position: 'absolute',
              top: 5,
              right: 10
            }}
            onClick={handleClose}
            >
              <CloseIcon sx={{
                color: '#000',
                fontSize: '32px'
              }} />
            </Button>
          }
        </DialogTitle>
        <DialogContent>
          {
            contentText &&
            <DialogContentText>
              {contentText}
            </DialogContentText>
          }
          {
            children
          }
        </DialogContent>
        <DialogActions>
          {
            denyButton &&
            <Button autoFocus onClick={denyAction} aria-label="button delete" sx={{ color: '#b34045' }}>
              {denyButton}
            </Button>
          }
          {
            confirmButton &&
            <Button sx={{ display: fullScreen ? 'none' : 'flex' }} onClick={confirmAction} autoFocus aria-label="button replace" >
              {confirmButton}
          </Button>
          }
        </DialogActions>
      </Dialog>
    </div>
  )
}

CommnonResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool,
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  confirmAction: PropTypes.func,
  denyAction: PropTypes.func,
  children: PropTypes.any,
  contentText: PropTypes.string,
  confirmButton: PropTypes.string,
  denyButton: PropTypes.string,
  title: PropTypes.any
}

export default CommnonResponsiveDialog
