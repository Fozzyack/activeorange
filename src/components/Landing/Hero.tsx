import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
const Hero = () => {
    return (
        <div id='herosection' className='flex flex-col md:grid md:grid-cols-12 h-full items-center justify-around gap-10'>
            <div className=' md:col-span-6 lg:col-span-6 flex flex-col text-center items-center md:items-start md:text-start gap-4'>
                <h1 className='bg-clip-text text-transparent text-5xl bg-gradient-to-br from-[#F18828] to-[#d60d1e] font-bold'>Optimise Your Performance</h1>
                <p>
                    Transform your fitness with ActiveOrange—track, set goals, and achieve peak performance effortlessly.
                </p>
                <div className='flex flex-row gap-5'>
                    <Link href={'/dashboard'} className=' text-white py-3 px-5 rounded-xl bg-gradient-to-br from-[#F18828] to-[#d60d1e]'>
                        Sign In
                    </Link>
                    <button className='text-[#F18828] border border-[#F18828] px-2 rounded-xl'>
                        Learn More
                    </button>
                </div>
            </div>
            <div className='md:col-span-6 md:py-32 lg:py-0 lg:col-span-6 h-full items-center justify-center'>
                <Image src={'/HeroImage.png'} width={1024} height={1024} alt='Runner Hero Logo' className='w-full' />
            </div>

        </div>
    )
}

export default Hero