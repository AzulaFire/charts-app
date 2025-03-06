'use client';
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  LabelList,
  Label,
} from 'recharts';
import { populationData } from '@/data/data';

const Population = ({ fromYear, toYear }) => {
  const phoenixPopulation = populationData.cities.phoenix.population;
  const sapporoPopulation = populationData.cities.sapporo.population;

  // Generate the data array with year, phoenixPopulation, and sapporoPopulation
  const phoenixData = Object.keys(phoenixPopulation)
    .map((year) => ({
      year: parseInt(year),
      Phoenix: phoenixPopulation[year],
    }))
    .filter(
      (dataPoint) => dataPoint.year >= fromYear && dataPoint.year <= toYear
    );

  const sapporoData = Object.keys(sapporoPopulation)
    .map((year) => ({
      year: parseInt(year),
      Sapporo: sapporoPopulation[year],
    }))
    .filter(
      (dataPoint) => dataPoint.year >= fromYear && dataPoint.year <= toYear
    );

  // Define a fixed color palette with 20 colors
  const colorPalette = [
    '#FF6347',
    '#32CD32',
    '#4682B4',
    '#FFD700',
    '#8A2BE2',
    '#A52A2A',
    '#5F9EA0',
    '#D2691E',
    '#FF4500',
    '#2E8B57',
    '#6A5ACD',
    '#7FFF00',
    '#DC143C',
    '#FF1493',
    '#00BFFF',
    '#228B22',
    '#ADFF2F',
    '#FF69B4',
    '#C71585',
    '#8B0000',
  ];

  // Function to get the color from the palette based on the index of the year
  const getColorForYear = (year) => {
    const yearsRange = toYear - fromYear + 1;
    const index = (year - fromYear) % yearsRange;
    return colorPalette[index];
  };

  const generatePieData = (data, cityKey) => {
    return data.map((item) => ({
      name: item.year.toString(),
      value: item[cityKey],
      color: getColorForYear(item.year),
      year: item.year, // Add the year to each data point for later use
    }));
  };

  const phoenixPieData = generatePieData(phoenixData, 'Phoenix');
  const sapporoPieData = generatePieData(sapporoData, 'Sapporo');

  return (
    <ResponsiveContainer width='100%' aspect={3}>
      <div className='grid sm:grid-cols-2 gap-4 grid-cols-1'>
        {/* Pie chart for Phoenix */}
        <div className='col-span-1 place-items-center'>
          <h2 className='text-lg'>Phoenix</h2>
          <PieChart width={800} height={500}>
            <Pie
              data={phoenixPieData}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
                index,
              }) => {
                const radius = innerRadius + (outerRadius - innerRadius) / 2;
                const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
                const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);
                return (
                  <text
                    x={x}
                    y={y}
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline='middle'
                    fontSize={12}
                    fill='white'
                  >
                    {`${phoenixPieData[index].year}`}
                  </text>
                );
              }}
              innerRadius={100}
              outerRadius={200}
              paddingAngle={10}
              isAnimationActive={true}
              fill='#009245'
              stroke='none'
            >
              {phoenixPieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <Tooltip />
              {/* Center header text */}
              <text
                x='50%'
                y='50%'
                textAnchor='middle'
                dominantBaseline='middle'
                fontSize={18}
                fill='white'
              >
                Phoenix
              </text>
              {/* Display values with spacing and lines */}
              <LabelList
                dataKey='value'
                position='outside'
                fill='white'
                fontSize={12}
                offset={15} // Increase the offset to prevent overlap with the lines
              />
            </Pie>
          </PieChart>
        </div>

        {/* Pie chart for Sapporo */}
        <div className='col-span-1 place-items-center'>
          <h2 className='text-lg'>Sapporo</h2>
          <PieChart width={800} height={500}>
            <Pie
              data={sapporoPieData}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
                index,
              }) => {
                const radius = innerRadius + (outerRadius - innerRadius) / 2;
                const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
                const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);
                return (
                  <text
                    x={x}
                    y={y}
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline='middle'
                    fontSize={12}
                    fill='white'
                  >
                    {`${sapporoPieData[index].year}`}
                  </text>
                );
              }}
              innerRadius={100}
              outerRadius={200}
              paddingAngle={10}
              isAnimationActive={true}
              fill='#662D8C'
              stroke='none'
            >
              {sapporoPieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <Tooltip />
              {/* Center header text */}
              <text
                x='50%'
                y='50%'
                textAnchor='middle'
                dominantBaseline='middle'
                fontSize={18}
                fill='white'
              >
                Sapporo
              </text>
              {/* Display values with spacing and lines */}
              <LabelList
                dataKey='value'
                position='outside'
                fill='white'
                fontSize={12}
                offset={15} // Increase the offset to prevent overlap with the lines
              />
            </Pie>
          </PieChart>
        </div>
      </div>
    </ResponsiveContainer>
  );
};

export default Population;
