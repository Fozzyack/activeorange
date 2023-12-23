import { getServerSession } from 'next-auth'
import React from 'react'
import { options } from '../api/auth/[...nextauth]/options'
import Image from 'next/image'

const page = async () => {
  return (
    <div>
      dashboard
    </div>

  )
}

export default page