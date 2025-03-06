'use client';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { comparisonData } from '@/data/data'; // Your data file

const AverageIncomes = ({ fromYear, toYear }) => {
  const phoenixIncome = comparisonData.city.phoenix.economy.average_income;
  const sapporoIncome = comparisonData.city.sapporo.economy.average_income;

  // Generate the data array with year, phoenixIncome, and sapporoIncome
  const data = Object.keys(phoenixIncome)
    .map((year) => ({
      year: parseInt(year),
      Phoenix: phoenixIncome[year],
      Sapporo: sapporoIncome[year],
    }))
    .filter(
      (dataPoint) => dataPoint.year >= fromYear && dataPoint.year <= toYear
    );

  return (
    <ResponsiveContainer width='100%' aspect={3}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='year' />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: 'transparent',
          }}
        />
        <Legend />

        {/* Defining Color Gradients */}
        <defs>
          <linearGradient id='phoenixGradient' x1='0' y1='100%' x2='0' y2='0'>
            <stop offset='5%' stopColor='#cf2c73' stopOpacity={0.9} />
            <stop offset='95%' stopColor='#cf2c73' stopOpacity={1} />
          </linearGradient>

          <linearGradient id='sapporoGradient' x1='0' y1='100%' x2='0' y2='0'>
            <stop offset='5%' stopColor='#eee63f' stopOpacity={0.9} />
            <stop offset='95%' stopColor='#eee63f' stopOpacity={1} />
          </linearGradient>
        </defs>

        {/* Phoenix Income Area with Gradient */}
        <Area
          type='monotone'
          dataKey='Phoenix'
          stroke='#cf2c73' // Using the defined gradient for Phoenix
          fill='url(#phoenixGradient)' // Using the defined gradient for Phoenix
        />

        {/* Sapporo Income Area with Gradient */}
        <Area
          type='monotone'
          dataKey='Sapporo'
          stroke='#eee63f' // Using the defined gradient for Sapporo
          fill='url(#sapporoGradient)' // Using the defined gradient for Sapporo
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AverageIncomes;
