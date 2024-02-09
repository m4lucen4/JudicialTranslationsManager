import React, { useState, useEffect } from 'react'
import {
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
} from 'recharts'

import './chart.css'

import dataByYear from './dataExample/ExampleLine'

const Chart = ({ aspect, title }) => {
  const [year, setYear] = useState(new Date().getFullYear())
  const [data, setData] = useState([])

  useEffect(() => {
    setData(dataByYear[year])
  }, [year])

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <div className="year-selector">
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <ComposedChart
          layout="horizontal"
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 60,
            left: 20,
          }}
        >
          <YAxis type="number" />
          <XAxis
            dataKey="name"
            type="category"
            scale="band"
            angle={-45}
            textAnchor="end"
            dy={10}
            interval={0}
          />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Line dataKey="Importe" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
