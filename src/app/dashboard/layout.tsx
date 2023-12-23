import { getServerSession } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { options } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'

const layout = async ({ children }: { children: React.ReactNode }) => {

  const session = await getServerSession(options)
  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/dashboard')
  }
  return (
      <div>
        {children}
      </div>

  )
}

export default layout