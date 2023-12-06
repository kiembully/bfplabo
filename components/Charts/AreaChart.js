import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import PropTypes from 'prop-types'

const CommonAreaChart = (props) => {
  const {
    dataChart
  } = props

  console.log(dataChart)
  const data = [
    {
      name: 'Jul',
      amt: 2210
    },
    {
      name: 'Aug',
      amt: 2290
    },
    {
      name: 'Sep',
      amt: 2000
    },
    {
      name: 'Oct',
      amt: 2181
    },
    {
      name: 'Nov',
      amt: 2500
    },
    {
      name: 'Dec',
      amt: 2100
    }
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="amt" stroke="#8884d8" fill="#52A7C1" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

CommonAreaChart.propTypes = {
  dataChart: PropTypes.any
}

export default CommonAreaChart
