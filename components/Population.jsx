'use client';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { populationData } from '@/data/data';

const Population = ({ fromYear, toYear }) => {
  // Helper function to format the data for the chart
  const formatData = (fromYear, toYear) => {
    const years = Object.keys(populationData.cities.phoenix.population);
    const filteredYears = years.filter(
      (year) => year >= fromYear && year <= toYear
    );

    return filteredYears.map((year) => ({
      name: year,
      phoenix: populationData.cities.phoenix.population[year],
      sapporo: populationData.cities.sapporo.population[year],
    }));
  };

  // Filtered data based on the props
  const data = formatData(fromYear, toYear);

  return (
    <ResponsiveContainer width='100%' aspect={3}>
      <LineChart
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
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: 'transparent',
          }}
        />
        <Legend />
        <Line
          type='monotone'
          dataKey='phoenix'
          stroke='#009245'
          activeDot={{ r: 8 }}
        />
        <Line type='monotone' dataKey='sapporo' stroke='#662D8C' />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Population;
