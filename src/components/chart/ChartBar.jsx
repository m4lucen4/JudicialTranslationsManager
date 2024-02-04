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
  Rectangle,
} from 'recharts'

const data = [
  {
    name: 'Antequera',
    Solicitadas: 4,
    Entregadas: 4,
    amt: 2400,
  },
  {
    name: 'Estepona',
    Solicitadas: 5,
    Entregadas: 3,
    amt: 2210,
  },
  {
    name: 'Fuengirola',
    Solicitadas: 2,
    Entregadas: 2,
    amt: 2290,
  },
  {
    name: 'Málaga',
    Solicitadas: 12,
    Entregadas: 8,
    amt: 2000,
  },
  {
    name: 'Marbella',
    Solicitadas: 8,
    Entregadas: 5,
    amt: 2181,
  },
  {
    name: 'Ronda',
    Solicitadas: 4,
    Entregadas: 4,
    amt: 2500,
  },
  {
    name: 'Torremolinos',
    Solicitadas: 4,
    Entregadas: 3,
    amt: 2100,
  },
]

const ChartBar = ({ aspect, title }) => {
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
          <Bar
            dataKey="Solicitadas"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="Entregadas"
            fill="#82ca9d"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ChartBar
