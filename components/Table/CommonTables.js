import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'
// import { IconButton, Typography } from '@mui/material'
// import ContentCopyIcon from '@mui/icons-material/ContentCopy'

const CommonTable = (props) => {
  const {
    tableData
    // copyToClipBoard
  } = props

  const formatDate = (timestamp) => {
    const options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }
    return new Date(timestamp).toLocaleDateString('en-US', options)
  }

  return tableData.length <= 0
    ? <Typography variant="h5">No data found.</Typography>
    : (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{
              backgroundColor: '#989898'
            }}>
              {/* <TableCell>ID</TableCell> */}
              <TableCell>First Name</TableCell>
              <TableCell>Middle Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Suffix</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow
              key={row.id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                backgroundColor: ((index + 1) % 2 === 0 ? '#F0F0F0' : 'transparent')
              }}>
                {/* <TableCell>{row.id}</TableCell> */}
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.middleName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>N/A</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      )
}

CommonTable.propTypes = {
  tableData: PropTypes.array,
  copyToClipBoard: PropTypes.func
}

export default CommonTable
