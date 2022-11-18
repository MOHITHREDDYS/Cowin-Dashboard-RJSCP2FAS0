// Write your code here
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const VaccinationByGender = props => {
  const {vaccinationByAge} = props
  console.log(vaccinationByAge)

  return (
    <div className="coverage-container">
      <h1 className="coverage-heading">Vaccination by age</h1>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart reverseStackOrder>
          <Pie
            cx="50%"
            cy="50%"
            data={vaccinationByAge}
            startAngle={0}
            endAngle={360}
            innerRadius="0%"
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="18-44" fill="#2d87bb" />
            <Cell name="44-60" fill="#a3df9f" />
            <Cell name="Above 60" fill="#64c2a6" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            wrapperStyle={{
              margin: 0,
              paddingTop: 0,
              paddingBottom: 0,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByGender
