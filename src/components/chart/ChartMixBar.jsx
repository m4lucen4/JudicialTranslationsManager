import './chart.scss'
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Bar,
} from 'recharts'

const data = [
  {
    name: 'Solicitado',
    Traducción: 60,
    Interpretación: 30,
    Ratificación: 10,
  },
  {
    name: 'En curso',
    Traducción: 50,
    Interpretación: 45,
    Ratificación: 5,
  },
  {
    name: 'Suspenso',
    Traducción: 40,
    Interpretación: 40,
    Ratificación: 20,
  },
  {
    name: 'Por facturar',
    Traducción: 30,
    Interpretación: 40,
    Ratificación: 30,
  },
  {
    name: 'Facturado',
    Traducción: 80,
    Interpretación: 10,
    Ratificación: 10,
  },
]

const ChartMixBar = ({ aspect, title }) => {
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" stroke="gray" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Legend />
          <Bar dataKey="Traducción" stackId="a" fill="#8884d8" />
          <Bar dataKey="Interpretación" stackId="a" fill="#82ca9d" />
          <Bar dataKey="Ratificación" stackId="a" fill="#82fg9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ChartMixBar
