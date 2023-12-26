import OneRepMax from '@/components/dashboard/OneRepMax'
import RecentlyRecorded from '@/components/dashboard/RecentlyRecorded'
import React from 'react'

const page = async () => {
  
  return (
    <div className='flex gap-5 flex-wrap items-center justify-center md:justify-start'>
      <RecentlyRecorded />
      <OneRepMax />
    </div>

  )
}

export default page