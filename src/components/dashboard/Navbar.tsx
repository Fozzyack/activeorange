'use client'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import NavLink from './NavLink'
import Link from 'next/link'
import { LINKS } from './Links'
import ProfilePicture from './ProfilePicture'
import { motion } from 'framer-motion'


const Navbar = () => {
    const { data: Session } = useSession({
        required: true
    })

    return (
        <motion.div
            initial={{ opacity: 0, y: -1000 }}
            animate={{opacity: 1, y: 0}}
            className='bg-[#1E2229] flex flex-col items-center text-white rounded-xl shadow-xl p-7 divide-y divide-gray-500 fixed max-h-[75%] mt-16 md:max-h-[100%] md:mt-0 mr-10 md:mr-0 z-50 overflow-auto ' >

            <div className=' mb-5 w-full bg-[#DD8233] hover:bg-orange-700 px-2 rounded-xl shadow-lg transition ease-in-out '>
                <Link href={'/dashboard'} className='flex flex-row items-center py-1 gap-2'>
                    <div className='shadow-lg rounded-xl'>
                        <Image src='/icon.png' alt='Logo' width={64} height={64} />
                    </div>
                    <h3 className='text-md font-bold'>Active Orange</h3>
                </Link>
            </div>
            <div className='w-full'>
                <div className='flex flex-col items-center gap-4 mt-5'>
                    <ProfilePicture />
                    <p className='text-transparent bg-clip-text text-lg  bg-gradient-to-t from-orange-600 to-orange-400'>{Session?.user?.name ? Session?.user?.name : Session?.user?.email}</p>
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
                    <Link href={'/api/auth/signout'} className=' border border-[#F68E31] text-[#F68E31] hover:bg-[#F68E31] transition ease-in-out duration-400 delay-75 hover:text-black px-2 py-2 rounded-xl'>
                        <div >
                            Sign Out
                        </div>
                    </Link>
                    <Link href={'/dashboard/settings'}>
                        <div className=' border border-[#F68E31] text-[#F68E31] hover:bg-[#F68E31] transition ease-in-out duration-400 delay-75 hover:text-black px-2 py-2 rounded-xl'>
                            Settings
                        </div>
                    </Link>
                </div>
            </div>
        </motion.div>

    )
}

export default Navbar