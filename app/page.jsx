'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaTemperatureHigh,
  FaCity,
  FaUtensils,
  FaPeopleArrows,
} from 'react-icons/fa';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Nav } from '@/components/Nav';
import Rent from '@/components/Rent';
import Housing from '@/components/Housing';
import AverageIncomes from '@/components/AverageIncomes';
import Salaries from '@/components/Salaries';
import Population from '@/components/Population';

import { softwareEngineerSalaries } from '@/data/data';
import { cities } from '@/data/data';

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
      <Nav
        activePage={activePage}
        setActivePage={setActivePage}
        startYear={startYear}
        setStartYear={setStartYear}
        endYear={endYear}
        setEndYear={setEndYear}
      />

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
