// Write your code here
import './index.css'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const VaccinationCoverage = props => {
  const {last7DaysVaccination} = props

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="coverage-container">
      <h1 className="coverage-heading">Vaccination Coverage</h1>
      <ResponsiveContainer width="95%" height={400}>
        <BarChart
          data={last7DaysVaccination}
          margin={{
            top: 5,
          }}
        >
          <XAxis
            dataKey="vaccineDate"
            tick={{
              stroke: 'gray',
              strokeWidth: 1,
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: 'gray',
              strokeWidth: 0,
            }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: 30,
              paddingBottom: 0,
            }}
          />
          <Bar
            dataKey="dose1"
            name="Dose 1"
            fill="#5a8dee"
            barSize="20%"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="dose2"
            name="Dose 2"
            fill="#f54394"
            barSize="20%"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
      )
    </div>
  )
}

export default VaccinationCoverage
