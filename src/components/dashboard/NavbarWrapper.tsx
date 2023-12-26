'use client'
import React from 'react'
import Navbar from './Navbar'
import { SessionProvider } from 'next-auth/react'
import { motion } from 'framer-motion'
const NavbarWrapper = () => {
    const [showNav, setShowNav] = React.useState(false)

    const handleOpenClose = () => {
        setShowNav(prev => !prev)
    }

    const navVar = {
        hidden: {opacity: 0, y:-1000},
        show: {opacity: 1, y:0}

    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <SessionProvider>
                <div className='hidden md:block'>
                    <Navbar />
                </div>
                <div className='block md:hidden'>
                    {
                        showNav ?
                            <div className=''>
                                <button onClick={() => { handleOpenClose() }}>
                                    <div className=' p-3 bg-[#737579] rounded-xl'>
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                    </div>
                                </button>
                            </div>
                            :
                            <button onClick={() => { handleOpenClose() }}>
                                <div className=' p-3 bg-[#737579] rounded-xl'>
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h14M1 6h14M1 11h7" />
                                    </svg>
                                </div>

                            </button>
                    }
                    <motion.div
                        variants={navVar}
                        animate={showNav ? 'show' : 'hidden'}
                    >
                        <Navbar />
                    </motion.div>

                </div>

            </SessionProvider>
        </motion.div>
    )
}

export default NavbarWrapper