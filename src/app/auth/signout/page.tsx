'use client'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const page = () => {

    const logout = () => {
        signOut({ callbackUrl: '/' })
    }
    return (
        <div className='h-screen bg-[#1A1D24] w-full flex items-center justify-center'>
            <div className='bg-[#282C35]  rounded-xl p-16 flex flex-col gap-8 items-center'>
                <h3 className='text-white font-bold text-4xl'> Signout</h3>
                <div className='flex flex-row gap-4'>
                    <button onClick={() => { logout() }} className='p-4 border text-[#F68E31] border-[#F68E31] rounded-xl text-xl hover:animate-pulse'>
                        <span>Logout</span>
                    </button>
                    <Link href={'/dashboard'} className='p-4 text-white bg-[#F68E31] rounded-xl font-bold text-xl shadow-xl hover:scale-110 transition ease-in-out'>
                        <span>Go Back</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default page