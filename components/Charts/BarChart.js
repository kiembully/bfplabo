import React from 'react'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  {
    name: 'Jun',
    completed: 4000,
    failed: 2400,
    amt: 2400
  },
  {
    name: 'Jul',
    completed: 3000,
    failed: 1398,
    amt: 2210
  },
  {
    name: 'Aug',
    completed: 2000,
    failed: 9800,
    amt: 2290
  },
  {
    name: 'Sep',
    completed: 2780,
    failed: 3908,
    amt: 2000
  },
  {
    name: 'Oct',
    completed: 1890,
    failed: 4800,
    amt: 2181
  },
  {
    name: 'Nov',
    completed: 2390,
    failed: 3800,
    amt: 2500
  },
  {
    name: 'Dec',
    completed: 3490,
    failed: 4300,
    amt: 2100
  }
]

const CommonBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart
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
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="completed" fill="#82ca9d" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        <Bar dataKey="failed" fill="#FF8042" activeBar={<Rectangle fill="gold" stroke="purple" />} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default CommonBarChart
