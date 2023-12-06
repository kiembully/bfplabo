import React from 'react'
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  {
    name: 'Jun',
    active: 4000,
    new: 2400,
    amt: 2400
  },
  {
    name: 'Jul',
    active: 3000,
    new: 1398,
    amt: 2210
  },
  {
    name: 'Aug',
    active: 2000,
    new: 9800,
    amt: 2290
  },
  {
    name: 'Sep',
    active: 2780,
    new: 3908,
    amt: 2000
  },
  {
    name: 'Oct',
    active: 1890,
    new: 4800,
    amt: 2181
  },
  {
    name: 'Nov',
    active: 2390,
    new: 3800,
    amt: 2500
  },
  {
    name: 'Dec',
    active: 3490,
    new: 4300,
    amt: 2100
  }
]

const CommonLineChart = () => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        {/* <YAxis /> */}
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="active" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="new" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default CommonLineChart
