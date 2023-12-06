import React from 'react'
import { Box, Grid } from '@mui/material'

const Home = () => {
  return (
    <Box sx={{
      padding: '20px 0 0 0',
      margin: '100px auto 0 auto'
    }}>
      <Grid container spacing={0} sx={{
        display: 'flex',
        alignItems: 'center',
        justifyItems: 'center',
        maxWidth: '1200px',
        margin: 'auto',
        padding: '0 20px'
      }}>
        <h1>Hello</h1>
      </Grid>
      {/* <ChatraIO /> */}
    </Box>
  )
}

export default Home
