import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Salaries = ({ usaData, japanData }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      // Prepare the content for the tooltip by iterating through the payload (without the year)
      const tooltipContent = Object.keys(payload[0].payload).map((key) => {
        if (key !== 'year') {
          // Exclude 'year' from being shown in the tooltip
          return (
            <p key={key} className='label'>
              {`${
                key.charAt(0).toUpperCase() + key.slice(1)
              }: $${payload[0].payload[key].toLocaleString()}`}
            </p>
          );
        }
        return null; // Skip 'year'
      });

      return (
        <div className='custom-tooltip'>
          {/* Display year based on the 'label' prop */}
          <p className='label'>{`Year: ${label}`}</p>
          {tooltipContent}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {/* USA Bar Chart */}

      <ResponsiveContainer height={400} className={'my-6'}>
        <h2 className='text-2xl font-bold mb-4'>Phoenix, AZ, USA</h2>
        <BarChart data={usaData} className='p-2'>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='year' />
          <YAxis tickFormatter={(value) => `$${value}`} />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: 'transparent' }}
          />
          <Legend />
          <defs>
            <linearGradient
              id='frontendGradient'
              x1='0'
              y1='100%'
              x2='0'
              y2='0'
            >
              <stop offset='0%' stopColor='#2E3192' />
              <stop offset='100%' stopColor='#1BFFFF' />
            </linearGradient>
            <linearGradient id='backendGradient' x1='0' y1='100%' x2='0' y2='0'>
              <stop offset='0%' stopColor='#D4145A' />
              <stop offset='100%' stopColor='#FBB03B' />
            </linearGradient>
            <linearGradient
              id='fullstackGradient'
              x1='0'
              y1='100%'
              x2='0'
              y2='0'
            >
              <stop offset='0%' stopColor='#009245' />
              <stop offset='100%' stopColor='#FCEE21' />
            </linearGradient>
            <linearGradient id='devopsGradient' x1='0' y1='100%' x2='0' y2='0'>
              <stop offset='0%' stopColor='#662D8C' />
              <stop offset='100%' stopColor='#ED1E79' />
            </linearGradient>
          </defs>
          <Bar dataKey='frontend' fill='url(#frontendGradient)' />
          <Bar dataKey='backend' fill='url(#backendGradient)' />
          <Bar dataKey='fullstack' fill='url(#fullstackGradient)' />
          <Bar dataKey='devops' fill='url(#devopsGradient)' />
        </BarChart>
      </ResponsiveContainer>

      {/* Japan Bar Chart */}
      <ResponsiveContainer height={400} className={'my-6'}>
        <h2 className='text-2xl font-bold mb-4'>Sapporo, Japan</h2>
        <BarChart data={japanData} className='p-2'>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='year' />
          <YAxis tickFormatter={(value) => `$${value}`} />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: 'transparent' }}
          />
          <Legend />
          <defs>
            <linearGradient
              id='frontendGradient'
              x1='0'
              y1='100%'
              x2='0'
              y2='0'
            >
              <stop offset='0%' stopColor='#2E3192' />
              <stop offset='100%' stopColor='#1BFFFF' />
            </linearGradient>
            <linearGradient id='backendGradient' x1='0' y1='100%' x2='0' y2='0'>
              <stop offset='0%' stopColor='#D4145A' />
              <stop offset='100%' stopColor='#FBB03B' />
            </linearGradient>
            <linearGradient
              id='fullstackGradient'
              x1='0'
              y1='100%'
              x2='0'
              y2='0'
            >
              <stop offset='0%' stopColor='#D4145A' />
              <stop offset='100%' stopColor='#FBB03B' />
            </linearGradient>
            <linearGradient id='devopsGradient' x1='0' y1='100%' x2='0' y2='0'>
              <stop offset='0%' stopColor='#662D8C' />
              <stop offset='100%' stopColor='#ED1E79' />
            </linearGradient>
          </defs>
          <Bar dataKey='frontend' fill='url(#frontendGradient)' />
          <Bar dataKey='backend' fill='url(#backendGradient)' />
          <Bar dataKey='fullstack' fill='url(#fullstackGradient)' />
          <Bar dataKey='devops' fill='url(#devopsGradient)' />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default Salaries;
