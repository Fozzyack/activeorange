'use client'
import { signOut } from 'next-auth/react'
import React from 'react'

const page = () => {
    
    const logout =  () => {
        signOut({callbackUrl: '/'})
    }
    return (
        <div className='h-screen bg-[#1A1D24] w-full flex items-center justify-center'>
            <div className='bg-[#282C35]  rounded-xl p-16 flex flex-col gap-8'>
                <h3 className='text-white font-bold text-4xl'> Signout</h3>
                <button onClick={() => {logout()}} className='p-4 text-white bg-[#F68E31] rounded-xl font-bold text-xl'>
                    <span>Logout</span>
                </button>
            </div>
        </div>
    )
}

export default page