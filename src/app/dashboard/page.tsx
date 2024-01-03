import DisplayMEV from '@/components/dashboard/DisplayMEV'
import OneRepMax from '@/components/dashboard/OneRepMax'
import RecentlyRecorded from '@/components/dashboard/RecentlyRecorded'
import React from 'react'

const page = async () => {

  return (
    <div className='w-full flex flex-wrap gap-4 justify-center lg:justify-around'>
      <RecentlyRecorded />
      <OneRepMax />
      <div className='text-center text-white '>
        <h1 className='my-3'>MEVs</h1>
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-4'>
          <DisplayMEV name={'Back'} />
          <DisplayMEV name={'Bicep'} />
          <DisplayMEV name={'Traps'} />
          <DisplayMEV name={'Chest'} />
          <DisplayMEV name={'Triceps'} />
          <DisplayMEV name={'Quads'} />
          <DisplayMEV name={'Glutes'} />
          <DisplayMEV name={'Hamstrings'} />
          <DisplayMEV name={'Calves'} />
          <DisplayMEV name={'Front Delts'} />
          <DisplayMEV name={'Rear Delts'} />
        </div>
      </div>



    </div>

  )
}

export default page