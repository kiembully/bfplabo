import React from 'react'
import PropTypes from 'prop-types'
import { Skeleton } from '@mui/material'
import OrderCard from './OrderCard'

const CardRenderer = (props) => {
  const {
    orders,
    localOrders
  } = props

  const renderOrders = (obj) => {
    if (obj === 'Could not find orders') {
      return (
        <h1>No orders found</h1>
      )
    }

    if (obj?.length <= 0) {
      return (
        <h1>No orders found</h1>
      )
    }

    return (
      obj?.map((item, index) => {
        return (
          <OrderCard
            key={index}
            order={item}
            isCollapsed={false}
          />
        )
      })
    )
  }

  const renderMyOrders = () => {
    return (
      <>
        {
          orders.loading
            ? <>
              <Skeleton sx={{ marginTop: '-40px' }} height={200} />
              <Skeleton sx={{ marginTop: '-60px' }} height={200} />
              <Skeleton sx={{ marginTop: '-60px' }} height={200} />
              <Skeleton sx={{ marginTop: '-60px' }} height={200} />
            </>
            : renderOrders(localOrders)
        }
      </>
    )
  }

  return (
    renderMyOrders()
  )
}

CardRenderer.propTypes = {
  orders: PropTypes.object,
  localOrders: PropTypes.array
}

export default CardRenderer
