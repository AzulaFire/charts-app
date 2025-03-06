'use client';
import React from 'react';
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
import { comparisonData } from '@/data/data'; // Your data file

const Rent = ({ fromYear, toYear }) => {
  const phoenixRent = comparisonData.city.phoenix.housing.median_rent;
  const sapporoRent = comparisonData.city.sapporo.housing.median_rent;

  // Generate the data array with year, phoenixRent, and sapporoRent
  const data = Object.keys(phoenixRent)
    .map((year) => ({
      year: parseInt(year),
      Phoenix: phoenixRent[year],
      Sapporo: sapporoRent[year],
    }))
    .filter(
      (dataPoint) => dataPoint.year >= fromYear && dataPoint.year <= toYear
    );

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
        <XAxis dataKey='year' />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: 'transparent',
          }}
        />
        <Legend />
        <Line
          type='monotone'
          dataKey='Phoenix'
          stroke='#0088FE'
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <Line
          type='monotone'
          dataKey='Sapporo'
          stroke='#FF8042'
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Rent;
