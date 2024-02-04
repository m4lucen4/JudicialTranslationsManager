import './chart.scss'
import {
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Line,
} from 'recharts'

const data = [
  {
    name: 'Antequera',
    Importe: 3500,
  },
  {
    name: 'Estepona',
    Importe: 2450,
  },
  {
    name: 'Fuengirola',
    Importe: 5600,
  },
  {
    name: 'Málaga',
    Importe: 16500,
  },
  {
    name: 'Marbella',
    Importe: 8700,
  },
  {
    name: 'Ronda',
    Importe: 3200,
  },
  {
    name: 'Torremolinos',
    Importe: 4200,
  },
]

const Chart = ({ aspect, title }) => {
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <ComposedChart
          layout="horizontal"
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <YAxis type="number" />
          <XAxis dataKey="name" type="category" scale="band" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Line dataKey="Importe" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
