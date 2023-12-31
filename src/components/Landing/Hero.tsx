'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
const Hero = () => {
    return (
        <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
         id='herosection' className='flex flex-col md:grid md:grid-cols-12 h-full items-center justify-around gap-10 bg-gradient-to-tr from-black to-[#F06923] md:p-32 pt-32 from-55% '>
            <div className=' md:col-span-6 lg:col-span-6 flex flex-col text-center items-center md:items-start md:text-start gap-1 md:gap-4 px-6 md:px-0'>
                <h3 className='font-bold text-lg md:text-2xl  text-white'>Prepare To</h3>
                <h1 className='bg-clip-text text-transparent text-xl md:text-6xl bg-gradient-to-br from-[#F18828] to-[#d60d1e] font-bold'>Optimize. Energize. <br /> Excel.</h1>
                <p className='text-[12px] md:text-base'>
                    Transform your fitness with ActiveOrange—track, set goals, and achieve peak performance effortlessly.
                </p>
                <div className='flex flex-row gap-5'>
                    <Link href={'/dashboard'} className=' text-white py-3 px-5 rounded-xl bg-gradient-to-br from-[#F18828] to-[#d60d1e] hover:scale-110 transition ease-in-out'>
                        Sign In
                    </Link>
                    <button
                    className='text-[#F18828] border border-[#F18828] px-2 rounded-xl hover:bg-[#F18828] hover:text-black transition ease-in-out'>
                        Learn More
                    </button>
                </div>
            </div>
            <div className='md:col-span-6 md:py-32 lg:py-0 lg:col-span-6 h-full items-center justify-center'>
                <Image src={'/HeroImage.png'} width={1024} height={1024} alt='Runner Hero Logo' className='w-full' />
            </div>

        </motion.div>
    )
}

export default Hero