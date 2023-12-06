import { Button, FormControl, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import DeleteIcon from '@mui/icons-material/Delete'
import CommnonResponsiveDialog from '../Dialog'
import PropTypes from 'prop-types'
import InfoIcon from '@mui/icons-material/Info'

const CommonFileUpload = (props) => {
  const {
    // propValue,
    incomingFiles,
    propOnChange
  } = props

  const inputFileRef = useRef()
  const [selectedFiles, setSelectedFiles] = useState([])
  const [localIncomingFiles, setLocalIncomingFiles] = useState(incomingFiles)
  const [openDialog, setOpenDialog] = useState(false)

  const handleClick = () => {
    if (selectedFiles.length > 0 || incomingFiles?.length > 0) {
      handleOpenDialog(true)
      return
    }
    inputFileRef.current.click()
  }

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    setLocalIncomingFiles(files)
    setSelectedFiles(event.target.files)
  }

  useEffect(() => {
    const formData = new FormData()
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i])
    }
    propOnChange(selectedFiles)
  }, [selectedFiles])

  const handleResetFile = () => {
    setLocalIncomingFiles([])
    setSelectedFiles([])
    setOpenDialog(false)
  }

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleConfirmAction = () => {
    handleCloseDialog()
    inputFileRef.current.click()
  }

  return (
    <FormControl sx={{
      m: 1,
      width: 'stretch'
    }}
    size="small">
      <Button
      type="button"
      aria-label="upload button"
      variant="outlined"
      onClick={handleClick}>
        {
          typeof fileName === 'undefined'
            ? <span style={{ display: 'flex', alignItems: 'center' }}>
                <AttachFileIcon />
                {selectedFiles.length > 0 || incomingFiles?.length > 0
                  ? ' Replace Files'
                  : ' Attach Files'}
              </span>
            : <span style={{ display: 'flex', alignItems: 'center' }}>
                <DeleteIcon /> Files
              </span>
        }
      </Button>
      {
        localIncomingFiles && localIncomingFiles?.map((list, index) => {
          return (
            <Typography
              sx={{
                fontSize: 12,
                marginTop: 1,
                display: 'list-item',
                marginLeft: 2
              }}
              variant='span'
              key={index}>
              {list.originalName || list.name}
            </Typography>
          )
        })
      }
      <input
        ref={inputFileRef}
        hidden
        accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*"
        multiple
        type="file"
        onChange={handleFileUpload}
      />
      <CommnonResponsiveDialog
        isOpen={openDialog}
        handleClose={handleCloseDialog}
        confirmAction={handleConfirmAction}
        denyAction={handleResetFile}
        title={<InfoIcon sx={{ fontSize: '50px', color: '#046fcd' }} />}
        contentText='You can delete or replace the current uploaded file.'
        confirmButton='Replace'
        denyButton='Delete'
      >
      </CommnonResponsiveDialog>
    </FormControl>
  )
}

CommonFileUpload.propTypes = {
  propValue: PropTypes.any,
  propOnChange: PropTypes.func,
  incomingFiles: PropTypes.array
}

export default CommonFileUpload
