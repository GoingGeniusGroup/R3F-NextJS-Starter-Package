'use client'
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const data_1 = [
  { name: 'Fighting', value: 400 },
  { name: 'Farming', value: 300 },
  { name: 'Pushing', value: 300 },
  { name: 'Supporting', value: 200 },
  { name: 'Versitility', value: 200 },
];
const data_2 = [
  {
    subject: 'Fighting',
    A: 100,
    
    fullMark: 150,
  },
  {
    subject: 'Farming',
    A: 120,
    
    fullMark: 150,
  },
  {
    subject: 'Supporting',
    A: 86,
    
    fullMark: 150,
  },
  {
    subject: 'Pushing',
    A: 99,
    
    fullMark: 150,
  },
  {
    subject: 'Versitility',
    A: 20,
    fullMark: 150,
  },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
export default function Page() {
  return (
    <div className='flex flex-col'>
    <div className='h-96 w-full'>
    <ResponsiveContainer width="100%" height="100%">
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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      </ResponsiveContainer>
      </div>
      <div className='h-96 w-full'>
      <PieChart width={800} height={400}>
        <Pie
          data={data_1}
          cx={120}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Pie
          data={data_1}
          cx={420}
          cy={200}
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      </div>
      <div className='h-96 w-full'>
            <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data_2}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar name="Mike" dataKey="A" stroke="#fffff" fill="#fffff" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
      </div>
      </div>
  )
}