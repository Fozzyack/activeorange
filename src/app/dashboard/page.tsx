import OneRepMax from '@/components/dashboard/OneRepMax'
import RecentlyRecorded from '@/components/dashboard/RecentlyRecorded'
import React from 'react'

const page = async () => {

  return (
    <div className='w-full md:grid md:grid-cols-4 gap-2'>
      <div className='col-span-3'>
        <RecentlyRecorded />
      </div>
      <div>
        <OneRepMax />
      </div>

    </div>

  )
}

export default page