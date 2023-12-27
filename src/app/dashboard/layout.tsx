import { getServerSession } from 'next-auth'
import React from 'react'
import { options } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'
import NavbarWrapper from '@/components/dashboard/NavbarWrapper'

const layout = async ({ children }: { children: React.ReactNode }) => {

  const session = await getServerSession(options)
  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/dashboard')
  }
  return (
      <div className='md:grid md:grid-cols-12 bg-[#1A1D24] min-h-screen md:p-16 gap-10 max-w-screen'>
        <div className='col-span-5 lg:col-span-3'>
          <NavbarWrapper />
        </div>
        <div className='col-span-7 lg:col-span-9 pt-20 px-5 pb-5 md:p-0'>
        {children}
        </div>
        
      </div>

  )
}

export default layout