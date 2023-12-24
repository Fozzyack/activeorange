'use client'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import NavLink from './NavLink'
import Link from 'next/link'

const LINKS = [
    {
        name: 'Record',
        href: '/dashboard/record',
        image:
            <svg height="30px" width="30px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 55.334 55.334" fill='#FFFFFF'>
                <g>
                    <g>
                        <circle cx="27.667" cy="27.667" r="3.618" />
                        <path d="M27.667,0C12.387,0,0,12.387,0,27.667s12.387,27.667,27.667,27.667s27.667-12.387,27.667-27.667
                    S42.947,0,27.667,0z M17.118,6.881c3.167-1.61,6.752-2.518,10.549-2.518c0.223,0,0.444,0.003,0.665,0.009
                    c0.367,0.01,0.619,0.922,0.564,2.025l-0.282,5.677c-0.055,1.103-0.289,1.986-0.523,1.979c-0.141-0.004-0.282-0.006-0.424-0.006
                    c-1.997,0-3.894,0.43-5.603,1.202c-1.007,0.455-2.212,0.184-2.774-0.767l-2.896-4.897C15.832,8.634,16.133,7.382,17.118,6.881z
                     M15.986,17.295l-4.278-3.742c-0.832-0.727-0.918-1.994-0.119-2.756c0.019-0.018,0.037-0.035,0.057-0.053
                    c0.802-0.76,2.059-0.605,2.737,0.266l3.494,4.484c0.679,0.871,0.837,1.889,0.391,2.314C17.821,18.235,16.818,18.022,15.986,17.295
                    z M17.877,27.667c0-5.407,4.383-9.79,9.79-9.79s9.79,4.383,9.79,9.79s-4.383,9.79-9.79,9.79S17.877,33.074,17.877,27.667z
                     M38.17,48.476c-3.156,1.596-6.725,2.495-10.503,2.495c-0.248,0-0.495-0.004-0.741-0.011c-0.409-0.013-0.692-0.929-0.632-2.032
                    l0.31-5.676c0.061-1.103,0.322-1.981,0.586-1.972c0.158,0.005,0.317,0.008,0.477,0.008c1.834,0,3.582-0.362,5.179-1.018
                    c1.022-0.42,2.275-0.144,2.877,0.782l3.101,4.77C39.426,46.747,39.156,47.977,38.17,48.476z M43.619,44.656
                    c-0.766,0.72-2.005,0.551-2.703-0.305l-3.59-4.407c-0.698-0.856-0.876-1.848-0.435-2.255c0.442-0.407,1.443-0.179,2.274,0.549
                    l4.28,3.744C44.277,42.709,44.386,43.936,43.619,44.656z"/>
                    </g>
                </g>
            </svg>
    },
    {
        name: 'Review',
        href: '/dashboard/review',
        image: <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
            <path d="M13.383.076a1 1 0 0 0-1.09.217L11 1.586 9.707.293a1 1 0 0 0-1.414 0L7 1.586 5.707.293a1 1 0 0 0-1.414 0L3 1.586 1.707.293A1 1 0 0 0 0 1v18a1 1 0 0 0 1.707.707L3 18.414l1.293 1.293a1 1 0 0 0 1.414 0L7 18.414l1.293 1.293a1 1 0 0 0 1.414 0L11 18.414l1.293 1.293A1 1 0 0 0 14 19V1a1 1 0 0 0-.617-.924ZM10 15H4a1 1 0 1 1 0-2h6a1 1 0 0 1 0 2Zm0-4H4a1 1 0 1 1 0-2h6a1 1 0 1 1 0 2Zm0-4H4a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
        </svg>
    }
]
const Navbar = () => {
    const { data: Session } = useSession()

    return (
        <div className='bg-[#1E2229] flex flex-col items-center text-white rounded-xl shadow-xl p-7 divide-y divide-gray-500 fixed mr-10 md:mr-0 z-50' >

            <div className=' mb-5 w-full bg-[#DD8233] px-2 rounded-xl shadow-lg '>
                <Link href={'/dashboard'} className='flex flex-row items-center py-1 gap-2'>
                    <div className='shadow-lg rounded-xl'>
                        <Image src='/icon.png' alt='Logo' width={64} height={64} />
                    </div>
                    <h3 className='text-md font-bold'>Active Orange</h3>
                </Link>
            </div>
            <div className='w-full'>
                <div className='flex flex-col items-center gap-4 mt-5'>
                    <Image src={Session?.user?.image as string} alt='Profile Picture' width={100} height={100} className='rounded-full border border-[#F68E31]' />
                    <p className='text-transparent  font-bold text-lg bg-clip-text bg-gradient-to-r from-[#F68E31] to-[#d60d1e]'>{Session?.user?.name}</p>
                </div>
            </div>
            <div className='mt-5 flex flex-col w-full items-center'>
                <div className='my-5 flex flex-col gap-4'>
                    {
                        LINKS.map((link, index) => (
                            <NavLink link={link} key={index} />
                        ))
                    }
                </div>

            </div>
            <div className='w-full '>
                <div className='my-5 flex justify-center flex-col md:flex-row gap-4 text-center'>
                    <Link href={'/api/auth/signout'} className=' border border-[#F68E31] text-[#F68E31] px-2 py-2 rounded-xl'>
                        <div className=' bg-'>
                            Sign Out
                        </div>
                    </Link>
                    <Link href={''}>
                        <div className=' border border-[#F68E31] text-[#F68E31] px-2 py-2 rounded-xl'>
                            Settings
                        </div>
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default Navbar