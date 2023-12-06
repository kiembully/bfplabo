import React from 'react'
import { Grid } from '@mui/material'
import CommonCard from '../Card/card'
import PropTypes from 'prop-types'
import CircularIndeterminate from '../Progress/circularProgres'
import CardSkeleton from '../Card/cardSkel'

const Feed = ({ newsFeed, isLoading, isUpdating }) => {
  const displayLoading = () => {
    return (
      <Grid container spacing={1} sx={{ backgroundColor: '#b4becf' }}>
        <Grid item xs={12} sx={{
          display: 'flex',
          borderRadius: 0
        }}
        >
          <CardSkeleton />
        </Grid>
        <Grid item xs={12} sx={{
          display: 'flex',
          borderRadius: 0
        }}
        >
          <CardSkeleton />
        </Grid>
        <Grid item xs={12} sx={{
          display: 'flex',
          borderRadius: 0
        }}
        >
          <CardSkeleton />
        </Grid>
      </Grid>
    )
  }

  return (
    <div>
      {
        // eslint-disable-next-line operator-linebreak, multiline-ternary
        isLoading ? displayLoading() :
        <Grid container spacing={1} sx={{ backgroundColor: '#b4becf' }}>
          {
            newsFeed?.map((item) => {
              return (
                <Grid item xs={12} sx={{
                  display: 'flex',
                  borderRadius: 0
                }}
                key={item.id}>
                  <CommonCard
                  image={item.download_url}
                  />
                </Grid>
              )
            })
          }
        </Grid>
      }
      {
        isUpdating ? <CircularIndeterminate /> : <></>
      }
    </div>
  )
}

Feed.propTypes = {
  newsFeed: PropTypes.array,
  isLoading: PropTypes.bool,
  isUpdating: PropTypes.bool
}

export default Feed
