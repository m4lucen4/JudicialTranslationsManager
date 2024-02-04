import './chart.scss'
import {
  PieChart,
  Pie,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data01 = [
  { name: 'Traducciones', value: 8 },
  { name: 'Interpretaciones', value: 5 },
  { name: 'Ratificaciones', value: 1 },
]

const ChartPie = ({ aspect, title }) => {
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data01}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ChartPie
