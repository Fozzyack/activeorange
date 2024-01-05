import DisplayMEV from '@/components/dashboard/DisplayMEV'
import MAVGraph from '@/components/dashboard/MAVGraph'
import OneRepMax from '@/components/dashboard/OneRepMax'
import RecentlyRecorded from '@/components/dashboard/RecentlyRecorded'
import React from 'react'

const page = async () => {

  return (
    <div className='w-full flex flex-wrap gap-4 justify-center lg:justify-around'>
      <RecentlyRecorded />
      <OneRepMax />
      <div className='text-center text-white '>
        <h1 className='mt-3'>MEVs</h1>
        <p className='text-slate-600 my-3'>The Minimum amount of Volume Required</p>
        <div className='w-full flex flex-row flex-wrap gap-4 items-center justify-center'>
          <DisplayMEV name={'Back'} />
          <DisplayMEV name={'Biceps'} />
          <DisplayMEV name={'Traps'} />
          <DisplayMEV name={'Chest'} />
          <DisplayMEV name={'Triceps'} />
          <DisplayMEV name={'Quads'} />
          <DisplayMEV name={'Glutes'} />
          <DisplayMEV name={'Hamstrings'} />
          <DisplayMEV name={'Calves'} />
          <DisplayMEV name={'Side Delts'} />
          <DisplayMEV name={'Rear Delts'} />
        </div>
      </div>
      <MAVGraph />


    </div>

  )
}

export default page