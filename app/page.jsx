'use client';

import { useState } from 'react';
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
      <nav className='border-b bg-[#1A1A1D] text-white lg:sticky top-0'>
        <div className='flex justify-between items-center text-2xl font-bold text-white mx-4 py-4'>
          {/* Buttons on the left */}
          <div className='flex gap-4'>
            <Button
              variant={'link'}
              onClick={() => setActivePage('home')}
              className={activePage === 'home' ? 'text-[#A64D79]' : ''}
            >
              Home
            </Button>
            <Button
              variant={'link'}
              onClick={() => setActivePage('salaries')}
              className={activePage === 'salaries' ? 'text-[#A64D79]' : ''}
            >
              Salaries
            </Button>
            <Button
              variant={'link'}
              onClick={() => setActivePage('population')}
              className={activePage === 'population' ? 'text-[#A64D79]' : ''}
            >
              Population
            </Button>
          </div>

          {/* Year Inputs on the right */}
          <div className='flex flex-col lg:flex-row items-center gap-4'>
            {/* Start Year */}
            <div className='flex items-center gap-4 mr-4'>
              <Label className='text-sm align-middle'>
                Start Year: <span className='text-xs'>(Min: 2000)</span>
              </Label>
              <Input
                type='number'
                value={startYear}
                onChange={(e) => setStartYear(Number(e.target.value))}
                min={2000}
                max={2025}
                className={'w-[120px]'}
              />
            </div>

            {/* End Year */}
            <div className='flex items-center gap-4'>
              <Label className='text-sm align-middle'>
                End Year: <span className='text-xs'>(Max: 2025)</span>
              </Label>
              <Input
                type='number'
                value={endYear}
                onChange={(e) => setEndYear(Number(e.target.value))}
                min={2000}
                max={2025}
                className={'w-[120px]'}
              />
            </div>
          </div>
        </div>
      </nav>
      {activePage === 'salaries' && (
        <div className='min-h-screen pb-4 px-8'>
          <h1 className='text-2xl py-6'>
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
