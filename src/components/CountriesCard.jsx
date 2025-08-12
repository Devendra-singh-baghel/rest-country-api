import React from 'react'

function CountriesCard({ flag, alt, country, population, region, capital }) {
  return (
    <div className='space-y-2 shadow max-w-72 rounded-md bg-white dark:bg-[#2b3845] dark:text-white'>
      <div>
        <img src={flag} alt={alt} className='h-[180px] w-[288px] rounded-t-md' />
      </div>
      <div className='pl-7 pb-8'>
        <h2 className='text-gray-950 dark:text-white font-extrabold my-3'>{country}</h2>
        <div className='text-sm space-y-2'>
          <div>
            <span className='font-bold'>Population: </span>
            <span>{population}</span>
          </div>
          <div>
            <span className='font-bold'>Region: </span>
            <span>{region}</span>
          </div>
          <div>
            <span className='font-bold'>Capital: </span>
            <span>{capital}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CountriesCard
