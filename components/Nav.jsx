'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const Nav = ({
  activePage,
  setActivePage,
  startYear,
  setStartYear,
  endYear,
  setEndYear,
}) => {
  return (
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
  );
};
