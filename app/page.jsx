'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaTemperatureHigh,
  FaCity,
  FaUtensils,
  FaPeopleArrows,
} from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Population from '@/components/Population';
import Salaries from '@/components/Salaries';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { softwareEngineerSalaries } from '@/data/data';
import Rent from '@/components/Rent';
import AverageIncomes from '@/components/AverageIncomes';
import Housing from '@/components/Housing';

const cities = [
  {
    name: 'Phoenix, AZ',
    image: '/images/phoenix.jpg', // Replace with the actual path to the image
    description:
      'Phoenix, Arizona, is known for its stunning desert landscapes, year-round sunshine, and vibrant city life.',
    weather:
      'Phoenix experiences a hot desert climate with temperatures often reaching 100°F (38°C) during summer.',
    food: 'Famous for its southwestern cuisine, including Sonoran hot dogs and prickly pear dishes.',
    people:
      'The city is a diverse melting pot, with a mix of people from all over the U.S. and beyond.',
    facts: [
      'Over 1.7 million residents.',
      'One of the fastest-growing cities in the U.S.',
      'Known for its art scene and desert trails.',
    ],
  },
  {
    name: 'Sapporo, Japan',
    image: '/images/sapporo.jpg', // Replace with the actual path to the image
    description:
      'Sapporo, Japan, is famous for its snowy winters, vibrant nightlife, and delicious ramen.',
    weather:
      'Sapporo experiences a subarctic climate with long, snowy winters and mild summers.',
    food: 'Famous for its miso ramen, fresh seafood, and the Sapporo beer.',
    people:
      'The people of Sapporo are known for their friendliness, hospitality, and respect for tradition.',
    facts: [
      'Population of around 2 million.',
      'Known for the Sapporo Snow Festival.',
      'One of the best places to experience Japanese winter sports.',
    ],
  },
];

