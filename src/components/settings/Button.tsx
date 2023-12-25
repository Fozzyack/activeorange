"use client"
import { useRouter } from 'next/navigation'
import React from 'react'


const Button = () => {
    const router = useRouter()

    function buttonpress()  {
        window.location.reload()
    }
  return (
    <button type='submit' className='px-2 py-1 bg-orange-600 rounded-b-xl' onClick={() => {buttonpress()}}>Update</button>
  )
}

export default Button