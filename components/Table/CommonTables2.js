import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import PropTypes from 'prop-types'
import { IconButton, Typography } from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { useRouter } from 'next/router'

const CommonTable2 = (props) => {
  const {
    tableData
  } = props

  const formatDate = (timestamp) => {
    const options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }
    return new Date(timestamp).toLocaleDateString('en-US', options)
  }

  const router = useRouter()
  const viewOrder = (id) => {
    router.push(`/viewOrder/${id}`)
  }

  const isDateLessThan24HoursOld = (date) => {
    const currentTime = new Date().getTime()
    const providedTime = new Date(date).getTime()
    const timeDifference = currentTime - providedTime
    const hoursDifference = timeDifference / (1000 * 60 * 60)

    return hoursDifference < 24
  }

  return tableData && tableData.length <= 0
    ? <Typography variant="p">
      <div style={{ padding: '20px' }}>No data found.</div>
    </Typography>
    : (
      <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{
              backgroundColor: '#989898'
            }}>
              <TableCell></TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Paid</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData && tableData.map((row, index) => (
              <TableRow
              key={row.id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                backgroundColor: ((index + 1) % 2 === 0 ? '#F0F0F0' : 'transparent')
              }}>
                <TableCell>
                  <IconButton
                    aria-label="view order"
                    onClick={() => viewOrder(row.id)}
                    sx={{
                      ':hover': {
                        backgroundImage: 'linear-gradient(315deg, #B3F6D8, #52A7C1)',
                        color: '#fff'
                      }
                    }}
                  >
                    <RemoveRedEyeIcon />
                  </IconButton>
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    color: isDateLessThan24HoursOld(row.deadline) ? 'red' : '#000'
                  }}
                >
                  {formatDate(row.deadline)}
                </TableCell>
                <TableCell>
                  {
                    row.price &&
                    `$${row.price.toFixed(2)}`
                  }
                </TableCell>
                <TableCell>{row.paymentStatus ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      )
}

CommonTable2.propTypes = {
  tableData: PropTypes.array
}

export default CommonTable2