const HomePage = () => {
  const [activePage, setActivePage] = useState('home');
  const [startYear, setStartYear] = useState(2024);
  const [endYear, setEndYear] = useState(2025);
  const [jobType, setJobType] = useState('all');

  const filterData = (country, jobType) => {
    const filteredYears = softwareEngineerSalaries.years.slice(
      softwareEngineerSalaries.years.indexOf(startYear),
      softwareEngineerSalaries.years.indexOf(endYear) + 1
    );

    return filteredYears.map((year) => {
      let jobData = {};
      if (jobType === 'all' || jobType === 'frontend') {
        jobData.frontend =
          softwareEngineerSalaries[country].frontend[
            softwareEngineerSalaries.years.indexOf(year)
          ];
      }
      if (jobType === 'all' || jobType === 'backend') {
        jobData.backend =
          softwareEngineerSalaries[country].backend[
            softwareEngineerSalaries.years.indexOf(year)
          ];
      }
      if (jobType === 'all' || jobType === 'fullstack') {
        jobData.fullstack =
          softwareEngineerSalaries[country].fullstack[
            softwareEngineerSalaries.years.indexOf(year)
          ];
      }
      if (jobType === 'all' || jobType === 'devops') {
        jobData.devops =
          softwareEngineerSalaries[country].devops[
            softwareEngineerSalaries.years.indexOf(year)
          ];
      }

      return { year, ...jobData };
    });
  };

  const usaData = filterData('usa', jobType);
  const japanData = filterData('japan', jobType);

  return (
    <>
      <nav className='border-b bg-[#1A1A1D] text-white lg:sticky top-0 w-full'>
        <div className='flex flex-wrap lg:flex-nowrap justify-between items-center text-2xl font-bold text-white mx-4 py-4 gap-4'>
          {/* Buttons on the left */}
          <div className='flex flex-wrap gap-2 sm:gap-4'>
            <Button
              variant='link'
              onClick={() => setActivePage('home')}
              className={activePage === 'home' ? 'text-[#A64D79]' : ''}
            >
              Home
            </Button>
            <Button
              variant='link'
              onClick={() => setActivePage('housing')}
              className={activePage === 'housing' ? 'text-[#A64D79]' : ''}
            >
              Housing
            </Button>
            <Button
              variant='link'
              onClick={() => setActivePage('incomes')}
              className={activePage === 'incomes' ? 'text-[#A64D79]' : ''}
            >
              Average Incomes
            </Button>
            <Button
              variant='link'
              onClick={() => setActivePage('salaries')}
              className={activePage === 'salaries' ? 'text-[#A64D79]' : ''}
            >
              IT Salaries
            </Button>
            <Button
              variant='link'
              onClick={() => setActivePage('population')}
              className={activePage === 'population' ? 'text-[#A64D79]' : ''}
            >
              Population
            </Button>
          </div>

          {/* Year Inputs on the right */}
          <div className='flex flex-wrap lg:flex-nowrap items-center gap-4'>
            {/* Start Year */}
            <div className='flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4'>
              <Label className='text-sm'>
                Start Year: <span className='text-xs'>(Min: 2000)</span>
              </Label>
              <Input
                type='number'
                value={startYear}
                onChange={(e) => setStartYear(Number(e.target.value))}
                min={2000}
                max={2025}
                className='w-[80px] sm:w-[100px] md:w-[120px]'
              />
            </div>

            {/* End Year */}
            <div className='flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4'>
              <Label className='text-sm'>
                End Year: <span className='text-xs'>(Max: 2025)</span>
              </Label>
              <Input
                type='number'
                value={endYear}
                onChange={(e) => setEndYear(Number(e.target.value))}
                min={2000}
                max={2025}
                className='w-[80px] sm:w-[100px] md:w-[120px]'
              />
            </div>
          </div>
        </div>
      </nav>

      {activePage === 'home' && (
        <div className='container mx-auto px-4 py-8'>
          <h1 className='text-4xl font-bold text-center mb-8'>
            Explore Two Amazing Cities: Phoenix and Sapporo
          </h1>

          <div className='grid md:grid-cols-2 gap-8'>
            {cities.map((city, index) => (
              <motion.div
                key={index}
                className='bg-[#1A1A1D] shadow-lg rounded-lg overflow-hidden'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.3, duration: 0.8 }}
              >
                <img
                  src={city.image}
                  alt={`${city.name} image`}
                  className='w-full h-64 object-cover'
                />
                <div className='p-6'>
                  <h2 className='text-2xl font-semibold mb-4'>{city.name}</h2>
                  <p className='mb-4'>{city.description}</p>

                  <div className='space-y-4'>
                    <div className='flex items-center'>
                      <FaTemperatureHigh className='text-blue-500 mr-2' />
                      <span>{city.weather}</span>
                    </div>
                    <div className='flex items-center'>
                      <FaUtensils className='text-green-500 mr-2' />
                      <span>{city.food}</span>
                    </div>
                    <div className='flex items-center'>
                      <FaPeopleArrows className='text-yellow-500 mr-2' />
                      <span>{city.people}</span>
                    </div>
                    <div className='flex items-center'>
                      <FaCity className='text-gray-500 mr-2' />
                      <ul className='list-disc ml-4'>
                        {city.facts.map((fact, index) => (
                          <li key={index}>{fact}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
      {activePage === 'housing' && (
        <div className='flex flex-col items-center mt-4'>
          <h1 className='text-2xl py-6'>
            Average Rent between {startYear} and {endYear}
          </h1>
          <Rent fromYear={startYear} toYear={endYear} />
          <h1 className='text-2xl py-6'>
            Average House Cost between {startYear} and {endYear}
          </h1>
          <Housing fromYear={startYear} toYear={endYear} />
        </div>
      )}
      {activePage === 'incomes' && (
        <div className='flex flex-col items-center mt-4'>
          <h1 className='text-2xl py-6'>
            Average Incomes between {startYear} and {endYear}
          </h1>
          <AverageIncomes fromYear={startYear} toYear={endYear} />
        </div>
      )}
      {activePage === 'salaries' && (
        <div className='min-h-screen pb-4 px-8 mt-4'>
          <h1 className='text-2xl py-6 flex justify-center'>
            Software Engineer Salaries between {startYear} and {endYear}
          </h1>
          <div className='flex flex-row'>
            <Label className={'w-[80px]'}>Job Type: </Label>

            <Select
              value={jobType}
              onValueChange={(value) => setJobType(value)}
            >
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Select a Job Type' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='all'>All</SelectItem>
                  <SelectItem value='frontend'>Frontend</SelectItem>
                  <SelectItem value='backend'>Backend</SelectItem>
                  <SelectItem value='fullstack'>Fullstack</SelectItem>
                  <SelectItem value='devops'>DevOps</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <Salaries usaData={usaData} japanData={japanData} />
          </div>
        </div>
      )}
      {activePage === 'population' && (
        <div className='flex flex-col items-center mt-4'>
          <h1 className='text-2xl py-6'>
            Population Stats between {startYear} and {endYear}
          </h1>
          <Population fromYear={startYear} toYear={endYear} />
        </div>
      )}
    </>
  );
};
export default HomePage;
