import { getServerSession } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
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
      <div className='md:grid md:grid-cols-12 bg-[#1A1D24] min-h-screen p-6 md:p-16 gap-10 max-w-screen'>
        <div className='col-span-5 lg:col-span-3'>
          <NavbarWrapper />
        </div>
        <div className='col-span-7 lg:col-span-9'>
        {children}
        </div>
        
      </div>

  )
}

export default layout